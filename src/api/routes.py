"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask_jwt_extended import create_access_token, jwt_required, JWTManager
from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
import os
from api.models import db, User


app = Flask(__name__)
jwt = JWTManager(app)

api = Blueprint('api', __name__)

secret_key = os.urandom(24).hex()
app.config['JWT_SECRET_KEY'] = secret_key



bcrypt = Bcrypt(app)

CORS(api)


@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data["email"]
    repetido = User.query.filter_by(email=email).first()

    if repetido: 
        return jsonify({"error":"correo registrado"}), 400
    
    password = bcrypt.generate_password_hash(data["password"]).decode('utf-8')

    user = User(email=email,password=password,first_name=data["first_name"],last_name=data["last_name"],phone=data["phone"],location=data["location"],is_active=True)
    
    db.session.add(user)
    db.session.commit()   

    return jsonify({"mensaje":"registro exitoso"})

@api.route("/login", methods=["POST"])
def user_login():
    try:
        data = request.get_json()
        
        if not data or "email" not in data or "password" not in data:
            return jsonify({"message": "Se requieren tanto el correo electrónico como la contraseña"}), 400

        email = data["email"]
        password = data["password"]

        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404
        
        if not bcrypt.check_password_hash(user.password, password):
        
            return jsonify({"message": "Credenciales incorrectas"}), 401

        payload = {
            "email": user.email, 
            "first_name": user.first_name, 
            "last_name": user.last_name,
            "phone": user.phone, 
            "location": user.location, 
            "nivel": "user"
        }
        token = create_access_token(identity=user.id, additional_claims=payload)
        return jsonify({"token": token}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"message": "Ocurrió un error interno del servidor"}), 500

@api.route("/private", methods=["GET"])
@jwt_required()

def private():
    return jsonify({"message":"acceso permitido"}), 200
