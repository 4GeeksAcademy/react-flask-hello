from flask import request, jsonify, url_for, Blueprint, session
from api.models import db, User, Logo
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask import send_from_directory
import os
import random
import string
import time
from werkzeug.utils import secure_filename  
from flask import make_response
from datetime import datetime
import secrets

api = Blueprint('api', __name__)



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
        expires_delta = datetime.timedelta(days=30)
        access_token = create_access_token(identity=str(new_user.id),
        expires_delta=expires_delta)                              
                                          
       

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
    access_token = create_access_token(identity=str(user.id))

    # Guardar el ID del usuario en la sesión
    session['user_id'] = user.id

    return jsonify({
            "access_token": access_token,
            "user": user_data,
            

        }), 200


# RUTA PARA CERRAR SESIÓN
@api.route('/logout', methods=['POST'])
def logout():
    # Limpiar la sesión del usuario
    if 'user_id' in session:
        session.pop('user_id', None)
    
    # En caso de usar flask-jwt-extended con lista negra de tokens
    # aquí agregaríamos el token actual a la lista negra
    
    return jsonify({"message": "Sesión cerrada exitosamente"}), 200


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
        access_token = create_access_token(identity=str(user.id))
        
        response = jsonify({
            "user": user.serialize(),
            "access_token": access_token
        })
        
        # Actualizamos la cookie con el nuevo token
        response.set_cookie('access_token', access_token,
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

def generate_logo_token(user_id):
    # Generar un token seguro único para acceder al logo
    token = secrets.token_urlsafe(16)
    # En una implementación real, guardarías este token en la base de datos
    # asociado al user_id para verificarlo después
    return token

# Actualice las rutas de logo con estos cambios:

@api.route('api/get_logo', methods=['GET'])
@jwt_required()
def get_logo():
    # Obtener ID del usuario desde el token JWT
    user_id = get_jwt_identity()
    
    try:
        # Buscar logo en la base de datos
        logo = Logo.query.filter_by(user_id=user_id).first()
        
        if not logo or not logo.image_data:
            return jsonify({"error": "No se encontró logo para este usuario"}), 404
        
        # Devolver la imagen con headers adicionales
        response = make_response(logo.image_data)
        response.headers.set('Content-Type', 'image/png')  # Ajustar según el tipo
        
        # Si tienes una URL en la nube, incluirla en el header
        if hasattr(logo, 'image_logo_url') and logo.image_logo_url:
            response.headers.set('logo-cloud-url', logo.image_logo_url)
        
        return response
    except Exception as e:
        return jsonify({"error": f"Error al obtener el logo: {str(e)}"}), 500




@api.route('/post_logo', methods=['POST'])
@jwt_required()
def post_logo():
    # Obtener ID del usuario desde el token JWT
    user_id = get_jwt_identity()
    
    try:
        # Verificar si se envió un archivo
        if 'logo' not in request.files:
            return jsonify({"error": "No se encontró archivo de logo"}), 400
        
        file = request.files['logo']
        
        if file.filename == '':
            return jsonify({"error": "No se seleccionó ningún archivo"}), 400
        
        # Verificar si es un tipo de archivo permitido
        if not allowed_file(file.filename):
            return jsonify({"error": "Tipo de archivo no permitido"}), 400
        
        # Leer los datos del archivo
        image_data = file.read()
        
        # Guardar en base de datos
        logo = Logo.query.filter_by(user_id=user_id).first()
        
        # Generar URL para el logo
        host_url = request.host_url.rstrip('/')
        logo_token = generate_logo_token(user_id)
        logo_url = f"{host_url}/api/get_logo"  # No incluimos el token en la URL, se usa JWT
        
        if logo:
            # Actualizar logo existente
            logo.image_data = image_data
            if hasattr(logo, 'image_logo_url'):
                logo.image_logo_url = logo_url
            if hasattr(logo, 'updated_at'):
                logo.updated_at = datetime.now()
        else:
            # Crear nuevo registro - ajusta los campos según tu modelo Logo
            logo = Logo(
                user_id=user_id,
                image_data=image_data
            )
            # Agregar estos campos si existen en tu modelo
            if hasattr(Logo, 'image_logo_url'):
                logo.image_logo_url = logo_url
            if hasattr(Logo, 'created_at'):
                logo.created_at = datetime.now()
            
            db.session.add(logo)
        
        db.session.commit()
        
        return jsonify({
            "message": "Logo guardado correctamente",
            "logo_url": logo_url
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error al guardar el logo: {str(e)}"}), 500