import os
from flask import Flask, jsonify
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS

from api.routes import api
from api.admin import setup_admin
from api.models import db

def create_app():
    app = Flask(__name__)
    app.url_map.strict_slashes = False

    # Configuración de la base de datos y JWT
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", "sqlite:///levelup.db")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY", "super-secret")
    app.secret_key = 'super secret key'

    # Inicialización de extensiones
    Migrate(app, db)
    db.init_app(app)
    JWTManager(app)

    CORS(app,
        origins=["https://proyecto-final-4geeks-davidfarewell-1.onrender.com"],
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization"],
        expose_headers=["Content-Type"],
        methods=["GET", "POST", "OPTIONS", "PUT", "DELETE"]
    )

    setup_admin(app)
    app.register_blueprint(api, url_prefix="/api")

    # Ruta raíz para comprobar si funciona
    @app.route("/")
    def home():
        return jsonify({"message": "LevelUp API is working 🚀"})

    return app