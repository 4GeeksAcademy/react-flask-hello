from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from api.models import AppUser
import jwt
from datetime import datetime, timedelta

auth = Blueprint('auth', __name__)

SECRET_KEY = 'clave_super_secreta'  # Pasala a una variable de entorno en producción

# Registro de usuario
@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if AppUser.query.filter_by(email=email).first():
        return jsonify({"msg": "El email ya está registrado"}), 400

    hashed_password = generate_password_hash(password)
    user = AppUser(username=username, email=email, password_hash=hashed_password)

    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "Usuario registrado correctamente"}), 201
