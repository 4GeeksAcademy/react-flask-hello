import bcrypt
import uuid
import jwt
from datetime import datetime, timedelta
from functools import wraps
from flask import request, jsonify

SECRET_KEY = "tu_clave_secreta"

# Generar hash de la contraseña
def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

# Verificar contraseña contra hash guardado
def check_password(password, hashed):
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

# Generar token único para recuperación de contraseña
def generate_token():
    return str(uuid.uuid4())

# Generar JWT token
def generate_auth_token(user_id):
    payload = {
        "user_id": user_id,
        "exp": datetime.utcnow() + timedelta(hours=1)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

# Verificar JWT token
def verify_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

# Decorador para proteger rutas
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({"msg": "Token requerido"}), 401
        token = auth_header.split(" ")[1]
        data = verify_token(token)
        if not data:
            return jsonify({"msg": "Token inválido o expirado"}), 401

        return f(data['user_id'], *args, **kwargs)
    return decorated
