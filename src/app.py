import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from src.api.utils import APIException, generate_sitemap
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from src.api.models import db
from src.api.routes import api
from src.api.admin import setup_admin
from src.api.commands import setup_commands
# from models import Person
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False
# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY", "super-secret")
    app.secret_key = 'super secret key'
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)
JWTManager(app)


CORS(app,
     origins=["https://upgraded-space-cod-rpr9xqp5xvgc5wrr-3000.app.github.dev"],
     supports_credentials=True,
     allow_headers=["Content-Type", "Authorization"],
     expose_headers=["Content-Type"],
     methods=["GET", "POST", "OPTIONS", "PUT", "DELETE"]
    )

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
# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)



# import os
# from flask import Flask, jsonify
# from flask_migrate import Migrate
# from flask_jwt_extended import JWTManager
# from flask_cors import CORS

# from api.routes import api
# from api.admin import setup_admin
# from api.models import db


# # import os
# # from flask import Flask, request, jsonify, url_for, send_from_directory
# # from flask_migrate import Migrate
# # from flask_swagger import swagger
# # from api.utils import APIException, generate_sitemap
# # from api.models import db
# # from api.routes import api
# # from api.admin import setup_admin
# # from api.commands import setup_commands

# def create_app():
#     app = Flask(__name__)
#     app.url_map.strict_slashes = False

#     # Configuración de la base de datos y JWT
#     app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", "sqlite:///levelup.db")
#     app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
#     app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY", "super-secret")
#     app.secret_key = 'super secret key'

#     # Inicialización de extensiones
#     Migrate(app, db)
#     db.init_app(app)

#     JWTManager(app)

#     CORS(app,
#     origins=["https://upgraded-space-cod-rpr9xqp5xvgc5wrr-3000.app.github.dev"],
#     supports_credentials=True,
#     allow_headers=["Content-Type", "Authorization"],
#     expose_headers=["Content-Type"],
#     methods=["GET", "POST", "OPTIONS", "PUT", "DELETE"]
#     )


#     setup_admin(app)
#     app.register_blueprint(api, url_prefix="/api")

#     # Ruta raíz para comprobar si funciona
#     @app.route("/")
#     def home():
#         return jsonify({"message": "LevelUp API is working 🚀"})

#     return app

# # Solo necesario si ejecutas este archivo directamente
# if __name__ == "__main__":
#     app = create_app()
#     app.run(host="0.0.0.0", port=3001, debug=True)
