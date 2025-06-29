"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

import os
import datetime
import random
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from sqlalchemy.exc import IntegrityError

from api.utils import APIException, generate_sitemap, create_token
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

# Environment setup
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"

# Point to the root directory where app.py and index.html live
static_file_dir = os.path.dirname(os.path.realpath(__file__))

# Initialize Flask app
app = Flask(__name__)
app.url_map.strict_slashes = False

# Database configuration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///dev.db"  # fallback DB

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize DB and Migrate with the app
db.init_app(app)
migrate = Migrate(app, db, compare_type=True)

# Setup admin and CLI commands
setup_admin(app)
setup_commands(app)

# Register API blueprint
app.register_blueprint(api, url_prefix='/api')

# Error handler
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Sitemap (development only)
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

# ✅ REGISTER endpoint
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
    random_profile_color = None if profile_picture_url else random.randint(1, 7)

    new_user = User(
        full_name=body['full_name'],
        email=body['email'],
        password=body['password'],
        phone=phone,
        country=body['country'],
        created_at=datetime.datetime.now().strftime('%Y-%m-%d'),
        profile_picture_url=profile_picture_url,
        profile_color=random_profile_color,
        is_active=True
    )
    db.session.add(new_user)
    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({'msg': 'Ingresa un email distinto.'}), 400

    return jsonify({'msg': 'ok', 'new_user': new_user.serialize()}), 201

# ✅ LOGIN endpoint with JWT
@app.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    if not body or 'email' not in body or 'password' not in body:
        return jsonify({'msg': 'Email y contraseña requeridos'}), 400

    user = User.query.filter_by(email=body['email'], password=body['password']).first()
    if not user:
        return jsonify({'msg': 'Credenciales inválidas'}), 401

    token = create_token(user.id)

    return jsonify({
        "access_token": token,
        "user": user.serialize()
    }), 200

# Run app
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)

