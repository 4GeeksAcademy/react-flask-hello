from flask import Blueprint, request, jsonify, send_file
from flask_cors import CORS
from api.models import db, User, Logo
from flask_jwt_extended import jwt_required, get_jwt_identity
import os
import boto3
from botocore.client import Config
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
import uuid
import io

load_dotenv()

up_logo = Blueprint('up_logo', __name__)

# Configuración de AWS/Tigris
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_ENDPOINT_URL_S3 = os.getenv("AWS_ENDPOINT_URL_S3")
AWS_REGION = os.getenv("AWS_REGION", "auto")
BUCKET_NAME = "img-logo-2025"

# Configuración de carga de archivos
LOGO_FOLDER = "logo"
# Solo crea la carpeta, no uses filename aquí
os.makedirs(LOGO_FOLDER, exist_ok=True)

# Función para verificar si un archivo es una imagen permitida


def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'svg'}
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Función auxiliar para subir archivos a Tigris S3


def upload_to_tigris_s3(file_path, filename, user_id):
    try:
        # Añadir logs para depuración
        print(
            f"Intentando conectar a TigrisDB con: URL={AWS_ENDPOINT_URL_S3}, REGION={AWS_REGION}")
        print(
            f"Access Key ID disponible: {'Sí' if AWS_ACCESS_KEY_ID else 'No'}")
        print(
            f"Secret Key disponible: {'Sí' if AWS_SECRET_ACCESS_KEY else 'No'}")

        # Crear cliente de S3 con configuración de Tigris
        s3 = boto3.client(
            's3',
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
            endpoint_url=AWS_ENDPOINT_URL_S3,
            region_name=AWS_REGION,
            config=Config(signature_version='s3v4')
        )

        # Crear bucket si no existe
        try:
            print(f"Verificando si existe el bucket: {BUCKET_NAME}")
            s3.head_bucket(Bucket=BUCKET_NAME)
            print(f"Bucket {BUCKET_NAME} existe")
        except Exception as bucket_error:
            print(f"Error al verificar bucket: {str(bucket_error)}")
            print(f"Intentando crear bucket: {BUCKET_NAME}")
            s3.create_bucket(Bucket=BUCKET_NAME)
            print(f"Bucket {BUCKET_NAME} creado")

        # Generar nombre único para el archivo
        file_extension = os.path.splitext(filename)[1]
        unique_filename = f"logo_{user_id}_{uuid.uuid4().hex[:8]}{file_extension}"

        print(
            f"Subiendo archivo {file_path} a bucket {BUCKET_NAME} como {unique_filename}")

        # Subir archivo a S3
        s3.upload_file(
            file_path,
            BUCKET_NAME,
            unique_filename,
            ExtraArgs={'ACL': 'public-read',
                       'ContentType': f'image/{file_extension[1:]}'}
        )

        # Generar URL del archivo
        file_url = f"{AWS_ENDPOINT_URL_S3}/{BUCKET_NAME}/{unique_filename}"
        print(f"Archivo subido exitosamente. URL: {file_url}")
        return file_url

    except Exception as e:
        print(f"Error en upload_to_tigris_s3: {type(e).__name__}: {str(e)}")
        import traceback
        traceback.print_exc()
        raise e

# ----------------------------------------------------------------------------------------
#                   RUTAS DE PRUEBAS
# ----------------------------------------------------------------------------------------

@up_logo.route('/api/test_tigris', methods=['GET'])
def test_tigris():
    try:
        # Crear cliente de S3 con configuración de Tigris
        s3 = boto3.client(
            's3',
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
            endpoint_url=AWS_ENDPOINT_URL_S3,
            region_name=AWS_REGION,
            config=Config(signature_version='s3v4')
        )

        # Listar buckets para verificar conexión
        buckets = s3.list_buckets()
        bucket_names = [bucket['Name'] for bucket in buckets['Buckets']]

        return jsonify({
            "status": "conectado",
            "buckets": bucket_names,
            "config": {
                "endpoint": AWS_ENDPOINT_URL_S3,
                "region": AWS_REGION,
                "access_key_exists": bool(AWS_ACCESS_KEY_ID),
                "secret_key_exists": bool(AWS_SECRET_ACCESS_KEY)
            }
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e),
            "error_type": type(e).__name__
        }), 500

