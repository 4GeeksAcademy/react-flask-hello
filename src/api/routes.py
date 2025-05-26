"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask import Flask, request, jsonify
from api.models import db, User, Student, Teacher
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


def validate_required_fields(data, required_fields):
    missing = [field for field in required_fields if field not in data or not data[field]]
    if missing:
        return f"Campos faltantes o vacíos: {', '.join(missing)}"
    return None

@api.route('/register/admin', methods=['POST'])
def register_admin():
    data = request.json
    required_fields = ['first_name', 'last_name', 'email', 'password']

    error = validate_required_fields(data, required_fields)
    if error:
        return jsonify({"error": error}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "El correo ya está registrado"}), 400

    admin = User(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        password=data['password'],
        role='admin',
        status='approved'
    )
    db.session.add(admin)
    db.session.commit()

    return jsonify({"message": "Administrador registrado exitosamente"}), 201


@api.route('/register/student', methods=['POST'])
def register_student():
    data = request.json
    required_fields = ['first_name', 'last_name', 'email', 'password', 'student_code', 'academic_year_id']

    error = validate_required_fields(data, required_fields)
    if error:
        return jsonify({"error": error}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "El correo ya está registrado"}), 400

    if Student.query.filter_by(student_code=data['student_code']).first():
        return jsonify({"error": "El código de estudiante ya existe"}), 400

    user = User(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        password=data['password'],
        role='student',
        status='pending'
    )
    db.session.add(user)
    db.session.flush()

    student = Student(
        id=user.id,
        student_code=data['student_code'],
        academic_year_id=data['academic_year_id']
    )
    db.session.add(student)
    db.session.commit()

    return jsonify({"message": "Solicitud de registro como estudiante enviada"}), 201


@api.route('/register/teacher', methods=['POST'])
def register_teacher():
    data = request.json
    required_fields = ['first_name', 'last_name', 'email', 'password', 'department']

    error = validate_required_fields(data, required_fields)
    if error:
        return jsonify({"error": error}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "El correo ya está registrado"}), 400

    user = User(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        password=data['password'],
        role='teacher',
        status='pending'
    )
    db.session.add(user)
    db.session.flush()

    teacher = Teacher(
        id=user.id,
        department=data['department']
    )
    db.session.add(teacher)
    db.session.commit()

    return jsonify({"message": "Solicitud de registro como profesor enviada"}), 201