"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, MentorProfile, StudentProfile, MentorTopic
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import select, or_, func
from sqlalchemy.exc import SQLAlchemyError
import cloudinary.uploader
import os
from datetime import datetime, timedelta

# ------------------------------#
#    CALENDLY CONFIGURATION     #
# ------------------------------#

CALENDLY_API_KEY = os.getenv('CALENDLY_API_KEY')
CALENDLY_USER_URI = os.getenv('CALENDLY_USER_URI')
CALENDLY_BASE_URL = 'https://api.calendly.com'


def get_calendly_headers():
    """Retorna los headers necesarios para las peticiones a Calendly"""
    return {
        'Authorization': f'Bearer {CALENDLY_API_KEY}',
        'Content-Type': 'application/json'
    }


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


# --------------#
#    Helpers    #
# --------------#
def commit_and_serialize(obj):
    db.session.add(obj)
    db.session.commit()
    return jsonify(obj.serialize()), 201


def commit_only(obj):
    db.session.add(obj)
    db.session.commit()
    return obj


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/register', methods=['POST'])
def register():
    body = request.json
    if not body["password"]:
        return jsonify({"error": "Password is required"})
    hashed_password = generate_password_hash(body["password"])
    if body['role'] == 'mentor':
        role = True
    else:
        role = False
    new_user = User(email=body['email'],
                    password=hashed_password, role=role)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"success": True, "data": "user register log in now"}), 201


@api.route('/login', methods=['POST'])
def login():
    body = request.json
    query = select(User).where(User.email == body['email'])
    user = db.session.execute(query).scalar_one_or_none()

    if not user:
        return jsonify({"success": False, "data": "user not found"}), 404

    if not body["password"]:
        return jsonify({"success": False, "data": "Password is required"})

    if not check_password_hash(user.password, body["password"]):
        return jsonify({"success": False, "data": "Invalid password"}), 401

    role = user.role
    role_string = 'mentor' if role else 'student'

    token = create_access_token(identity=str(user.id))

    # obtenemos la url del avatar segun su relacion user.id -> mentor_profile.user_id
    avatar_url = None
    if user.role and user.mentor_profile:
        avatar_url = user.mentor_profile.avatar
    elif not user.role and user.student_profile:
        avatar_url = user.student_profile.avatar

    return jsonify({"success": True, "data": "user logged in", "token": token, "role": role,
                    "user": user.serialize()}), 200


@api.route('/dashboard', methods=["GET"])
@jwt_required()
def private():
    id = get_jwt_identity()
    print('user id is ----------------------------------------> ', id)

    user = db.session.get(User, id)
    role = user.role
    role_string = 'mentor' if role else 'student'
    return jsonify({"success": True, "data": "user logged in",
                    "user": {"id": user.id,
                             "email": user.email,
                             "role": role_string}}), 200


# ------------------#
#       USERS       #
# ------------------#

@api.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([u.serialize() for u in users])


@api.route("/users/<int:id>", methods=["GET"])
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify(user.serialize())


@api.route("/users", methods=["POST"])
def create_user():
    data = request.json
    user = User(
        email=data["email"],
        password=data["password"],
        role=data["role"]
    )

    db.session.add(user)
    db.session.commit()
    return jsonify(user.serialize()), 201


@api.route("/users/<int:id>", methods=["PUT"])
def update_user(id):
    user = User.query.get_or_404(id)
    data = request.json
    user.email = data.get("email", user.email)
    user.password = data.get("password", user.password)
    user.role = data.get("role", user.role)

    db.session.commit()
    return jsonify(user.serialize())


@api.route("/users/<int:id>", methods=["DELETE"])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted"})


# ----------------------#
#   MENTOR PROFILES     #
# ----------------------#

@api.route("/mentor-profiles", methods=["GET"])
def get_mentor_profiles():
    mentor_profiles = MentorProfile.query.all()
    return jsonify([mp.serialize() for mp in mentor_profiles])


