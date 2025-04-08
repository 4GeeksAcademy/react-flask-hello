import os
import datetime
from flask import Flask, jsonify, send_from_directory
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS  # Importa CORS

# Importaciones del proyecto
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

# Crear la instancia de la aplicación Flask
app = Flask(__name__)

# Configuración CORS: Permitir múltiples orígenes si es necesario
CORS(app)

# Configuración del entorno: usar "development" si FLASK_DEBUG está activado
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')

# Configuración de la base de datos
db_url = os.getenv("DATABASE_URL")
if db_url:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    # Si no hay una URL de base de datos, se usa SQLite para desarrollo
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///test.db"

# Deshabilitar la modificación del objeto de la base de datos (para optimización)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializar la migración de la base de datos
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# Configurar JWT (JSON Web Tokens) con claves y expiración
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = datetime.timedelta(days=365)  # 1 año
app.config["JWT_TOKEN_LOCATION"] = ["headers"]
app.config["JWT_HEADER_NAME"] = "Authorization"
app.config["JWT_HEADER_TYPE"] = "Bearer"

# Inicializar el gestor de JWT
jwt = JWTManager(app)

# Configurar el manejo de errores para las excepciones personalizadas
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Registrar el blueprint de la API con un prefijo 'api'
app.register_blueprint(api, url_prefix='/api')

# Configurar el administrador y comandos personalizados
setup_admin(app)
setup_commands(app)

# Ruta para generar el sitemap de la API
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# Ruta para servir cualquier otro archivo estático, como imágenes, JS, CSS, etc.
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # Evitar caché
    return response

# Ejecutar la aplicación si el archivo es ejecutado directamente
if __name__ == '__main__':
    # Obtener el puerto de la variable de entorno o usar el valor predeterminado 3001
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
