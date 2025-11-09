"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, redirect, url_for, session
from api.models import db, User, MentorProfile, StudentProfile, MentorTopic, Mentoring, StatusEnum
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, decode_token
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import select, or_, func
from sqlalchemy.exc import SQLAlchemyError
import cloudinary.uploader
import os
import requests
from urllib.parse import urlencode
from datetime import datetime, timedelta
from flask_mail import Mail, Message
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
import requests
from pprint import pprint


def get_valid_calendly_token(mentor_profile):

    if not mentor_profile.calendly_access_token:
        return None

    # aqui verificamos si el token expiro

    if mentor_profile.calendly_token_expires_at and mentor_profile.calendly_token_expires_at > datetime.utcnow():
        return mentor_profile.calendly_access_token

    # si expiro lo refrescamos
    token_url = 'https://auth.calendly.com/oauth/token'

    token_response = requests.post(
        token_url,
        data={
            'grant_type': 'refresh_token',
            'client_id': CALENDLY_CLIENT_ID,
            'client_secret': CALENDLY_CLIENT_SECRET,
            'refresh_token': mentor_profile.calendly_refresh_token
        },
        headers={'Content-Type': 'application/x-www-form-urlencoded'}
    )

    if token_response.status_code != 200:
        print("Error al refrescar el token Calendly:", token_response.text)
        return None

    token_data = token_response.json()

    # aqui guardamos los nuevos tokens

    mentor_profile.calendly_access_token = token_data.get('access_token')
    mentor_profile.calendly_refresh_token = token_data.get('refresh_token')
    mentor_profile.calendly_token_expires_at = datetime.utcnow(
    ) + timedelta(seconds=token_data.get('expires_in', 3600))
    db.session.commit()

    return mentor_profile.calendly_access_token


# ------------------------------#
#    CALENDLY CONFIGURATION     #
# ------------------------------#
CALENDLY_API_KEY = os.getenv('CALENDLY_API_KEY')
CALENDLY_USER_URI = os.getenv('CALENDLY_USER_URI')
CALENDLY_BASE_URL = 'https://api.calendly.com'

CALENDLY_CLIENT_ID = os.getenv('CALENDLY_CLIENT_ID')
CALENDLY_REDIRECT_URI = os.getenv('CALENDLY_REDIRECT_URI')
CALENDLY_CLIENT_SECRET = os.getenv('CALENDLY_CLIENT_SECRET')
URL_BACKEND = os.getenv('VITE_BACKEND_URL')
CALENDLY_ACCESS_TOKEN = os.getenv('CALENDLY_ACCESS_TOKEN')
CALENDLY_ORGANIZATION_URI = os.getenv('CALENDLY_ORGANIZATION_URI')


URL = os.getenv('FRONTEND_URL')


def get_calendly_headers():
    """Retorna los headers necesarios para las peticiones a Calendly"""
    return {
        'Authorization': f'Bearer {CALENDLY_API_KEY}',
        'Content-Type': 'application/json'
    }

# ------------------------------#
#  PASSWORD RESET HELPERS       #
# ------------------------------#


def generate_reset_token(user_id):
    """
    Genera un token JWT para restablecer contraseña
    - El token expira en 1 hora
    """
    token = create_access_token(
        identity=str(user_id),
        expires_delta=timedelta(hours=1),
        additional_claims={"type": "password_reset"}
    )
    return token


def verify_reset_token(token):
    """
    Verifica si el token JWT es válido y no ha expirado
    - Retorna el objeto User si el token es válido
    - Retorna None si el token es inválido o expiró
    """
    try:
        # Decodificar el token sin verificar la firma primero (para debug)
        decoded = decode_token(token, allow_expired=False)

        print(f"Token decoded successfully: {decoded}")

        # Verificar que sea un token de reset de contraseña
        if decoded.get('type') != 'password_reset':
            print("Token type mismatch")
            return None

        user_id = decoded['sub']
        user = db.session.get(User, int(user_id))

        if user:
            print(f"User found: {user.email}")
        else:
            print(f"User not found with id: {user_id}")

        return user

    except ExpiredSignatureError as e:
        print(f"Token expired: {str(e)}")
        return None
    except InvalidTokenError as e:
        print(f"Invalid token: {str(e)}")
        return None
    except Exception as e:
        print(f"Unexpected error verifying token: {str(e)}")
        return None


