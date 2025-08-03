from flask import Blueprint, request, jsonify
from api.models import db, User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

user_bp = Blueprint('user', __name__,)

@user_bp.route('/register', methods=['POST'])
def register_user():
    
        data = request.get_json()
        hashed_password = generate_password_hash(data['password'])
        user = User(email=data['email'], password=hashed_password, is_active=True)
        db.session.add(user)
        db.session.commit()
        return jsonify({"msg": "Usuario registrado"}), 201

@user_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()  # corregido el typo
    if user and check_password_hash(user.password, data['password']):
        token = create_access_token(identity=user.id)
        return jsonify(access_token=token), 200
    return jsonify({"msg": "Credenciales inválidas"}), 401 
    