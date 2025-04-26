import jwt  # Import PyJWT for handling JSON Web Tokens
import datetime  # For timestamps and time calculations
from flask import request, jsonify, current_app  # Flask utilities
from functools import wraps  # To create decorators
from models import User  # Import your User model

def generate_token(user_id):
    """
    Generates a JWT token for the given user ID.

    Args:
        user_id (int): The ID of the user.

    Returns:
        str: Encoded JWT token.
    """
    payload = {
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1),  # Token expiration time
        'iat': datetime.datetime.utcnow(),  # Token issued at time
        'sub': user_id  # Subject (user ID)
    }
    secret_key = current_app.config['SECRET_KEY']  # Fetch secret key from app config

    # Encode the token using HS256 algorithm
    return jwt.encode(payload, secret_key, algorithm='HS256')

def token_required(f):
    """
    Decorator to check if the request has a valid token.

    Args:
        f (function): The function to decorate.

    Returns:
        function: Decorated function with token validation.
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')  # Get the token from request headers
        if not token:
            return jsonify({'message': 'Token missing'}), 401  # Token not provided

        try:
            secret_key = current_app.config['SECRET_KEY']  # Fetch secret key from app config
            payload = jwt.decode(token, secret_key, algorithms=['HS256'])  # Decode the token
            current_user = User.query.get(payload['sub'])  # Fetch the user from the database

            if not current_user:
                return jsonify({'message': 'User not found'}), 404  # User does not exist
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token expired'}), 401  # Token has expired
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 401  # Token is invalid

        return f(current_user, *args, **kwargs)
    return decorated
