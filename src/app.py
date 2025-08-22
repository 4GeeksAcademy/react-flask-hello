import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from extension import mail,bcrypt
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

from dotenv import load_dotenv
load_dotenv()
from flask_jwt_extended import JWTManager
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


load_dotenv()

app = Flask(__name__) # Inicializa Flask primero
app.url_map.strict_slashes = False

app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "super-secret-default-key") # Carga clave JWT y configuración DB
app.config["MAIL_SERVER"] = 'smtp.gmail.com'
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = os.environ.get("GMAIL_USER")
app.config["MAIL_PASSWORD"] = os.environ.get("GMAIL_PASS")
app.config["MAIL_DEFAULT_SENDER"] = os.environ.get("GMAIL_USER") 
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


jwt = JWTManager(app) # Inicializa extensiones
bcrypt.init_app(app)
db.init_app(app)
mail.init_app(app)
MIGRATE = Migrate(app, db, compare_type=True)

setup_admin(app)
setup_commands(app)

app.register_blueprint(api, url_prefix='/api')

@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'src/front/dist/')
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"

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

if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)

class Config:
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.environ.get("GMAIL_USER")
    MAIL_PASSWORD = os.environ.get("GMAIL_PASS")
    MAIL_DEFAULT_SENDER = ('Tu App', MAIL_USERNAME)