from flask import request, jsonify, url_for, Blueprint
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

# MUESTRA TODOS LOS USUARIOS

@api.route('/users', methods=['GET'])
def get_all_users():

    users = User.query.all()

    if not users:
        return jsonify({ "msg": "Users not found"}), 404
    
    response_body = [user.serialize() for user in users]

    return jsonify(response_body), 200
  
# MUESTRA LOS DATOS DEL USUARIO

@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):

    user = User.query.get(user_id)

    if user is None:
        return jsonify({ "msg": "User not found"}), 404
    
    response_body = user.serialize()
    
    return jsonify(response_body), 200
  
# ACTUALIZAR UN USUARIO EXISTENTE

@api.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    # Buscamos al usuaruio por su ID
    user = User.query.get(user_id)

    # VERIFICAMOS SI EL USUARIO EXISTE
    
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
    
# LLAMAR AL LOGO DESDE LA API

@api.route("/get_logos", methods=['GET'])
def get_all_logos():
    logos = Logo.query.all()

    logos_serialized = [logo.serialize() for logo in logos]

    return jsonify({"logos": logos_serialized})

 # SUBIR EL LOGO DESDE LA API

@api.route('/post_logos', methods=['POST'])
def create_logo():
    body = request.get_json()
    image_logo_url = body.get("image_logo_url")

    # Verifica si no existen los campos
    if not image_logo_url:
        return jsonify({"msg": "Asigna un logo"}), 400

    try:

        # CREA EL LOGO
        new_logo = Logo(
            image_logo_url=image_logo_url,
        )

        db.session.add(new_logo)
        db.session.flush()
        db.session.commit()

        return jsonify({
            "logo": new_logo.serialize()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Ocurrió un error al crear el logo: {str(e)}"}), 500

