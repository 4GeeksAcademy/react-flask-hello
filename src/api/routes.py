"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from api.models import db, User
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask import Flask, request, jsonify
from api.models import db, User, Student, Teacher, GradeLevel, Course, Schedule, Enrollment, Payment
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


# obtener datos de años escolares
@api.route('/setup/grade_levels', methods=['GET'])
def get_grade_levels():
    grade_levels = GradeLevel.query.all()
    return jsonify([gl.serialize() for gl in grade_levels]), 200

# precargar años escolares en la base de datos -- esta api no es para consumir, se ejectura al levantarse el servidor


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
                       'password', 'student_code', 'phone', 'grade_level_id', 'period']

    error = validate_required_fields(data, required_fields)
    if error:
        return jsonify({"error": error}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "El correo ya está registrado"}), 400

    if Student.query.filter_by(student_code=data['student_code']).first():
        return jsonify({"error": "El código de estudiante ya existe"}), 400

    valid_periods = ['primer', 'segundo', 'tercer', 'cuarto']
    if data['period'] not in valid_periods:
        return jsonify({"error": "Periodo inválido. Usa 'primer', 'segundo' o 'tercer' o 'cuarto'."}), 400

    user = User(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        password=generate_password_hash(data['password']),
        role='student',
        status='pending'
    )
    db.session.add(user)
    db.session.flush()

    student = Student(
        user_id=user.id,
        student_code=data['student_code'],
        phone=data['phone'],
        grade_level_id=data['grade_level_id'],
        period=data['period']
    )
    db.session.add(student)
    db.session.commit()

    return jsonify({"message": "Solicitud de registro como estudiante enviada"}), 201


# Registro profesor
@api.route('/register/teacher', methods=['POST'])
def register_teacher():
    data = request.get_json()
    required_fields = ['first_name', 'last_name',
                       'email', 'password', 'phone', 'course_id']

    error = validate_required_fields(data, required_fields)
    if error:
        return jsonify({"error": error}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "El correo ya está registrado"}), 400

    course_id = int(data['course_id'])
    course = Course.query.get(course_id)
    if not course:
        return jsonify({"error": "Curso no encontrado"}), 404

    user = User(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        password=generate_password_hash(data['password']),
        role='teacher',
        status='pending'
    )
    db.session.add(user)
    db.session.flush()

    teacher = Teacher(
        user_id=user.id,
        phone=data['phone']
    )
    db.session.add(teacher)
    db.session.flush()

    course.teacher_id = teacher.user_id
    db.session.commit()

    return jsonify({"message": "Solicitud de registro como profesor enviada"}), 201

# precargar las materias en base de datos -- esta api no es para consumir, se ejectura al levantarse el servidor


@api.route('/setup/courses', methods=['POST'])
def setup_courses():
    course_names = [
        "Matemáticas", "Física", "Biología", "Historia", "Computación",
        "Química", "Educación Física", "Educación Cívica", "Arte",
        "Religión", "Inglés", "Filosofía", "Tutoría"
    ]

    created = []
    for name in course_names:
        if not Course.query.filter_by(name=name).first():
            course = Course(name=name)
            db.session.add(course)
            created.append(name)

    db.session.commit()
    return jsonify({"message": f"Cursos creados: {created}"}), 201

# obtencion de materias


@api.route('/courses', methods=['GET'])
def get_courses():
    courses = Course.query.all()
    return jsonify([
        {"id": c.id, "name": c.name}
        for c in courses
    ]), 200


# Precargar horarios por año escolar en la base de datos             -- esta api no es para consumir, se ejectura al levantarse el servidor
@api.route('/setup/schedules', methods=['POST'])
def setup_schedules():
    horas = [("07:00", "09:00"), ("09:00", "11:00"), ("11:00", "13:00")]
    dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]

    horario = [
        [  # Primero
            ["Matemáticas", "Educación Física", "Inglés"],
            ["Historia", "Química", "Filosofía"],
            ["Biología", "Matemáticas", "Tutoría"],
            ["Educación Cívica", "Arte", "Física"],
            ["Computación", "Arte", "Física"]
        ],
        [  # Segundo
            ["Historia", "Física", "Filosofía"],
            ["Matemáticas", "Química", "Inglés"],
            ["Religión", "Educación Física", "Tutoría"],
            ["Educación Cívica", "Religión", "Matemáticas"],
            ["Inglés", "Filosofía", "Arte"]
        ],
        [  # Tercero
            ["Biología", "Historia", "Educación Cívica"],
            ["Computación", "Tutoría", "Arte"],
            ["Matemáticas", "Filosofía", "Educación Física"],
            ["Religión", "Inglés", "Arte"],
            ["Educación Física", "Matemáticas", "Física"]
        ],
        [  # Cuarto
            ["Física", "Tutoría", "Computación"],
            ["Educación Cívica", "Filosofía", "Religión"],
            ["Química", "Matemáticas", "Historia"],
            ["Inglés", "Filosofía", "Arte"],
            ["Religión", "Computación", "Biología"]
        ],
        [  # Quinto
            ["Educación Cívica", "Computación", "Religión"],
            ["Matemáticas", "Tutoría", "Educación Física"],
            ["Arte", "Química", "Física"],
            ["Filosofía", "Religión", "Matemáticas"],
            ["Inglés", "Educación Física", "Física"]
        ]
    ]

    from datetime import datetime
    created = []

    for year_index, semana in enumerate(horario, start=1):
        for dia_index, dia in enumerate(dias):
            for bloque_index, materia in enumerate(semana[dia_index]):
                course = Course.query.filter_by(name=materia).first()
                if not course:
                    continue
                inicio = datetime.strptime(
                    horas[bloque_index][0], "%H:%M").time()
                fin = datetime.strptime(horas[bloque_index][1], "%H:%M").time()

                db.session.add(Schedule(
                    course_id=course.id,
                    grade_level_id=year_index,
                    day=dia,
                    start_time=inicio,
                    end_time=fin,
                    classroom=f"Aula {year_index}"
                ))
                created.append(f"{materia} - {dia} - Año {year_index}")

    db.session.commit()
    return jsonify({"message": f"Se crearon {len(created)} horarios", "cursos": created}), 201