@api.route("/mentor-profiles/<int:userId>", methods=["GET"])
def get_mentor_profile(userId):
    query = select(MentorProfile).where(MentorProfile.user_id == userId)
    mentor_profile = db.session.execute(query).scalar_one()
    return jsonify(mentor_profile.serialize())


# -------------------start filter get

@api.route("/mentor-profiles/filter", methods=["GET"])
def filter_mentor_profiles():
    skills_filter = request.args.get('skills')
    years_experience_filter = request.args.get('years_experience')
    language_filter = request.args.get('language')

    query = MentorProfile.query

    if skills_filter:
        skills_list = [s.strip().lower() for s in skills_filter.split(',')]
        conditions = [func.lower(MentorProfile.skills).ilike(
            f'%{skill}%') for skill in skills_list]
        query = query.filter(or_(*conditions))
        # query = query.filter(MentorProfile.skills.ilike(f'%{skills_filter}%'))

    # filter by “years of experience”: example mentors with more than 3 years of experience
    if years_experience_filter:
        query = query.filter(MentorProfile.years_experience >=
                             int(years_experience_filter))

    if language_filter:
        query = query.filter(MentorProfile.language == language_filter)

    mentor_profiles = query.all()

   # print(f"Resultados encontrados: {len(mentor_profiles)}")
    # print(f"Mentores: {[mp.serialize() for mp in mentor_profiles]}")

    return jsonify({
        "success": True,
        "count": len(mentor_profiles),
        "data": [mp.serialize() for mp in mentor_profiles]
    }), 200

# -------------------end filter get


@api.route("/mentor-profiles", methods=["POST"])
def create_mentor_profile():
    data = request.json
    mentor_profile = MentorProfile(
        username=data["username"],
        name=data["name"],
        avatar=data["avatar"],
        user_id=data["user_id"],
        hourly_rate=data["hourly_rate"],
        years_experience=data["years_experience"],
        bio=data.get("bio"),
        availability=data.get("availability"),
        linkedin_url=data.get("linkedin_url"),
        website=data.get("website"),
        skills=data.get("skills"),
        interests=data.get("interests"),
        language=data.get("language"),
        location=data.get("location"))
    db.session.add(mentor_profile)
    db.session.commit()
    return jsonify(mentor_profile.serialize()), 201


@api.route("/mentor-profiles/<int:userId>", methods=["PUT"])
def update_mentor_profile(userId):
    query = select(MentorProfile).where(MentorProfile.user_id == userId)
    mentor_profile = db.session.execute(query).scalar_one()
    data = request.json
    try:
        mentor_profile.username = data.get("username", mentor_profile.username)
        mentor_profile.name = data.get("name", mentor_profile.name)
        mentor_profile.avatar = data.get("avatar", mentor_profile.avatar)
        mentor_profile.years_experience = data.get(
            "years_experience", mentor_profile.years_experience)
        mentor_profile.bio = data.get("bio", mentor_profile.bio)
        mentor_profile.availability = data.get(
            "availability", mentor_profile.availability)
        mentor_profile.hourly_rate = data.get(
            "hourly_rate", mentor_profile.hourly_rate)
        mentor_profile.linkedin_url = data.get(
            "linkedin_url", mentor_profile.linkedin_url)
        mentor_profile.website = data.get("website", mentor_profile.website)
        mentor_profile.skills = data.get("skills", mentor_profile.skills)
        mentor_profile.interests = data.get(
            "interests", mentor_profile.interests)
        mentor_profile.language = data.get("language", mentor_profile.language)
        mentor_profile.location = data.get("location", mentor_profile.location)
        db.session.commit()
        return jsonify(mentor_profile.serialize())
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({
            "error": True,
            "message": "No se pudo crear el perfil del mentor."
        }), 400


