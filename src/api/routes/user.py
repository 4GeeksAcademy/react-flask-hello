from flask import Flask, request, jsonify, url_for, Blueprint
from api.models.User import User
from api.database.db import db
import bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


api = Blueprint("api", __name__)


@api.route('/register', methods=["POST"])
def register_user():
    body = request.get_json()

    new_password = bcrypt.hashpw(
        body['password'].encode(), bcrypt.gensalt())  # encriptar password
    print(new_password)

    if "username" and "email" and "password" not in body:
        return jsonify("Error, debes introducir los campos obligatorios"), 404

    new_user = User()
    new_user.username = body["username"]
    new_user.email = body["email"]
    new_user.password = new_password.decode()
    new_user.is_active = True

    db.session.add(new_user)
    db.session.commit()

    return jsonify("Usuario creado")


@api.route("/user/login", methods=["POST"])
def user_login():
    body = request.get_json()
    print(body)
    user = User.query.filter_by(email=body["email"]).first()

    if user is None:
        return jsonify("La cuenta no existe"), 404

    if bcrypt.checkpw(body["password"].encode(), user.password.encode()):
        user_serialize = user.serialize()
        token = create_access_token(identity=str(user_serialize["id"]))

        return jsonify({"token": token}), 200

    return jsonify("contraseña no valida"), 400

@api.route("/user", methods = ["GET"])
@jwt_required()
def get_user():
    current_user = get_jwt_identity()

    user = User.query.get(current_user)
    if user is None:
        return jsonify("El usuario no valido"),404
    
    return jsonify({"User": user.serialize()})





