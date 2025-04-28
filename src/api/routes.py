"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/signup', methods=['POST'])
def signup():
    email = request.json.get("email")
    password = request.json.get("password")
    name = request.json.get("name")
    age = request.json.get("age")

    new_signup = User (
        email = email, 
        password = generate_password_hash(password), 
        name = name, 
        age = age, 
    )
    db.session.add(new_signup)
    db.session.commit()

    return jsonify("user signedup"), 200



@api.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    find_user = User.query.filter_by(email = email).first()
    print(find_user.password, "where is my user?!!??!?")

    if not check_password_hash(find_user.password,password):                # <--this will return a true or false about password that was entered-->

        return jsonify("login failed!")

    token = create_access_token(identity = email)
         # ^--this creates 'token' for you,--->  <--- the [identity=email] gives access to the 'User'-->

    return jsonify(token_value = token), 200

