"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, User, Tracker, InstitutionalUser, Scholarship
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, JWTManager
from flask_bcrypt import Bcrypt
from sqlalchemy.exc import IntegrityError
from flask_mail import Mail, Message



#from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False


bcrypt = Bcrypt(app)

app.config["JWT_SECRET_KEY"] = os.environ.get('JWS_SECRET')
jwt = JWTManager(app)

app.config.update(dict(
    DEBUG = False,
    MAIL_SERVER = "smtp.gmail.com",
    MAIL_PORT = 587,
    MAIL_USE_TLS = True,
    MAIL_USE_SSL = False,
    MAIL_USERNAME = "bexploraproject@gmail.com",
    MAIL_PASSWORD = "xjsuoddagtfbvdet"
))

mail = Mail(app)

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


@app.route('/user', methods=['GET'])
@jwt_required()  # Requiere que el usuario esté autenticado con un token válido
def get_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)  # Suponiendo que tienes un modelo User con un campo 'id'
    
    if user:
        user_data = user.serialize()  # Suponiendo que tienes un método serialize() en tu modelo User
        return jsonify({"user": user_data}), 200
    else:
        return jsonify({"message": "Usuario no encontrado"}), 404
    
@app.route('/user/<int:user_id>', methods=['GET'])
def get_single_user(user_id):
    single_user = User.query.get(user_id)
    if single_user is None:
        return jsonify({"msg": f"The id {user_id} user doesn't exist"}), 404
    
    user_info = single_user.serialize()
    response_body = {
        "msg": "Hello, this is your GET /user response ",
        "user_info" : user_info
    }

    return jsonify(response_body), 200

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
    msg = Message("¡Saludos Bexplorer!", sender="bexploraproject@gmail.com", recipients=[user.email])
    msg.html = """
    <html>
        <body>
            <h1 style="color: #FE5002;">¡Este es el inicio de tu expedición profesional! </h1>
            <h3>¡Gracias por registrarte en nuestra página web! Nos complace que estés aquí y que disfrutes de nuestros servicios</h3>
            <h3>Esperamos que encuentres nuevos horizontes profesionales de la mano de Bexplora</h3>
            <img src="https://i.imgur.com/KiCU5ol.png" style="max-width: 20%; height: auto;"  alt="Logo de la aplicación">
            <h3>¡Bexplora, explora tu potencial!</h3>
            <p>Atentamente, tus guías bexplorers </p>
        </body>
    </html>
    """

    try:
        mail.send(msg)
    except Exception as e:
        # Maneja el error si no se pudo enviar el correo
        return jsonify({"msg": "Usuario creado correctamente, pero hubo un error al enviar el correo de bienvenida."}), 201

    response_body = {
        "msg" : "Usuario creado correctamente",
        "msg2" : "¡Bienvenido a nuestra aplicación!"
    }

    return jsonify(response_body), 201

@app.route('/login', methods=['POST'])
def login():
    request_body = request.get_json(force=True)

    if "email" not in request_body:
        raise APIException('The email is required', status_code=404)

    if "password" not in request_body:
        raise APIException('The password is required', status_code=404)

    user = User.query.filter_by(
        email=request_body['email']
    ).first()

    if user is None:
        raise APIException('The email is not correct', status_code=404)

    if bcrypt.check_password_hash(user.password, request_body['password']) is False:
        raise APIException('The password is not correct', 401)
    
    access_token = create_access_token(identity=user.id)

    # Aquí defines los campos que quieres incluir en la respuesta, excluyendo la contraseña
    response_body = {
        "msg": "ok",
        "token": access_token,
        "user_id": user.id,
        "email": user.email,
        "name": user.name,
        "last_name": user.last_name,        # Agrega todos los campos necesarios aquí excepto la contraseña
    }


    return jsonify(response_body), 200


@app.route('/tracker', methods=['GET'])
def get_trackers():
    trackers = Tracker.query.all()
    trackers_serialized = list(map(lambda x: x.serialize(), trackers))
    response_body = {
        "msg": "Hello, this is your GET /trackers response",
        "trackers" : trackers_serialized
    }

    return jsonify(response_body), 200

