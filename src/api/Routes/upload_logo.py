from flask import Blueprint, request, jsonify
from api.models import db, User, Logo
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
import os
import boto3
from botocore.client import Config
from botocore.exceptions import ClientError
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
import uuid
import json

load_dotenv()

# Blueprint para manejo de logos
up_logo = Blueprint('up_logo', __name__)

# Configuración de AWS/Tigris
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_ENDPOINT_URL_S3 = os.getenv("AWS_ENDPOINT_URL_S3")
AWS_REGION = os.getenv("AWS_REGION", "auto")
BUCKET_NAME = "img-logo-2025"

# URL del logo por defecto
DEFAULT_LOGO = "https://placehold.co/600x400/EEE/31343C"

# Carpeta temporal para logos
LOGO_FOLDER = "logo"
os.makedirs(LOGO_FOLDER, exist_ok=True)

def allowed_file(filename):
  
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'}
    
    # Si no hay nombre de archivo, no es válido
    if not filename:
        print("Error: Nombre de archivo vacío")
        return False
    
    # Obtener la extensión (ignorando mayúsculas/minúsculas)
    if '.' not in filename:
        print(f"Error: Archivo sin extensión: {filename}")
        return False
    
    # Eliminar espacios en blanco y obtener extensión
    filename = filename.strip()
    extension = filename.rsplit('.', 1)[1].lower()
    
    # Verificar si la extensión está en la lista de permitidas
    is_allowed = extension in ALLOWED_EXTENSIONS
    
    if not is_allowed:
        print(f"Error: Extensión no permitida: {extension} en archivo {filename}")
    else:
        print(f"Archivo válido: {filename} con extensión {extension}")
    
    return is_allowed

def upload_to_s3(file_path, filename, user_id):
    """
    Sube un archivo a TigrisDB (compatible con S3) y devuelve una URL prefirmada
    """
    try:
        # Crear cliente de S3
        s3 = boto3.client(
            's3',
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
            endpoint_url=AWS_ENDPOINT_URL_S3,
            region_name=AWS_REGION,
            config=Config(signature_version='s3v4')
        )

        # Generar nombre único para el archivo
        file_extension = os.path.splitext(filename)[1]
        unique_filename = f"logo_{user_id}_{uuid.uuid4().hex[:8]}{file_extension}"

        # Subir archivo a S3 (sin ACL público)
        s3.upload_file(
            file_path,
            BUCKET_NAME,
            unique_filename
        )
        
        print(f"Archivo subido correctamente: {unique_filename}")
        
        # Generar URL prefirmada (válida por 7 días = 604800 segundos)
        presigned_url = s3.generate_presigned_url(
            'get_object',
            Params={
                'Bucket': BUCKET_NAME,
                'Key': unique_filename
            },
            ExpiresIn=604800  # 7 días en segundos
        )
        
        print(f"URL prefirmada generada: {presigned_url}")
        
        return presigned_url, unique_filename

    except Exception as e:
        print(f"Error en upload_to_s3: {str(e)}")
        raise e

# Ruta para subir logo
@up_logo.route('/api/post_logo', methods=['POST'])
@jwt_required()
def upload_logo():
    user_id = get_jwt_identity()
    print(f"Solicitud de subida de logo para usuario: {user_id}")

    if "logo" not in request.files:
        print("Error: No se encontró el logo en la solicitud")
        return jsonify({"error": "No se encontró el logo en la solicitud"}), 400

    user = User.query.get(user_id)
    if not user:
        print(f"Error: Usuario {user_id} no encontrado")
        return jsonify({"error": "Usuario no encontrado"}), 404

    file = request.files["logo"]

    if file.filename == '':
        print("Error: No se seleccionó ningún archivo")
        return jsonify({"error": "No se seleccionó ningún archivo"}), 400

    if not allowed_file(file.filename):
        print(f"Error: Tipo de archivo no permitido: {file.filename}")
        return jsonify({"error": "Tipo de archivo no permitido. Use PNG, JPG, JPEG, GIF, SVG o WebP"}), 400

    # Guardar archivo temporalmente
    filename = secure_filename(file.filename)
    file_path = os.path.join(LOGO_FOLDER, filename)
    file.save(file_path)
    print(f"Archivo guardado temporalmente en: {file_path}")

    try:
        # Subir archivo a S3 y obtener URL prefirmada
        print("Iniciando carga a S3...")
        presigned_url, object_key = upload_to_s3(file_path, filename, user_id)
        print(f"Archivo subido correctamente, URL: {presigned_url}")

        # Actualizar información del logo en el usuario
        user.logo_url = presigned_url
        
        # Guardar también la clave del objeto para poder regenerar URLs
        # Verifica primero si el modelo tiene este campo
        if hasattr(user, 'logo_object_key'):
            user.logo_object_key = object_key
        
        db.session.commit()
        print(f"URL del logo actualizada para usuario {user_id}")

        # Generar nuevo token con información actualizada
        additional_claims = {"logo_url": presigned_url}
        if hasattr(user, 'logo_object_key'):
            additional_claims["logo_object_key"] = object_key
            
        new_token = create_access_token(
            identity=user_id,
            additional_claims=additional_claims
        )
        print("Nuevo token generado con URL del logo")

        # Eliminar archivo temporal
        os.remove(file_path)
        print(f"Archivo temporal {file_path} eliminado")

        return jsonify({
            "message": "Logo subido correctamente",
            "logo_url": presigned_url,
            "access_token": new_token
        })

    except Exception as e:
        print(f"Error durante la subida del logo: {str(e)}")
        db.session.rollback()
        if os.path.exists(file_path):
            os.remove(file_path)
        return jsonify({"error": str(e)}), 500

