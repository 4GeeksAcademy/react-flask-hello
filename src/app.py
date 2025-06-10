from flask import Flask, jsonify, send_from_directory, make_response
from flask import request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
import os
from api.auth import auth_bp
from api.models import db
from api.utils import APIException, generate_sitemap
from api.admin import setup_admin
from api.commands import setup_commands
from api.services.routes.users import users_bp
from api.services.routes.events import events_bp
from api.services.routes.weather import weather_bp

# Cargar variables de entorno
load_dotenv()


# Configuración del entorno
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../dist/')
app = Flask(__name__)
# Configuración CORS profesional
CORS(
    app,
    origins=os.getenv("FLASK_FRONTEND_URL"),
    supports_credentials=True
)
app.url_map.strict_slashes = False


@app.before_request
def handle_before_request():
    if request.method == 'OPTIONS':
        response = make_response()
        origin = request.headers.get("Origin", "*")
        # Check if the origin is allowed
        if origin in os.getenv("FLASK_FRONTEND_URL"):
            response.headers.add('Access-Control-Allow-Origin', origin)
            response.headers.add(
                'Access-Control-Allow-Headers', 'Content-Type, Authorization')
            response.headers.add('Access-Control-Allow-Methods',
                                 'GET, POST, PUT, DELETE, OPTIONS')
            response.headers.add('Access-Control-Allow-Credentials', 'true')
            return response, 200


app.config['JWT_SECRET_KEY'] = os.getenv(
    "JWT_SECRET_KEY", "super-secret-jwt-key")
jwt = JWTManager(app)


# @app.after_request
# def add_cors_headers(response):
# origin = request.headers.get("Origin", "")
# if origin in os.getenv("FLASK_FRONTEND_URL") :
# response.headers["Access-Control-Allow-Origin"] = origin
# response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
# response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
# response.headers["Access-Control-Allow-Credentials"] = "true"
# return response


@app.after_request
def add_cors_headers(response):
    origin = request.headers.get("Origin")
    allowed_origin = os.getenv("FLASK_FRONTEND_URL")
    if allowed_origin and origin == allowed_origin:
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
        response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS,PUT,DELETE"
        response.headers["Access-Control-Allow-Credentials"] = "true"
    return response


<<<<<<< HEAD
# Configuración CORS // DUPLICADO
# CORS(app, origins="https://scaling-bassoon-97jpv9qrpxw537rxr-3000.app.github.dev",
    # supports_credentials=True)
=======
# Configuración CORS
CORS(app, origins=["http://localhost:3000", "https://reimagined-trout-*.app.github.dev"], supports_credentials=True)   
>>>>>>> 5912055cd1abaf902bb773db1d7e2560e9d0254f

# Configuración de base de datos
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

# Registro de Blueprints
app.register_blueprint(users_bp, url_prefix='/api/users')
app.register_blueprint(events_bp, url_prefix='/api/events')
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(weather_bp, url_prefix='/api')

# Manejador de errores


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Ruta principal para desarrollo


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# Ruta para archivos estáticos


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0
    return response


port = int(os.environ.get('PORT', 4000))

# Iniciar servidor
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port, debug=True)
