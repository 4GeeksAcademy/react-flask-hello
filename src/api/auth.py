from flask import Blueprint, request, jsonify, current_app
import datetime
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity, get_jwt
from werkzeug.security import generate_password_hash, check_password_hash
from .models import db, User


# Creamos un blueprint para agrupar las rutas de autentificacion
auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register', methods=['POST','OPTIONS'])
def register():
    # Recibimos los datos JSON del cliente(nombre,email y contraseña)
    data = request.get_json()

    # Verificamos si el mail ya existe
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({"error": "Email ya registrado"}), 409

    # Ciframos la contraseña
    hashed_password = generate_password_hash(data['password'])
    # sha256(secure hashing algoritme 256bits)
    # Creamos el nuevo usuario
    user = User(name=data['name'], email=data['email'],
                password=hashed_password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "Usuario creado correctamente"}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()

    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({"error": "Credenciales inválidas"}), 401

    token = create_access_token(identity=user.email)

    return jsonify({
        "message": f"Bienvenido, {user.name}",
        "token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }), 200

#Metodo Post
@auth_bp.route('/auth/me', methods=['POST'])
@jwt_required()
def secret():
    try:
        current_user = get_jwt_identity()
        if not current_user:
            return jsonify({"msg": "Missing user", "Error": str(e)}), 400
        user = User.query.filter_by(email=current_user).first()
        if not user:
            return jsonify({"msg": "User not found"}), 404
        return jsonify({
            "msg": "Access Allowed",
            "user": user.to_dict(),

        }), 200
    except Exception as e:
        return jsonify({"msg": "Missing data", "Error": str(e)}), 400
