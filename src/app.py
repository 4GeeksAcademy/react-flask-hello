"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User, Activity, Message, PasswordResetToken
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

from flask_bcrypt import Bcrypt

from flask_mail import Mail, Message

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../dist/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "ESTA_ES_NUESTRA_LLAVE"

GOOGLE_MAPS_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")

jwt = JWTManager(app)

bcrypt = Bcrypt(app)

app.config.update(dict(
    DEBUG=False,
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=587,
    MAIL_USE_TLS=True,
    MAIL_USE_SSL=False,
    MAIL_USERNAME='meetfitfspt119@gmail.com',
    MAIL_PASSWORD=os.getenv('MAIL_PASSWORD')
))

mail = Mail(app)

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


#prueba send-mail
@app.route('/api/send-mail', methods=['GET'])
def send_mail():
    msg = Message(
        subject='Prueba de correo de proyecto',
        sender='meetfitfspt119@gmail.com',
        recipients=['meetfitfspt119@gmail.com'],
    )
    msg.html = '<h1>Testeando envio de correo</h1>'
    mail.send(msg)
    return jsonify({'msg': 'Correo enviado con exito'}), 200

@app.route('/api/register', methods=['POST'])
def register():
    body = request.get_json(silent=True)

    if body is None:
        return jsonify({'msg': 'POST method needs a body or email/password not found.'}), 400
    if 'email' not in body:
        return jsonify({'msg': 'email field is mandatory'}), 400
    if 'password' not in body:
        return jsonify({'msg': 'password field is mandatory'}), 400
    if 'name' not in body:
        return jsonify({'msg': 'name  field is mandatory'})
    email = body.get("email")
    password = body.get("password")
    name = body.get("name")

    user = User.query.filter_by(email=email).first()
    if user is not None:
        return jsonify({'msg': 'Usuario ya registrado!'}), 400
    
    pw_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    user = User(email=email, name=name, password_hash=pw_hash)
    db.session.add(user)
    db.session.commit()


    # access_token = create_access_token(identity=str(user.id))
    return jsonify({'msg': 'User Registered successfully'})

@app.route('/api/login', methods=['POST'])
def login():
    
    body = request.get_json(silent=True)
    # validar body
    if body is None:
        return jsonify({'msg': 'POST method needs a body or email/password not found.'}), 400
    if 'email' not in body:
        return jsonify({'msg': 'email field is mandatory'}), 400
    if 'password' not in body:
        return jsonify({'msg': 'password field is mandatory'}), 400
    # buscar usuario
    email = body['email']
    password = body['password']

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'msg':'User or password incorrect'}), 400
    # validar password
    is_password = bcrypt.check_password_hash(user.password_hash, password)

    if not is_password:
        return jsonify({'msg': 'User or password incorrect'}), 400
    # crear token
    access_token = create_access_token(identity=str(user.id))
    
    return jsonify(access_token=access_token)


@app.route("/api/me", methods=["GET"])
@jwt_required()
def me():
    

    current_user = get_jwt_identity()
    user = User.query.get(current_user)
    print(user)
    return jsonify(user.serialize()), 200


#endPoint completo ACTIVITY ----> GET POST PUT DELETE


    

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
