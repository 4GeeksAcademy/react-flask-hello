from flask import Flask, request, jsonify, url_for, Blueprint
from api.models.User import User
from api.database.db import db
import bcrypt



api = Blueprint("api",__name__)


@api.route('/register', methods = ["POST"])
def register():
    body = request.get_json()

    new_password =bcrypt.hashpw(body['password'].encode(),bcrypt.gensalt()) #encriptar password
    print(new_password)

    if "username" and "email" and "password" not in body:
        return jsonify("Error, debes introducir los campos obligatorios"),400

    new_user = User()
    new_user.username = body["username"]
    new_user.email = body["email"]
    new_user.password = new_password.decode()
    new_user.is_active = True



    db.session.add(new_user)
    db.session.commit()

    return jsonify("Usuario creado")