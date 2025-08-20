import jwt
from flask import Blueprint, request, jsonify, current_app, url_for
from api.models import db, User
from extension import mail,bcrypt
from flask_mail import Message
from datetime import datetime, timedelta
import os
from flask_cors import CORS

resetemail_bp = Blueprint('resetemail', __name__,)
CORS(resetemail_bp)

@resetemail_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    
    email = request.json.get('email', None)
    try:
        user = User.query.filter_by(email=email).first()

        if user:
            reset_token = user.get_reset_token()
            msg = Message('Restablecer tu contraseña', sender=os.environ.get('MAIL_USERNAME'), recipients=[user.email])
            reset_url = url_for('resetemail.reset_password', token=reset_token, _external=True)
            msg.body = f"Para restablecer tu contraseña, haz clic en el siguiente enlace: "
            mail.send(msg)
        
        return jsonify({"msg": "Si existe un usuario con ese email, se ha enviado un enlace de recuperación."}), 200

    except Exception as e:
        print(f"Error al enviar correo: {e}")
        return jsonify({"msg": "Error del servidor. Inténtalo de nuevo más tarde."}), 500

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