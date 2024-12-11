import os
from dotenv import load_dotenv
load_dotenv()
from flask import Flask, request, jsonify, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS  # Add CORS support
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity  # Add JWT support
from api.utils import APIException, generate_sitemap
from api.models import db, User, Favorites, Wallet
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_mail import Mail, Message

# Determine environment
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')

# Initialize Flask app first
app = Flask(__name__)
app.url_map.strict_slashes = False

# Enable CORS for frontend-backend communication
CORS(app)

# Configure Flask-Mail (after app initialization)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # For Gmail. Replace with your provider's SMTP
app.config['MAIL_PORT'] = 587  # Use 465 for SSL, 587 for TLS
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')  # Set this in your .env or system variables
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')  # Set this in your .env or system variables
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_USERNAME')  # Default sender email address

# Initialize Flask-Mail
mail = Mail(app)

# JWT Configuration
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY", "super-secret-key")  # Replace with your own secret key
jwt = JWTManager(app)  # Initialize JWT manager

# Database configuration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# Add the admin panel
setup_admin(app)

# Add custom commands
setup_commands(app)

# Register API routes with the "/api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# Any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # Avoid cache memory
    return response


# Create a route to authenticate your users and return JWT Token
@app.route("/token", methods=["POST"])
def create_token():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    print("Username:", username)  # Debugging
    print("Password:", password)  # Debugging

    user = User.query.filter_by(username=username).first()
    print("User found:", user)  # Debugging

    if user is None or user.password != password:  # Check user and password
        print("Invalid credentials")  # Debugging
        return jsonify({"msg": "Bad username or password"}), 401
    
    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id": user.id })

# Protect a route with jwt_required
@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if user is None:
        return jsonify({"msg": "User not found"}), 404

    return jsonify({"id": user.id, "username": user.username}), 200

@app.route('/favorites/<coin_id>', methods=['POST'])
def add_fav(coin_id):
    user_id = request.json['user_id']
    name = request.json['name']
    fav_crypto = Favorites(name=name, user_id=user_id, coin_id=coin_id)
    db.session.add(fav_crypto)
    db.session.commit()
    return jsonify(get_favs(user_id))
 

@app.route('/favorites/<int:user_id>/<int:favorite_id>', methods=['DELETE'])
def delete_fav(favorite_id, user_id):
    fav_crypto = Favorites.query.get(favorite_id)
    db.session.delete(fav_crypto)
    db.session.commit()
    return jsonify(get_favs(user_id))

def get_favs(id):
    favorites = Favorites.query.filter_by(user_id=id)
    favorites = list(map(lambda x: x.serialize(), favorites))
    return favorites

@app.route('/users/<int:id>/favorites', methods=['GET']) 
def get_favorites(id):
    favorites = Favorites.query.filter_by(user_id=id)
    favorites = list(map(lambda x: x.serialize(), favorites))
    return jsonify(favorites)

# Run the application
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
