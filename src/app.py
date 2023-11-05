"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, User, Tracker
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, JWTManager
from flask_bcrypt import Bcrypt


#from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

bcrypt = Bcrypt(app)
# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type = True)
db.init_app(app)

# Allow CORS requests to this API
CORS(app)

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
    response.cache_control.max_age = 0 # avoid cache memory
    return response

@app.route('/signup', methods=['POST'])
def add_user():
    request_body = request.get_json(force=True)
    
    if "name" not in request_body:
        raise APIException('The first name is required', 400)
    
    if "last_name" not in request_body:
        raise APIException('The last name is required', 400)
    
    if "email" not in request_body:
        raise APIException("The email is required", 400)
    
    if "password" not in request_body:
        raise APIException('The password is required', 400)

    exists_email = User.query.filter_by(email = request_body['email']).first()

    
    if exists_email:
        raise APIException('Email is in use', 400)
    
    pw_hash = bcrypt.generate_password_hash(request_body['password']).decode('utf-8')

    user = User(
        name = request_body['name'],
        last_name = request_body['last_name'],
        email = request_body['email'],
        password = pw_hash
    )

    user.save()

    response_body = {
        "msg" : "ok",
        "msg2" : "Usuario creado correctamente"
    }
    
    return jsonify(response_body), 201


@app.route('/tracker/save/<int:user_id>', methods=['POST'])
def save_tracker(user_id):
    single_user = User.query.get(user_id)
    request_body = request.get_json(force=True)
    
    if single_user is None:
        return jsonify({"msg": f"The id {user_id} user doesn't exist"}), 404
    
    if "follows" not in request_body:
        raise APIException('Follows are required', 400)
    
    if "scholarship_name" not in request_body:
        raise APIException('Scholarship name is required', 400)
    
    if "dates" not in request_body:
        raise APIException("dates are required", 400)
    
    if "institution" not in request_body:
        raise APIException('Institution is required', 400)

    exists_tracker = Tracker.query.filter_by(scholarship_name = request_body['scholarship_name']).first()

    
    if exists_tracker:
        raise APIException('Tracker is in use', 400)
    

    tracker = Tracker(
        follows = request_body['follows'],
        scholarship_name = request_body['scholarship_name'],
        dates = request_body['dates'],
        institution = request_body['institution']
        
    )

    tracker.save()

    response_body = {
        "msg" : "ok",
        "msg2" : "Tracker creado correctamente",
        "user_info" : single_user.serialize()
    }
    
    return jsonify(response_body), 201


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