@app.route('/tracker/save/<int:user_id>', methods=['POST'])
def save_tracker(user_id):
    single_user = User.query.get(user_id)
    request_body = request.get_json(force=True)
    
    if single_user is None:
        return jsonify({"msg": f"The id {user_id} user doesn't exist"}), 404
    
    if "scholarship_name" not in request_body:
        raise APIException('Scholarship name is required', 400)
    
    if "email" not in request_body:
        raise APIException("email is required", 400)    
    
    # Crear el Tracker
    tracker = Tracker(
        scholarship_name=request_body['scholarship_name'],
        email=request_body["email"],
    )

    # Asignar el Tracker al User
    single_user.tracker = tracker
    db.session.add(single_user)

    # Guardar los cambios en la base de datos
    db.session.commit()

    response_body = {
        "msg": "ok",
        "msg2": "Tracker creado correctamente",
        "user_info": single_user.serialize()
    }
    
    return jsonify(response_body), 201

# ROUTES FOR INSTITUTIONAL USERS

@app.route('/institution-user', methods=['GET'])
def get_institutional_users():
    institutional_users = InstitutionalUser.query.all()
    institutional_users_serialized = list(map(lambda x: x.serialize(), institutional_users))
    response_body = {
        "msg": "Hello, this is your GET /institutional users response",
        "institutional_users" : institutional_users_serialized
    }

    return jsonify(response_body), 200

@app.route('/institution-user/<int:institution_user_id>', methods=['GET'])
def get_single_institutional_user(institution_user_id):
    single_institutional_user = InstitutionalUser.query.get(institution_user_id)
    if single_institutional_user is None:
        return jsonify({"msg": f"The id {institution_user_id} user doesn't exist"}), 404
    
    response_body = {
        "msg": "Hello, this is your GET /institutional user response ",
        "institutional_user_info" : single_institutional_user.serialize()
    }

    return jsonify(response_body), 200


@app.route('/signup-ins', methods=['POST'])
def add_institutional_user():
    request_body = request.get_json(force=True)
    
    if "institutional_name" not in request_body:
        raise APIException('The institutional name is required', 400)
    
    if "email" not in request_body:
        raise APIException("The email is required", 400)
    
    if "password" not in request_body:
        raise APIException('The password is required', 400)

    exists_institutional_email = InstitutionalUser.query.filter_by(email = request_body['email']).first()

    
    if exists_institutional_email:
        raise APIException('Email is in use', 400)
    
    pw_hash = bcrypt.generate_password_hash(request_body['password']).decode('utf-8')

    institutional_user = InstitutionalUser(
        institutional_name = request_body['institutional_name'],
        email = request_body['email'],
        password = pw_hash
    )

    institutional_user.save()

    msg = Message("¡Saludos Bexplorer!", sender="bexploraproject@gmail.com", recipients=[institutional_user.email])
    msg.html = """
    <html>
        <body>
            <h1>¡Este es el inicio de tu expedición profesional!</h1>
            <p>¡Gracias por registrarte en nuestra página web! Nos complace que estés aquí y que disfrutes de nuestros servicios</p>
            <p>Esperamos que encuentres nuevos horizontes profesionales de la mano de Bexplora</p>
            <img src="https://i.imgur.com/KiCU5ol.png" alt="Logo de la aplicación">
            <p>¡Bexplora, explora tu potencial!</p>
            <p>Atentamente, tus guías bexplorers </p>
        </body>
    </html>
    """
    try:
        mail.send(msg)
    except Exception as e:
        # Maneja el error si no se pudo enviar el correo
        return jsonify({"msg": "Usuario creado correctamente, pero hubo un error al enviar el correo de bienvenida."}), 201
    response_body = {
        "msg" : "Usuario creado correctamente",
        "msg2" : "¡Bienvenido a nuestra aplicación!"
    }
    return jsonify(response_body), 201


