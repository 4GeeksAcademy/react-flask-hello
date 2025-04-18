
from flask import Blueprint, request, jsonify
from flask_cors import CORS
from api.models import db, User, Productos, TigrisFiles
from flask_jwt_extended import jwt_required, get_jwt_identity
import pandas as pd
import os
import boto3
from botocore.client import Config
from dotenv import load_dotenv

load_dotenv()

upload = Blueprint('upload', __name__)

# Configuración de AWS/Tigris
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_ENDPOINT_URL_S3 = os.getenv("AWS_ENDPOINT_URL_S3")
AWS_REGION = os.getenv("AWS_REGION", "auto")
import uuid
BUCKET_NAME = f"inventary-files-{uuid.uuid4().hex[:8]}"


# Configuración de carga de archivos
UPLOAD_FOLDER = "upload"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# Ruta para subir archivos Excel

@upload.route('/inventory', methods=['POST'])
@jwt_required()
def upload_inventory():

    print("subiendo")
    user_id = get_jwt_identity()
    if "file" not in request.files:
        return jsonify({"error": "No se encontró archivo en la solicitud"}), 400
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404
    file = request.files["file"]
    if not file.filename.endswith((".xls", ".xlsx")):
        return jsonify({"error": "Solo se permiten archivos Excel (.xls, .xlsx)"}), 400
    # Guardar archivo temporalmente
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)
    try:
        # Subir archivo a Tigris S3 (tú debes implementar esta función)
        file_url = upload_to_tigris_s3(file_path, file.filename)
        # Procesar Excel
        df = pd.read_excel(file_path)
        expected_columns = ['nombre_del_producto', 'precio_por_unidad', 'descripción', 'unidades']
        if not all(col in df.columns for col in expected_columns):
            return jsonify({"error": "El archivo Excel no contiene las columnas esperadas"}), 400
        df.columns = [col.lower().replace(' ', '_') for col in df.columns]
        records = df.to_dict(orient="records")
        for record in records:
            producto = Productos(
                product_name=record['nombre_del_producto'],
                price_per_unit=record['precio_por_unidad'],
                description=record['descripción'],
                quantity=record['unidades'],
                user_id=user_id
            )
            db.session.add(producto)
        tigris_file = TigrisFiles(url=file_url, user_id=user_id)
        db.session.add(tigris_file)
        db.session.commit()
        os.remove(file_path)
        return jsonify({
            "message": f"{len(records)} productos cargados correctamente.",
            "file_url": file_url
        })
    except Exception as e:
        db.session.rollback()
        if os.path.exists(file_path):
            os.remove(file_path)
        return jsonify({"error": str(e)}), 500




# Función auxiliar para subir archivos a Tigris S3


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
    """Elimina un producto específico por su ID"""
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
    """Elimina un archivo de Tigris por su ID en la base de datos"""
    try:
        tigris_file = TigrisFiles.query.get(file_id)

        if not tigris_file:
            return jsonify({"error": "Archivo no encontrado"}), 404

        # Aquí podrías agregar código para eliminar el archivo de Tigris S3 si es necesario
        # Por ejemplo:
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


@upload.route("/delete-all-products", methods=['DELETE'])
def delete_all_products():
    """Elimina todos los productos de la base de datos"""
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


@upload.route("/delete-all-files", methods=['DELETE'])
def delete_all_files():
    """Elimina todos los registros de archivos de Tigris"""
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
    """Sube un archivo a Tigris S3 y devuelve la URL"""
    try:
        # Configurar el cliente S3
        s3_client = boto3.client(
            's3',
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
            endpoint_url=AWS_ENDPOINT_URL_S3,
            region_name=AWS_REGION,
            config=Config(signature_version='s3v4')
        )

        # Asegurarse de que el bucket existe (solo lo crea si no existe)
        try:
            s3_client.head_bucket(Bucket=BUCKET_NAME)
        except:
            s3_client.create_bucket(Bucket=BUCKET_NAME)

        # Generar un nombre de archivo único
        import datetime
        timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
        unique_filename = f"{timestamp}_{file_name}"

        # Subir el archivo a S3
        s3_client.upload_file(
            file_path,
            BUCKET_NAME,
            unique_filename,
            ExtraArgs={
                'ContentType': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}
        )

        # Generar una URL presignada para acceder al archivo
        url = s3_client.generate_presigned_url(
            'get_object',
            Params={'Bucket': BUCKET_NAME, 'Key': unique_filename},
            ExpiresIn=3600 * 24 * 7  # URL válida por 7 días
        )

        return url

    except Exception as e:
        raise Exception(f"Error al subir a Tigris S3: {str(e)}")
