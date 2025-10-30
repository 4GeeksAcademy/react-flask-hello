"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from sqlalchemy import select

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/register', method=['POST'])
def handle_register():

    body = request.get_json()

    hashed_password = generate_password_hash(
        body['password'])

    new_user = User(role=body['role'], nickname=body['nickname'], nombre=body['nombre'], apellido=body['apellido'], fecha_nacimiento=body['fecha_nacimiento'], email=body['email'],
                    address=body['address'], telefono=body['telefono'], password=body[hashed_password], registro_fecha=body['registro_fecha'], is_active=body['is_active'])

    db.session.add(new_user)
    db.session.commit()
    return jsonify({'msg': 'Nuevo usuario creado con exito'}), 201

@api.route('/update', methods=['PUT'])
@jwt_required()
def handle_update():

    id=get_jwt_identity()
    body = request.get_json()
    hashed_password = generate_password_hash(body['password']).decode('utf-8')

    user=db.session.get(User,id)
    user.role=body.get('role', user.role)
    user.nickname=body['nickname']
    user.nombre=body['nombre']
    user.apellido=body['apellido'] 
    user.fecha_nacimiento=body['fecha_nacimiento'] 
    user.email=body['email']
    user.address=body['address'] 
    user.telefono=body['telefono'] 
    user.password=body[hashed_password] 
    db.session.commit()
    return jsonify({'user':user.serialize()})
   
@api.route('/login', methods=['POST'])
def handle_login():
    body= request.json
    stm= select(User).where(User.email==body['email'])
    user=db.session.execute(stm).scalar_one_or_none()

    if not user : 
        return jsonify({'msg':'email no encontrado'}),404
    
    if not check_password_hash(user.password , body['password']):
        return jsonify({'msg':'email y/o contraseña no valido'}),400
    
    token=create_access_token(identity=str(user.id))
    return jsonify({'user':user.serialize(),'token':token}),200