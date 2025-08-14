"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Oferta
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import bcrypt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_mail import Message

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# Post para registrar un usuario
@api.route('/user/register', methods=['POST'])
def user_register():

    body = request.get_json()
    new_pass=bcrypt.hashpw(body["password"].encode(), bcrypt.gensalt())


    new_user = User()
    new_user.name = body["name"]
    new_user.email = body["email"]
    new_user.password = new_pass.decode()
    new_user.vehicle = body["vehicle"]
    new_user.vehicle_consume_km = body["vehicle_consume_km"]
    new_user.coordenates = body["coordenates"]

    db.session.add(new_user)
    db.session.commit()

    return jsonify("new_user"), 200


@api.route('/user/resetPassword', methods=['PUT'])
@jwt_required()
def user_resetPassWord():
    current_user = get_jwt_identity()
    user = User.query.get(current_user)

    body = request.get_json()
    new_pass=bcrypt.hashpw(body["nuevaContraseña"].encode(), bcrypt.gensalt())

    user.password = new_pass.decode()

    db.session.add(user)
    db.session.commit()

    return jsonify("Cambio de contraseña exitoso"), 200

# Post para logear un usuario
@api.route("/user/login", methods=["POST"])
def user_login():
    body = request.get_json()
    user = User.query.filter_by(email=body["email"]).first()
    user_pass = User.query.filter_by(password=body["password"]).first()

    if user is None:
        return jsonify("Cuenta no existe"),404
    
    if bcrypt.checkpw(body["password"].encode(),user.password.encode()):
        user_serialize = user.serialize() 
        token = create_access_token(identity = str(user_serialize["id"]))
        return jsonify({"token":token},{"user":user_serialize}),200


    return jsonify("Usuario logueado"),200

# GET pedir informacion sobre un usuario
@api.route("/user", methods=["GET"])
@jwt_required()
def get_user():
    current_user = get_jwt_identity()
    user = User.query.get(current_user)
    if user is None:
        return jsonify("Usuario no valido"),400
    return jsonify({"user":user.serialize()})


# GET pedir informacion sobre todas las ofertas disponibles de todos los usuarios
@api.route("/user/ofertas", methods=["GET"])

def get_ofertas():

    ofertas = Oferta.query.all()
    iterar_ofertas = [oferta.serialize() for oferta in ofertas]
    if ofertas is None:
        return jsonify("No hay ofertas disponibles"),404
    return jsonify({"ofertas": iterar_ofertas}),200

# GET pedir informacion sobre una oferta

@api.route("/user/oferta/info/<int:oferta_id>", methods=["GET"])
@jwt_required()
def get_oferta(oferta_id):
    current_user = get_jwt_identity()
    user = User.query.get(current_user)
    if user is None:
        return jsonify("Usuario no valido"),400
    
    oferta = Oferta.query.get(oferta_id)

    if oferta is None:
        return jsonify("No existe esa oferta"),400
    oferta_serializada = oferta.serialize()
    print(oferta_serializada)
    print(oferta)
    print(oferta_id)

    return jsonify(oferta_serializada)


# POST crear una nueva oferta
@api.route("/user/ofertas", methods=["POST"])
@jwt_required()
def post_ofertas():
    current_user = get_jwt_identity()
    user = User.query.get(current_user)

    body = request.get_json()
    nueva_oferta = Oferta()
    nueva_oferta.id_comprador = None
    nueva_oferta.coordenates_comprador = None
    nueva_oferta.id_vendedor = user.id
    nueva_oferta.esta_realizada = False
    nueva_oferta.descripcion = body["descripcion"]
    nueva_oferta.titulo = body["titulo"]
    nueva_oferta.coordenates_vendedor = user.coordenates
    nueva_oferta.precio_ud = body["precio_ud"]
    nueva_oferta.ud = body["ud"]
    nueva_oferta.img_cosecha = body["img_cosecha"]

    db.session.add(nueva_oferta)
    db.session.commit()


    if user is None:
        return jsonify("Usuario no valido"),400
    return jsonify(nueva_oferta.serialize()),200


# PUT comprar una oferta

@api.route("/user/oferta/comprar/<int:oferta_id>", methods=["PUT"])
@jwt_required()
def comprar_oferta(oferta_id):
    current_user = get_jwt_identity()
    user = User.query.get(current_user)
    if user is None:
        return jsonify("Usuario no valido"),400
    
    oferta = Oferta.query.get(oferta_id)
    oferta.id_comprador = user.id
    oferta.coordenates_comprador = user.coordenates
    oferta.esta_realizada = True
    db.session.add(oferta)
    db.session.commit()


    if oferta is None:
        return jsonify("No existe esa oferta"),400
    oferta_serializada = oferta.serialize()
    print(oferta_serializada)
    print(oferta)
    print(oferta_id)

    return jsonify(oferta_serializada)



@api.route("/resetPassword", methods=['POST'])
def resetPassword():
    data = request.get_json()
    user_email = data.get('email')
    user_serialize = user.serialize() 
    user = User.query.filter_by(email=data["email"]).first()
    token = create_access_token(identity = str(user_serialize["id"]))

    msg = Message(
        subject=({"token":token}),
        sender="from@example.com",
        recipients=[user_email],
    )
    return jsonify(msg)