"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask import Flask, request, jsonify
from api.models import db, User, Student, Teacher, GradeLevel
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Validaciones


def validate_required_fields(data, required_fields):
    missing = [
        field for field in required_fields
        if field not in data or (isinstance(data[field], str) and not data[field].strip())
    ]
    if missing:
        return f"Campos faltantes o vacíos: {', '.join(missing)}"
    return None


# Registro admin

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
        password=generate_password_hash(data['password']),
        role='admin',
        status='approved'
    )
    db.session.add(admin)
    db.session.commit()

    return jsonify({"message": "Administrador registrado exitosamente"}), 201

# Darle datos a grade level
@api.route('/setup/grade_levels', methods=['GET'])
def get_grade_levels():
    grade_levels = GradeLevel.query.all()
    return jsonify([gl.serialize() for gl in grade_levels]), 200

@api.route('/setup/grade_levels', methods=['POST'])
def setup_grade_levels():
    niveles = [

        'Primero de secundaria',
        'Segundo de secundaria',
        'Tercero de secundaria',
        'Cuarto de secundaria',
        'Quinto de secundaria',
    ]

    for i, name in enumerate(niveles, start=1):
        if not GradeLevel.query.get(i):  # Evita duplicados si ya existen
            db.session.add(GradeLevel(id=i, name=name))

    db.session.commit()
    return jsonify({"message": "Niveles académicos creados exitosamente"}), 201


# Registro estudiante

@api.route('/register/student', methods=['POST'])
def register_student():
    data = request.json
    required_fields = ['first_name', 'last_name', 'email',
                       'password', 'student_code', 'phone', 'grade_level_id']

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
    db.session.flush()  # necesario para obtener user.id antes de commit

    student = Student(
        user_id=user.id,
        student_code=data['student_code'],
        phone=data['phone'],
        grade_level_id=data['grade_level_id']
    )
    db.session.add(student)
    db.session.commit()

    return jsonify({"message": "Solicitud de registro como estudiante enviada"}), 201

# Registro profesor
@api.route('/register/teacher', methods=['POST'])
def register_teacher():
    data = request.json
    required_fields = ['first_name', 'last_name',
                       'email', 'password', 'department', 'phone']

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
        user_id=user.id,
        department=data['department'],
        phone=data['phone']
    )
    db.session.add(teacher)
    db.session.commit()

    return jsonify({"message": "Solicitud de registro como profesor enviada"}), 201


#login admin
@api.route('/login/admin', methods=['POST'])
def login_admin():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"msg": "Email y contraseña requeridos"}), 400

    user = User.query.filter_by(email=email, role="admin").first()
    if not user:
        return jsonify({"msg": "Administrador no encontrado"}), 404

    if not check_password_hash(user.password, password):
        return jsonify({"msg": "Contraseña incorrecta"}), 401

    # No se requiere verificación de status para el admin

    access_token = create_access_token(identity=user.id)

    return jsonify({
        "access_token": access_token,
        "user": {
            "id": user.id,
            "email": user.email,
            "role": user.role,
            "first_name": user.first_name,
            "last_name": user.last_name
        }
    }), 200





# Login para estudiantes
@api.route('/login/student', methods=['POST'])
def login_student():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if user and user.check_login(password, 'student'):
        return jsonify({
            "message": "Login de estudiante exitoso",
            "role": user.role,
            "user": user.serialize()
        }), 200

    return jsonify({"message": "Credenciales inválidas para estudiante"}), 401


# Login para profesores
@api.route('/login/teacher', methods=['POST'])
def login_teacher():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if user and user.check_login(password, 'teacher'):
        return jsonify({
            "message": "Login de profesor exitoso",
            "role": user.role,
            "user": user.serialize()
        }), 200

    return jsonify({"message": "Credenciales inválidas para profesor"}), 401


#Completar login profesor y estudinates 
#///////////////////////////////////
#///////////////////////////////7//
#////////////////////////////////////


#Aprobación de registros de estudiantes y profesores

@api.route('/pending/registrations', methods=['GET']) #// obtener usuarios pendientes
@jwt_required()
def get_pending_users():
    user_id = get_jwt_identity()
    admin = User.query.get(user_id)

    if not admin or admin.role != "admin":
        return jsonify({"msg": "Acceso no autorizado"}), 403

    pending_users = User.query.filter(
        User.status == "pending",
        User.role.in_(["student", "teacher"])
    ).all()

    return jsonify([user.serialize() for user in pending_users]), 200

    
@api.route('/approve/student/<int:user_id>', methods=['PUT'])
@jwt_required()
def approve_student(user_id):
    user = User.query.filter_by(id=user_id, role="student").first()

    if not user:
        return jsonify({"msg": "Estudiante no encontrado"}), 404

    data = request.get_json()
    status = data.get("status")

    if status not in ["approved", "rejected"]:
        return jsonify({"msg": "Estado inválido. Usa 'approved' o 'rejected'."}), 400

    user.status = status
    db.session.commit()

    return jsonify({"msg": f"Estado del estudiante actualizado a '{status}'"}), 200


@api.route('/approve/teacher/<int:user_id>', methods=['PUT'])
@jwt_required()
def approve_teacher(user_id):
    user = User.query.filter_by(id=user_id, role="teacher").first()

    if not user:
        return jsonify({"msg": "Profesor no encontrado"}), 404

    data = request.get_json()
    status = data.get("status")

    if status not in ["approved", "rejected"]:
        return jsonify({"msg": "Estado inválido. Usa 'approved' o 'rejected'."}), 400

    user.status = status
    db.session.commit()

    return jsonify({"msg": f"Estado del profesor actualizado a '{status}'"}), 200
