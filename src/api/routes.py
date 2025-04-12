from flask import request, jsonify, url_for, Blueprint, session
from api.models import db, User, Logo
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask import send_from_directory
from api.upload_routes import upload
import os
import random
import string
import time
from werkzeug.utils import secure_filename  

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

    timestamp = int(time.time())
    random_suffix = ''.join(random.choices(
        string.ascii_lowercase + string.digits, k=8))
    temp_email = f"anonymous_{timestamp}_{random_suffix}@temp.com"
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
            "is_anonymous": True,
            "logo_url": logo.image_logo_url
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
        response.set_cookie('anonymousToken', anonymous_token,
                            max_age=86400*30)  # 30 días
        
        return response, 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f"Error al crear usuario anónimo: {str(e)}"}), 500


# RUTA PARA REGISTRARSE UN USUARIO Y LOGUEARCE AUTOMÁTICAMENTE (SIGNUP)
@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()
    firstname = body.get('firstname')
    lastname = body.get('lastname')
    shopname = body.get('shopname')
    email = body.get('email')
    password = body.get('password')

    if not firstname or not lastname or not email or not password or not shopname:
        return jsonify({"msg": "Todos los campos son obligatorios"}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"msg": "El usuario ya existe"}), 403
    
    try:
        # Creamos el nuevo usuario
        new_user = User(
            firstname=firstname,
            lastname=lastname,
            shopname=shopname,
            email=email,
            password=password,
            is_active=True
        )
       
        db.session.add(new_user)
        db.session.commit()

        # Creamos un logo por defecto para ese usuario
        logo = Logo(user_id=new_user.id)
        db.session.add(logo)
        db.session.commit()

        # Creamos el access token con el logo incluido
        access_token = create_access_token(identity={
            "id": new_user.id,
            "email": new_user.email,
            "shopname": new_user.shopname,
            "logo_url": logo.image_logo_url
        })

        response = jsonify({
            "access_token": access_token,
            "user": new_user.serialize()
        })

        # Añadir la cookie con el token en la respuesta
        response.set_cookie('access_token', access_token,
                            max_age=86400*30, httponly=True, secure=True)

        return response, 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": f"Error al registrar el usuario: {str(e)}"}), 500


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

    user_data = user.serialize()

    # Obtener logo si existe
    logo = Logo.query.filter_by(user_id=user.id).first()
    logo_url = logo.image_logo_url if logo else None

    # Incluir información en el token
    token_data = {
        "id": user.id,
        "email": user.email,
      
    }
    access_token = create_access_token(identity=token_data)

    # Guardar el ID del usuario en la sesión
    session['user_id'] = user.id

    return jsonify({
            "access_token": access_token,
            "user": user_data,
            

        }), 200


# MUESTRA LOS DATOS DEL USUARIO ACTUAL (ADMINISTRADOR/USUARIO)
@api.route('/user', methods=['GET'])
@jwt_required() 
def get_current_user():
    current_user = get_jwt_identity()
    user_id = current_user.get("id")
    
    user = User.query.get(user_id)
    
    if user is None:
        return jsonify({"msg": "User not found"}), 404

    response_body = user.serialize()

    return jsonify(response_body), 200


# MUESTRA TODOS LOS USUARIOS (ADMINISTRADOR)
@api.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()

    if not users:
        return jsonify({"msg": "Users not found"}), 404

    response_body = [user.serialize() for user in users]

    return jsonify(response_body), 200


# MUESTRA LOS DATOS DE UN USUARIO ESPECÍFICO
@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)

    if user is None:
        return jsonify({"msg": "User not found"}), 404

    response_body = user.serialize()

    return jsonify(response_body), 200


