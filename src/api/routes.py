"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User , Evento
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import datetime

api = Blueprint('app', __name__)
# Allow CORS requests to this API
CORS(api)

# Setup the Flask-JWT-Extended extension


# POST Para hacer login


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user_query = User.query.filter_by(email = email).first()
    if user_query is None:
        return jsonify({"msg": "Correo no existe"}), 401
    if email != user_query.email or password != user_query.password:
        return jsonify({"msg": "Bad email or password"}), 401
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)



# GET Mostrar todos los eventos proximos
@api.route('/events', methods=['GET'])
def get_users_attend_all_events():
    date = datetime.now()
    all_events = Evento.query.filter(Evento.fecha > date).all()
    results_events = list(map(lambda item: item.serialize(), all_events))
    
    response_body = {
        "msg": "Usuarios que asisten a todos los eventos",
        "results": results_events
    }

    return jsonify(response_body), 200


############################ endpoint registro usuario ########### de la linea 50 a la 80#####################

@api.route("/signup", methods=["POST"])
def signup():

    name = request.json.get("name")
    email = request.json.get("email")
    password = request.json.get("password")
    
    ############ manejo de errores ##############
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"msg": "El correo electrónico ya está en uso"}), 400
    

    new_user = User(name=name, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"msg": "Usuario registrado exitosamente"}), 201




# GET Mostrar detalles Eventos
@api.route('/events/<int:id>', methods=['GET'])
def event(id):
    event_query = Evento.query.filter_by(id = id).first()
    event_data = event_query.serialize()
    num_asistentes = User.query.join(User.eventos).filter(Evento.id == id).count()
    response_body = {
        "msg": "ok",
        "result": event_data,
        "asistentes": num_asistentes
    }

    return jsonify(response_body), 200
