"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import json
from flask import Flask, request, render_template, jsonify, redirect, url_for, Blueprint
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    get_jwt_identity,
    jwt_required,
    unset_jwt_cookies,
)
from api.models import Itinerary, db, User
from api.utils import get_openai_response, format_user_input, validate_user_input,get_hash
from flask_cors import CORS
import datetime

app = Flask(__name__)
jwt = JWTManager(app)

api = Blueprint("api", __name__)

# Allow CORS requests to this API
CORS(api)


@api.route("/hello", methods=["POST", "GET"])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/signup", methods=["POST"])
def signup():
    first_name = request.json.get("first_name")
    last_name = request.json.get("last_name")
    email = request.json.get("email")
    password = request.json.get("password")
    confirm_password = request.json.get("confirm_password")

    if password != confirm_password:
        return jsonify({"error": "Password and confirm password do not match"}), 400
    

    
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
       return jsonify({"error": "Email is already in use"}), 400

    hashed_password = get_hash(password)

    new_user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=hashed_password,
    )
    
    db.session.add(new_user)
    
    try:
        db.session.commit()
        return jsonify({"success": "User created successfully"}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error creating user: {e}"}), 500
    


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email, password=get_hash(password)).first()

    if not user :
        return jsonify({"error": "Invalid email or password"}), 401

    access_token = create_access_token(identity={"email": email, "user_id": user.id}, expires_delta=datetime.timedelta(hours=6))

    return jsonify(access_token=access_token, user_id=user.id)


@api.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    try:
        current_user = get_jwt_identity()

        if current_user is None:
            return jsonify({"error": "Invalid JWT token"}), 401

        response = jsonify({"message": "Successfully logged out"})
        unset_jwt_cookies(response)

        return response
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route("/any-route", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@api.route("/get-hash", methods=["POST"])
def handle_get_hash():
    to_hash = request.json.get("string")
    return get_hash(to_hash)


@api.route("/privatePage", methods=["GET"])
@jwt_required()
def private_page():
    try:
        current_user = get_jwt_identity()
        user = User.query.filter_by(email=current_user["email"]).first()

        if not user:
            return jsonify({"error": "User not found"}), 404

        return jsonify(first_name=user.first_name, last_name=user.last_name, email=user.email)

    except Exception as e:
        return jsonify({"error": str(e)}), 500



@api.route("/createItinerary", methods=["GET", "POST"])
def create_itinerary():
    try:
        if request.method == "GET":
            assistant_reply = get_openai_response()
            assistant_dict = json.loads(assistant_reply)
            return jsonify(assistant_dict)
        
        elif request.method == "POST":
            json_data = request.json
            user_input = format_user_input(json_data)
            
            validation_result = validate_user_input(json_data)
            if not validation_result["valid"]:
                return jsonify({"error": validation_result["error"]}), 400

            assistant_reply = get_openai_response(user_input)
            assistant_dict = json.loads(assistant_reply)
            return jsonify(assistant_dict)

        else:
            return jsonify({"error": "Unsupported request method"}), 405

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@api.route("/saveItinerary", methods=["POST"])
@jwt_required()
def save_itinerary():
    try:
        current_user = get_jwt_identity()
        user = User.query.filter_by(email=current_user["email"]).first()

        if not user:
            return jsonify({"error": "User not found"}), 404

        data = request.json

        if "itinerary" in data:
            itinerary = Itinerary(user=user, data=data["itinerary"], itinerary_name=data["itineraryName"])
            db.session.add(itinerary)
            db.session.commit()

            return jsonify({"message": "Itinerary saved successfully"})

        return jsonify({"error": "Invalid request data"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route("/getItineraries", methods=["GET"])
@jwt_required()
def get_itineraries():
    try:
        current_user = get_jwt_identity()
        user = User.query.filter_by(email=current_user["email"]).first()

        if not user:
            return jsonify({"error": "User not found"}), 404

        itineraries = Itinerary.query.filter_by(user_id=user.id).all()

        serialized_itineraries = [itinerary.serialize() for itinerary in itineraries]

        return jsonify({"itineraries": serialized_itineraries})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@api.route("/deleteItinerary/<int:itinerary_id>", methods=["DELETE"])
@jwt_required()
def delete_itinerary(itinerary_id):
    try:
        current_user_email = get_jwt_identity()
        user = User.query.filter_by(email=current_user_email).first()

        if not user:
            return jsonify({"error": "User not found"}), 404

        itinerary = Itinerary.query.filter_by(id=itinerary_id, user_id=user.id).first()

        if not itinerary:
            return jsonify({"error": "Itinerary not found or does not belong to the user"}), 404

        db.session.delete(itinerary)
        db.session.commit()

        return jsonify({"message": "Itinerary deleted successfully"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
