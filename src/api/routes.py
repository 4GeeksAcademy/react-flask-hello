"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from api.models import User, db
from flask_bcrypt import Bcrypt

api = Blueprint('api', __name__)
bcrypt = Bcrypt()

CORS(api)


@api.route('/private-hello', methods=['GET'])
@jwt_required()
def handle_private_hello():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user:
        response_body = {
            "message": "Hola, soy una ruta privada",
            "user": user.serialize() 
        }
        return jsonify(response_body), 200
    else:
        return jsonify({"message": "Usuario no encontrado"}), 404


@api.route('/login', methods=['POST'])
def login():
    data_request = request.get_json()
    print("Login request data:", data_request)

    email = data_request.get('email')
    password = data_request.get('password')
    print(f"Email: {email}, Password received: {'Yes' if password else 'No'}")

    if not email or not password:
        print("Error: email or password missing")
        return jsonify({"message": "Los campos email,password son obligatorios"}), 400

    user = User.query.filter_by(email=email).first()
    print("User found:", user)

    if not user:
        print("Error: user not found")
        return jsonify({"message": "Verifique sus credenciales"}), 401

    if bcrypt.check_password_hash(user.password, password):
        print("Password match, creating access token")
        access_token = create_access_token(identity=str(user.id))
        return jsonify({"message": "Login exitoso", "token": access_token, "user": user.serialize()}), 200

    print("Error: password incorrect")
    return jsonify({"message": "Verifique sus credenciales"}), 401


@api.route('/register', methods=["POST"])
def register():
    data_request = request.get_json()
    email = data_request.get('email')
    password = data_request.get('password')
    name = data_request.get('username')  

    if not email or not password:
        return jsonify({"message": "Los campos email,password son obligatorios"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = User(
        email=email,
        password=hashed_password,
        name=name,  
        is_active=True
    )

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "usuario creado con exito"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error en el servidor"}), 500
