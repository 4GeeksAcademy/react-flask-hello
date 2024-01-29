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
from api.models import db, User
from api.utils import get_openai_response, format_user_input, validate_user_input, hash_password, get_hash, verify_password
from flask_cors import CORS

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
    email = request.json.get("email")
    password = request.json.get("password")

    hashed_password = hash_password(password)

    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"Success": "User created successfully"}), 200


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()

    if not user or not verify_password(user.password, password):
        return jsonify({"error": "Invalid email or password"}), 401

    access_token = create_access_token(identity={"email": email, "user_id": user.id})

    return jsonify(access_token=access_token, user_id=user.id)


@api.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    response = jsonify({"message": "Logout successful"})
    unset_jwt_cookies(response)
    return redirect(url_for('/')), 200


@api.route("/any-route", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@api.route("/get-hash", methods=["POST"])
def handle_get_hash():
    to_hash = request.json.get("string")
    return get_hash(to_hash)


@api.route("/private_page", methods=["GET"])
@jwt_required()
def private_page():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    return render_template("private_page.html", user=user)


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
    


if __name__ == "__main__":
    app.run(debug=True)
