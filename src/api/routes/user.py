from flask import Flask, request, jsonify, url_for, Blueprint, current_app  # type: ignore
from api.models.User import User
from api.database.db import db
import bcrypt  # type: ignore
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity  # type: ignore
from datetime import datetime, timedelta
import os
import secrets
from extension import mail
from flask_mail import Message
from itsdangerous import URLSafeTimedSerializer
from urllib.parse import quote
import re

url_front = os.getenv('VITE_FRONT_URL')


api = Blueprint("api/user", __name__)


# ENVIAR EMAIL RESET PASSWORD
@api.route("/resetPassword", methods=["POST"])
def forget_password():
    body = request.get_json()
    user = User.query.filter_by(email=body["email"]).first()

    if user is None:
        return jsonify("La cuenta no existe"), 404

    serializer = URLSafeTimedSerializer(os.getenv('TOKEN_KEY'))
    token = serializer.dumps(body["email"], salt="password-reset")
    print(type(token))
    nuevo_caracter = "_"

    cadena_modificada = re.sub(r"\.", nuevo_caracter, token)
    reset_url_password = f"{url_front}resetPassword/{cadena_modificada}"

    msg = Message(
        'Prueba de email',
        html=f"<p>para restablecer la contraseña, da click <a href={reset_url_password}>aqui</a> </p>",
        recipients=[body["email"]]
    )
    mail.send(msg)
    return "email enviado", 200


@api.route("/newPassword", methods=["POST"])
def new_password():
    body = request.get_json()

    token = re.sub(r'_', r'.', body["token"])
    serializer = URLSafeTimedSerializer(os.getenv('TOKEN_KEY'))
    email = serializer.loads(
        token, salt="password-reset", max_age=60 #caduca el token el tiempo si no no deja cambairla
    )

    user = User.query.filter_by(email=email).first()
    new_password = bcrypt.hashpw(
    body['password'].encode(), bcrypt.gensalt())
    user.password = new_password.decode()
    db.session.commit()
    

    return "password actualizado", 200


# REGISTRO DE UN NUEVO USER


@api.route('/register', methods=["POST"])
def register_user():
    body = request.get_json()

    new_password = bcrypt.hashpw(
        body['password'].encode(), bcrypt.gensalt())  # encriptar password
    print(new_password)

    admin_list = [e.strip() for e in os.getenv(
        "ADMIN_EMAILS", "").split(",") if e.strip()]
    
    is_admin = body["email"] in admin_list

    if "username" and "email" and "password" not in body:
        return jsonify("Error, debes introducir los campos obligatorios"), 404

    new_user = User()

    new_user.username = body["username"]
    new_user.email = body["email"]
    new_user.password = new_password.decode()
    new_user.is_active = True
    new_user.is_admin = is_admin
    db.session.add(new_user)
    db.session.commit()

    return jsonify("Usuario creado"), 200

# REALIZAR UN LOGIN DE UN USUARIO


@api.route("/login", methods=["POST"])
def user_login():
    body = request.get_json()
    print(body)
    user = User.query.filter_by(email=body["email"]).first()

    if user is None:
        return jsonify("La cuenta no existe"), 404

    if bcrypt.checkpw(body["password"].encode(), user.password.encode()):
        user_serialize = user.serialize()
        token = create_access_token(identity=str(user_serialize["id"]))

        return jsonify({"token": token, "user": user_serialize}), 200

    return jsonify("contraseña no valida"), 400


@api.route("/", methods=["GET"])
@jwt_required()
def get_user():
    current_user = get_jwt_identity()

    user = User.query.get(current_user)
    if user is None:
        return jsonify("El usuario no valido"), 404

    return jsonify({"User": user.serialize()})


