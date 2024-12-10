"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from api.models import db, User, Pet, Post_Description, Breed, Genders
from flask_cors import CORS 

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False
CORS(app)
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_KEY")
jwt = JWTManager(app)


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

#Traer usuarios
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    users_serialized = []
    for user in users:
        users_serialized.append(user.serialize())
    return jsonify({'msg': 'ok', 'usuarios: ': users_serialized}),200


# Post: nuevo usuario
@app.route('/user', methods=['POST'])
def create_user():
    body = request.get_json(silent=True)
    if body is None: 
        return jsonify({'msg': 'El cuerpo de la solicitud está vacío'}), 400
    if 'name' not in body: 
        return jsonify({'msg': "El campo 'name' es obligatorio"}), 400
    if 'email' not in body: 
        return jsonify({'msg': "El campo 'email' es obligatorio"}), 400
    if 'password' not in body:
        return jsonify({'msg': "El campo 'password' es obligatiro"}), 400
    if 'security_question' not in body:
        return jsonify({"msg": "El campo 'security_question' es obligatorio"}), 400

    new_user = User(
        name = body['name'],
        email = body['email'],
        password= body['password'],
        is_active=True,
        security_question=body['security_question']
    )

    db.session.add(new_user)
    db.session.commit()
    return jsonify({'msg':'Usuario creado exitosamente', 'data': new_user.serialize()}), 201

#LOGIN: 
@app.route('/login', methods=['POST'])
def login():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg': 'Debes enviar informacion '}), 400
    if 'email'  not in body:
        return jsonify({'msg': 'El campo email es obligatorio'}), 400
    if 'password' not in body:
        return jsonify({'msg': 'El campo password es obligatorio'}), 400
    user = User.query.filter_by(email=body['email']).first()
    if user is None:
        return jsonify({'msg': "email is invalid"}), 400 #CAMBIAR por email or password is invalid
    if user.password != body['password']:
        return jsonify({'msg': "password is invalid"}), 400 #CAMBIAR por email or password is invalid
    access_token = create_access_token(identity=user.email) 
    return jsonify({'msg': 'ok', 'token': access_token}), 200 

#Update password
@app.route('/user/<int:id>', methods=['PUT'])
def update_password(id):
    body= request.get_json(silent=True)
    if body is None:
        return jsonify({'msg': 'Debes enviar informacion '}), 400
    if 'security_question' not in body:
        return jsonify({'msg': 'Debes enviar el campo "security_question" y su respuesta'}), 400
    if 'new_password' not in body:
        return jsonify({'msg': "El campo 'new_password' es obligatorio"}), 400 #Hasta ahora no hay limite de caracteres ni requerimientos especiales para la password
    user = User.query.filter_by(security_question=body['security_question']).first()
    if user.security_question != body['security_question']:
        return jsonify({'msg': 'Respuesta incorrecta a la security question'}),400
    user = User.query.get(id)
    user.password = body['new_password']
    db.session.commit()
    return jsonify({'msg': 'la contraseña ha sido cambiada exitosamente'})


#Private access
@app.route('/private', methods=['GET'])
@jwt_required()
def private():
    current_user = get_jwt_identity()
    print('Este es el usuario que esta haciendo la peticion: ', current_user)
    if current_user:
        return jsonify({'msg': 'Bienvenido', 'Este es el usuario que esta haciendo la peticion: ': current_user})
    return jsonify({'msg': 'Acceso denegado'}), 400
###############################

#PET
#Creación de nueva mascota:
@app.route('/pet', methods=['POST'])
def create_pet():
    body = request.get_json(silent=True)
    if body is None: 
        return jsonify({'msg': 'El cuerpo de la solicitud está vacío'}), 400
    if 'name' not in body: 
        return jsonify({'msg': "El campo 'name' es obligatorio"}), 400
    if 'breed' not in body: 
        return jsonify({'msg': "El campo 'breed' es obligatorio"}), 400
    if 'gender' not in body:
        return jsonify({'msg': "El campo 'gender' es obligatorio"}), 400
    if 'photo_1' not in body:
        return jsonify({'msg': "El campo 'photo_1' es obligatorio"}), 400

    new_pet = Pet(
        name = body['name'],
        breed = body['breed'],
        gender= body['gender'],
        photo_1=body['photo_1']
    )
    db.session.add(new_pet)
    db.session.commit()
    return jsonify({'msg':'Mascota creada exitosamente', 'data': new_pet.serialize()}), 201

#Creación de un nuevo post con la descripción de la mascota:
@app.route('/post_description', methods=['POST'])
def create_post_description():
    body = request.get_json(silent=True)
    if body is None: 
        return jsonify({'msg': 'El cuerpo de la solicitud está vacío'}), 400
    if 'pet_id' not in body: 
        return jsonify({'msg': "El campo 'pet_id' es obligatorio"}), 400
    ##latitud y longitud quedan definidas al hacer clic en el mapa?
    if 'longitude' not in body: 
        return jsonify({'msg': "El campo 'longitude' es obligatorio"}), 400
    if 'latitude' not in body:
        return jsonify({'msg': "El campo 'latitude' es obligatorio"}), 400
    if 'description' not in body: 
        return jsonify({'msg': "El campo 'description' es obligatorio"}), 400
    if 'zone' not in body: 
        return jsonify({'msg': "El campo 'zone' es obligatorio"}), 400
    if 'event_date' not in body: 
        return jsonify({'msg': "El campo 'event_date' es obligatorio"}), 400
    if 'pet_status' not in body: 
        return jsonify({'msg': "El campo 'pet_status' es obligatorio"}), 400

    #verificación de la existencia de la mascota en la base de datos:
    pet = Pet.query.get(body['pet_id'])
    if not pet:
        return jsonify({'msg': "Mascota no encontrada con ese ID"}), 404

    #new post:
    new_post = Post_Description(
        pet_id = body['pet_id'],
        longitude = body['longitude'],
        latitude = body['latitude'],
        description = body['description'],
        zone = body['zone'],
        event_date = body['event_date'],
        pet_status = body['pet_status']
    )
    db.session.add(new_post)
    db.session.commit()
    return jsonify({'msg':'Post creado exitosamente', 'data': new_post.serialize()}), 201
#######


# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
