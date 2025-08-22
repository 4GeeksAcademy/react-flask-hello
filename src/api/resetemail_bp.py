import jwt
from flask import Blueprint, request, jsonify, current_app, url_for
from api.models import db, User
from extension import mail,bcrypt
from flask_mail import Message
from datetime import datetime, timedelta
import os
from flask_cors import CORS
from itsdangerous import URLSafeTimedSerializer

resetemail_bp = Blueprint('resetemail', __name__,)
CORS(resetemail_bp)

@resetemail_bp.route('/reset-password/<token>', methods=['POST'])
def reset_password(token):
    password = request.json.get('password', None)
    serializer = URLSafeTimedSerializer(os.getenv('TOKEN_KEY'))
    email = serializer.loads(token, salt="passwordreset", max_age=3600)
    user = User.query.filter_by(email=email).first()
    print(user)
    if not user:
        return jsonify({"msg": "No encontrado"})
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    user.password = hashed_password
    try:
        return jsonify({"msg": "Contraseña restablecida con éxito"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al restablecer contraseña", "error": str(e)}), 500