"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User, RolEnum, Vehiculos, Orden_de_trabajo

from datetime import timedelta

from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

from flask_cors import CORS


# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../dist/')
app = Flask(__name__)
CORS(app)

app.config["JWT_SECRET_KEY"] = os.getenv('JWT_KEY')
jwt = JWTManager(app)

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

#ENDPOINT PARA TRAER ORDENES DE TRABAJO
@app.route('/ordenes_de_trabajo', methods = ['GET'])
@jwt_required()
def get_orden_de_trabajo():
    email_user_current = get_jwt_identity()
    user_current = User.query.filter_by(email=email_user_current).first()
    id_propietario = user_current.id_user
    ordenes_de_trabajo = Orden_de_trabajo.query.filter_by(usuario_id = id_propietario).all()    
    print(ordenes_de_trabajo)

    ot_serialized_by_user = []

    for orden_de_trabajo in ordenes_de_trabajo:
        ot_serialized_by_user.append(orden_de_trabajo.serialize())

    print(ot_serialized_by_user)
    return jsonify({'msg':'ok', 'ordenes_de_trabajo':ot_serialized_by_user})


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
        
    new_user = User()
    new_user.nombre = body['nombre']
    new_user.identificacion = body['identificacion']
    new_user.password = body['password']
    new_user.telefono = body['telefono']
    new_user.email = body['email']
    new_user.foto_usuario = body['foto_usuario']
    new_user.is_active = True
    new_user.rol = RolEnum.CLIENTE
    
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'msg': 'ok', 'user': new_user.serialize()})


#CREACION DEL ENDPOINT DE LOGIN

@app.route('/login', methods = ['POST'])
def login():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg': 'Debes enviar informacion en el body'}), 400
    if 'email' not in body:
        return jsonify({'msg': 'El campo Email es obligatorio'}), 400
    if 'password' not in body:
        return jsonify({'msg': 'El campo password es obligatorio'}), 400

    user = User.query.filter_by(email=body['email']).first()
    print(user)

    if user is None:
        return jsonify({'msg': 'Usuario o contraseña incorrectos 1'}), 400
    if user.password != body['password']:
        return jsonify({'msg': 'Usuario o contraseña incorrectos 2' }), 400

    access_token = create_access_token(identity=user.email, expires_delta=timedelta(hours=2))  # despues de mail expires_delta=timedelta(hours=2)
    return jsonify({'msg': 'ok', 'token': access_token}), 200
                                                                                                    

#ENDPOINT PARA CREAR VEHICULOS

@app.route('/crear_vehiculo', methods = ['POST'])
def crear_vehiculo():
    body = request.get_json(silent = True)
    if body is None:
        return jsonify({'msg': 'debes enviar informacion del vehiculo en el body'}), 400
    if 'matricula' not in body:
        return jsonify({'msg': 'debes enviar la matricula del vehiculo'}), 400
    if 'marca' not in body:
        return jsonify({'msg': 'debes enviar la marca del vehiculo'}), 400
    if 'modelo' not in body:
        return jsonify({'msg': 'debes enviar el modelo del vehiculo'}), 400
    if 'year' not in body:
        return jsonify({'msg': 'debes enviar el año del vehiculo'}), 400
    if 'user_id' not in body:
        return jsonify({'msg': 'Debes enviar el Id de un usuario existente'})

    new_car = Vehiculos()
    new_car.matricula = body['matricula']
    new_car.marca = body['marca']
    new_car.modelo = body['modelo']
    new_car.year = body['year']
    new_car.user_id = body['user_id']

    db.session.add(new_car)
    db.session.commit()
    return jsonify({'msg': 'ok', 'Vehiculo': new_car.serialize()})

    
#ENDPOINT PARA TRAER LOS VEHICULOS DE UN USUARIO LOGEADO

@app.route('/mis_vehiculos', methods = ['GET'])
@jwt_required()
def mostrar_vehiculos():
    email_user_current = get_jwt_identity()
    user_current = User.query.filter_by(email=email_user_current).first()
    print(user_current)
    print(user_current.id_user)
    id_propietario = user_current.id_user
    vehiculos = Vehiculos.query.filter_by(user_id = id_propietario).all()    
    print(vehiculos)

    vehicles_serialized_by_user = []

    for vehicle in vehiculos:
        vehicles_serialized_by_user.append(vehicle.serialize())

    print(vehicles_serialized_by_user)
    return jsonify({'msg':'ok', 'vehiculos':vehicles_serialized_by_user})


