"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import datetime
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_cors import CORS
from flask_swagger import swagger
from flask_jwt_extended import JWTManager
from flask_mail import Mail, Message
from api import mail  # esto viene de api/__init__.py donde tienes: mail = Mail()

from api.utils import APIException, generate_sitemap
from api.models.models import db, User
from api.routes.user_routes import user as user_blueprint
from api.routes.plot_routes import fields as fields_blueprint
from api.routes.quote_routes import quote
from api.routes.report_routes import report_routes
from api.admin import setup_admin
from api.commands import setup_commands

# INICIALIZACIÓN DE FLASK
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')

app = Flask(__name__)

# 🔐 CORS CONFIG
CORS(app, supports_credentials=True, resources={
    r"/*": {"origins": "https://supreme-space-computing-machine-jj4vrjqxw5q4c5rvx-3000.app.github.dev"}
})

# ✅ OPCIONES PREVIA (preflight) PARA TODAS LAS RUTAS


@app.before_request
def handle_options_global():
    if request.method == 'OPTIONS':
        origin = request.headers.get('Origin')
        print(f"🔥 OPTIONS request from Origin: {origin}")  # 👈 log de control

        response = jsonify({})
        response.status_code = 204

        if origin:
            response.headers['Access-Control-Allow-Origin'] = origin
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = request.headers.get(
            'Access-Control-Request-Headers', 'Authorization,Content-Type')
        response.headers['Access-Control-Allow-Credentials'] = 'true'

        return response


# CONFIGURACIÓN DE FLASK-MAIL
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'dronfarm.mail@gmail.com'
app.config['MAIL_PASSWORD'] = 'bxgbafplmfduumdh'  # contraseña de aplicación
app.config['MAIL_DEFAULT_SENDER'] = 'DronFarm'
mail.init_app(app)

app.url_map.strict_slashes = False

# CONFIG DB
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# JWT CONFIG
app.config["JWT_SECRET_KEY"] = "yenesey-programando"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = datetime.timedelta(hours=1)
app.config["JWT_TOKEN_LOCATION"] = ["headers"]
app.config["JWT_HEADER_NAME"] = "Authorization"
app.config["JWT_HEADER_TYPE"] = "Bearer"
jwt = JWTManager(app)

# SETUP EXTRAS
setup_admin(app)
setup_commands(app)

# BLUEPRINTS
app.register_blueprint(user_blueprint, url_prefix='/user')
app.register_blueprint(fields_blueprint, url_prefix="/fields")
app.register_blueprint(quote, url_prefix="/quote")
app.register_blueprint(report_routes, url_prefix="/report_routes")

# ERROR HANDLER


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# SITEMAP


@app.route('/')
def sitemap():
    if ENV == "development":
        print("🔎 RUTAS REGISTRADAS EN FLASK:")
        for rule in app.url_map.iter_rules():
            print(f"{rule} → métodos: {','.join(rule.methods)}")
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# SERVIR ARCHIVOS ESTÁTICOS


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0
    return response


@app.route('/uploads/<path:filename>', methods=['GET'])
def serve_uploaded_file(filename):
    upload_folder = os.path.join(app.root_path, 'uploads')
    return send_from_directory(upload_folder, filename, as_attachment=False)


@app.route('/download/<path:filename>', methods=['GET'])
def download_file(filename):
    upload_folder = os.path.join(app.root_path, 'uploads')
    return send_from_directory(upload_folder, filename, as_attachment=True)


# Mostrar rutas en consola al iniciar
with app.app_context():
    print("\n🔎 RUTAS REGISTRADAS EN FLASK:")
    for rule in app.url_map.iter_rules():
        print(f"{rule} → métodos: {','.join(rule.methods)}")
    print("🔚 FIN DE RUTAS\n")

# MAIN
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
