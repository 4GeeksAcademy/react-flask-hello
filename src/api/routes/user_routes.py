from flask import Flask, request, jsonify, url_for, Blueprint
from api.models.models import db, User, PasswordResetToken
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from sqlalchemy import inspect
from flask_mail import Message
from api import mail
from datetime import datetime
from werkzeug.security import generate_password_hash
import os

user = Blueprint('user_api', __name__)


@user.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()

    if not body or not body.get("email") or not body.get("password") or not body.get("name") or not body.get("lastname") or not body.get("dni"):
        return jsonify({"error": "You must provide email, password, name, lastname and dni"}), 400

    if User.query.filter_by(email=body["email"]).first() or User.query.filter_by(dni=body["dni"]).first():
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

    return jsonify({
        "access_token": access_token,
        "user": user.serialize()
    }), 200


@user.route('/user/<int:id>', methods=['GET'])
@jwt_required()
def get_user_by_id(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user.serialize()), 200


@user.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    all_users = [user.serialize() for user in users]
    return jsonify(all_users), 200


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
    user_id = request.args.get('id')

    if not user_id:
        return jsonify({'error': 'ID de usuario requerido'}), 400

    user = User.query.get(user_id)

    if not user:
        return jsonify({'error': 'Usuario no encontrado'}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({'message': 'Usuario eliminado con éxito'}), 200


# 💥 RUTA DE ENVÍO DE CORREO DE PRUEBA
@user.route('/send-test-email', methods=['POST'])
def send_test_email():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({"error": "Email es requerido"}), 400

    try:
        msg = Message(
            subject="📩 Correo de prueba de DroneFarm",
            recipients=[email],
            body="¡Hola! Este es un correo de prueba enviado desde la API de DroneFarm. 🚀"
        )
        mail.send(msg)
        return jsonify({"message": f"Correo enviado correctamente a {email}"}), 200
    except Exception as e:
        print("❌ Error al enviar el correo:", e)
        return jsonify({"error": "Error al enviar el correo"}), 500




@user.route('/send-reset-link', methods=['POST'])
def send_reset_link():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({"error": "Email requerido"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    token_entry = PasswordResetToken(user_id=user.id)
    db.session.add(token_entry)
    db.session.commit()

    frontend_url = os.getenv("FRONTEND_URL", "https://dronfarm.es")
    reset_url = f"{frontend_url}/reset-password/{token_entry.token}"

    try:
        msg = Message(
            subject="🔐 Recuperación de contraseña - DronFarm",
            recipients=[email],
            body=f"Hola {user.name},\n\nHaz clic en este enlace para recuperar tu contraseña:\n\n{reset_url}\n\nEste enlace es válido durante 1 hora.\n\nSi no has solicitado esto, ignora este correo.\n\n— DronFarm"
        )
        mail.send(msg)
        return jsonify({"message": "Correo enviado con enlace de recuperación"}), 200
    except Exception as e:
        print("❌ Error al enviar el correo:", e)
        return jsonify({"error": "No se pudo enviar el correo"}), 500


user.route('/reset-password/<token>', methods=['POST'])


def reset_password(token):
    data = request.get_json()
    new_password = data.get("password")

    if not new_password:
        return jsonify({"error": "La nueva contraseña es requerida"}), 400

    # Buscar el token
    reset_token = PasswordResetToken.query.filter_by(token=token).first()

    if not reset_token:
        return jsonify({"error": "Token inválido"}), 400

    if reset_token.used:
        return jsonify({"error": "Este enlace ya fue usado"}), 400

    if reset_token.expiration < datetime.utcnow():
        return jsonify({"error": "El enlace ha caducado"}), 400

    # Buscar usuario y actualizar contraseña
    user = User.query.get(reset_token.user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    user.password = generate_password_hash(new_password)
    reset_token.used = True

    try:
        db.session.commit()
        return jsonify({"message": "Contraseña actualizada con éxito"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al actualizar contraseña"}), 500


@user.route('/validate-reset-token/<token>', methods=['GET'])
def validate_reset_token(token):
    reset_token = PasswordResetToken.query.filter_by(token=token).first()

    if not reset_token:
        return jsonify({"error": "Token inválido"}), 400

    if reset_token.used:
        return jsonify({"error": "Este enlace ya fue usado"}), 400

    if reset_token.expiration < datetime.utcnow():
        return jsonify({"error": "El enlace ha caducado"}), 400

    return jsonify({"message": "Token válido"}), 200


@user.route('/reset-password/<token>', methods=['PATCH'])
def reset_password(token):
    body = request.get_json()
    if not body or not body.get("password"):
        return jsonify({"error": "La nueva contraseña es obligatoria"}), 400

    token_entry = PasswordResetToken.query.filter_by(
        token=token, used=False).first()

    if not token_entry or token_entry.expiration < datetime.utcnow():
        return jsonify({"error": "El token es inválido o ha expirado"}), 400

    user = User.query.get(token_entry.user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    user.set_password(body["password"])
    token_entry.used = True

    try:
        db.session.commit()
        return jsonify({"msg": "Contraseña actualizada correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
