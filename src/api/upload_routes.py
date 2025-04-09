"""
ESTE MÓDULO SE ENCARGA DE MANEJAR LAS RUTAS PARA LA CARGA DE ARCHIVOS EXCEL
"""
from flask import Blueprint, request, jsonify
from flask_cors import CORS
from api.models import db, User, Productos, TigrisFiles, Logo
from flask_jwt_extended import jwt_required, get_jwt_identity
import pandas as pd
import os
import boto3
from botocore.client import Config
from dotenv import load_dotenv

load_dotenv()

upload = Blueprint('upload', __name__)

# CONFIGURACIÓN DE AWS/TIGRIS
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_ENDPOINT_URL_S3 = os.getenv("AWS_ENDPOINT_URL_S3")
AWS_REGION = os.getenv("AWS_REGION", "auto")
BUCKET_NAME = "inventory-files"  # NECESITARÁS CREAR ESTE BUCKET EN TIGRIS

# CONFIGURACIÓN DE CARGA DE ARCHIVOS
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# RUTA DE PRUEBA

@upload.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

# RUTA PARA SUBIR ARCHIVOS EXCEL

@upload.route('/upload-inventory', methods=['POST'])
@jwt_required()
def upload_inventory():
    """
    MANEJA LA SUBIDA DE ARCHIVOS EXCEL:
    1. GUARDA EL ARCHIVO ORIGINAL EN TIGRIS S3
    2. PROCESA EL CONTENIDO Y LO GUARDA EN LA TABLA PRODUCTOS
    3. GUARDA LA URL DE TIGRIS EN LA TABLA TIGRISFILES
    """
    # OBTENER EL ID DEL USUARIO DEL TOKEN JWT
    user_id = get_jwt_identity()

    if "file" not in request.files:
        return jsonify({"message": "No se envió ningún archivo"}), 400

    # VERIFICAR QUE EL USUARIO EXISTA
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    file = request.files["file"]
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    try:
        # 1. SUBIR EL ARCHIVO ORIGINAL A TIGRIS S3
        file_url = upload_to_tigris_s3(file_path, file.filename)

        # 2. PROCESAR EL EXCEL Y GUARDAR EN LA BASE DE DATOS
        df = pd.read_excel(file_path)

        # VERIFICAR QUE EL EXCEL TIENE LAS COLUMNAS ESPERADAS
        required_columns = ['nombre_del_producto',
                            'precio_por_unidad', 'descripción', 'unidades']
        for col in required_columns:
            if col not in df.columns:
                return jsonify({"error": f"Falta la columna '{col}' en el archivo Excel"}), 400

        # NORMALIZAR NOMBRES DE COLUMNAS
        df.columns = [col.lower().replace(' ', '_') for col in df.columns]

        # CONVERTIR A REGISTROS
        records = df.to_dict(orient="records")

        # GUARDAR CADA PRODUCTO EN LA BASE DE DATOS
        products_added = 0
        for record in records:
            # MAPEAR CAMPOS DEL EXCEL AL MODELO CON LOS NUEVOS NOMBRES
            new_product = Productos(
                product_name=record['nombre_del_producto'],
                price_per_unit=record['precio_por_unidad'],
                description=record['descripción'],
                quantity=record['unidades'],
                user_id=user_id  # ID DEL USUARIO OBTENIDO DEL TOKEN
            )
            db.session.add(new_product)
            products_added += 1

        # 3. GUARDAR LA URL DE TIGRIS EN LA TABLA TIGRISFILES
        new_tigris_file = TigrisFiles(
            url=file_url,
            user_id=user_id  # ID DEL USUARIO OBTENIDO DEL TOKEN
        )
        db.session.add(new_tigris_file)

        # CONFIRMAR CAMBIOS EN LA BASE DE DATOS
        db.session.commit()

        # ELIMINAR EL ARCHIVO TEMPORAL
        os.remove(file_path)

        return jsonify({
            "message": f"Archivo procesado y {products_added} productos guardados en la base de datos.",
            "file_url": file_url,
            "products_added": products_added
        })

    except Exception as e:
        # EN CASO DE ERROR, HACER ROLLBACK
        db.session.rollback()
        if os.path.exists(file_path):
            os.remove(file_path)
        return jsonify({"error": str(e)}), 500

# FUNCIÓN AUXILIAR PARA SUBIR ARCHIVOS A TIGRIS S3

@upload.route("/get_all", methods=['GET'])
def get_all_products():
    products = Productos.query.all()

    products_serialized = [product.serialize() for product in products]

    return jsonify({"productos": products_serialized})


@upload.route("/get_all_files", methods=['GET'])
def get_all_tigris_files():
    files = TigrisFiles.query.all()

    files_serialized = [file.serialize_tigris() for file in files]

    return jsonify({"archivos": files_serialized})