# Ruta para refrescar URL prefirmada del logo
@up_logo.route('/api/refresh_logo_url', methods=['GET'])
@jwt_required()
def refresh_logo_url():
    user_id = get_jwt_identity()
    print(f"Solicitud para refrescar URL del logo para usuario: {user_id}")

    user = User.query.get(user_id)
    if not user:
        print(f"Error: Usuario {user_id} no encontrado")
        return jsonify({"error": "Usuario no encontrado"}), 404
    
    # Verificar si el modelo tiene el campo logo_object_key
    if not hasattr(user, 'logo_object_key') or not user.logo_object_key:
        # Si no existe, intentar extraer la clave del objeto de la URL actual
        if user.logo_url and BUCKET_NAME in user.logo_url:
            try:
                # Intentar extraer la clave del objeto de la URL
                url_parts = user.logo_url.split(BUCKET_NAME + '/')
                if len(url_parts) > 1:
                    object_key = url_parts[1].split('?')[0]  # Separar la clave de los parámetros
                    print(f"Clave de objeto extraída de URL: {object_key}")
                    
                    # Si el modelo tiene el campo, guardarlo para uso futuro
                    if hasattr(user, 'logo_object_key'):
                        user.logo_object_key = object_key
                        db.session.commit()
                else:
                    print("No se pudo extraer la clave del objeto de la URL")
                    return jsonify({"error": "No se puede refrescar la URL del logo"}), 400
            except Exception as e:
                print(f"Error al extraer clave de objeto: {str(e)}")
                return jsonify({"error": "No hay logo para refrescar"}), 400
        else:
            print(f"Error: Usuario {user_id} no tiene logo_url válida")
            return jsonify({"error": "No hay logo para refrescar"}), 400
    
    try:
        # Crear cliente de S3
        s3 = boto3.client(
            's3',
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
            endpoint_url=AWS_ENDPOINT_URL_S3,
            region_name=AWS_REGION,
            config=Config(signature_version='s3v4')
        )
        
        # Obtener la clave del objeto
        object_key = user.logo_object_key if hasattr(user, 'logo_object_key') else object_key
        
        # Verificar que el objeto existe
        try:
            s3.head_object(Bucket=BUCKET_NAME, Key=object_key)
        except Exception as e:
            print(f"Error: El objeto {object_key} no existe en S3: {str(e)}")
            return jsonify({"error": "El logo no existe en el servidor"}), 404
        
        # Generar nueva URL prefirmada (válida por 7 días)
        presigned_url = s3.generate_presigned_url(
            'get_object',
            Params={
                'Bucket': BUCKET_NAME,
                'Key': object_key
            },
            ExpiresIn=604800  # 7 días en segundos
        )
        
        print(f"Nueva URL prefirmada generada: {presigned_url}")
        
        # Actualizar URL en el usuario
        user.logo_url = presigned_url
        db.session.commit()
        
        # Generar nuevo token con URL actualizada
        additional_claims = {"logo_url": presigned_url}
        if hasattr(user, 'logo_object_key'):
            additional_claims["logo_object_key"] = object_key
            
        new_token = create_access_token(
            identity=user_id,
            additional_claims=additional_claims
        )
        
        return jsonify({
            "message": "URL del logo actualizada",
            "logo_url": presigned_url,
            "access_token": new_token
        })
        
    except Exception as e:
        print(f"Error al refrescar URL del logo: {str(e)}")
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Para CORS
@up_logo.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    return response