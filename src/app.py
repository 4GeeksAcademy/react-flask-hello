"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
import datetime, random
from sqlalchemy.exc import IntegrityError

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
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

@app.route('/register', methods=['POST'])
def register():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg':'debes enviar información en el body'}), 400
    if 'full_name' not in body:
        return jsonify({'msg':'debes enviar un campo full_name'}), 400
    if body['full_name'].strip() == '':
        return jsonify({'msg': 'Debes enviar un nombre válido'}), 400
    if 'email' not in body:
        return jsonify({'msg':'debes enviar un campo email'}), 400
    if body['email'].strip() == '':
        return jsonify({'msg': 'Debes enviar un email válido'}), 400
    if 'password' not in body:
        return jsonify({'msg':'Debes enviar un campo password'}), 400
    if body['password'].strip()=='':
        return jsonify({'msg':'Debes enviar un password válido'}), 400
    if 'country' not in body:
        return jsonify({'msg':'Debes enviar un campo country'}), 400
    if body['country'].strip()=='':
        return jsonify({'msg':'Debes enviar un country válido'}), 400
    
    if 'phone' not in body:
        phone=None
    else:
        phone=body['phone']

    if 'profile_picture_url' not in body:
        profile_picture_url=None
    else:
        profile_picture_url=body['profile_picture_url']

    if profile_picture_url is None:
        random_profile_color= random.randint(1, 7)
    else:
        random_profile_color=None

    new_user=User()
    new_user.full_name=body['full_name']
    new_user.email=body['email']
    new_user.password=body['password']
    new_user.phone=phone
    new_user.country=body['country']
    new_user.created_at=datetime.datetime.now().strftime('%Y-%m-%d')
    new_user.profile_picture_url=profile_picture_url
    new_user.profile_color=random_profile_color
    new_user.is_active=True
    db.session.add(new_user)
    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({'msg': 'Ingresa un email distinto.'}), 400
    return jsonify({'msg': 'ok', 'new_user':new_user.serialize()}), 201

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
