"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

user = Blueprint('user_api', __name__)

# Allow CORS requests to this API
CORS(user)


@user.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@user.route('/signup', methods=['POST'])
def signup():

    body = request.get_json()

    if not body or not body.get("email") or not body.get("password") or not body.get("name") or not body.get("lastname") or not body.get("dni"):
        return jsonify({"error": "You must provide email, password, name, lastname and dni"}), 400

    if User.query.filter_by(email=body["email"]).first():
        return jsonify({"error": "The user already exists"}), 400

    try:

        new_user = User(
            email=body.get("email"),
            password=body.get("password"),
            name=body.get("name"),
            lastname=body.get("lastname"),
            dni=body.get("dni")

        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"msg": "User created!!"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@user.route('/login', methods=['POST'])
def login():

    body = request.get_json()

    if not body or not body.get("email") or not body.get("password"):
        return jsonify({"error": "You must provide email and password"}), 400

    user = User.query.filter_by(email=body["email"]).first()

    if not user or not user.check_password(body["password"]):
        return jsonify({"error": "Incorrect credentials"}), 401

    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        "access_token": access_token,
        "user": user.serialize()
    }), 200


# 👇 ❇️ Riki for the group success 👊
# Obtener un usuario por ID
@user.route('/user/<int:id>', methods=['GET'])
@jwt_required()
def get_user_by_id(id):
    # Verificar si el usuario existe
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    # Devolver datos del usuario
    return jsonify(user.serialize()), 200

# Obtener todos los usuarios
@user.route('/users', methods=['GET'])
@jwt_required()
def get_all_users():
    # Obtener todos los usuarios
    users = User.query.all()
    
    # Serializar la lista de usuarios
    all_users = [user.serialize() for user in users]
    
    return jsonify(all_users), 200
