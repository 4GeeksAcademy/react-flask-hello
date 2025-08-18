from flask import Blueprint, request, jsonify
from api.models import db, User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from sqlalchemy.exc import IntegrityError
from flask_bcrypt import Bcrypt
from flask_cors import CORS

user_bp = Blueprint('user', __name__,)
bcrypt = Bcrypt()
CORS(user_bp)


@user_bp.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    try:
        hashed_password = bcrypt.generate_password_hash(
            data['password']).decode('utf-8')
        new_user = User(
            email=data['email'],
            password=hashed_password,
            is_active=True,
            role=data.get('role', 'usuario')
        )

        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.serialize()), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({"msg": "El email ya existe"}), 400
    except Exception as e:
        return jsonify({"msg": "Error al registrar usuario", "error": str(e)}), 500


@user_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()

    if not user or not bcrypt.check_password_hash(user.password, data['password']):
        return jsonify({"msg": "Credenciales incorrectas"}), 401

    token = create_access_token(identity=str(user.id),
                                additional_claims={"role": user.role, "email": user.email})

    return jsonify(access_token=token), 200