"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User, MentorProfile, StudentProfile
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from sqlalchemy import select

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../dist/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


def commit_and_serialize(obj):
    db.session.add(obj)
    db.session.commit()
    return jsonify(obj.serialize()), 201

# ------------------------
# Helpers
# ------------------------


def commit_and_serialize(obj):
    db.session.add(obj)
    db.session.commit()
    return jsonify(obj.serialize()), 201


def commit_only(obj):
    db.session.add(obj)
    db.session.commit()
    return obj


# ------------------#
#       USERS       #
# ------------------#


@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([u.serialize() for u in users])


@app.route("/users/<int:id>", methods=["GET"])
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify(user.serialize())


@app.route("/users", methods=["POST"])
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


@app.route("/users/<int:id>", methods=["PUT"])
def update_user(id):
    user = User.query.get_or_404(id)
    data = request.json
    user.email = data.get("email", user.email)
    user.password = data.get("password", user.password)
    user.role = data.get("role", user.role)
    db.session.commit()
    return jsonify(user.serialize())


@app.route("/users/<int:id>", methods=["DELETE"])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted"})


# ----------------------#
#   MENTOR PROFILES     #
# ----------------------#
@app.route("/mentor-profiles", methods=["GET"])
def get_mentor_profiles():
    mentor_profiles = MentorProfile.query.all()
    return jsonify([mp.serialize() for mp in mentor_profiles])


@app.route("/mentor-profiles/<int:id>", methods=["GET"])
def get_mentor_profile(id):
    mentor_profile = MentorProfile.query.get_or_404(id)
    return jsonify(mentor_profile.serialize())


@app.route("/mentor-profiles", methods=["POST"])
def create_mentor_profile():
    data = request.json
    mentor_profile = MentorProfile(
        username=data["username"],
        name=data["name"],
        avatar=data["avatar"],
        user_id=data["user_id"],
        rate=data["rate"],
        years_experience=data["years_experience"],
        bio=data.get("bio"),
        availability=data.get("availability"),
        hourly_rate=data.get("hourly_rate"),
        linkedin_url=data.get("linkedin_url"),
        website=data.get("website"),
        skills=data.get("skills"),
        interests=data.get("interests")
    )
    db.session.add(mentor_profile)
    db.session.commit()
    return jsonify(mentor_profile.serialize()), 201


@app.route("/mentor-profiles/<int:id>", methods=["PUT"])
def update_mentor_profile(id):
    mentor_profile = MentorProfile.query.get_or_404(id)
    data = request.json
    mentor_profile.username = data.get("username", mentor_profile.username)
    mentor_profile.name = data.get("name", mentor_profile.name)
    mentor_profile.avatar = data.get("avatar", mentor_profile.avatar)
    mentor_profile.rate = data.get("rate", mentor_profile.rate)
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
    mentor_profile.interests = data.get("interests", mentor_profile.interests)
    db.session.commit()
    return jsonify(mentor_profile.serialize())


@app.route("/mentor-profiles/<int:id>", methods=["DELETE"])
def delete_mentor_profile(id):
    mentor_profile = MentorProfile.query.get_or_404(id)
    db.session.delete(mentor_profile)
    db.session.commit()
    return jsonify({"message": "Mentor profile deleted"})


# ------------------------#
#   STUDENT PROFILES      #
# ------------------------#
@app.route("/student-profiles", methods=["GET"])
def get_student_profiles():
    student_profiles = StudentProfile.query.all()
    return jsonify([sp.serialize() for sp in student_profiles])


@app.route("/student-profiles/<int:id>", methods=["GET"])
def get_student_profile(id):
    student_profile = StudentProfile.query.get_or_404(id)
    return jsonify(student_profile.serialize())


@app.route("/student-profiles", methods=["POST"])
def create_student_profile():
    data = request.json
    student_profile = StudentProfile(
        user_id=data["user_id"],
        interests=data.get("interests"),
        goals=data.get("goals"),
        experience_level=data.get("experience_level"),
        skills=data.get("skills")
    )
    db.session.add(student_profile)
    db.session.commit()
    return jsonify(student_profile.serialize()), 201


@app.route("/student-profiles/<int:id>", methods=["PUT"])
def update_student_profile(id):
    student_profile = StudentProfile.query.get_or_404(id)
    data = request.json
    student_profile.interests = data.get(
        "interests", student_profile.interests)
    student_profile.goals = data.get("goals", student_profile.goals)
    student_profile.experience_level = data.get(
        "experience_level", student_profile.experience_level)
    student_profile.skills = data.get("skills", student_profile.skills)
    db.session.commit()
    return jsonify(student_profile.serialize())


@app.route("/student-profiles/<int:id>", methods=["DELETE"])
def delete_student_profile(id):
    student_profile = StudentProfile.query.get_or_404(id)
    db.session.delete(student_profile)
    db.session.commit()
    return jsonify({"message": "Student profile deleted"})


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3002))
    app.run(host='0.0.0.0', port=PORT, debug=True)
