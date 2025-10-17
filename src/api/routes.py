"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Patient, Doctor, Appointment, Center
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/user', methods=['GET'])
def get_user():
    data = request.get_json()
    user = User.query.get()
    return jsonify ({"id": user.id, "email": user.email}), 200

@api.route('/patient', methods=['GET'])
def get_patient():
    data = request.get_json()
    patients = Patient.query.get()
    return jsonify ({"id": patients.id, "email": patients.email}), 200

@api.route('/center_register', methods=['POST'])
def create_center():
    data = request.get_json()
    id = data.get("id")
    name = data.get("name")
    address = data.get("address")
    zip_code = data.get("zip_code")
    phone = data.get("phone")
    type_center = data.get("type_center")
    new_center = Center(
                        id=id,
                        name=name,
                        address=address,
                        zip_code=zip_code,
                        phone=phone,
                        type_center=type_center
                        )
    db.session.add(new_center)
    db.session.commit()
    return jsonify(new_center.serialize()), 200

@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get("email")
    first_name = data.get("first_name")
    last_name = data.get("last_name")
    birth_date = data.get("birth_date")
    
    role = data.get("role")
    password = data.get("password")

    if Patient.query.filter_by(email=email).first() or Doctor.query.filter_by(email=email).first():
        return jsonify({"msg": "This user already exists."})

    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(
        password=password.encode("utf-8"), salt=salt)

    if role == "doctor":
        specialty = data.get("specialty")
        center_id = data.get("center_id")
        work_days = data.get("work_days")

        new_doctor = Doctor(email=email,
                          first_name=first_name,
                          last_name=last_name,
                          specialty=specialty,
                          center_id=center_id,
                          password=hashed_password.decode("utf-8"),
                          work_days=work_days,
                          is_active=True
                        )
        db.session.add(new_doctor)
        db.session.commit()
        return jsonify(new_doctor.serialize()), 200
    
    elif role == "patient":
        new_patient = Patient(email=email,
                            first_name=first_name,
                            last_name=last_name,
                            birth_date=birth_date,
                            password=hashed_password.decode("utf-8"),
                            is_active=True
                        )
        db.session.add(new_patient)
        db.session.commit()
        return jsonify(new_patient.serialize()), 200
    
    else:
        return jsonify({"msg":"El rol no es valido",
                        "Error": f"El rol no coincide con doctor o paciente: {role}"}), 400


@api.route("/login/patient", methods=["POST"])
def create_token_patient():
    data = request.json
    username = data["email"]
    password = data["password"]

    user = Patient.query.filter_by(email=username).first()

    if not user or not bcrypt.checkpw(password.encode("utf-8"),user.password.encode("utf-8")):
        return jsonify({"msg": "Bad username or password"}), 401
     
    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id": user.id})

@api.route("/login/doctor", methods=["POST"])
def create_token_doctor():
    data = request.json
    username = data["email"]
    password = data["password"]

    user = Doctor.query.filter_by(email=username).first()
    
    if not user or not bcrypt.checkpw(password.encode("utf-8"),user.password.encode("utf-8")):
        return jsonify({"msg": "Bad username or password"}), 401
     
    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id": user.id})

@api.route("/protected/patient", methods=["GET"])
@jwt_required()
def protected_patient():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()
    user = Patient.query.get(current_user_id)
    return jsonify ({"id": user.id,
                     "email": user.email,
                     "first_name": user.first_name,
                     "last_name": user.last_name,
                     "birth_date": user.birth_date,
                     "password": user.password,
                     "assign_doctor": user.assign_doctor,
                     "is_active": user.is_active}), 200


@api.route("/protected/doctor", methods=["GET"])
@jwt_required()
def protected_doctor():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()
    user = Doctor.query.get(current_user_id)
    return jsonify ({"id": user.id,
                     "email": user.email,
                     "first_name": user.first_name,
                     "last_name": user.last_name,
                     "specialty": user.specialty,
                     "center_id": user.center_id,
                     "work_days": user.work_days,
                     "is_active": user.is_active,
                     "password": user.password}), 200