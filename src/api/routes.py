"""
This module handles only test/demo endpoints for the platform.
"""

from flask import Blueprint, jsonify
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.models import User

api = Blueprint('api', __name__)
CORS(api)

# --- HELLO TEST ROUTE ---
@api.route('/hello', methods=['GET', 'POST'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

# --- (Optional) PRIVATE TEST ROUTE ---
@api.route('/private', methods=['GET'])
@jwt_required()
def api_private():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'msg': 'User not found'}), 404
    return jsonify({
        'msg': 'Este es un endpoint privado!',
        'user': user.serialize()
    }), 200


