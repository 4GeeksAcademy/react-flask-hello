"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from .supabase_client import supabase

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Registrar


@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data['email']
    password = data['password']
    user = supabase.auth.sign_up({
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
    print(user)
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