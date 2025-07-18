"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User, RolEnum
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

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

#CREACION DE ENDPOINT DEL PROYECTO

#CREACION DE ENDPOINT DEL PROYECTO

#ENDPOINT PARA REGISTRAR NUEVO USUARIO
@app.route('/register', methods = ['POST'])
def register_user():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg': 'Debes enviar informacion de nuevo usuario en el body'}), 400
    if 'nombre' not in body:
        return jsonify({'msg': 'Debes enviar el nombre del usuario a registrar'})
    if 'identificacion' not in body:
        return jsonify({'msg': 'Debes enviar la identificacion del usuario a crear'})
    if 'password' not in body:
        return jsonify({'msg': 'Debes enviar el password del usuario'})
    if 'telefono' not in body:
        return jsonify({'msg': 'Debes enviar un numero telefonico del usuario'})
    if 'email' not in body:
        return jsonify({'msg': 'Debes enviar el email e usuario'})
    if 'foto_usuario' not in body:
        return jsonify({'msg': 'Debes subir la foto del usuario'})
    
    new_user = User()
    new_user.nombre = body['nombre']
    new_user.identificacion = body['identificacion']
    new_user.password = body['password']
    new_user.telefono = body['telefono']
    new_user.email = body['email']
    new_user.is_active = True
    new_user.foto_usuario = body['foto_usuario']
    new_user.rol = RolEnum.CLIENTE
    
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'msg': 'ok', 'user': new_user.serialize()})


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
