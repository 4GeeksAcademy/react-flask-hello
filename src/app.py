from src.api.auth import auth_bp
from src.api.models import db
from src.api.utils import APIException, generate_sitemap
from src.api.admin import setup_admin
from src.api.auth import auth_bp
from src.api.commands import setup_commands
from src.api.services.routes.users import users_bp
from src.api.services.routes.events import events_bp
from src.api.services.routes.weather import weather_bp
from dotenv import load_dotenv
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask import Flask
from flask import send_from_directory
import os
from src.api.services.routes.weather import weather_bp


# Cargar variables de entorno
load_dotenv()
app = Flask(__name__)  # ✅ Crea app primero
app.config['SECRET_KEY'] = os.getenv(
    "SECRET_KEY", "default-secret")  # ✅ Luego configura


# Inicializa la app
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

CORS(app, origins="*",
     supports_credentials=True)


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

# Registro de Blueprints
app.register_blueprint(users_bp, url_prefix='/api/users')
app.register_blueprint(events_bp, url_prefix='/api/events')

app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(weather_bp, url_prefix='/api')

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


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
