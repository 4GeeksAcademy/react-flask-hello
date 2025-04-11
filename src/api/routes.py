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
from werkzeug.utils import secure_filename  # Línea 9

api = Blueprint('api', __name__)


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
            
        }), 200

    # Crear usuario anónimo con un email temporal y una contraseña aleatoria
   
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
            password=hashed_password,
            logo = Logo(new_user.id),  
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
    try:
        body = request.get_json()
        if not body:
            return jsonify({"error": "No se proporcionaron datos"}), 400
            
        email = body.get("email")
        password = body.get("password")

        if not email or not password:
            return jsonify({"error": "Email y password son requeridos"}), 400

        user = User.query.filter_by(email=email).first()

        if not user:
            return jsonify({"error": "usuario incorrecto"}), 401

        if not user.check_password(password):
            return jsonify({"error": "password incorrecto"}), 401

        # Crear token con información del usuario (incluyendo URL del logo si existe)
        user_data = user.serialize()
        
        # Obtener logo si existe
        logo = Logo.query.filter_by(user_id=user.id).first()
        logo_url = logo.image_logo_url if logo else None
        
        # Incluir información en el token
        token_data = {
            "id": user.id,
            "email": user.email,
            "logo_url": logo_url
        }
        
        access_token = create_access_token(identity=token_data)

        return jsonify({
            "access_token": access_token,
            "user": user_data,
            "logo_url": logo_url

        }), 200
    except Exception as e:
        return jsonify({"error": f"Error en login: {str(e)}"}), 500
    
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


def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# Ruta para subir y guardar el logo
@api.route('/post_logos', methods=['POST'])
def post_logos():
    current_user_id = get_jwt_identity()  # Obtener el id del usuario desde el token JWT
    
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
    
    # Si ya existe un logo, actualizamos la URL; si no, creamos uno nuevo
    if logo:
        logo.image_logo_url = logo_path  # Actualizamos la URL del logo
    else:
        new_logo = Logo(image_logo_url=logo_path, user_id=current_user_id)
        db.session.add(new_logo)

    try:
        db.session.commit()
        return jsonify({"message": "Logo updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error updating logo: {str(e)}"}), 500


# Ruta para obtener el logo de un usuario
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