"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from sqlalchemy import inspect

user = Blueprint('user_api', __name__)


@user.route('/signup', methods=['POST'])
def signup():

    body = request.get_json()

    if not body or not body.get("email") or not body.get("password") or not body.get("name") or not body.get("lastname") or not body.get("dni"):
        return jsonify({"error": "You must provide email, password, name, lastname and dni"}), 400

    if User.query.filter_by(email=body["email"]).first():
        return jsonify({"error": "The user already exists"}), 400

    if User.query.filter_by(dni=body["dni"]).first():
        return jsonify({"error": "The user already exists"}), 400

    try:
        new_user = User(
            email=body.get("email"),
            password=body.get("password"),
            name=body.get("name"),
            lastname=body.get("lastname"),
            dni=body.get("dni"),
            rolId=body.get("rolId")
        )
        db.session.add(new_user)
        db.session.commit()

        # ✅ Crear el token justo después del commit
        access_token = create_access_token(identity=str(new_user.id))

        return jsonify({
            "msg": "User created!!",
            "access_token": access_token,
            "user": new_user.serialize()
        }), 201

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

    print("Conseguido!!")
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
def get_all_users():
    users = User.query.all()
    all_users = [user.serialize() for user in users]
    return jsonify(all_users), 200

# Rutas creadas por Javier.


@user.route('/users/fullinfo', methods=['GET'])
def get_full_info():
    inspector = inspect(db.engine)
    tables = inspector.get_table_names()
    data = {}
    for table in tables:
        results = db.session.execute(f"SELECT * FROM {table}")
        rows = [dict(row) for row in results]
        data[table] = rows
    return jsonify(data), 200


@user.route('/users', methods=['PUT'])
@jwt_required()
def update_user():
    data = request.get_json()
    if not data or not data.get("id"):
        return jsonify({"error": "Debes proporcionar el id del usuario a actualizar"}), 400

    user_id = data.get("id")
    user_obj = User.query.get(user_id)
    if not user_obj:
        return jsonify({"error": "Usuario no encontrado"}), 404

    # Verificar si el usuario tiene permisos para actualizar
    campos_permitidos = ["email", "name",
                         "lastname", "dni", "rolId", "password"]
    for campo in campos_permitidos:
        if campo in data:
            setattr(user_obj, campo, data[campo])

    try:
        db.session.commit()
        return jsonify(user_obj.serialize()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@user.route('/users', methods=['DELETE'])
@jwt_required()
def delete_user():

    user_id = request.args.get("id", None)
    if not user_id:
        return jsonify({"error": "Debes proporcionar el id del usuario a eliminar"}), 400

    user_obj = User.query.get(user_id)
    if not user_obj:
        return jsonify({"error": "Usuario no encontrado"}), 404

    try:
        db.session.delete(user_obj)
        db.session.commit()
        return jsonify({"msg": "Usuario eliminado correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


