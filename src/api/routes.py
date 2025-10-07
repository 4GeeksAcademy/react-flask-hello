"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)



# CRUD USERS
@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200


#------------------------------CREATE USER-----------------------#

@api.route('/user', methods=['POST'])
def create_user():

    recieved = request.get_json()
    user_name = recieved.get("user_name")
    email = recieved.get("email")
    password = recieved.get("password")

    if not user_name or not email:
        return jsonify({"message": "user_name and email are obligatory"}),400
    if not password:
        return jsonify({"message": "password are obligatory"}),400
    
    user = User(user_name=user_name, email=email, password=password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": f"{user_name} user created"}), 200
