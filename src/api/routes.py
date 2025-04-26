"""
This module takes care of starting the API Server, Loading the DB, and Adding the endpoints.
"""
from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from api.models import db, User
from api.utils import generate_sitemap, APIException
from api.Auth import generate_token  # Ensure you have this function implemented

# Initialize Blueprints
api = Blueprint('api', __name__)
user_bp = Blueprint('user_bp', __name__)

# Allow CORS requests
CORS(api)
CORS(user_bp)

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
    new_user = User(username=data['username'], password_hash=data['password'])  # Consider hashing passwords
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
