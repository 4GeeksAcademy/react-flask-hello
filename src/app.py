import os
import datetime
import random
from flask import Flask, request, jsonify, send_from_directory
from flask_migrate import Migrate
from sqlalchemy.exc import IntegrityError

from api.utils import APIException, generate_sitemap
from api.models import db, User, Project, Task, Comment
from api.routes import api  # Only /api/hello or similar test endpoints here!
from api.admin import setup_admin
from api.commands import setup_commands
from flask_cors import CORS

from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

# Environment setup
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.dirname(os.path.realpath(__file__))

# Initialize Flask app
app = Flask(__name__)
app.url_map.strict_slashes = False
CORS(app)

# Database config
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///dev.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS
           
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY", "super-secret-key")  # Use your .env value

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db, compare_type=True)
jwt = JWTManager(app)
setup_admin(app)
setup_commands(app)
app.register_blueprint(api, url_prefix='/api')  # ONLY /api/hello, no main endpoints here

# Error handler


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Development sitemap route


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# Serve static files (SPA fallback)


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0
    return response

# --- REGISTER endpoint (with password hashing)


@app.route('/register', methods=['POST'])
def register():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg': 'Debes enviar información en el body'}), 400
    if 'full_name' not in body or body['full_name'].strip() == '':
        return jsonify({'msg': 'Debes enviar un nombre válido'}), 400
    if 'email' not in body or body['email'].strip() == '':
        return jsonify({'msg': 'Debes enviar un email válido'}), 400
    if 'password' not in body or body['password'].strip() == '':
        return jsonify({'msg': 'Debes enviar un password válido'}), 400
    if 'country' not in body or body['country'].strip() == '':
        return jsonify({'msg': 'Debes enviar un country válido'}), 400

    phone = body.get('phone')
    profile_picture_url = body.get('profile_picture_url')
    random_profile_color = None if profile_picture_url else random.randint(
        1, 7)
    hashed_password = generate_password_hash(body['password'])

    new_user = User(
        full_name=body['full_name'],
        email=body['email'],
        password=hashed_password,
        phone=phone,
        country=body['country'],
        created_at=datetime.datetime.now(),
        profile_picture_url=profile_picture_url,
        random_profile_color=random_profile_color,
        is_active=True
    )
    db.session.add(new_user)
    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({'msg': 'Ingresa un email distinto.'}), 400

    return jsonify({'msg': 'ok', 'new_user': new_user.serialize()}), 201

# --- LOGIN endpoint (JWT + hash check)


@app.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    if not body or 'email' not in body or 'password' not in body:
        return jsonify({'msg': 'Email y contraseña requeridos'}), 400

    user = User.query.filter_by(email=body['email']).first()
    if not user or not check_password_hash(user.password, body['password']):
        return jsonify({'msg': 'Credenciales inválidas'}), 401

    token = create_access_token(identity=str(user.id))
    return jsonify({
        "access_token": token,
        "user": user.serialize()
    }), 200


# --- CREATE PROJECT endpoint (protected)
@app.route('/project', methods=['POST'])
@jwt_required()
def new_project():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'msg': 'User not found'}), 404
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg': 'Debes enviar información en el body'}), 400
    if 'title' not in body or body['title'].strip() == '':
        return jsonify({'msg': 'Debes enviar un título válido'}), 400
    if 'due_date' not in body or body['due_date'].strip() == '':
        return jsonify({'msg': 'Debes enviar una fecha de entrega válida'}), 400

    description = body.get('description')
    project_picture_url = body.get('project_picture_url')

    description = body.get('description')
    project_picture_url = body.get('project_picture_url')
    status = body.get('status', 'in progress')
    new_project = Project(
        title=body['title'],
        description=description,
        created_at=datetime.datetime.now(),
        project_picture_url=project_picture_url,
        due_date=datetime.datetime.strptime(body['due_date'], '%Y-%m-%d'),
        admin=user,
        status=status
    )
    db.session.add(new_project)
    db.session.commit()
    return jsonify({'msg': 'ok', 'new_project': new_project.serialize()}), 201


# --- GET PROJECTS endpoint (protected)
@app.route('/projects', methods=['GET'])
@jwt_required()
def get_projects():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'msg': 'User not found'}), 404

    admin_of = [project.serialize() for project in user.admin_of]
    member_of = [project.project.serialize() for project in user.member_of]

    if not admin_of and not member_of:
        return jsonify({'msg': 'No projects found for this user', 'user_projects': []}), 200

    return jsonify({
        'msg': 'Projects retrieved successfully',
        'user_projects': {
            'admin': admin_of,
            'member': member_of
        },
    }), 200


# --- Run app ---
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
