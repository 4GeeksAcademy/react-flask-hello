"""
This module takes care of starting the API Server, Loading the DB, and Adding the endpoints.
"""
from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from flask_restx import Api, Namespace # install needed!!!
from api.models import db, User
from api.utils import generate_sitemap, APIException
from api.Auth import generate_token  # Ensure you have this function implemented

# Initialize Blueprints
api = Blueprint('api', __name__)
user_bp = Blueprint('user_bp', __name__)

# Allow CORS requests
CORS(api)
CORS(user_bp)

# Initialize RESTx API
restx_api = Api(api, title="My API", version="1.0", description="API endpoints for users and more")

# Example Namespace for documentation
example_ns = Namespace("example", description="Example operations")

# Example route: Hello endpoint
@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the Google Inspector and you will see the GET request."
    }
    return jsonify(response_body), 200

# User registration route
@user_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'message': 'Invalid input'}), 400

    # Create a new user
    new_user = User(username=data['username'], password_hash=data['password'])  # always hash passwords
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered'}), 201

# User login route
@user_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'message': 'Invalid input'}), 400

    # Authenticate user
    user = User.query.filter_by(username=data['username']).first()
    if user and user.password_hash == data['password']:  # Replace with hashed password check
        token = generate_token(user.id)  # Use the `generate_token` function to generate a JWT token
        return jsonify({'token': token}), 200
    return jsonify({'message': 'Invalid credentials'}), 401

# Attach Namespaces for RESTx API
restx_api.add_namespace(example_ns, path="/example")

# Function to register additional blueprints and routes
def register_routes(app):
    """
    Registers all routes and blueprints with the Flask app.

    Args:
        app (Flask): Flask application instance.
    """
    from cocktails import cocktail_bp, cocktail_ns
    from users import user_bp, user_ns
    from favorites import favorites_bp, favorites_ns

    # Register blueprints for route handling
    app.register_blueprint(cocktail_bp, url_prefix="/cocktails")
    app.register_blueprint(user_bp, url_prefix="/user")
    app.register_blueprint(favorites_bp, url_prefix="/favorites")

    # Add namespaces for RESTx documentation
    restx_api.add_namespace(cocktail_ns, path="/cocktails")
    restx_api.add_namespace(user_ns, path="/users")
    restx_api.add_namespace(favorites_ns, path="/favorites")
