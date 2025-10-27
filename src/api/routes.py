"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from bcrypt import bcrypt

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

    hashed_password = bcrypt.generate_password_hash(
        body['password']).decode('utf-8')

    new_user = User(role=body['role'], nickname=body['nickname'], nombre=body['nombre'], apellido=body['apellido'], fecha_nacimiento=body['fecha_nacimiento'], email=body['email'],
                    address=body['address'], telefono=body['telefono'], password=body[hashed_password], registro_fecha=body['registro_fecha'], is_active=body['is_active'])

    db.session.add(new_user)
    db.session.commit()
    return jsonify({'msg': 'Nuevo usuario creado con exito'}), 201
