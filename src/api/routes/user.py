from flask import Flask, request, jsonify, url_for, Blueprint  # type: ignore
from api.models.User import User
from api.database.db import db
import bcrypt  # type: ignore
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity  # type: ignore
from datetime import datetime, timedelta

import secrets;
from extension import mail
from flask_mail import Message


api = Blueprint("api/user", __name__)




# ENVIAR EMAIL RESET PASSWORD
@api.route("/resetPassword", methods=["POST"])
def forget_password(user):
    body = request.get_json()
    user = User.query.filter_by(email=body["email"]).first()

    if user is None:
        return jsonify("La cuenta no existe"), 404
    
    
   
    token = secrets.token_urlsafe(75)
    user.reset_token = token
    user.reset_token_expires = datetime.utcnow() + timedelta(minutes=30) 
    reset_url_password = f"https://jubilant-spork-7v5jg5r9r9p73xpqq-3001.app.github.dev/api/user/reset-password?token={token}"
    db.session.commit()


    msg = Message(
            'Prueba de email',
            html=f"<p>para restablecer la contraseña, da click <a href={reset_url_password}>aqui</a> </p>",
            recipients=["adrianbeneroso@hotmail.com"]
        )
    mail.send(msg)
    return "email enviado", 200
        
    


# REGISTRO DE UN NUEVO USER


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
    new_user.is_admin = False
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


# ELIMINAR USUARIO

# @api.router("/user/<int:user_id>",methods =["DELETE"])
# def delete_user(user_id):
#     user = db.session.get(User,user_id)
#     if user is None:
#         return jsonify("Error, no se ha podido eliminar por que el usuario no existe",404)
#     db.session.delete(user)
#     db.session.commit()

#     return jsonify("El usuario ha sido eliminado correctamente"),200