def send_reset_email(user_email, token, mail):
    """
    Envía email con enlace de restablecimiento
    - user_email: email del destinatario
    - token: token generado para el reset
    """
    # Construir la URL completa de reset (frontend)
    reset_url = f"{os.getenv('FRONTEND_URL')}reset-password?token={token}"

    # Crear mensaje de email
    msg = Message(
        subject="Restablecer Contraseña - MentorMatch",
        sender=os.getenv('MAIL_DEFAULT_SENDER'),
        recipients=[user_email]
    )

    # Versión texto plano del email
    msg.body = f"""Hola,

Has solicitado restablecer tu contraseña en MentorMatch.

Haz clic en el siguiente enlace para restablecer tu contraseña:
{reset_url}

Este enlace expirará en 1 hora.

Si no solicitaste este cambio, ignora este mensaje.

Saludos,
El equipo de MentorMatch
"""

    # Versión HTML del email
    msg.html = f"""
    <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #4a5568;">Restablecer Contraseña</h2>
                <p>Hola,</p>
                <p>Has solicitado restablecer tu contraseña en <strong>MentorMatch</strong>.</p>
                <p>Haz clic en el siguiente botón para restablecer tu contraseña:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="{reset_url}" 
                       style="background-color: #4299e1; color: white; padding: 12px 30px; 
                              text-decoration: none; border-radius: 5px; display: inline-block;">
                        Restablecer Contraseña
                    </a>
                </div>
                <p style="color: #718096; font-size: 14px;">
                    O copia y pega este enlace en tu navegador:<br>
                    <a href="{reset_url}" style="color: #4299e1;">{reset_url}</a>
                </p>
                <p style="color: #718096; font-size: 14px;">
                    <strong>Este enlace expirará en 1 hora.</strong>
                </p>
                <p style="color: #718096; font-size: 14px;">
                    Si no solicitaste este cambio, ignora este mensaje.
                </p>
                <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
                <p style="color: #a0aec0; font-size: 12px;">
                    Saludos,<br>
                    El equipo de MentorMatch
                </p>
            </div>
        </body>
    </html>
    """

    # Envia el email
    mail.send(msg)


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

    # filter by "years of experience": example mentors with more than 3 years of experience
    if years_experience_filter:
        query = query.filter(MentorProfile.years_experience >=
                             int(years_experience_filter))

    if language_filter:
        query = query.filter(MentorProfile.language == language_filter)

    mentor_profiles = query.all()

   

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
        avatar=data["avatar"],
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
    student_profile.avatar = data.get("avatar", student_profile.avatar)

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

    mentor_profile = MentorProfile.query.filter_by(
        user_id=data["user_id"]).first()

    if not mentor_profile or not mentor_profile.calendly_access_token:
        return jsonify({"success": False, "error": "Mentor not connected to Calendly"}), 400

    type_mentoring = MentorTopic(
        mentor_profile_id=mentor_profile.user_id,
        title=data.get("title"),
        description=data.get("description"),
        difficulty_level=data.get("difficulty_level"),
        price=data.get("price"),
        duration=data.get("duration")
    )
    db.session.add(type_mentoring)
    db.session.commit()

    # aqui le indicamos a calendly la creacion del nuevo evento

    calendly_url = "https://api.calendly.com/event_types"
    headers = {
        "Authorization": f"Bearer {mentor_profile.calendly_access_token}",
        "Content-Type": "application/json"
    }

    payload = {
        "owner": mentor_profile.calendly_user_uri,
        "name": data["title"],
        "active": True,
        "duration": int(data["duration"]),
        "color": "#0069ff",
        "description_html": data["description"]
    }

    response = requests.post(calendly_url, json=payload, headers=headers)

    if response.status_code == 201:
        calendly_data = response.json()

        type_mentoring.calendly_event_type_slug = calendly_data["resource"]["scheduling_url"]
        type_mentoring.calendly_event_type_uri = calendly_data["resource"]["uri"]

        db.session.commit()
        return jsonify({"success": True, "message": "Sesion creada y sincronizada con Calendly",
                        "data": type_mentoring.serialize()}), 201
    else:
        print("Error al crear evento en Calendly", response.text)
        return jsonify({"success": True, "message": "Sesion creada en MentorMacth, pero no sinconizada con Calendly"}), 200

  #  return jsonify(type_mentoring.serialize()), 201