@up_logo.route('/api/test_debug', methods=['GET', 'POST', 'OPTIONS'])
def test_debug():
     print("Method:", request.method)
     print("Headers:", dict(request.headers))
     print("Files:", list(request.files.keys())
             if request.files else "No files")
     print("Form:", list(request.form.keys())
              if request.form else "No form data")

     return jsonify({
            "message": "Debug info printed to console",
            "method": request.method,
            "headers": dict(request.headers),
            "files": list(request.files.keys()) if request.files else [],
            "form": list(request.form.keys()) if request.form else []
    })
# -----------------------------------------------------------------------------------------------
#                              RUTAS DE PRUEBAS
# ------------------------------------------------------------------------------------------------

# Ruta para subir logo


@up_logo.route('/api/post_logo', methods=['OPTIONS'])
@up_logo.route('/api/post_logo/', methods=['OPTIONS'])
def options_logo():
    response = jsonify({'status': 'ok'})
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type, Authorization')
    return response

# Manejar POST con jwt_required


@up_logo.route('/api/post_logo', methods=['POST'])
@up_logo.route('/api/post_logo/', methods=['POST'])
@jwt_required()
def upload_logo():
    user_id = get_jwt_identity()

    # Añade logs para diagnóstico
    print("Headers:", dict(request.headers))
    print("Files keys:", list(request.files.keys()))
    print("Form keys:", list(request.form.keys()))

    if "logo" not in request.files:
        return jsonify({"error": "No se encontró el logo en la solicitud"}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    file = request.files["logo"]

    if file.filename == '':
        return jsonify({"error": "No se seleccionó ningún archivo"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "Tipo de archivo no permitido. Use PNG, JPG, JPEG, GIF o SVG"}), 400

    # Guardar archivo temporalmente
    filename = secure_filename(file.filename)
    file_path = os.path.join(LOGO_FOLDER, filename)
    file.save(file_path)

    try:
        # Subir archivo a Tigris S3
        file_url = upload_to_tigris_s3(file_path, filename, user_id)

        # Leer archivo para almacenar en base de datos como binary
        with open(file_path, 'rb') as img_file:
            image_data = img_file.read()

        # Buscar si el usuario ya tiene un logo guardado
        existing_logo = Logo.query.filter_by(user_id=user_id).first()

        if existing_logo:
            # Actualizar logo existente
            existing_logo.image_logo_url = file_url
            existing_logo.image_data = image_data
        else:
            # Crear nuevo logo
            new_logo = Logo(
                image_logo_url=file_url,
                image_data=image_data,
                user_id=user_id
            )
            db.session.add(new_logo)

        db.session.commit()

        # Eliminar archivo temporal
        os.remove(file_path)

        return jsonify({
            "message": "Logo subido correctamente",
            "logo_url": file_url
        })

    except Exception as e:
        db.session.rollback()
        if os.path.exists(file_path):
            os.remove(file_path)
        return jsonify({"error": str(e)}), 500

# Ruta para obtener el logo del usuario


@up_logo.route('/api/logo_simple', methods=['GET'])
def get_logo_simple():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({"error": "Falta el parámetro user_id"}), 400

    try:
        logo = Logo.query.filter_by(user_id=user_id).first()
        if not logo:
            return jsonify({"error": "Logo no encontrado", "default_url": "https://placehold.co/600x400/EEE/31343C"}), 404

        return jsonify({"logo_url": logo.image_logo_url})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Ruta de ping simple para verificar que el servidor está funcionando


@up_logo.route('/ping', methods=['GET'])
def ping():
    return jsonify({"status": "ok", "message": "Servidor funcionando"}), 200
