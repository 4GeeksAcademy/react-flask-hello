from flask import request, jsonify, url_for, Blueprint, session
from api.models import db, User, Logo
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.upload_routes import upload


api = Blueprint('api', __name__)


# REGISTRO DEL BLUEPRINT UPLOAD:
api.register_blueprint(upload, url_prefix='/upload')

@api.route('/home')
def sitemap():
    return generate_sitemap(api)

@api.route('/', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200


# ENDPOINT PARA GENERAR USUARIO ANÓNIMO
@api.route('/anonymous/create', methods=['POST'])
def create_user_anonymous():
    # VERIFICAR SI EXISTE UN TOKEN
    existing_token = request.cookies.get('anonymousToken')

    if existing_token:
        return jsonify({
            'message': "El usuario anónimo ya existe",
            'isNew': False,
            'token': existing_token
        }), 200

    # Crear usuario anónimo con un email temporal y una contraseña aleatoria
    import random
    import string
    import time

    # Generar un email temporal único basado en timestamp
    timestamp = int(time.time())
    random_suffix = ''.join(random.choices(
        string.ascii_lowercase + string.digits, k=8))
    temp_email = f"anonymous_{timestamp}_{random_suffix}@temp.com"

    # Generar una contraseña aleatoria
    temp_password = ''.join(random.choices(
        string.ascii_letters + string.digits, k=12))

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
        # En producción, ajusta max_age, secure=True, httponly=True, samesite='Strict'
        response.set_cookie('anonymousToken', anonymous_token,
                            max_age=86400*30)  # 30 días

        return response, 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f"Error al crear usuario anónimo: {str(e)}"}), 500


# RUTA PARA REGISTRARSE UN USUARIO Y LOGUEARCE AUTOMÁTICAMENTE (SIGNUP)
@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    shopname = data.get("shopname")

    # Verificamos si el email ya está registrado
    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "Email already registered"}), 400

    # Creamos el nuevo usuario
    new_user = User(
        email=email,
        password=password, 
        shopname=shopname,
        is_active=True
    )

    db.session.add(new_user)
    db.session.commit()

    # Creamos un logo por defecto para ese usuario
    logo = Logo(user_id=new_user.id)
    db.session.add(logo)
    db.session.commit()

    # Obtenemos la URL del logo
    logo = logo.image_logo_url

    # Generamos el token como si el usuario hubiera hecho login
    access_token = create_access_token(identity={
        "id": new_user.id,
        "email": new_user.email,
        "shopname": new_user.shopname,
        "logo": logo
    })

    # Establecer la cookie con el token generado (agregamos la cookie aquí)
    # Comentario 1: Establecer la cookie con el token en la respuesta
    response = jsonify(access_token=access_token)

    # Añadir la cookie con el token en la respuesta
    response.set_cookie('access_token', access_token, max_age=86400*30, httponly=True, secure=True)

    return response, 201

# RUTA PARA LOGEARSE Y CREACIÓN DE TOKEN Y COOKIE
@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    email = body.get("email")
    password = body.get("password")

    if not body or not email or not password:
        return jsonify({"error": "Email y password son requeridos"}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error": "email incorrecto"}), 401

    if not user.check_password(password):
        return jsonify({"error": "password incorrecto"}), 401

    # Crear token de acceso JWT
    access_token = create_access_token(identity=str(user.id))

    # Guardar el ID del usuario en la sesión
    session['user_id'] = user.id

    # Establecer la cookie de sesión con el ID del usuario
    response = jsonify({
        "access_token": access_token,
        "user": user.serialize()
    })

    # Comentario 2: Asegurarse de que la cookie se está configurando correctamente
    # Establecemos la cookie 'user_id' para la sesión del usuario
    response.set_cookie('user_id', str(user.id), max_age=60*60*24*365)  # Cookie de sesión

    # Comentario 3: Usar withCredentials en frontend para enviar cookies en futuras solicitudes
    return response, 200


@api.route('/settings', methods=['GET'])
@jwt_required()  # PRECISA DE TOKEN PARA ACCEDER
def get_user_info():
    # Comentario 4: Verificar que el token JWT esté presente en las cookies o headers de la solicitud
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    return jsonify({
        "name": user.serialize()["username"]
    }), 200

# MUESTRA TODOS LOS USUARIOS
@api.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()

    if not users:
        return jsonify({"msg": "Users not found"}), 404

    response_body = [user.serialize() for user in users]

    return jsonify(response_body), 200


# MUESTRA LOS DATOS DEL USUARIO
@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)

    if user is None:
        return jsonify({"msg": "User not found"}), 404

    response_body = user.serialize()

    return jsonify(response_body), 200


# ACTUALIZAR UN USUARIO EXISTENTE
@api.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    # Buscamos al usuario por su ID
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "Usuario no encontrada"}), 404

    # OBTENEMOS LOS DATOS DE LA REQUEST
    request_data = request.get_json()

    # ACTUALIZAMOS LOS CAMPOS SI ESTAN PRESENTES EN LA SOLICITUD
    if "firstname" in request_data:
        user.firstname = request_data['firstname']

    if "lastname" in request_data:
        user.lastname = request_data['lastname']

    if "shopname" in request_data:
        user.shopname = request_data['shopname']

    if "email" in request_data:
        user.email = request_data['email']

    if "username" in request_data:
        user.username = request_data['username']

    if "password" in request_data:
        user.password = request_data['password']

    # SI SALE ERROR AL ACTUALIZAR ESPECIE, HACEMOS TRY/EXCEPT
    try:
        # GUARDAMOS LOS CAMBIOS EN LA BASE DE DATOS
        db.session.commit()
        # DEVOLVEMOS (RETORNAMOS) LA ESPECIE ACTUALIZADA
        return jsonify(user.serialize()), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f"Error al actualizar el usuario: {str(e)}"}), 500


# BORRA UN USUARIO
@api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    # BUSCAMOS AL USUARIO POR ID
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    # SI SALE ERROR AL ELIMINAR USUARIO, HACEMOS TRY/EXCEPT
    try:
        # ELIMINAMOS EL USUARIO DE LA BASE DE DATOS
        db.session.delete(user)
        db.session.commit()

        # DEVOLVER MENSAJE DE EXITO
        return jsonify({"message": f"Usuario {user_id} eliminado correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f"Error al eliminar el usuario: {str(e)}"}), 500


# LLAMAR AL LOGO DESDE LA API
@api.route("/get_logos", methods=['GET'])
def get_all_logos():
    logos = Logo.query.all()

    logos_serialized = [logo.serialize() for logo in logos]

    return jsonify({"logos": logos_serialized})


# SUBIR EL LOGO DESDE LA API
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