# se obtienen todas los tipos de mentorias de un mentor


@api.route("/types-mentoring/<int:userId>", methods=["GET"])
def get_types_mentoring(userId):
    query = select(MentorTopic).where(MentorTopic.mentor_profile_id == userId)
    types_mentoring = db.session.execute(query).scalars().all()
   
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

@api.route('/calendly/mentorias', methods=['GET'])
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

# ----------------------#
#   Reset password      #
# ----------------------#
@api.route('/request-password-reset', methods=['POST'])
def reset_password_request():
    """
    PASO 1: Usuario solicita restablecer contraseña
    - Recibe el email del usuario
    - Genera un token JWT de seguridad
    - Envía email con enlace de restablecimiento
    """
    data = request.json
    email = data.get('email')

    # Validar que se envió el email
    if not email:
        return jsonify({
            "success": False,
            "message": "El email es requerido"
        }), 400

    # Buscar usuario por email en BD
    query = select(User).where(User.email == email)
    user = db.session.execute(query).scalar_one_or_none()

    # Por seguridad, no revelar si el email existe o no
    message = "If the email address exists in our system, you will receive a link to reset your password."

    if user:
        try:
            # Generar token JWT
            token = generate_reset_token(user.id)

            # Obtener la instancia de Flask-Mail
            from flask import current_app
            mail = current_app.extensions.get('mail')

            # Enviar email con el enlace de restablecimiento
            send_reset_email(user.email, token, mail)

            return jsonify({
                "success": True,
                "message": message
            }), 200

        except Exception as e:
            print(f"Error sending email: {str(e)}")
            # Por seguridad, devolver mensaje exitoso aunque falle
            return jsonify({
                "success": True,
                "message": message
            }), 200

    return jsonify({
        "success": True,
        "message": message
    }), 200


@api.route('/reset-password/<token>', methods=['POST'])
def reset_password(token):
    """
    PASO 2: Usuario establece nueva contraseña
    - Verifica que el token JWT sea válido y no haya expirado
    - Actualiza la contraseña del usuario
    """
    data = request.json
    new_password = data.get('password')

    # Validar que se haya enviado una contraseña
    if not new_password:
        return jsonify({
            "success": False,
            "message": "Password is required"
        }), 400

    if len(new_password) < 8:
        return jsonify({
            "success": False,
            "message": "The password must be at least 8 characters long."
        }), 400

    # Verificar el token JWT y obtener el usuario
    user = verify_reset_token(token)

    if not user:
        return jsonify({
            "success": False,
            "message": "The token is invalid or has expired."
        }), 400

    try:
        # Actualizar la contraseña
        user.password = generate_password_hash(new_password)
        db.session.commit()

        return jsonify({
            "success": True,
            "message": "Your password has been successfully updated."
        }), 200

    except Exception as e:
        db.session.rollback()
        print(f"Error updating password: {str(e)}")
        return jsonify({
            "success": False,
            "message": "Error updating password"
        }), 500


@api.route('/verify-reset-token/<token>', methods=['GET'])
def verify_token(token):
    """
    Verificar si un token JWT es válido
    Útil para validar el token antes de mostrar el formulario de reset
    """
    print(f"Received token for verification: {token[:50]}...")  # Debug

    user = verify_reset_token(token)

    if user:
        return jsonify({
            "success": True,
            "message": "Valid token",
            "user_email": user.email  # Opcional: mostrar email en frontend
        }), 200
    else:
        return jsonify({
            "success": False,
            "message": "Invalid or expired token"
        }), 400

@api.route('/mentor/<int:mentor_id>/authorize_calendly', methods=["POST"])
def authorize_calendly(mentor_id):
    query = select(MentorProfile).where(MentorProfile.user_id == mentor_id)
    mentor = db.session.execute(query).scalar_one_or_none()

    if not mentor:
        return jsonify({"error": "Mentor not found"}), 404

    session['current_mentor_id'] = mentor.user_id

    params = {
        'response_type': 'code',
        'client_id': CALENDLY_CLIENT_ID,
        'redirect_uri': CALENDLY_REDIRECT_URI,
        'state': mentor.user_id

    }

    auth_url = "https://auth.calendly.com/oauth/authorize?" + urlencode(params)
    return jsonify({"auth_url": auth_url}), 200


