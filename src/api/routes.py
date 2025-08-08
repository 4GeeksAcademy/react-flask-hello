"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from .supabase_client import supabase
from datetime import datetime, timedelta
import jwt
import os


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Registrar


@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    # Validaciones basicas de los campos
    required_fields = ['email', 'password', 'nickname', 'nombre', 'apellido', 'telefono']
    missing_fields = [field for field in required_fields if field not in data or not data[field]]

    if missing_fields:
        return jsonify({
            "error": f"Faltan campos obligatorios: {', '.join(missing_fields)}"
        }), 400

    # Validacion simple de email
    if '@' not in data['email'] or '.' not in data['email']:
        return jsonify({"error": "Email no válido"}), 400

    #  Valida longitud mínima contraseña
    if len(data['password']) < 6:
        return jsonify({"error": "La contraseña debe tener al menos 6 caracteres"}), 400

    # Valida el telefono (solo dígitos y longitud mínima)
    if not data['telefono'].isdigit() or len(data['telefono']) < 7:
        return jsonify({"error": "Teléfono no válido"}), 400


    email = data['email']
    password = data['password']

    auth_response = supabase.auth.sign_up({
        "email": email,
        "password": password,
        "options": {
            "data": {
                "nickname": data.get('nickname', ''),
                "nombre": data.get('nombre', ''),
                "apellido": data.get('apellido', ''),
                "telefono": data.get('telefono', '')
            }
        }
    })

    usuario_data = {
        'email': email,
        'nombre': data.get('nombre', ''),
        'apellido': data.get('apellido', ''),
        'nickname': data.get('nickname', ''),
        'telefono': data.get('telefono', ''),
        'avatar': data.get('avatar', ''),
        'rol': data.get('rol', 'user')
    }

    insert_response = supabase.table('Usuario').insert(usuario_data).execute()

    print("Insert response: ", insert_response)

    return jsonify("Todo bien")

# Login


@api.route('/signin', methods=['POST'])
def signin():
    try:
        data = request.get_json()

        # Validar datos requeridos
        if not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email and password are required'}), 400

        email = data['email']
        password = data['password']

        # Autenticar con Supabase
        response = supabase.auth.sign_in_with_password({
            "email": email,
            "password": password
        })



        if response.user and response.session:
            # Generar JWT token personalizado
            token = generate_token(response.user.id, response.user.email)

            return jsonify({
                'message': 'Login successful',
                'token': token,
                'user': {
                    'id': response.user.id,
                    'email': response.user.email,
                    'user_metadata': response.user.user_metadata
                },
                'expires_in': 86400
            }), 200
        else:
            return jsonify({'error': 'Invalid credentials'}), 401

    except Exception as e:
        print(f"Signin error: {str(e)}")
        return jsonify({'error': 'Invalid credentials'}), 401


def generate_token(user_id, email):
    payload = {
        'user_id': user_id,
        'email': email,
        'exp': datetime.utcnow() + timedelta(hours=24)
    }
    return jwt.encode(payload, "TEST", algorithm='HS256')
