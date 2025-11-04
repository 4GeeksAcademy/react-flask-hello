from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from sqlalchemy import select

import cloudinary
import cloudinary.uploader


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


#cloudinary route


# Cloudinary upload endpoint
@api.route("/upload", methods=["POST"])
@jwt_required()
def upload_image():
    # Check if a file part is present in the request
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400
    id = get_jwt_identity()
    user = db.session.get(User, id)
    if not user: 
        return jsonify({'msg': 'user not found'}), 404

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    try:
        #upload to cloudinary
        upload_result = cloudinary.uploader.upload(file)
        #return the url of the uploaded image to be used in the frontend and/or stored in the database
        user.avatar = upload_result["secure_url"]
        db.session.commit()
        return jsonify({
            "url": upload_result["secure_url"],
            "public_id": upload_result["public_id"]
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/register', methods=['POST'])
def handle_register():

    body = request.get_json()

    hashed_password = generate_password_hash(
        body['password'])

    new_user = User(email=body['email'],
                    password=hashed_password,
                    is_active=True)

    db.session.add(new_user)
    db.session.commit()
    return jsonify({'success': True, 'msg': 'Nuevo usuario creado con exito'}), 201


@api.route('/profile_update', methods=['PUT'])
@jwt_required()
def handle_update():

    id = get_jwt_identity()
    body = request.get_json()
    user = db.session.get(User, id)
    if not user: 
        return jsonify({'msg': 'user not found'}), 404
    
   
        
    user.nickname = body.get('nickname', user.nickname)
    user.nombre = body.get('nombre', user.nombre)
    user.apellido = body.get('apellido', user.apellido)
    user.fecha_nacimiento = body.get('fecha_nacimiento', user.fecha_nacimiento)
    user.email = body.get('email', user.email)
    user.address = body.get('address', user.address)
    user.telefono = body.get('telefono', user.telefono)
    user.direccion = body.get('direccion', user.direccion)
    user.ciudad= body.get('ciudad', user.ciudad)
    user.pais= body.get('pais', user.pais)
    user.cp= body.get('cp', user.cp)
    user.dni = body.get('dni', user.dni)
    db.session.commit()
    return jsonify({'user': user.serialize()}), 200


@api.route('/login', methods=['POST'])
def handle_login():
    body = request.json
    stm = select(User).where(User.email == body['email'])
    user = db.session.execute(stm).scalar_one_or_none()

    if not user:
        return jsonify({'msg': 'email no encontrado'}), 404

    if not check_password_hash(user.password, body['password']):
        return jsonify({'msg': 'email y/o contraseña no valido'}), 400

    token = create_access_token(identity=str(user.id))
    return jsonify({"user": user.serialize(), "token": token}), 200
