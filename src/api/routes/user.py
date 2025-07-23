from flask import Flask, request, jsonify, url_for, Blueprint
from models.User import User
from database.db import db



api = Blueprint("/api/user",__name__)


@api.route('/register', methods = ["POST"])
def register():
    body = request.get_json()

    new_password =bcrypt.hashpw(body['password'].encode(),bcrypt.gensalt()) #encriptar password
    print(new_password)

    if "username" and "email" and "password" not in body:
        return jsonify("Error, debes introducir los campos obligatorios")

    new_user = User()
    new_user.username = body["username"]
    new_user.email = body["email"]
    new_user.password = new_password.decode()
    new_user.is_active = True



    db.session.add(new_user)
    db.session.commit()

    return jsonify("Usuario creado")