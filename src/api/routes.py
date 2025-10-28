"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Patient, Doctor, Appointment, Center
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime

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
    doctors = Doctor.all_doctors()
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

    #lo pide el front pero nosotros no lo usamos
    #license_number = data.get("license_number")
    #phone_number = data.get("phone_number")

    # Campos con valores falsos
    specialty_falso = "General"
    center_id_falso = None
    work_days_falso = 0

    if not email or not password or not first_name or not last_name:
        response = jsonify({"msg": "email, password, nombre y apellido son requeridos."})
        #solucion cors temporal
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 400

    if Doctor.query.filter_by(email=email).first():
        response = jsonify({"msg": "This user already exists."})
        #solucion cors temporal
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 400

    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(
        password=password.encode("utf-8"), salt=salt)

    # Crear el nuevo doctor con valores falsos para los campos faltantes
    new_doctor = Doctor.create(email=email,
                    first_name=first_name,
                    last_name=last_name,
                    specialty=specialty_falso,
                    center_id=center_id_falso,
                    password=hashed_password.decode("utf-8"),
                    work_days=work_days_falso,
                    )
    
    response = jsonify(new_doctor.serialize())
    #solucion temporal CORS
    response.headers.add("Access-Control-Allow-Origin", "*")
    
    return response, 201


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

@api.route('/doctor/<int:doctor_id>', methods=['PUT'])
def update_doctor_details(doctor_id):

    # Buscamos al doctor
    doctor_to_update = Doctor.query.get(doctor_id)
    # Buscamos al doctor y verificamos que exista
    if not doctor_to_update:
        return jsonify({"error": "Paciente no encontrado"}), 404
    data = request.get_json()

    updates_to_make = {}

    # Si cambia la contraseña la hasheamos
    hashed_password = None
    if 'password' in data:
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), salt=salt)
        updates_to_make['password'] = hashed_password
    # Chequeamos si cambio el mail
    if 'email' in data:
        updates_to_make['email'] = data['email']
    # Chequeamos si cambio el doctor
    if 'work_days' in data:
        updates_to_make['work_days'] = data['work_days']
    if 'center_id' in data:
        updates_to_make['center_id'] = data['center_id']

    # Actualizamos el doctor
    doctor_to_update.update(**updates_to_make)
    # Devolvemos el doctor actualizado
    return jsonify(doctor_to_update.serialize()), 200

@api.route('/register/patient', methods=['POST'])
def register_patient():
    data = request.get_json()
    email = data.get("email")
    first_name = data.get("first_name")
    last_name = data.get("last_name")
    birth_date = data.get("birth_date")
    password = data.get("password")

    #Modelos no tiene phone number pero lo pide el front
    #phone_number = data.get("phone_number")

    if not email or not password or not first_name or not last_name or not birth_date:
        response = jsonify({"msg": "Todos los campos principales (email, password, nombre, apellido, fecha) son requeridos."})
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 400

    if Patient.query.filter_by(email=email).first():
        response = jsonify({"msg": "This user already exists."})
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 400
    
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(
        password=password.encode("utf-8"), salt=salt)

    new_patient = Patient.create(
            email=email,
            first_name=first_name,
            last_name=last_name,
            birth_date=birth_date,
            #phone_number=phone_number,
            password=hashed_password.decode("utf-8"),
            assign_doctor=data.get("assign_doctor", None)
            )
    response = jsonify(new_patient.serialize())

    #Solucion temporal CORS
    response.headers.add("Access-Control-Allow-Origin", "*")
    
    return response, 201

@api.route('/patient/<int:patient_id>', methods=['PUT'])
def update_patient_details(patient_id):

    # Buscamos al paciente
    patient_to_update = Patient.query.get(patient_id)
    if not patient_to_update:
        return jsonify({"error": "Paciente no encontrado"}), 404
    data = request.get_json()

    # Creamos un diccionario con los cambios
    updates_to_make = {}

    # Si cambia la contraseña la hasheamos
    hashed_password = None
    if 'password' in data:
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), salt=salt)
        updates_to_make['password'] = hashed_password
    # Chequeamos si cambio el correo
    if 'email' in data:
        updates_to_make['email'] = data['email']
    # Chequeamos si cambio el doctor
    if 'assign_doctor' in data:
        updates_to_make['assign_doctor'] = data['assign_doctor']

    # Actualizamos el paciente
    patient_to_update.update(**updates_to_make)
    # Devolvemos el paciente actualizado
    return jsonify(patient_to_update.serialize()), 200

@api.route(('/patient/<int:patient_id>/inactive_patient'), methods=['PUT'])
def set_inactive(patient_id):

    # Buscamos al paciente y verificamos que existe
    patient_set_inactive = Patient.query.get(patient_id)
    if not patient_set_inactive:
        return jsonify({"error": "Paciente no encontrado"}), 404
    # Cambiamos su estado a inactivo
    patient_set_inactive.soft_delete()
    serialized_patient = patient_set_inactive.serialize()
    return serialized_patient

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

@api.route('/appointment', methods=['POST'])
def create_appointment():
    data = request.get_json()
    doctor_id = data.get("doctor_id")
    patient_id = data.get("patient_id")
    center_id = data.get("center_id")
    appointment_date = data.get("appointment_date")

    # Validamos que doctor y appointment no esten vacios
    if not doctor_id or not appointment_date:
            return jsonify({"msg": "doctor_id y appointment_date son requeridos para pedir cita"}), 400
    # Pasamos el String del JSON a formato Date
    appointment_dt = datetime.strptime(appointment_date, "%d-%m-%Y %H:%M")

    new_appointment = Appointment.create(
            doctor_id=doctor_id,
            patient_id=patient_id,
            center_id=center_id,
            appointment_date=appointment_dt,
            )
    return jsonify(new_appointment.serialize()), 201

@api.route('/appointment/<int:appointment_id>', methods=['PUT'])
def update_appointment(appointment_id):

    # Buscamos la cita
    update_appointment = Appointment.query.get(appointment_id)
    if not update_appointment:
        return jsonify({"error": "Cita no encontrada"}), 404
    data = request.get_json()
    appointment_date = data.get('appointment_date')

    updates_to_make = {}

    to_date = datetime.strptime(appointment_date, "%d-%m-%Y %H:%M")
    if 'appointment_date' in data:
        updates_to_make['appointment_date'] = to_date
    
    if 'status' in data:
        updates_to_make['status'] = data.get('status')
    
    # Actualizamos la cita
    update_appointment.update(**updates_to_make)
    
    # Devolvemos la cita actualizada
    return jsonify(update_appointment.serialize()), 200

@api.route('/appointment/<int:appointment_id>/cancel', methods=['PUT'])
def cancel_appointment(appointment_id):

     # Buscamos al paciente y verificamos que existe
    cancelled_appointment = Appointment.query.get(appointment_id)
    if not cancelled_appointment:
        return jsonify({"error": "Cita no encontrada"}), 404
    
    # Cambiamos su estado a inactivo
    cancelled_appointment.cancel()
    serialized_appointment = cancelled_appointment.serialize()
    return serialized_appointment