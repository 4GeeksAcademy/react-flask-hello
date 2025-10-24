"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Patient, Doctor, Appointment, Center
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/user', methods=['GET'])
def get_user():
    data = request.get_json()
    user = User.query.get()
    return jsonify ({"id": user.id, "email": user.email}), 200

@api.route('/patients', methods=['GET'])
def get_all_patient():
    patients = Patient.all_patients()
    return jsonify([patient.serialize() for patient in patients]), 200

@api.route('/doctors', methods=['GET'])
def get_all_doctors():
    doctors = Patient.all_doctors()
    return jsonify([doctor.serialize() for doctor in doctors]), 200

@api.route('/center_register', methods=['POST'])
def create_center():
    data = request.get_json()
    name = data.get("name")
    address = data.get("address")
    zip_code = data.get("zip_code")
    phone = data.get("phone")
    type_center = data.get("type_center")

    new_center = Center.create(
                        name=name,
                        address=address,
                        zip_code=zip_code,
                        phone=phone,
                        type_center=type_center
                        )
    return jsonify(new_center.serialize()), 201

@api.route('/register/doctor', methods=['POST'])
def register_doctor():
    data = request.get_json()
    email = data.get("email")
    first_name = data.get("first_name")
    last_name = data.get("last_name")
    password = data.get("password")
    specialty = data.get("specialty")
    center_id = data.get("center_id")
    work_days = data.get("work_days")

    if not email or not password:
        return jsonify({"msg": "email, password y role son requeridos"}), 400

    if Doctor.query.filter_by(email=email).first():
        return jsonify({"msg": "This user already exists."})

    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(
        password=password.encode("utf-8"), salt=salt)


    new_doctor = Doctor.create(email=email,
                    first_name=first_name,
                    last_name=last_name,
                    specialty=specialty,
                    center_id=center_id,
                    password=hashed_password.decode("utf-8"),
                    work_days=work_days,
                    )
    return jsonify(new_doctor.serialize()), 201


@api.route('/register/patient', methods=['POST'])
def register_patient():
    data = request.get_json()
    email = data.get("email")
    first_name = data.get("first_name")
    last_name = data.get("last_name")
    birth_date = data.get("birth_date")
    password = data.get("password")

    if not email or not password:
        return jsonify({"msg": "email, password y role son requeridos"}), 400

    if Patient.query.filter_by(email=email).first():
        return jsonify({"msg": "This user already exists."})
    
    if not first_name or not last_name:
            return jsonify({"msg": "first_name y last_name son requeridos para patient"}), 400
    
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(
        password=password.encode("utf-8"), salt=salt)

    new_patient = Patient.create(
            email=email,
            first_name=first_name,
            last_name=last_name,
            birth_date=birth_date,
            password=hashed_password.decode("utf-8"),
            assign_doctor=data.get("assign_doctor")
            )
    return jsonify(new_patient.serialize()), 201

    

@api.route("/login/patient", methods=["POST"])
def create_token_patient():
    data = request.json
    username = data["email"]
    password = data["password"]

    user = Patient.query.filter_by(email=username).first()

    if not user or not bcrypt.checkpw(password.encode("utf-8"),user.password.encode("utf-8")):
        return jsonify({"msg": "Bad username or password"}), 401
     
    access_token = create_access_token(identity=str(user.id))
    return jsonify({"token": access_token, "user_id": user.id})

@api.route("/login/doctor", methods=["POST"])
def create_token_doctor():
    data = request.json
    username = data["email"]
    password = data["password"]

    user = Doctor.query.filter_by(email=username).first()
    print(user.id)
    
    if not user or not bcrypt.checkpw(password.encode("utf-8"),user.password.encode("utf-8")):
        return jsonify({"msg": "Bad username or password"}), 401
     
    access_token = create_access_token(identity=str(user.id))
    return jsonify({"token": access_token, "user_id": user.id})

@api.route("/protected/patient", methods=["GET"])
@jwt_required()
def protected_patient():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = int(get_jwt_identity())
    user = Patient.query.get(current_user_id)
    return jsonify (user.serialize()), 200


@api.route("/protected/doctor", methods=["GET"])
@jwt_required()
def protected_doctor():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = int(get_jwt_identity())
    print(current_user_id)
    user = Doctor.query.get(current_user_id)
    return jsonify (user.serialize()), 200