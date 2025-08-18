import jwt
from flask import Blueprint, request, jsonify, current_app, url_for
from api.models import db, User
from app import bcrypt, mail
from flask_mail import Message
from datetime import datetime, timedelta

resetemail_bp = Blueprint('resetemail', __name__,)

@resetemail_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    email = request.json.get('email', None)
    user = User.query.filter_by(email=email).first()

    if user:
        reset_token = user.get_reset_token()
        msg = Message('Restablecer tu contraseña', sender=current_app.config['MAIL_USERNAME'], recipients=[user.email])
        reset_url = url_for('resetemail.reset_password', token=reset_token, _external=True)
        msg.body = f"Para restablecer tu contraseña, haz clic en el siguiente enlace: {reset_url}"
        try:
            mail.send(msg)
            return jsonify({"msg": "Correo de restablecimiento enviado"}), 200
        except Exception as e:
            print(f"Error al enviar correo: {e}")
            return jsonify({"msg": "Error al enviar correo de restablecimiento"}), 500
    
    return jsonify({"msg": "Si el usuario existe, se ha enviado un correo"}), 200

@resetemail_bp.route('/reset-password/<token>', methods=['POST'])
def reset_password(token):
    password = request.json.get('password', None)
    user = User.verify_reset_token(token)

    if not user:
        return jsonify({"msg": "Token inválido o expirado"}), 400

    if not password:
        return jsonify({"msg": "Falta la contraseña"}), 400

    try:
        user.set_password(password)
        db.session.commit()
        return jsonify({"msg": "Contraseña restablecida con éxito"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al restablecer contraseña", "error": str(e)}), 500