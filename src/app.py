import os
from flask import Flask, request, jsonify, send_from_directory
from flask_migrate import Migrate
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import stripe

# Load environment variables
load_dotenv()

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../dist/')
app = Flask(__name__)
app.url_map.strict_slashes = False

jwt = JWTManager(app)


# cloudinary configuration --- this uses the environment variables from the .env file
cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME')
api_key = os.getenv('CLOUDINARY_API_KEY')
api_secret = os.getenv('CLOUDINARY_API_SECRET')

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# Admin and commands
setup_admin(app)
setup_commands(app)

# Register API blueprint
app.register_blueprint(api, url_prefix='/api')

# Stripe configuration
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

@app.route("/api/create-checkout-session", methods=["POST"])
def create_checkout_session():
    try:
        data = request.get_json()
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[{
                "price_data": {
                    "currency": "eur",
                    "product_data": {"name": data.get("name", "Pago PartyCar")},
                    "unit_amount": int(data.get("amount", 1000)),  # en céntimos
                },
                "quantity": 1,
            }],
            mode="payment",
            success_url=data.get("success_url", "http://localhost:5173/"),
            cancel_url=data.get("cancel_url", "http://localhost:5173/"),
        )
        return jsonify({"url": checkout_session.url})
    except Exception as e:
        return jsonify(error=str(e)), 400

# Error handling
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Sitemap route
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# Serve frontend files
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0
    return response

if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
