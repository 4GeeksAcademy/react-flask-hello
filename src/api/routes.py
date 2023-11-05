"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, House, Image, Booking, Favorites
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


# endpoint login

@api.route('/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user_query = User.query.filter_by(email=email).first()
    print (email, password)

    if user_query is None:
        return {"msg": "Este email no existe"}

    if email != user_query.email or password != user_query.password:
        return {"msg": "Email o contraseña incorrectos"}

    access_token = create_access_token(identity=email)

    response_body = {
        "access_token": access_token,
        "user": user_query.serialize()
    }   

    return jsonify(response_body), 200