#ENDPOINT PARA TRAER TODOS LOS VEHICULOS

@app.route('/all_vehicles', methods=['GET'])
def get_all_vehicles():
    vehicles = Vehiculos.query.all()
    vehicles_serialized = []

    for vehicle in vehicles:
        vehicles_serialized.append(vehicle.serialize())

    print(vehicles_serialized)
    return jsonify({'msg':'ok', 'vehiculos':vehicles_serialized})


#ENDPOINT PARA BORRAR VEHICULOS 

@app.route('/eliminar_vehiculo/<int:id_vehiculo>', methods=['DELETE'])
@jwt_required()
def eliminar_vehiculo(id_vehiculo):
    email_user_current = get_jwt_identity()
    user_current = User.query.filter_by(email=email_user_current).first()
    if not user_current:
        return jsonify({'msg': 'Usuario no encontrado'}), 404
    # Buscar el vehículo con ese ID que pertenezca al usuario autenticado
    vehiculo = Vehiculos.query.filter_by(id_vehiculo=id_vehiculo, user_id=user_current.id_user).first()
    if not vehiculo:
        return jsonify({'msg': 'Vehículo no encontrado o no te pertenece'}), 404

    db.session.delete(vehiculo)
    db.session.commit()
    return jsonify({'msg': 'Vehículo eliminado correctamente'}), 200


#ENDPOINT PARA CREAR VEHICULOS DE UN USUARIO ESPECIFICO

@app.route('/crear_mis_vehiculos', methods = ['POST'])
@jwt_required()
def crear_mis_vehiculos():
    email_user_current = get_jwt_identity()
    user_current = User.query.filter_by(email=email_user_current).first()
    print(user_current)
    print(user_current.id_user)
    id_propietario = user_current.id_user
    new_matricula = user_current
    print("voy a impimir userCurrent")
    print(new_matricula)
    
    body = request.get_json(silent = True)
    if body is None:
        return jsonify({'msg': 'debes enviar informacion del vehiculo en el body'}), 400
    if 'matricula' not in body:
        return jsonify({'msg': 'debes enviar la matricula del vehiculo'}), 400
    if 'marca' not in body:
        return jsonify({'msg': 'debes enviar la marca del vehiculo'}), 400
    if 'modelo' not in body:
        return jsonify({'msg': 'debes enviar el modelo del vehiculo'}), 400
    if 'year' not in body:
        return jsonify({'msg': 'debes enviar el año del vehiculo'}), 400
    if 'user_id' not in body:
        return jsonify({'msg': 'Debes enviar el Id de un usuario existente'})

    new_car = Vehiculos()
    new_car.matricula = body['matricula']
    new_car.marca = body['marca']
    new_car.modelo = body['modelo']
    new_car.year = body['year']
    new_car.user_id = id_propietario

    db.session.add(new_car)
    db.session.commit()
    return jsonify({'msg': 'ok', 'Vehiculo': new_car.serialize()})


#ENDPOINT PRA EDITAR VEHICULOS

#ENDPOINT PARA EDITAR PERFIL DE USUARIO

@app.route('/user/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user_profile(user_id):
    current_user_id = get_jwt_identity()

    if current_user_id != user_id:
        return jsonify({"msg": "No autorizado para actualizar este perfil"}), 403

    user = User.query.get(user_id)
    if user is None:
        return jsonify({'msg': 'Usuario no encontrado'}), 404

    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg': 'Debes enviar información para actualizar'}), 400

    if 'nombre' in body:
        user.nombre = body['nombre']
    if 'telefono' in body:
        user.telefono = body['telefono']
    if 'email' in body:
        if body['email'] != user.email:
            existing_user = User.query.filter_by(email=body['email']).first()
            if existing_user:
                return jsonify({'msg': 'Este email ya está en uso'}), 409 # Conflicto
        user.email = body['email']
    
    # Manejo de foto_usuario:
    if 'foto_usuario' in body:
        user.foto_usuario = body['foto_usuario'] if body['foto_usuario'] else None

    try:
        db.session.commit()
        return jsonify({'msg': 'Perfil actualizado exitosamente', 'user': user.serialize()}), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error al actualizar perfil de usuario: {e}")
        return jsonify({'msg': 'Error al actualizar el perfil de usuario', 'error': str(e)}), 500
      

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
