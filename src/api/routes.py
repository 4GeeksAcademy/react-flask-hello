from flask import request, jsonify, Blueprint
import secrets
from datetime import datetime, timedelta, timezone
import jwt
from werkzeug.security import check_password_hash
from api.models import db, User
from werkzeug.security import generate_password_hash



def token_requerido(f):
    def wrapper(*args, **kwargs):
        auth = request.headers.get('Authorization')
        if not auth or not auth.startswith('Bearer '):
            return jsonify({"msg": "Token requerido"}), 401
        token = auth.split(' ')[1]
        try:
            jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        except Exception:
            return jsonify({"msg": "Token inválido"}), 401
        return f(*args, **kwargs)
    wrapper.__name__ = f.__name__
    return wrapper


SECRET_KEY = "super-secret-key"

api = Blueprint('api', __name__)
reset_tokens = {}

@api.route('/user', methods=['GET'])
@token_requerido
def get_user():
    auth = request.headers.get('Authorization')
    token = auth.split(' ')[1]
    payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    user_id = payload['user_id']
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    return jsonify(user.serialize()), 200


@api.route('/user', methods=['PUT'])
@token_requerido
def update_user():
    data = request.get_json()
    auth = request.headers.get('Authorization')
    token = auth.split(' ')[1]
    payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    user_id = payload['user_id']
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    new_email = data.get('email')
    new_password = data.get('password')

    if new_email:
        if User.query.filter(User.email == new_email, User.id != user_id).first():
            return jsonify({"msg": "El email ya está en uso"}), 400
        user.email = new_email
    if new_password:
        from werkzeug.security import generate_password_hash
        user.password = generate_password_hash(new_password)

    db.session.commit()
    return jsonify({"msg": "Usuario actualizado correctamente"}), 200


@api.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get('email')
    if not email:
        return jsonify({"msg": "Falta correo o contraseña"}), 400
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "Usuario no encontrado o no registrado"}), 404
    token = secrets.token_urlsafe(16)
    reset_tokens[email] = token
    return jsonify({"msg": "Token de recuperacion", "token": token}), 200


@api.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    email = data.get('email')
    token = data.get('token')
    new_password = data.get('new_password')
    if not email or not token or not new_password:
        return jsonify({"msg": "Faltan datos"}), 400
    if reset_tokens.get(email) != token:
        return jsonify({"msg": "Token inválido"}), 401
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    user.password = generate_password_hash(new_password)
    db.session.commit()
    reset_tokens.pop(email)
    return jsonify({"msg": "Cambio de contraseña"}), 200


@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({"msg": "Falta correo o contraseña"}), 400
    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"msg": "Usuario o contraseña incorrectos"}), 401
    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.now(timezone.utc) + timedelta(minutes=15)
    }, SECRET_KEY, algorithm="HS256")
    return jsonify({"token": token})


@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({"msg": "Falta correo o contraseña"}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "El usuario ya existe"}), 400
    hashed_password = generate_password_hash(password)
    new_user = User(email=email, password=hashed_password, is_active=True)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "Usuario registrado exitosamente"}), 201


@api.route('/hello', methods=['POST', 'GET'])
@token_requerido
def handle_hello():
    response_body = {
        "message": "¡Hola! Acceso autorizado al backend."
    }
    return jsonify(response_body), 200