@upload.route("/delete-product/<int:product_id>", methods=['DELETE'])
def delete_product(product_id):
    """ELIMINA UN PRODUCTO ESPECÍFICO POR SU ID"""
    try:
        product = Productos.query.get(product_id)

        if not product:
            return jsonify({"error": "Producto no encontrado"}), 404

        db.session.delete(product)
        db.session.commit()

        return jsonify({
            "message": f"Producto con ID {product_id} eliminado correctamente",
            "deleted_product_id": product_id
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@upload.route("/delete-file/<int:file_id>", methods=['DELETE'])
def delete_tigris_file(file_id):
    """ELIMINA UN ARCHIVO DE TIGRIS POR SU ID EN LA BASE DE DATOS"""
    try:
        tigris_file = TigrisFiles.query.get(file_id)

        if not tigris_file:
            return jsonify({"error": "Archivo no encontrado"}), 404

        # AQUÍ PODRÍAS AGREGAR CÓDIGO PARA ELIMINAR EL ARCHIVO DE TIGRIS S3 SI ES NECESARIO
        # POR EJEMPLO:
        # delete_from_tigris_s3(tigris_file.url)

        db.session.delete(tigris_file)
        db.session.commit()

        return jsonify({
            "message": f"Archivo con ID {file_id} eliminado correctamente",
            "deleted_file_id": file_id
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# AQUÍ PODRÍAS BORRAR TODOS LOS PRODUCTOS


@upload.route("/delete-all-products", methods=['DELETE'])
def delete_all_products():
    """ELIMINA TODOS LOS PRODUCTOS DE LA BASE DE DATOS"""
    try:
        num_deleted = db.session.query(Productos).delete()
        db.session.commit()

        return jsonify({
            "message": f"Se han eliminado {num_deleted} productos correctamente",
            "count": num_deleted
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# AQUÍ PODRÍAS BORRAR TODOS LOS ARCHIVOS
@upload.route("/delete-all-files", methods=['DELETE'])
def delete_all_files():
    """ELIMINA TODOS LOS REGISTROS DE ARCHIVOS DE TIGRIS"""
    try:
        num_deleted = db.session.query(TigrisFiles).delete()
        db.session.commit()

        return jsonify({
            "message": f"Se han eliminado {num_deleted} registros de archivos correctamente",
            "count": num_deleted
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


def upload_to_tigris_s3(file_path, file_name):
    """SUBE UN ARCHIVO A TIGRIS S3 Y DEVUELVE LA URL"""
    try:
        # CONFIGURAR EL CLIENTE S3
        s3_client = boto3.client(
            's3',
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
            endpoint_url=AWS_ENDPOINT_URL_S3,
            region_name=AWS_REGION,
            config=Config(signature_version='s3v4')
        )

        # ASEGURARSE DE QUE EL BUCKET EXISTE (SOLO LO CREA SI NO EXISTE)
        try:
            s3_client.head_bucket(Bucket=BUCKET_NAME)
        except:
            s3_client.create_bucket(Bucket=BUCKET_NAME)

        # GENERAR UN NOMBRE DE ARCHIVO ÚNICO
        import datetime
        timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
        unique_filename = f"{timestamp}_{file_name}"

        # SUBIR EL ARCHIVO A S3
        s3_client.upload_file(
            file_path,
            BUCKET_NAME,
            unique_filename,
            ExtraArgs={
                'ContentType': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}
        )

        # GENERAR UNA URL PRESIGNADA PARA ACCEDER AL ARCHIVO
        url = s3_client.generate_presigned_url(
            'get_object',
            Params={'Bucket': BUCKET_NAME, 'Key': unique_filename},
            ExpiresIn=3600 * 24 * 7  # URL VÁLIDA POR 7 DÍAS
        )

        return url

    except Exception as e:
        raise Exception(f"Error al subir a Tigris S3: {str(e)}")
    
# Ruta para subir logos

@upload.route("/get_logos", methods=['GET'])
def get_all_logos():
    logos = Logo.query.all()

    logos_serialized = [logo.serialize() for logo in logos]

    return jsonify({"logos": logos_serialized})

@upload.route('/upload-logos', methods=['POST'])
@jwt_required()
def upload_logo():
  
    
    # Obtener el ID del usuario del token JWT
    user_id = get_jwt_identity()

    if "file" not in request.files:
        return jsonify({"message": "No se envió ningún archivo"}), 400

    # Verificar que el usuario exista
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    file = request.files["file"]
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    try:
        # 1. Subir el archivo original a Tigris S3
        file_url = upload_to_tigris_s3(file_path, file.filename)

        # 2. Procesar el Excel y guardar en la base de datos
        df = pd.read_excel(file_path)

        # Verificar que el Excel tiene las columnas esperadas
        required_columns = ['nombre_del_producto',
                            'precio_por_unidad', 'descripción', 'unidades']
        for col in required_columns:
            if col not in df.columns:
                return jsonify({"error": f"Falta la columna '{col}' en el archivo Excel"}), 400

        # Normalizar nombres de columnas
        df.columns = [col.lower().replace(' ', '_') for col in df.columns]

        # Convertir a registros
        records = df.to_dict(orient="records")

        # Guardar cada producto en la base de datos
        products_added = 0
        for record in records:
            # Mapear campos del Excel al modelo con los nuevos nombres
            new_product = Productos(
                product_name=record['nombre_del_producto'],
                price_per_unit=record['precio_por_unidad'],
                description=record['descripción'],
                quantity=record['unidades'],
                user_id=user_id  # ID del usuario obtenido del token
            )
            db.session.add(new_product)
            products_added += 1

        # 3. Guardar la URL de Tigris en la tabla TigrisFiles
        new_tigris_file = TigrisFiles(
            url=file_url,
            user_id=user_id  # ID del usuario obtenido del token
        )
        db.session.add(new_tigris_file)

        # Confirmar cambios en la base de datos
        db.session.commit()

        # Eliminar el archivo temporal
        os.remove(file_path)

        return jsonify({
            "message": f"Archivo procesado y {products_added} productos guardados en la base de datos.",
            "file_url": file_url,
            "products_added": products_added
        })

    except Exception as e:
        # En caso de error, hacer rollback
        db.session.rollback()
        if os.path.exists(file_path):
            os.remove(file_path)
        return jsonify({"error": str(e)}), 500
