"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User, Orden_de_trabajo, Vehiculos, Servicio, AuxOrdenServicio, RolEnum

from datetime import timedelta

from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from flask_cors import CORS
from flask_mail import Mail, Message
import random
from werkzeug.security import generate_password_hash

# 🔹 Variable global para almacenar códigos de recuperación temporalmente
reset_codes = {}
verified_emails = {}

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../dist/')
app = Flask(__name__)
CORS(app)

app.config["JWT_SECRET_KEY"] = os.getenv('JWT_KEY')
jwt = JWTManager(app)

app.url_map.strict_slashes = False

# Database configuration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# Admin y comandos
setup_admin(app)
setup_commands(app)

# Blueprints
app.register_blueprint(api, url_prefix='/api')

# 🔹 Configuración de Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'pruebaautotek@gmail.com'  # tu correo
app.config['MAIL_PASSWORD'] = 'hzyp ztmh iteh bevk'      # tu App Password
app.config['MAIL_DEFAULT_SENDER'] = ('Soporte AutoTek', 'tucorreo@gmail.com')
mail = Mail(app)

# 🔹 Manejo de errores


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# 🔹 Sitemap


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0
    return response

# ---------------------- ENDPOINTS DEL PROYECTO ----------------------

# ENDPOINT PARA TRAER ORDENES DE TRABAJO

@app.route('/ordenes_de_trabajo', methods=['GET'])
@jwt_required()
def get_orden_de_trabajo():
    email_user_current = get_jwt_identity()
    user_current = User.query.filter_by(email=email_user_current).first()
    id_propietario = user_current.id_user

    rol_usuario = user_current.rol.value
    nombre_usuario = user_current.nombre
    print(nombre_usuario)

    if rol_usuario == "Cliente":
        ordenes_de_trabajo = Orden_de_trabajo.query.filter_by(
            usuario_id=id_propietario).all()
        print(ordenes_de_trabajo)
    else:
        ordenes_de_trabajo = Orden_de_trabajo.query.filter_by(
            mecanico_id=id_propietario).all()
        print(ordenes_de_trabajo)

    ot_serialized_by_user = []

    for orden_de_trabajo in ordenes_de_trabajo:
        ot_serialized_by_user.append(orden_de_trabajo.serialize())

    print(ot_serialized_by_user)
    return jsonify({'msg': 'ok', 'ordenes_de_trabajo': ot_serialized_by_user})

# 🔹 REGISTRO DE USUARIO


@app.route('/register', methods=['POST'])
def register_user():
    body = request.get_json(silent=True)
    if not body:
        return jsonify({'msg': 'Debes enviar informacion de nuevo usuario en el body'}), 400

    required_fields = ['nombre', 'identificacion',
                       'password', 'telefono', 'email']
    for field in required_fields:
        if field not in body:
            return jsonify({'msg': f'Debes enviar el campo {field}'}), 400

    new_user = User(
        nombre=body['nombre'],
        identificacion=body['identificacion'],
        password=body['password'],
        telefono=body['telefono'],
        email=body['email'],
        is_active=True,
        rol=RolEnum.CLIENTE
    )

    db.session.add(new_user)
    db.session.commit()
    return jsonify({'msg': 'ok', 'user': new_user.serialize()})

# 🔹 LOGIN


@app.route('/login', methods=['POST'])
def login():
    body = request.get_json(silent=True)
    if not body:
        return jsonify({'msg': 'Debes enviar informacion en el body'}), 400

    if 'email' not in body or 'password' not in body:
        return jsonify({'msg': 'Email y password son obligatorios'}), 400

    user = User.query.filter_by(email=body['email']).first()
    if not user or user.password != body['password']:
        return jsonify({'msg': 'Usuario o contraseña incorrectos'}), 400

    tipo_de_usuario = user.rol.value
    access_token = create_access_token(
        identity=user.email, expires_delta=timedelta(hours=2))
    return jsonify({'msg': 'ok', 'token': access_token, 'tipo_de_usuario': tipo_de_usuario}), 200

#  RECUPERAR CONTRASEÑA (SOLO UNA FUNCIÓN)


@app.route("/recuperar-password", methods=["POST"])
def recuperar_password():
    data = request.get_json()
    email = data.get("email")

    if not email:
        return jsonify({"message": "El email es requerido"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "El correo no está registrado"}), 404

    #  GENERAR CÓDIGO DE 6 DÍGITOS
    codigo = str(random.randint(100000, 999999))

    #  GUARDAR CÓDIGO EN MEMORIA
    reset_codes[email] = codigo
    print(f" Código generado para {email}: {codigo}")

    #  ENVIAR CORREO
    try:
        msg = Message("Código de recuperación de contraseña",
                      recipients=[email])
        msg.body = f"""
        Hola {user.nombre},

        Tu código de recuperación es: {codigo}

        Ingresa este código en la web para restablecer tu contraseña.
        """
        mail.send(msg)

        return jsonify({"message": "Se ha enviado un correo con tu código de recuperación"}), 200
    except Exception as e:
        print("❌ Error enviando correo:", e)
        return jsonify({"message": "Hubo un problema al enviar el correo"}), 500

# 🔹 VERIFICAR CÓDIGO


@app.route("/verificar-codigo", methods=["POST"])
def verificar_codigo():
    data = request.get_json()
    email = data.get("email")
    codigo = data.get("codigo")

    if not email or not codigo:
        return jsonify({"message": "Email y código son requeridos"}), 400

    if email in reset_codes and reset_codes[email] == codigo:
        verified_emails[email] = True
        del reset_codes[email]
        return jsonify({"message": "Código correcto. Ahora puedes restablecer tu contraseña."}), 200
    else:
        return jsonify({"message": "Código incorrecto o expirado."}), 400

# 🔹 CAMBIAR CONTRASEÑA


@app.route("/resetPassword", methods=["POST"])
def cambiar_password():
    data = request.get_json()
    email = data.get("email")
    codigo = data.get("codigo")
    nueva_password = data.get("password")

    if not email or not codigo or not nueva_password:
        return jsonify({"message": "Faltan datos"}), 400

    if email not in verified_emails or not verified_emails[email]:
        return jsonify({"message": "Primero debes verificar el código de recuperacón"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "Usuario no encontrado"}), 400

    user.password = nueva_password  # generate_password_hash(nueva_password)
    db.session.commit()

    del verified_emails[email]

    return jsonify({"message": "Contraseña cambiada con éxito"}), 200


# ---------------------- MAIN ----------------------
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
