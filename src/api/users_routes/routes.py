"""
En este archivo están todas las rutas del Usuario(users)
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import APIException
from flask_cors import CORS

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/registro', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200