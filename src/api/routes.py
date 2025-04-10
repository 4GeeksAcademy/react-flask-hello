from flask import request, jsonify, url_for, Blueprint, session
from api.models import db, User, Logo
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.upload_routes import upload
import os
import random
import string
import time
from werkzeug.utils import secure_filename  # Línea 9

api = Blueprint('api', __name__)

# Registro del blueprint upload
# (Asegúrate de que 'upload' se importa correctamente desde api.upload_routes y no lo redefinas aquí)
# Elimina la siguiente línea, ya que se está redefiniendo el blueprint:
# upload = Blueprint('upload', __name__)

@api.route('/home')
def sitemap():
    return generate_sitemap(api)

@api.route('/', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

# Endpoint para generar usuario anónimo
@api.route('/anonymous/create', methods=['POST'])
def create_user_anonymous():
    existing_token = request.cookies.get('anonymousToken')

    if existing_token:
        return jsonify({
            'message': "El usuario anónimo ya existe",
            'isNew': False,
            'token': existing_token
        }), 200

    # Crear usuario anónimo con un email temporal y una contraseña aleatoria
    # Línea 24-27: Optimización de generación de email y contraseña aleatoria
    timestamp = int(time.time())
    random_suffix = ''.join(random.choices(string.ascii_lowercase + string.digits, k=8))
    temp_email = f"anonymous_{timestamp}_{random_suffix}@temp.com"
    temp_password = ''.join(random.choices(string.ascii_letters + string.digits, k=12))

    # Crear el usuario anónimo
    anonymous_user = User(
        email=temp_email,
        password=temp_password,  # Se encriptará automáticamente gracias al setter
        shopname="Anonymous Shop",
        is_active=True
    )

    try:
        db.session.add(anonymous_user)
        db.session.commit()

        # Crear un logo por defecto para el usuario anónimo
        logo = Logo(user_id=anonymous_user.id)
        db.session.add(logo)
        db.session.commit()

        # Generar token para el usuario anónimo
        token_data = {
            "id": anonymous_user.id,
            "email": anonymous_user.email,
            "is_anonymous": True
        }
        anonymous_token = create_access_token(identity=token_data)

        # Preparar respuesta (en una aplicación real, establecerías el token como cookie)
        response = jsonify({
            'message': "Usuario anónimo creado exitosamente",
            'isNew': True,
            'token': anonymous_token,
            'user': anonymous_user.serialize()
        })

        # Establecer la cookie con el token anónimo
        response.set_cookie('anonymousToken', anonymous_token, max_age=86400*30, secure=True, httponly=True, samesite='Strict')  # Línea 48

        return response, 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f"Error al crear usuario anónimo: {str(e)}"}), 500

# Ruta para registrarse un usuario y loguearse automáticamente (signup)
@api.route('/signup', methods=['POST'])
def create_user():
    body = request.get_json()
    firstname = body.get('firstname')
    lastname = body.get('lastname')
    shopname = body.get('shopname')
    email = body.get('email')
    password = body.get('password')

    # Verifica si no existen los campos
    if not firstname or not lastname or not email or not password or not shopname:
        return jsonify({"msg": "Todos los campos son obligatorios"}), 400

    # Verifica si el usuario existe
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"msg": "El usuario ya existe"}), 403

    try:
        # Encriptamos la contraseña antes de guardarla
        hashed_password = User.hash_password(password)

        # Creamos el nuevo usuario
        new_user = User(
            firstname=firstname,
            lastname=lastname,
            shopname=shopname,
            email=email,
            password=hashed_password,  # Contraseña encriptada
            is_active=True  # Asumiendo que el usuario está activo por defecto
        )

        db.session.add(new_user)
        db.session.flush()
        db.session.commit()

        # Creamos el token de acceso
        access_token = create_access_token(identity=new_user.id)

        return jsonify({
            "message": "Usuario creado exitosamente",
            "access_token": access_token,
            "user": new_user.serialize()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Ocurrió un error al crear el usuario: {str(e)}"}), 500

# Ruta para logearse y creación de token
@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    email = body.get("email")
    password = body.get("password")

    if not body or not email or not password:
        return jsonify({"error": "Email y password son requeridos"}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error": "usuario incorrecto"}), 401

    if not user.check_password(password):
        return jsonify({"error": "password incorrecto"}), 401

    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        "access_token": access_token,
        "user": user.serialize()
    }), 200

# Ruta del acceso settings del usuario
@api.route('/settings', methods=['GET'])
@jwt_required()  # Precisa de token para acceder
def get_user_info():
    # Devuelve el ID porque se lo he pasado al crear access_token
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    return jsonify({
        "name": user.serialize()["username"]
    }), 200

# Borrar un usuario existente
@api.route('/settings/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    # Buscamos al usuario por ID
    user = User.query.get(user_id)

    # Verificar si el usuario existe
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    # Si sale error al eliminar usuario, hacemos try/except
    try:
        # Eliminamos el usuario de la base de datos
        db.session.delete(user)
        db.session.commit()

        # Devolver mensaje de éxito
        return jsonify({"message": f"Usuario {user_id} eliminado correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f"Error al eliminar el usuario: {str(e)}"}), 500

# Llamar al logo desde la API
@api.route("/get_logos", methods=['GET'])
def get_all_logos():
    logos = Logo.query.all()

    logos_serialized = [logo.serialize() for logo in logos]

    return jsonify({"logos": logos_serialized})

# Subir el logo desde la API
@api.route('/post_logos', methods=['POST'])
def post_logos():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    logo_data = data.get('logo')

    if not logo_data:
        return jsonify({'error': 'No logo provided'}), 400

    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    # Buscar si ya existe un logo para este usuario
    logo = Logo.query.filter_by(user_id=current_user_id).first()

    if logo:
        logo.image_logo_url = logo_data  # Actualizamos
    else:
        new_logo = Logo(image_logo_url=logo_data, user_id=current_user_id)
        db.session.add(new_logo)

    try:
        db.session.commit()
        return jsonify({"message": "Logo updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error updating logo: {str(e)}"}), 500
