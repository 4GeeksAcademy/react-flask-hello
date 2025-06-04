"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from api.models import db, User
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask import Flask, request, jsonify
from api.models import db, User, Student, Teacher, GradeLevel, Course, Schedule, Enrollment, Payment, datetime, Attendance, Grade
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
                       'password', 'phone', 'grade_level_id', 'period']

    error = validate_required_fields(data, required_fields)
    if error:
        return jsonify({"error": error}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "El correo ya está registrado"}), 400

    valid_periods = ['Primer', 'Segundo', 'Tercer', 'Cuarto']
    if data['period'] not in valid_periods:
        return jsonify({"error": "Periodo inválido. Usa 'Primer', 'Segundo' o 'Tercer' o 'Cuarto'."}), 400

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


# Precargar horarios por año escolar en la base de datos -- esta api no es para consumir, se ejectura al levantarse el servidor
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


# Obtener lista de estudiantes por grado y curso para PROFESORES
@api.route('/teacher/students', methods=['GET'])
@jwt_required()
def get_students_by_course_and_grade():
    teacher_id = get_jwt_identity()

    # Validar que quien consulta sea un profesor aprobado
    user = User.query.get(teacher_id)
    if not user or user.role != "teacher" or user.status != "approved":
        return jsonify({"msg": "Acceso no autorizado"}), 403

    # Obtener los parámetros grade_level_id y course_id desde la URL
    grade_level_id = request.args.get("grade_level_id", type=int)
    course_id = request.args.get("course_id", type=int)

    # Verificar que ambos parámetros estén presentes
    if not grade_level_id or not course_id:
        return jsonify({"msg": "Faltan parámetros: grade_level_id y course_id son requeridos"}), 400

    # Buscar las inscripciones de estudiantes en ese curso
    enrollments = Enrollment.query.filter_by(course_id=course_id).all()

    # Filtrar las inscripciones por el grado académico (grade_level_id)
    filtered = [
        {
            "enrollment_id": e.id,
            "student": e.student.serialize()  # Devuelve los datos completos del estudiante
        }
        for e in enrollments if e.student.grade_level_id == grade_level_id
    ]

    # Responder con la lista de estudiantes inscritos en ese curso y grado
    return jsonify(filtered), 200


# Registrar asistencia -- para PROFESORES
@api.route('/attendance', methods=['POST'])
@jwt_required()
def register_attendance():
    data = request.get_json()
    required_fields = ['enrollment_id', 'date', 'status']

    error = validate_required_fields(data, required_fields)
    if error:
        return jsonify({"error": error}), 400

    # Validar estado permitido
    valid_status = ["asistio", "falto", "tardanza", "no registrado"]
    if data['status'] not in valid_status:
        return jsonify({"error": "Estado de asistencia no válido."}), 400

    try:
        attendance_date = datetime.datetime.strptime(
            data['date'], "%Y-%m-%d").date()
    except ValueError:
        return jsonify({"error": "Formato de fecha inválido. Use YYYY-MM-DD."}), 400

    # Verificar que la inscripción exista
    enrollment = Enrollment.query.get(data['enrollment_id'])
    if not enrollment:
        return jsonify({"error": "Matrícula no encontrada."}), 404

    # Crear asistencia
    attendance = Attendance(
        enrollment_id=data['enrollment_id'],
        date=attendance_date,
        status=data['status']
    )
    db.session.add(attendance)
    db.session.commit()

    return jsonify({"message": "Asistencia registrada exitosamente."}), 201


# Historial de asistencia por estudiante (vía enrollment) -- para PROFESORES
@api.route('/attendance', methods=['GET'])
@jwt_required()
def get_attendance_by_enrollment():
    enrollment_id = request.args.get('enrollment_id')

    if not enrollment_id:
        return jsonify({"error": "Parámetro 'enrollment_id' requerido."}), 400

    attendances = Attendance.query.filter_by(enrollment_id=enrollment_id).all()
    return jsonify([a.serialize() for a in attendances]), 200


# Registrar una calificacion de un estudiante -- para PROFESORES
@api.route('/grade', methods=['POST'])
@jwt_required()
def post_grade():
    teacher_id = get_jwt_identity()

    data = request.get_json()
    required_fields = [
        'enrollment_id', 'period', 'participation', 'homework', 'midterm', 'final_exam'
    ]

    error = validate_required_fields(data, required_fields)
    if error:
        return jsonify({"error": error}), 400

    # Validar existencia de la matrícula y del profesor
    enrollment = Enrollment.query.get(data['enrollment_id'])
    if not enrollment:
        return jsonify({"error": "Inscripción no encontrada."}), 404

    teacher = Teacher.query.get(teacher_id)
    if not teacher:
        return jsonify({"error": "Profesor no encontrado."}), 404

    # Validar que no exista una nota previa para ese enrollment y periodo
    existing = Grade.query.filter_by(
        enrollment_id=data['enrollment_id'],
        period=data['period']
    ).first()
    if existing:
        return jsonify({"error": "La calificación para este periodo ya fue registrada."}), 409

    # Calcular el promedio ponderado
    average = round(
        data['participation'] * 0.15 +
        data['homework'] * 0.20 +
        data['midterm'] * 0.30 +
        data['final_exam'] * 0.35, 2
    )

    grade = Grade(
        enrollment_id=data['enrollment_id'],
        teacher_id=teacher_id,
        period=data['period'],
        participation=data['participation'],
        homework=data['homework'],
        midterm=data['midterm'],
        final_exam=data['final_exam'],
        average=average
    )

    db.session.add(grade)
    db.session.commit()

    return jsonify({"message": "Nota registrada exitosamente."}), 201


# Obtener notas por estudiante (enrollment_id)
@api.route('/grades', methods=['GET'])
@jwt_required()
def get_grades():
    enrollment_id = request.args.get('enrollment_id', type=int)
    if not enrollment_id:
        return jsonify({"error": "Parámetro 'enrollment_id' requerido."}), 400

    grades = Grade.query.filter_by(enrollment_id=enrollment_id).all()
    return jsonify([g.serialize() for g in grades]), 200


# Actualizar calificación existente -- para PROFESORES
@api.route('/grade/<int:grade_id>', methods=['PUT'])
@jwt_required()
def update_grade(grade_id):
    teacher_id = get_jwt_identity()
    data = request.get_json()

    grade = Grade.query.get(grade_id)
    if not grade:
        return jsonify({"error": "Calificación no encontrada"}), 404

    if grade.teacher_id != teacher_id:
        return jsonify({"error": "No autorizado para modificar esta calificación"}), 403

    # Actualizar campos si están en el payload
    if 'participation' in data:
        grade.participation = data['participation']
    if 'homework' in data:
        grade.homework = data['homework']
    if 'midterm' in data:
        grade.midterm = data['midterm']
    if 'final' in data:
        grade.final = data['final']

    # Recalcular promedio
    p = grade.participation or 0
    h = grade.homework or 0
    m = grade.midterm or 0
    f = grade.final or 0
    grade.average = round(p * 0.15 + h * 0.20 + m * 0.30 + f * 0.35, 2)

    db.session.commit()
    return jsonify({"message": "Calificación actualizada correctamente"}), 200



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
    periods = ['Primer', 'Segundo', 'Tercer', 'Cuarto']
    return jsonify(periods), 200