@api.route("/mentor-profiles/<int:id>", methods=["DELETE"])
def delete_mentor_profile(id):
    mentor_profile = MentorProfile.query.get_or_404(id)

    db.session.delete(mentor_profile)
    db.session.commit()
    return jsonify({"message": "Mentor profile deleted"})


# ------------------------#
#   STUDENT PROFILES      #
# ------------------------#

@api.route("/student-profiles", methods=["GET"])
def get_student_profiles():
    student_profiles = StudentProfile.query.all()
    return jsonify([sp.serialize() for sp in student_profiles])


@api.route("/student-profiles/user/<int:user_id>", methods=["GET"])
def get_student_profile_by_user(user_id):
    student_profile = StudentProfile.query.filter_by(user_id=user_id).first()
    if not student_profile:
        return jsonify({"error": "Perfil no encontrado"}), 404
    return jsonify(student_profile.serialize())


@api.route("/student-profiles", methods=["POST"])
def create_student_profile():
    data = request.json
    raw_exp = data.get("experience_level")
    experience_level = None
    if raw_exp:
        experience_level = raw_exp.strip().upper()
        allowed = ["BEGINNER", "INTERMEDIATE", "ADVANCED"]
        if experience_level not in allowed:
            return jsonify({
                "error": "Valor de experience_level no válido",
                "allowed": allowed
            }), 400
    student_profile = StudentProfile(
        user_id=data["user_id"],
        username=data.get("username"),
        name=data.get("name"),
        interests=data.get("interests"),
        goals=data.get("goals"),
        experience_level=experience_level,
        skills=data.get("skills"),
        language=data.get("language") or "SPANISH",
        location=data.get("location")
    )
    db.session.add(student_profile)
    db.session.commit()
    return jsonify(student_profile.serialize()), 201


@api.route("/student-profiles/user/<int:user_id>", methods=["PUT"])
def update_student_profile_by_user(user_id):
    student_profile = StudentProfile.query.filter_by(user_id=user_id).first()
    if not student_profile:
        return jsonify({"error": "Perfil no encontrado"}), 404

    data = request.json
    student_profile.username = data.get("username", student_profile.username)
    student_profile.name = data.get("name", student_profile.name)
    student_profile.location = data.get("location", student_profile.location)
    student_profile.interests = data.get(
        "interests", student_profile.interests)
    student_profile.goals = data.get("goals", student_profile.goals)
    student_profile.experience_level = data.get(
        "experience_level", student_profile.experience_level)
    student_profile.skills = data.get("skills", student_profile.skills)
    student_profile.language = data.get("language", student_profile.language)

    db.session.commit()
    return jsonify(student_profile.serialize())


@api.route("/student-profiles/<int:id>", methods=["DELETE"])
def delete_student_profile(id):
    student_profile = StudentProfile.query.get_or_404(id)
    db.session.delete(student_profile)
    db.session.commit()
    return jsonify({"message": "Student profile deleted"})


# ----------------------#
#  TYPES MENTORING     #
# ----------------------#


@api.route("/type-mentoring", methods=["POST"])
def create_type_mentoring():
    data = request.json
    type_mentoring = MentorTopic(
        mentor_profile_id=data["user_id"],
        title=data.get("title"),
        description=data.get("description"),
        difficulty_level=data.get("difficulty_level"),
        price=data.get("price"),
        duration=data.get("duration")
    )
    db.session.add(type_mentoring)
    db.session.commit()
    return jsonify(type_mentoring.serialize()), 201

# se obtienen todas los tipos de mentorias de un mentor


@api.route("/types-mentoring/<int:userId>", methods=["GET"])
def get_types_mentoring(userId):
    query = select(MentorTopic).where(MentorTopic.mentor_profile_id == userId)
    types_mentoring = db.session.execute(query).scalars().all()
   # print(f"Tipos de mentoria------>>>>: {[tm.serialize() for tm in  types_mentoring]}")
    return jsonify([tm.serialize() for tm in types_mentoring])

# se obtiene un tipo de mentoria en especifico segun el Id