@app.route('/login-ins', methods=['POST'])
def institutional_login():
    request_body = request.get_json(force=True)

    if "email" not in request_body:
        raise APIException('The email is required', status_code=404)

    if "password" not in request_body:
        raise APIException('The password is required', status_code=404)

    insti_user = InstitutionalUser.query.filter_by(
        email= request_body['email']
        ).first()    

    if insti_user is None:
        raise APIException ('The email or password is not correct', status_code=404)

    if bcrypt.check_password_hash(insti_user.password, request_body['password']) is False:
        raise APIException('The email or password is not correct', 401)    

    access_token = create_access_token(identity = insti_user.id)

    response_body ={ 
                    "msg": "ok",
                    "email": insti_user.email,
                    "token": access_token, 
                    "institutional_user_id": insti_user.id,
                    "institutional_name": insti_user.institutional_name
                     }

    return jsonify(response_body), 200


@app.route('/create-scholarship', methods=['POST'])
@jwt_required()
def add_scholarship():
    current_user_id = get_jwt_identity()
    request_body = request.get_json(force=True)

    # Validación de entrada
    required_fields = ["scholarship_name", "deadline", "institution", "modality", "coverage", "professional_field", "description", "url_to"]
    for field in required_fields:
        if field not in request_body or not request_body[field]:
            return jsonify({"error": f"El campo '{field}' es obligatorio"}), 400

    # Creación de la beca
    scholarship = Scholarship(
        scholarship_name=request_body['scholarship_name'],
        deadline=request_body['deadline'],
        institution=request_body['institution'],
        modality=request_body['modality'],
        coverage=request_body['coverage'],
        professional_field=request_body['professional_field'],
        description=request_body['description'],
        url_to=request_body['url_to']
    )

    try:
        scholarship.save()
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"message": "Beca agregada correctamente"}), 201



@app.route("/scholarships", methods=["GET"])
def get_scholarships():
    scholarships = Scholarship.query.all()
    if scholarships is None:
        return jsonify({"msg": "There are not scholarships"}), 404
    scholarships_serialized = list(map(lambda x : x.serialize(), scholarships))
    response_body = {
        "msg": "Hello, this is your GET /scholarships response ",
        "scholarships": scholarships_serialized
    }

    return jsonify(response_body), 200

@app.route('/add_to_tracker', methods=['POST'])
@jwt_required()
def add_to_tracker():
    user_id = get_jwt_identity()
    data = request.get_json()
    scholarship_id = data.get('scholarship_id')

    if not scholarship_id:
        return jsonify({'error': 'ID de beca no proporcionado'}), 400

    beca = Scholarship.query.get(scholarship_id)

    if not beca:
        return jsonify({'error': 'Beca no encontrada'}), 404

    # Comprueba si el usuario ya ha guardado esta beca en su tracker
    tracker_entry = Tracker.query.filter_by(user_id=user_id, scholarship_id=scholarship_id).first()
    if tracker_entry:
        return jsonify({'message': 'La beca ya está en tu tracker'}), 409

    # Crea una nueva entrada en la tabla Tracker para guardar la beca
    new_tracker_entry = Tracker(user_id=user_id, scholarship_id=scholarship_id)

    try:
        db.session.add(new_tracker_entry)
        db.session.commit()
        return jsonify({'message': 'Beca añadida al tracker'}), 200
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Error al guardar la beca'}), 500

@app.route('/my_tracker', methods=['GET'])
@jwt_required()
def get_my_tracker():
    # Obtén el ID del usuario autenticado a través del identity
    user_id = get_jwt_identity()

    # Busca todas las becas que el usuario ha guardado en su tracker
    tracker_entries = Tracker.query.filter_by(user_id=user_id).all()

    # Crea una lista de becas basada en las entradas del tracker
    becas_guardadas = [entry.scholarship.serialize() for entry in tracker_entries]

    return jsonify({'becas_guardadas': becas_guardadas}), 200

@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({'message': 'Debes iniciar sesión primero'}), 422


@app.route('/api/send_email', methods=['GET'])
def send_mail():
    msg = Message(subject="test de mail", sender="bexploraproject@gmail.com", recipients=["bexploraproject@gmail.com"])
    msg.body = "Hola desde la clase"
    mail.send(msg)
    return jsonify({"msg" : "Mail enviado"}), 200


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)

