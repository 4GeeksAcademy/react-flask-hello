"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, create_access_token
from api.models import User, db
from flask_bcrypt import Bcrypt

api = Blueprint('api', __name__)
bcrypt = Bcrypt()

# Allow CORS requests to this API
CORS(api)

bcrypt = Bcrypt()


@api.route('/private-hello', methods=['POST', 'GET'])
@jwt_required()
def handle_private_hello():

    response_body = {
        "message": "Hola, soy una ruta privada"
    }

    return jsonify(response_body), 200


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
    print("Register request data:", data_request)

    email = data_request.get('email')
    password = data_request.get('password')
    print(f"Email: {email}, Password received: {'Yes' if password else 'No'}")

    if not email or not password:
        print("Error: email or password missing")
        return jsonify({"message": "Los campos email,password son obligatorios"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    print("Password hashed")

    new_user = User(
        email=email,
        password=hashed_password,
        is_active=True
    )
    print("New user created:", new_user)

    try:
        db.session.add(new_user)
        db.session.commit()
        print("User saved to database")
        return jsonify({"message": "usuario creado con exito"}), 201
    except Exception as e:
        db.session.rollback()
        print("Error saving user:", e)
        return jsonify({"error": "Error en el servidor"}), 500
