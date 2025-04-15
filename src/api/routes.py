from flask import request, jsonify, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.models import db, User, Progress
from api.utils import APIException

api = Blueprint('api', __name__)

@api.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "Usuario ya existe"}), 400

    user = User(email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "Usuario creado con éxito"}), 200

@api.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"msg": "Credenciales inválidas"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({"access_token": access_token, "user": user.serialize()}), 200

@api.route("/private", methods=["GET"])
@jwt_required()
def private():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify({"user": user.serialize()}), 200

@api.route('/xp', methods=['GET'])
@jwt_required()
def get_progress():
    user_id = get_jwt_identity()
    progress = Progress.query.filter_by(user_id=user_id).first()
    if not progress:
        progress = Progress(user_id=user_id)
        db.session.add(progress)
        db.session.commit()
    return jsonify(progress.serialize()), 200

@api.route('/xp/add', methods=['POST'])
@jwt_required()
def add_xp():
    user_id = get_jwt_identity()
    data = request.get_json()
    amount = data.get("amount", 10)
    progress = Progress.query.filter_by(user_id=user_id).first()
    if not progress:
        progress = Progress(user_id=user_id)
    progress.xp += amount
    if progress.xp >= 100:
        progress.xp = 0
        progress.level += 1
    db.session.add(progress)
    db.session.commit()
    return jsonify(progress.serialize()), 200