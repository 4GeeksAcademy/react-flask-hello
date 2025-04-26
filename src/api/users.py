from flask import Blueprint, request, jsonify
from models import db, User
from Auth import generate_token
from werkzeug.security import generate_password_hash, check_password_hash

# Blueprint for user-related routes
user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/signup', methods=['POST'])
def register():
    """
    Register a new user by storing their username and hashed password in the database.
    """
    data = request.get_json()

    # Validate input data
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'message': 'Invalid input'}), 400

    # Check if the username already exists
    existing_user = User.query.filter_by(username=data['username']).first()
    if existing_user:
        return jsonify({'message': 'Username already exists'}), 409

    # Create a new user with a hashed password
    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(username=data['username'], password_hash=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

@user_bp.route('/login', methods=['POST'])
def login():
    """
    Authenticate a user and provide a JWT token if the credentials are valid.
    """
    data = request.get_json()

    # Validate input data
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'message': 'Invalid input'}), 400

    # Find user in the database
    user = User.query.filter_by(username=data['username']).first()
    if not user:
        return jsonify({'message': 'Invalid credentials'}), 401

    # Check password hash
    if not check_password_hash(user.password_hash, data['password']):
        return jsonify({'message': 'Invalid credentials'}), 401

    # Generate a JWT token
    token = generate_token(user.id)

    return jsonify({'token': token}), 200
