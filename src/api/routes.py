
from flask_cors import CORS
from api.utils import generate_sitemap, APIException
from api.models import db, User
from flask import Flask, request, jsonify, url_for, Blueprint
from werkzeug.security import generate_password_hash
import re
import secrets
api = Blueprint('api', __name__)
# Allow CORS requests to this API
CORS(api)


def is_valid_username(username):
    return re.fullmatch(r'^[a-zA-Z0-9_]{4,}$', username) is not None


def is_valid_password(password):
    return len(password) >= 8


@api.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    required_fields = ['username', 'email', 'password',
                       'verify_password', 'age', 'language', 'country']
    if not all(field in data and data[field] for field in required_fields):
        return jsonify({'msg': 'Todos los campos son obligatorios.'}), 400

    username = data['username']
    email = data['email']
    password = data['password']
    verify_password = data['verify_password']
    age = data['age']
    language = data['language']
    country = data['country']

    if not is_valid_username(username):
        return jsonify({'msg': 'El nombre de usuario debe tener al menos 4 caracteres alfanuméricos o guion bajo.'}), 400
    if not is_valid_password(password):
        return jsonify({'msg': 'La contraseña debe tener al menos 8 caracteres.'}), 400
    if password != verify_password:
        return jsonify({'msg': 'Las contraseñas no coinciden.'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'msg': 'El nombre de usuario ya existe.'}), 409
    if User.query.filter_by(email=email).first():
        return jsonify({'msg': 'El correo ya está registrado.'}), 409

    hashed_password = generate_password_hash(password)
    verification_token = secrets.token_urlsafe(32)

    new_user = User(
        username=username,
        email=email,
        password=hashed_password,
        age=age,
        language=language,
        country=country,
        is_active=False,
        is_verified=False,
        verification_token=verification_token
    )
    db.session.add(new_user)
    db.session.commit()

    # Omite el envío de correo de verificación para pruebas locales

    return jsonify({'msg': 'Usuario registrado correctamente.', 'user': new_user.serialize()}), 201


"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
