from flask import Blueprint, request, jsonify
from models import db, User
from werkzeug.security import generate_password_hash, check_password_hash

# Creamos un blueprint para agrupar las rutas de autentificacion
auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()# Recibimos los datos JSON del cliente(nombre,email y contraseña)

    # Verificamos si el mail ya existe
    existing_user = User.query.filter_by(email=data['email']).firts()
    if existing_user:
        return jsonify({"error": "Email ya registrado"}), 409
    
    # Ciframos la contraseña
    hashed_password = generate_password_hash(data['password'], method='sha256')
    # sha256(secure hashing algoritme 256bits)
    # Creamos el nuevo usuario
    user = User(name=data['name'], email=data['email'], password=hashed_password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "Usuario creado correctamente"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    # Recibimos email y contraseña

    user = User.query.filter_by(email=data['email']).first()
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({"error":"Credenciales invalidadas"}), 401
    
    return jsonify({"message": f"Bienvenido, {user.name}"}), 200