# aqui intercambiamos el code por el token y luego almacenarlo

@api.route('/calendly/callback', methods=['GET'])
def calendly_callback():
    code = request.args.get('code')
    if not code:
        return jsonify({"error": "Authorization code not found"}), 400

    token_url = 'https://auth.calendly.com/oauth/token'

    token_response = requests.post(
        token_url,
        data={
            'grant_type': 'authorization_code',
            'client_id': CALENDLY_CLIENT_ID,
            'client_secret': CALENDLY_CLIENT_SECRET,
            'redirect_uri': CALENDLY_REDIRECT_URI,
            'code': code
        },
        headers={
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    )

    if token_response.status_code != 200:
        print(token_response.text)
        return jsonify({
            "success": False,
            "error": "Failed access token",
            "details": token_response.text
        }), token_response.status_code

    token_data = token_response.json()
    
    mentor_id = request.args.get('state')

    print("Mentor ID", mentor_id)
    if not mentor_id:
        return jsonify({"error": "Mentor ID not found"}), 400

    mentor_profile = MentorProfile.query.filter_by(user_id=mentor_id).first()
    if not mentor_profile:
        return jsonify({"error": "Mentor profile not found"}), 404

    # aqui guardamos los datos de calendly

    mentor_profile.calendly_access_token = token_data.get('access_token')
    mentor_profile.calendly_refresh_token = token_data.get('refresh_token')
    mentor_profile.calendly_connected = True
    mentor_profile.calendly_token_expires_at = datetime.utcnow(
    ) + timedelta(seconds=token_data.get('expires_in', 3600))

    # obtenemos el user_uri y scheduling_url
    user_response = requests.get(
        'https://api.calendly.com/users/me',
        headers={'Authorization': f"Bearer {token_data['access_token']}"}
    )

    if user_response.status_code == 200:
        user_data = user_response.json()
        organization_uri = user_data['resource']['current_organization']

        mentor_profile.calendly_user_uri = user_data['resource']['uri']
        mentor_profile.calendly_username = user_data['resource']['name']
        mentor_profile.scheduling_url = user_data['resource']['scheduling_url']

    db.session.commit()

    # aqui registramos el webhook en calendly para recibir informacion

    webhook_url = URL_BACKEND + "api/calendly/webhook"
    access_token = token_data.get('access_token')
    organization_uri = token_data.get('organization')

    webhook_payload = {
        'url': webhook_url,
        'events': ['invitee.created', 'invitee.canceled'],
        'scope': 'user',
        'user': mentor_profile.calendly_user_uri,
        'organization': organization_uri

    }

    webhook_response = requests.post(
        "https://api.calendly.com/webhook_subscriptions",
        headers={
            "Authorization": f"Bearer {mentor_profile.calendly_access_token}",
            "Content-Type": "application/json"
        },
        json=webhook_payload
    )

    print("Respuesta de Calendly webhook", webhook_response.json())

    if webhook_response.status_code == 201:
        webhook_data = webhook_response.json()["resource"]
        mentor_profile.calendly_webhook_uri = webhook_data["uri"]
        if "signing_key" in webhook_data:
            mentor_profile.calendly_signing_key = webhook_data["signing_key"]
        db.session.commit()

    return redirect(URL + "dashboard/mentor/services?connected=true")


# endpoint para verificar el status de conexion
@api.route('/mentor/<int:mentor_id>/calendly_status', methods=['GET'])
def calendly_status(mentor_id):
    mentor = MentorProfile.query.filter_by(user_id=mentor_id).first()
    get_valid_calendly_token(mentor)
    if not mentor:
        return jsonify({"error": "Mentor not found"}), 404

    return jsonify({
        "connected": mentor.calendly_connected,
        "scheduling_url": mentor.scheduling_url
    }), 200

###############################################
# Endpoint que se ejecuta al detectar cambios #
# registros de envento en calendly            #
###############################################


@api.route('/calendly/webhook', methods=['POST'])
def calendly_webhook():
    try:
        data = request.json

        event = data.get('event')
        payload = data.get('payload', {})
        # print("DATA COMPLETO:", type(data), data)

        if event == 'invitee.created':
            invitee = payload.get('invitee', {})
            event_data = payload.get('scheduled_event', {})

            # Obtenemos el tipo de sesión asociado
            event_type_uri = payload.get(
                'scheduled_event', {}).get('event_type')
            type_mentoring = MentorTopic.query.filter_by(
                calendly_event_type_uri=event_type_uri
            ).first()

            if not type_mentoring:
                print("Evento no asociado a ningún mentor")
                return jsonify({"success": False, "error": "Evento no encontrado"}), 404

            mentor_profile = MentorProfile.query.filter_by(
                user_id=type_mentoring.mentor_profile_id).first()

            if not mentor_profile:
                print(" Mentor no encontrado para este evento")
                return jsonify({"success": False, "error": "Mentor no encontrado"}), 404

            # Usamos el token del mentor (refrescándolo si hace falta)
            token = get_valid_calendly_token(mentor_profile)

            # Obtenemos detalles del evento desde Calendly con el token del mentor
            event_url = event_data.get('uri')
            event_response = requests.get(
                event_url,
                headers={"Authorization": f"Bearer {token}"}
            )

            if event_response.status_code == 200:
                event_details = event_response.json().get("resource", {})
            else:
                print(" No se pudieron obtener detalles del evento:",
                      event_response.text)
                event_details = {}

            # verificamos si existe mentoria ya registrada para evitar duplicados
            invitee_uri = event_details.get('uri')
            existing_mentoring = Mentoring.query.filter_by(
                calendly_event_uri=invitee_uri).first()
            if existing_mentoring:
                print(f"Mentoria ya existe, se ignora {invitee_uri}")
                return jsonify({"success": True, "message": "Duplicate ignored"}), 200

            #  Obtenemos el estudiante por email
            student_email = payload.get('email')
            student_user = User.query.filter_by(email=student_email).first()

            if not student_user:
                print(" No se encontró usuario con email:", student_email)
                return jsonify({"success": False, "error": "Estudiante no encontrado"}), 404

            student_profile = StudentProfile.query.filter_by(
                user_id=student_user.id).first()
            if not student_profile:
                return jsonify({"success": False, "error": "Perfil estudiante no encontrado"}), 404

            #  Guardamos la reserva en la BD
            mentoring = Mentoring(
                topic_id=type_mentoring.id,
                mentor_profile_id=type_mentoring.mentor_profile_id,
                student_id=student_profile.user_id,
                start_time=event_details.get('start_time'),
                end_time=event_details.get('end_time'),
                calendly_event_uri=event_details.get('event_type'),
                calendly_invitee_uri=event_details.get('uri'),
                status=StatusEnum.SCHEDULED,
                scheduled_at=event_details.get('start_time'),
                duration_minutes=type_mentoring.duration,
                pricing_topic=type_mentoring.price
            )

            db.session.add(mentoring)
            db.session.commit()

            print(" Nueva sesión programada:", mentoring.id)

        elif event == 'invitee.canceled':
            invitee = payload.get('invitee', {})
            invitee_uri = payload.get('scheduled_event', {}).get('uri')
            reason = payload.get('cancellation', {}).get('reason')
            mentoring = Mentoring.query.filter_by(
                calendly_invitee_uri=invitee_uri
            ).first()

            if mentoring:
                mentoring.status = StatusEnum.CANCELED
                mentoring.notes = reason
                db.session.commit()
                print(f" Sesión cancelada: {invitee_uri}")

        return jsonify({"success": True}), 200

    except Exception as e:
        print(" Error en Calendly webhook:", e)
        return jsonify({"success": False, "error": str(e)}), 500


# ----------------------#
#  MENTORING            #
# ----------------------#
@api.route('/sessions/<int:mentor_id>', methods=['GET'])
def manage_sessions(mentor_id):
    query = select(Mentoring).where(Mentoring.mentor_profile_id == mentor_id)
    sessions = db.session.execute(query).scalars().all()

    return jsonify([se.serialize() for se in sessions])
