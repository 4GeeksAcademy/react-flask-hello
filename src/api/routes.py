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


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#LogIn Route 

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        # Authentication successful
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Login failed"}), 401
    
#SignUp Route 

@api.route('/signup', methods=['POST'])
def signup():
    data = request.json  
    # Process the data (e.g., store it in a database)

    return jsonify({'message': 'Signup successful'})

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
    # For example: db.session.add(new_event)
    #               db.session.commit()

    return jsonify({'message': 'Event created successfully'}), 201