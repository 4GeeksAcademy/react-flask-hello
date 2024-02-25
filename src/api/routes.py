"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Subscription, Testimony, Session, Instructor, Types_of_session
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import datetime

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# 
# Aquí haremos la rutas de backend
# IMPORTANTE siempre poner api.route en los endpoints 
# 

#endpoint para traer a los usuarios
@api.route('/user', methods=['GET'])
def get_users():    
    user_query = User.query.all()
    user_query = list(map(lambda item: item.serialize(), user_query))
    print(user_query)    
    if user_query == []:
        return jsonify({
             "Msg": "No hay usuarios registrados"
             }), 404
        
    response_body = {
        "msg": "ok",
        "user": user_query    }    
        
    return jsonify(response_body), 200
    # Create a route to authenticate your users and return JWTs. The
    # create_access_token() function is used to actually generate the JWT.


#endpoint para iniciar sesion con usuario existente
@api.route("/login", methods=["POST"])
def login():
    print("HOLA")
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user_query = User.query.filter_by(email=email).first()
    if email != user_query.email or password != user_query.password:
        print("CHAO")
        return jsonify({"msg": "Bad email or password"}), 401    
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.

#endpoint para guardar el token del usuario
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    info_profile = User.query.filter_by(email=current_user).first()
    return jsonify({"user": info_profile.serialize()}), 200


#endpoint para que aparezcan las clases
@api.route('/session', methods=['GET'])
def get_sessions():    
    session_query = Session.query.all()
    session_query = list(map(lambda item: item.serialize(), session_query))
    print(session_query)    
    if session_query == []:
        return jsonify({
             "Msg": "No hay sesiones disponibles"
             }), 404
        
    response_body = {
        "msg": "ok",
        "session": session_query    }    
        
    return jsonify(response_body), 200
    # Create a route to authenticate your users and return JWTs. The
    # create_access_token() function is used to actually generate the JWT.


#endpoint para registrarse
@api.route("/signup", methods=["POST"])
def signup():
    # El request_body o cuerpo de la solicitud ya está decodificado en formato JSON y se encuentra en la variable request.json
    request_body = request.json
    # Creamos variable y se la metemos dentro de user(Como otra instancia, cada user es una)
    # le damos como valores a name y password los request que pondremos en el Postman
    
    data = request.json
    name = data.get('name')
    password = data.get('password')
    last_name = data.get('last_name')
    email = data.get('email')
    date_of_birth = data.get('date_of_birth')
    role = data.get('role')

    # Example validation
    if not email or not password or not name or not last_name or not date_of_birth or not role:
        return jsonify({'Error': 'All the fields are required'}), 400    # Example database interaction (using SQLAlchemy)
    
    new_user = User(
        name=name, 
        last_name=last_name, 
        password=password, 
        email=email, 
        date_of_birth=date_of_birth, 
        role=role
        )
    

    print(new_user)
    # Le decimos que lo agregue y que lo comitee 
    db.session.add(new_user)
    db.session.commit()

    # generamos el token de este usuario
    access_token = create_access_token(identity=new_user.name)

    response_body = {
        "msg": "the user has been created",
        "access_token": access_token
        }
    
    return jsonify(response_body), 200