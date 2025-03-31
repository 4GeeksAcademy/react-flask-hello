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

    if not body or not body.get("email") or not body.get("password") or not body.get("name") or not body.get("lastname") or not body.get("dni"):
        return jsonify({"error": "You must provide email, password, name, lastname and dni"}), 400

    if User.query.filter_by(email=body["email"]).first():
        return jsonify({"error": "The user already exists"}), 400

    try:

        new_user = User(
            email=body.get("email"),
            password=body.get("password"),
            name=body.get("name"),
            lastname=body.get("lastname"),
            dni=body.get("dni")

        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"msg": "User created!!"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@api.route('/login', methods=['POST'])
def login():

    body = request.get_json()

    if not body or not body.get("email") or not body.get("password"):
        return jsonify({"error": "You must provide email and password"}), 400

    user = User.query.filter_by(email=body["email"]).first()

    if not user or not user.check_password(body["password"]):
        return jsonify({"error": "Incorrect credentials"}), 401

    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        "access_token": access_token,
        "user": user.serialize()
    }), 200


@api.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify(user.serialize()), 200
