"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def signup():

    body = request.get_json()

    required_fields = ['email', 'password']
    for field in required_fields:
        if field not in body:
            return jsonify({"Error": "the field is required"}), 400
        
    if User.query.filter_by(email=body['email']).first():
        return jsonify({"error": "el usuario ya existe"}), 400
    
    try:
        new_user = User (
            email=body['email'],
            password=body['password']
        )

        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "usuario creado con exito"}), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    

@api.route('/login', methods=['POST'])
def create_token():

    body = request.get_json()

    required_fields = ['email', 'password']
    for field in required_fields:
        if field not in body:
            return jsonify({"Error": f"the field is required"}), 400
        
    user = User.query.filter_by(email=body['email']).first()
    
    if not user or not user.check_password(body['password']):
        return jsonify({"error": "credencial incorrecta"}), 401
    
    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        "access_token": access_token,
        "user": user.serialize()
    }), 200