@api.route("/type-mentoring/<int:id>", methods=["GET"])
def get_type_mentoring(id):
    query = select(MentorTopic).where(MentorTopic.id == id)
    type_mentoring = db.session.execute(query).scalar_one()

    return jsonify(type_mentoring.serialize())

# se editan los datos de un tipo mentoria segun el id


@api.route("/type-mentoring/<int:id>", methods=["PUT"])
def update_type_mentoring(id):
    type_mentoring = MentorTopic.query.get_or_404(id)
    data = request.json
    type_mentoring.title = data.get(
        "title", type_mentoring.title)
    type_mentoring.description = data.get(
        "description", type_mentoring.description)
    type_mentoring.duration = data.get(
        "duration", type_mentoring.duration)
    type_mentoring.difficulty_level = data.get(
        "difficulty_level", type_mentoring.difficulty_level)
    type_mentoring.price = data.get("price", type_mentoring.price)
    type_mentoring.mentor_profile_id = data.get(
        "user_id", type_mentoring.mentor_profile_id)
    db.session.commit()
    return jsonify(type_mentoring.serialize())

# Elimina el tipo de mentoria por Id


@api.route("/type-mentoring/<int:id>", methods=["DELETE"])
def delete_type_mentoring(id):
    type_mentoring = MentorTopic.query.get_or_404(id)
    db.session.delete(type_mentoring)
    db.session.commit()
    return jsonify({"message": "Type mentoring delete"})


@api.route("upload-avatar", methods=['POST'])
def upload_avatar():
    file = request.files.get('avatar')
    print(file)
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    try:
        result = cloudinary.uploader.upload(
            file,
            folder='mentormatch/avatars',
            resource_type='image',
            overwrite=True

        )

        avatar_url = result.get("secure_url")
        public_id = result.get("public_id")

        return jsonify({
            "url": avatar_url,
            "public_id": public_id
        }), 200

    except Exception as error:
        return jsonify({"error": str(error)}), 500


# ----------------------#
#  CALENDLY             #
# ----------------------#

api.route('/calendly/mentorias', methods=['GET'])


@jwt_required()
def get_event_types():
    """Obtiene las clases disponibles del mentor"""
    try:
        headers = get_calendly_headers()
        response = requests.get(
            f'{CALENDLY_BASE_URL}/event_types',
            headers=headers,
            params={'user': CALENDLY_USER_URI}
        )

        if response.status_code == 200:
            return jsonify({
                "success": True,
                "data": response.json()
            }), 200
        else:
            return jsonify({
                "success": False,
                "error": "No se pudieron obtener las clases",
                "details": response.text
            }), response.status_code

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@api.route('/calendly/mentorias-programadas', methods=['GET'])
@jwt_required()
def get_scheduled_events():
    try:
        # Autorizacion para comunicarse con la API de calendly
        headers = get_calendly_headers()

        # Para eventos activos, cancelados, busqueda entre dos fechas...
        status = request.args.get('status', 'active')
        min_start_time = request.args.get('min_start_time')
        max_start_time = request.args.get('max_start_time')

        # Construir parámetros para la petición
        params = {
            'user': CALENDLY_USER_URI,
            'status': status
        }

        # Si hay fechas en la url las agrega
        if min_start_time:
            params['min_start_time'] = min_start_time
        if max_start_time:
            params['max_start_time'] = max_start_time

        # Pide a Calendly las mentorías con los filtros
        response = requests.get(
            f'{CALENDLY_BASE_URL}/scheduled_events',
            headers=headers,
            params=params
        )

        # Proceso de la petición y obtención de los datos de las mentorías o en su defecto error.
        if response.status_code == 200:
            return jsonify({
                "success": True,
                "data": response.json()
            }), 200
        else:
            return jsonify({
                "success": False,
                "error": "No se pudieron obtener los eventos",
                "details": response.text
            }), response.status_code

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
