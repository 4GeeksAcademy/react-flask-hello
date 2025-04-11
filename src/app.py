import os
import datetime
from flask import Flask, jsonify, send_from_directory
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS  # IMPORTA CORS
from api.upload_routes import upload 

# IMPORTACIONES DEL PROYECTO

from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands


# CREAR LA INSTANCIA DE LA APLICACIÓN FLASK
app = Flask(__name__)
CORS(app)

app.register_blueprint(api, url_prefix='/api')
app.register_blueprint(upload, url_prefix='/api')


# CONFIGURACIÓN DEL ENTORNO: USAR "DEVELOPMENT" SI FLASK_DEBUG ESTÁ ACTIVADO
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')

# CONFIGURACIÓN DE LA BASE DE DATOS
db_url = os.getenv("DATABASE_URL")
if db_url:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    # SI NO HAY UNA URL DE BASE DE DATOS, SE USA SQLITE PARA DESARROLLO
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///test.db"

# DESHABILITAR LA MODIFICACIÓN DEL OBJETO DE LA BASE DE DATOS (PARA OPTIMIZACIÓN)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# INICIALIZAR LA MIGRACIÓN DE LA BASE DE DATOS
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# CONFIGURAR JWT (JSON WEB TOKENS) CON CLAVES Y EXPIRACIÓN
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = datetime.timedelta(days=365)  # 1 AÑO
app.config["JWT_TOKEN_LOCATION"] = ["headers"]
app.config["JWT_HEADER_NAME"] = "Authorization"
app.config["JWT_HEADER_TYPE"] = "Bearer"

# INICIALIZAR EL GESTOR DE JWT
jwt = JWTManager(app)

# CONFIGURAR EL MANEJO DE ERRORES PARA LAS EXCEPCIONES PERSONALIZADAS
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code



# CONFIGURAR EL ADMINISTRADOR Y COMANDOS PERSONALIZADOS
setup_admin(app)
setup_commands(app)

# RUTA PARA GENERAR EL SITEMAP DE LA API
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# RUTA PARA SERVIR CUALQUIER OTRO ARCHIVO ESTÁTICO, COMO IMÁGENES, JS, CSS, ETC.
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # EVITAR CACHÉ
    return response

# EJECUTAR LA APLICACIÓN SI EL ARCHIVO ES EJECUTADO DIRECTAMENTE
if __name__ == '__main__':
    # OBTENER EL PUERTO DE LA VARIABLE DE ENTORNO O USAR EL VALOR PREDETERMINADO 3001
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
