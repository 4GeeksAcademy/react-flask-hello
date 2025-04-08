from flask import request, jsonify, url_for, Blueprint
from api.models import db, User
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
            'isNew': False
        })

# RUTA PARA REGISTRARSE UN USUARIO (SIGNUP)


@api.route('/signup', methods=['POST'])
def create_user():
    body = request.get_json()
    firstname = body.get('firstname')
    lastname = body.get('lastname')
    shopname = body.get('shopname')
    email = body.get('email')
    password = body.get('password')

    # VERIFICA SI NO EXISTEN LOS CAMPOS
    if not firstname or not lastname or not email or not password or not shopname:
        return jsonify({"msg": "Todos los campos son obligatorios"}), 400

    # VERIFICA SI EL USUARIO EXISTE
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"msg": "El usuario ya existe"}), 403

    try:
        # ENCRIPTAMOS LA CONTRASEÑA ANTES DE GUARDARLA
        hashed_password = User.hash_password(password)

        # CREAMOS EL NUEVO USUARIO
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

        # CREAMOS EL TOKEN DE ACCESO
        access_token = create_access_token(identity=new_user.id)

        return jsonify({
            "message": "Usuario creado exitosamente",
            "access_token": access_token,
            "user": new_user.serialize()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Ocurrió un error al crear el usuario: {str(e)}"}), 500

# RUTA PARA LOGEARSE Y CREACIÓN DE TOKEN


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

    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        "access_token": access_token,
        "user": user.serialize()
    }), 200

# RUTA DEL ACCESO SETTINGS DEL USUARIO


@api.route('/settings', methods=['GET'])
@jwt_required()  # PRECISA DE TOKEN PARA ACCEDER
def get_user_info():
    # DEVUELVE EL ID PORQUE SE LO HE PASADO AL CREAR ACCESS_TOKEN
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    return jsonify({
        "name": user.serialize()["username"]
    }), 200

# BORRAR UN USUARIO EXISTENTE


@api.route('/settings/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    # BUSCAMOS AL USUARIO POR ID
    user = User.query.get(user_id)

    # VERIFICAR SI EL USUARIO EXISTE
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
