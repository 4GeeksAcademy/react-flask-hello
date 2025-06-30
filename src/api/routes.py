"""
This module handles API endpoints for the platform.
"""

from flask import Blueprint, request, jsonify
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity
)
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)
CORS(api)

# --- HELLO TEST ROUTE ---
@api.route('/hello', methods=['GET', 'POST'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

# --- USER REGISTRATION ---
@api.route('/register', methods=['POST'])
def api_register():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg': 'Debes enviar información en el body'}), 400
    if 'full_name' not in body or body['full_name'].strip() == '':
        return jsonify({'msg': 'Debes enviar un nombre válido'}), 400
    if 'email' not in body or body['email'].strip() == '':
        return jsonify({'msg': 'Debes enviar un email válido'}), 400
    if 'password' not in body or body['password'].strip() == '':
        return jsonify({'msg': 'Debes enviar un password válido'}), 400
    if 'country' not in body or body['country'].strip() == '':
        return jsonify({'msg': 'Debes enviar un country válido'}), 400

    phone = body.get('phone')
    profile_picture_url = body.get('profile_picture_url')
    random_profile_color = None if profile_picture_url else 1  # Or use random.randint(1,7)

    hashed_password = generate_password_hash(body['password'])

    new_user = User(
        full_name=body['full_name'],
        email=body['email'],
        password=hashed_password,
        phone=phone,
        country=body['country'],
        created_at=None,  # Let your app.py or DB default handle this if you wish
        profile_picture_url=profile_picture_url,
        random_profile_color=random_profile_color,
        is_active=True
    )
    db.session.add(new_user)
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'msg': 'Ingresa un email distinto.'}), 400

    return jsonify({'msg': 'ok', 'new_user': new_user.serialize()}), 201

# --- LOGIN (JWT) ---
@api.route('/login', methods=['POST'])
def api_login():
    body = request.get_json()
    if not body or 'email' not in body or 'password' not in body:
        return jsonify({'msg': 'Email y contraseña requeridos'}), 400

    user = User.query.filter_by(email=body['email']).first()
    if not user or not check_password_hash(user.password, body['password']):
        return jsonify({'msg': 'Credenciales inválidas'}), 401

    token = create_access_token(identity=user.id)

    return jsonify({
        "access_token": token,
        "user": user.serialize()
    }), 200

# --- PROTECTED ENDPOINT ---
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

