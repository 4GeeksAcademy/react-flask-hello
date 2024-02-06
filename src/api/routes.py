"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Event
from api.utils import generate_sitemap, APIException
from flask_cors import CORS 
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


#Create flask app
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != email or password != password:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


@api.route('/hello', methods=['POST', 'GET'])

#TO PROTECT THE ROUTE USE JWT REQUIRED ***************

def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the Google Inspector, and you will see the GET request"
    }

    return jsonify(response_body), 200
    
#SignUp Route 

@api.route('/sign-up', methods=['POST'])
def sign_up():
    try:
        # Parse and validate the incoming JSON data
        data = request.json
        required_fields = ['firstName', 'lastName', 'email', 'password']
        for field in required_fields:
            if field not in data:
                raise APIException(f"Missing {field} in request body", status_code=400)

        # Check if the user already exists in the database
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user:
            raise APIException("User with this email already exists", status_code=400)

        # Create a new user and save it to the database
        new_user = User(
            first_name=data['firstName'],
            last_name=data['lastName'],
            email=data['email'],
            password=data['password']
        )
        db.session.add(new_user)
        db.session.commit()

        # Generate JWT token for the new user
        access_token = create_access_token(identity=data['email'])

        # Return success message and token
        return jsonify({
            'message': 'User registered successfully',
            'access_token': access_token
        }), 201

    except Exception as e:
        # Handle any exceptions and return an error message
        return jsonify({'error': str(e)}), 500


#Event Route 

@api.route('/create-event', methods=['POST'])
def create_event():
    data = request.json

    # Event model with appropriate fields (name, description, location, date, price, image)

    new_event = Event(
        name=data['name'],
        description=data['description'],
        location=data['location'],
        date=data['date'],
        price=data['price'],
        image=data['image']
    )

    # Save to database or perform any required actions
    db.session.add(new_event)
    db.session.commit()

    return jsonify({'message': 'Event created successfully'}), 201

@api.route('/edit-event', methods=['PATCH'])
def edit_event():
    data = request.json

    update