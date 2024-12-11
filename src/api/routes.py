from flask import Flask, request, jsonify, Blueprint
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .models import db, User, Favorites, Wallet
from flask_cors import CORS

api = Blueprint('api', __name__)


# Example endpoint: Replace or extend as needed
@api.route('/hello', methods=['GET'])
def hello_world():
    return jsonify({"message": "Hello, World!"})

# def get_favs (id):
#     favorites = Favorites.query.filter_by(user_id=id)
#     favorites = list(map(lambda x: x.serialize(), favorites))
#     return favorites

# Register a new user
@api.route('/users', methods=['POST'])
def register_user():
    data = request.get_json()  # Parse JSON from the request

    # Validate input
    email = data.get('email')
    password = data.get('password')
    username = data.get('username')

    if not email or not password or not username:
        return jsonify({"error": "Email, password and username are required"}), 400

    # Check if user already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "User already exists"}), 400

    # Create new user
    hashed_password = generate_password_hash(password)  # Hash the password
    new_user = User(email=email, password=hashed_password, username=username)

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User created successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Login a user and return an access token
@api.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()  # Parse JSON from the request

    # Validate input
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Find user
    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid email or password"}), 401

    # Create a token
    access_token = create_access_token(identity=user.id)
    username = user.username
    userID = user.id
    return jsonify({"message": "Login successful", "username":username, "userID":userID, "access_token": access_token, "user": user.serialize()}), 200

# Example of a protected route
@api.route('/protected', methods=['GET'])
@jwt_required()
def protected_route():
    current_user_id = get_jwt_identity()  # Get the user ID from the token
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({"message": f"Welcome, {user.email}!", "user": user.serialize()}), 200

# Get all users (admin functionality, protected)
@api.route('/users', methods=['GET'])
@jwt_required()
def get_all_users():
    current_user_id = get_jwt_identity()
    # You can add logic here to restrict access to admin users only
    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200



# Get wallet data for the logged-in user
@api.route('/wallet', methods=['GET'])
@jwt_required()
def get_wallet():
    current_user_id = get_jwt_identity()  
    try:
        wallet = wallet.query.filter_by(user_id=current_user_id).all()
        if not wallet:
            return jsonify({"error": "No wallet data found for the user"}), 404

        return jsonify([w.serialize() for w in wallet]), 200
    except Exception as e:
        return jsonify({"error": f"Failed to fetch wallet data: {str(e)}"}), 500



# Placeholder for additional routes
# Add your other endpoints here
@api.route('/example', methods=['GET'])
def example_endpoint():
    return jsonify({"message": "This is an example endpoint!"})


# @api.route('/favorites/<coin_id>', methods=['POST'])
# def add_fav(coin_id):
#     user_id = request.json['user_id']
#     name = request.json['name']
#     fav_crypto = Favorites(name=name, user_id=user_id, coin_id=coin_id)
#     db.session.add(fav_crypto)
#     db.session.commit()
#     return jsonify(get_favs(user_id))