# Horario para PROFESORES --- Este endpoint devuelve el horario del profesor en el frontend


@api.route('/teacher/schedule', methods=['GET'])
@jwt_required()
def get_teacher_schedule():
    user_id = get_jwt_identity()
    teacher = Teacher.query.filter_by(user_id=user_id).first()

    if not teacher:
        return jsonify({"msg": "Profesor no encontrado"}), 404

    course = Course.query.filter_by(teacher_id=teacher.user_id).first()
    if not course:
        return jsonify({"msg": "Este profesor no tiene un curso asignado"}), 404

    schedules = Schedule.query.filter_by(course_id=course.id).all()
    return jsonify([s.serialize() for s in schedules]), 200


# Horario para ESTUDIANTES --- Este endpoint devuelve el horario del estudiante en el frontend
@api.route('/student/schedule', methods=['GET'])
@jwt_required()
def get_student_schedule():
    user_id = get_jwt_identity()
    student = Student.query.filter_by(user_id=user_id).first()

    if not student:
        return jsonify({"msg": "Estudiante no encontrado"}), 404

    grade_level_id = student.grade_level_id

    enrollments = Enrollment.query.filter_by(student_id=student.id).all()
    course_ids = [e.course_id for e in enrollments]

    schedules = Schedule.query.filter(
        Schedule.course_id.in_(course_ids),
        Schedule.grade_level_id == grade_level_id
    ).all()

    return jsonify([s.serialize() for s in schedules]), 200

# login admin


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

    access_token = create_access_token(identity=str(user.id))

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

  # Login estudiante


@api.route('/login/student', methods=['POST'])
def login_student():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"msg": "Email y contraseña requeridos"}), 400

    user = User.query.filter_by(email=email, role="student").first()

    if not user:
        return jsonify({"msg": "Estudiante no encontrado"}), 404

    if not check_password_hash(user.password, password):
        return jsonify({"msg": "Contraseña incorrecta"}), 401

    if user.status != "approved":
        return jsonify({"msg": "Cuenta no aprobada"}), 403

    access_token = create_access_token(identity=str(user.id))

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


# Login profesor
@api.route('/login/teacher', methods=['POST'])
def login_teacher():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"msg": "Email y contraseña requeridos"}), 400

    user = User.query.filter_by(email=email, role="teacher").first()
    if not user:
        return jsonify({"msg": "Profesor no encontrado"}), 404

    if not check_password_hash(user.password, password):
        return jsonify({"msg": "Contraseña incorrecta"}), 401

    if user.status != "approved":
        return jsonify({"msg": "Cuenta no aprobada"}), 403

    access_token = create_access_token(identity=str(user.id))

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


# Aprobación de registros de estudiantes y profesores por parte del admin

# obtener usuarios pendientes
@api.route('/pending/registrations', methods=['GET'])
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

# aprobación de registros de estudiantes y profesores


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


@api.route('/delete/user/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    admin_id = get_jwt_identity()
    admin = User.query.get(admin_id)

    if not admin or admin.role != "admin":
        return jsonify({"msg": "Acceso no autorizado"}), 403

    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    # Si es estudiante, eliminar el registro relacionado
    if user.role == "student":
        student = Student.query.filter_by(user_id=user.id).first()
        if student:
            db.session.delete(student)

    # Si es profesor, eliminar el registro relacionado y liberar el curso
    if user.role == "teacher":
        teacher = Teacher.query.filter_by(user_id=user.id).first()
        if teacher:
            course = Course.query.filter_by(teacher_id=teacher.user_id).first()
            if course:
                course.teacher_id = None  # quitarle el curso asignado
            db.session.delete(teacher)

    db.session.delete(user)
    db.session.commit()

    return jsonify({"msg": "Usuario eliminado correctamente"}), 200


# get admin
@api.route('/admin/profile', methods=['GET'])
@jwt_required()
def get_admin():
    user = User.query.get(get_jwt_identity())
    if not user or user.role != "admin":
        return jsonify({"msg": "Acceso no autorizado"}), 403
    return jsonify(user.serialize()), 200


# Información del estudiantes
@api.route('/students', methods=['GET'])
@jwt_required()
def get_approved_students():
    user_id = get_jwt_identity()
    admin = User.query.get(user_id)

    if not admin or admin.role != "admin":
        return jsonify({"msg": "Acceso no autorizado"}), 403

    students = User.query.filter_by(role="student", status="approved").all()
    return jsonify([s.serialize() for s in students]), 200


# Información del profesores
@api.route('/teachers', methods=['GET'])
@jwt_required()
def get_approved_teachers():
    user_id = get_jwt_identity()
    admin = User.query.get(user_id)

    if not admin or admin.role != "admin":
        return jsonify({"msg": "Acceso no autorizado"}), 403

    teachers = User.query.filter_by(role="teacher", status="approved").all()
    return jsonify([t.serialize() for t in teachers]), 200


# Información de cada perfil
@api.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    return jsonify(user.serialize()), 200


# Periodos academicos
@api.route('/periods', methods=['GET'])
def get_periods():
    periods = ['primer', 'segundo', 'tercer', 'cuarto']
    return jsonify(periods), 200
