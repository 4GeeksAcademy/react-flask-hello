from flask import Flask
from flask_cors import CORS
from api.models import db
from api.routes import api
import os

def create_app():
    app = Flask(__name__)

    # Config DB
    db_uri = (
        os.getenv("SQLALCHEMY_DATABASE_URI")
        or os.getenv("DATABASE_URL")
        or "sqlite:////workspaces/final-project-Tasky/tasky.db"
    )
    app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    # 🔧 CORS habilitado para todas las rutas del API
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Blueprint
    app.register_blueprint(api, url_prefix="/api")

    @app.route("/")
    def root():
        return "Tasky API OK. Revisa /api/*"

    return app

app = create_app()