import os
import re
import datetime
from slugify import slugify
from ..models.user import User
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS  # IMPORTA CORS
from flask import Flask, jsonify, send_from_directory

# IMPORTACIONES DEL PROYECTO
from api.models import db
from api.Routes.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from api.Routes.upload_logo import up_logo
from api.Routes.upload_routes import upload
from api.utils import APIException, generate_sitemap

# CREAR LA INSTANCIA DE LA APLICACIÓN FLASK
app = Flask(__name__)

# Registra el Blueprint con el prefijo de URL
app.register_blueprint(api, url_prefix='/api')
app.register_blueprint(upload, url_prefix='/upload')
app.register_blueprint(up_logo, url_prefix='/')


# CONFIGURACIÓN CORS: PERMITIR MÚLTIPLES ORÍGENES SI ES NECESARIO
CORS(app, resources={
    r"/*": {
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# CONFIGURACIÓN DEL ENTORNO: USAR "DEVELOPMENT" SI FLASK_DEBUG ESTÁ ACTIVADO
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')

# CONFIGURACIÓN DE LA BASE DE DATOS
db_url = os.getenv("DATABASE_URL")
if db_url:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
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



# -----------GENERA UNA URL BASADA EN EL NOMBRE DE LA TIENDA DEL USUARIO------------

def generate_store_url(store_name):
    # Convertir el nombre a un formato URL válido (slug)
    base_slug = slugify(store_name)
    
    # Verificar si el slug ya existe
    slug = base_slug
    counter = 1
    
    while User.query.filter_by(store_slug=slug).first() is not None:
        # Si ya existe, añadir un número
        slug = f"{base_slug}-{counter}"
        counter += 1
        
    return slug

def update_store_info(user_id, data):
    """Actualiza los datos del comercio para un usuario"""
    user = User.query.get(user_id)
    
    if not user:
        return None, "Usuario no encontrado"
    
    # Actualizar los datos del comercio
    if 'store_name' in data:
        user.store_name = data['store_name']
        # Si se cambia el nombre, generar una nueva URL
        if not user.store_slug or user.store_name != data.get('original_store_name', ''):
            user.store_slug = generate_store_url(data['store_name'])
    
    if 'store_description' in data:
        user.store_description = data['store_description']
    
    if 'bank_account' in data:
        user.bank_account = data['bank_account']
    
    # Otros campos como la información de contacto, etc.
    
    db.session.commit()
    
    return {
        'id': user.id,
        'store_name': user.store_name,
        'store_slug': user.store_slug,
        'store_url': f"https://{user.store_slug}.tudominio.com" # o f"https://tudominio.com/tienda/{user.store_slug}"
    }, None