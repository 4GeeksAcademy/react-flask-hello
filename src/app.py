import os
from flask import Flask, jsonify
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS

from src.api.routes import api
from src.api.db import db
from src.api.admin import setup_admin

def create_app():
    app = Flask(__name__)
    app.url_map.strict_slashes = False

    # Configuración de la base de datos y JWT
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", "sqlite:///levelup.db")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY", "super-secret")
    app.secret_key = 'super secret key'

    # Inicialización de extensiones
    db.init_app(app)
    Migrate(app, db)
    JWTManager(app)
    CORS(app)

    # Admin y rutas
    setup_admin(app)
    app.register_blueprint(api, url_prefix="/api")

    # Ruta raíz para comprobar si funciona
    @app.route("/")
    def home():
        return jsonify({"message": "LevelUp API is working 🚀"})

    return app

# Solo necesario si ejecutas este archivo directamente (opcional en Codespaces)
if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=3001, debug=True)