# ACTUALIZAR UN USUARIO EXISTENTE (ADMINISTRADOR/USUARIO)
@api.route('/users/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    current_user = get_jwt_identity()
    current_user_id = current_user.get("id")
    is_admin = current_user.get("is_admin", False)
    
    if user_id != current_user_id and not is_admin:
        return jsonify({"msg": "Access denied"}), 403
    
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

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

    try:
        db.session.commit()
        
        # Obtener logo actualizado
        logo = Logo.query.filter_by(user_id=user.id).first()
        logo_url = logo.image_logo_url if logo else None
        
        # Actualizamos el token con la información actualizada del usuario
        new_token_data = {
            "id": user.id,
            "email": user.email,
            "shopname": user.shopname,
            "logo_url": logo_url,
            "is_admin": is_admin
        }
        new_access_token = create_access_token(identity=new_token_data)
        
        response = jsonify({
            "user": user.serialize(),
            "access_token": new_access_token
        })
        
        # Actualizamos la cookie con el nuevo token
        response.set_cookie('access_token', new_access_token,
                            max_age=86400*30, httponly=True, secure=True)
        
        return response, 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f"Error al actualizar el usuario: {str(e)}"}), 500


# BORRA UN USUARIO (ADMINISTRADOR/USUARIO)

@api.route('/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    current_user = get_jwt_identity()
    current_user_id = current_user.get("id")
    is_admin = current_user.get("is_admin", False)
    
    if user_id != current_user_id and not is_admin:
        return jsonify({"msg": "Access denied"}), 403
        
    # BUSCAMOS AL USUARIO POR ID
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    try:
        # ELIMINAMOS EL USUARIO DE LA BASE DE DATOS
        db.session.delete(user)
        db.session.commit()

        # DEVOLVER MENSAJE DE EXITO
        return jsonify({"message": f"Usuario {user_id} eliminado correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f"Error al eliminar el usuario: {str(e)}"}), 500


def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# LLAMAR AL LOGO DESDE LA API
@api.route('/get_logo', methods=['GET'])
def get_logo():
    current_user_id = get_jwt_identity()  # Obtener el id del usuario desde el token JWT
    
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Buscar si existe un logo para el usuario
    logo = Logo.query.filter_by(user_id=current_user_id).first()

    if not logo:
        return jsonify({"message": "Logo not found"}), 404
    
    # Obtener la ruta del logo y devolver la imagen
    logo_path = logo.image_logo_url
    
    # Servir la imagen desde el directorio donde se encuentra
    try:
        return send_from_directory(os.path.dirname(logo_path), os.path.basename(logo_path))
    except Exception as e:
        return jsonify({"message": f"Error serving logo: {str(e)}"}), 500
    

# Ruta para subir y guardar el logo

@api.route('/post_logos', methods=['POST'])
def post_logos():
    current_user_id = get_jwt_identity()
    
    # Verificar si el archivo ha sido subido
    if 'logo' not in request.files:
        return jsonify({'error': 'No logo provided'}), 400

    logo_file = request.files['logo']

    # Verificar si se seleccionó un archivo
    if logo_file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    # Verificar si el archivo tiene una extensión permitida
    if not allowed_file(logo_file.filename):
        return jsonify({'error': 'File type not allowed. Only PNG, JPG, JPEG, GIF are allowed.'}), 400

    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    # Buscar si ya existe un logo para este usuario
    logo = Logo.query.filter_by(user_id=current_user_id).first()

    # Definir la ruta donde se guardará el logo
    logo_filename = secure_filename(logo_file.filename)
    logo_path = os.path.join('static', 'logos', logo_filename)

    # Asegurarse de que el directorio existe
    if not os.path.exists(os.path.dirname(logo_path)):
        os.makedirs(os.path.dirname(logo_path))

    # Guardar el archivo en el servidor
    try:
        logo_file.save(logo_path)
    except Exception as e:
        return jsonify({"message": f"Error saving the logo: {str(e)}"}), 500
    

    new_logo = Logo(image_logo_url=logo_path, user_id=current_user_id)
    db.session.add(new_logo)

    try:
        db.session.commit()
        return jsonify({"message": "Logo updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error updating logo: {str(e)}"}), 500
