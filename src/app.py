import os
from flask import Flask, send_from_directory, jsonify
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from api.routes import api
from api.models import db

app = Flask(__name__)
app.url_map.strict_slashes = False
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", "sqlite:///database.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "super-secret")

CORS(app)
db.init_app(app)
Migrate(app, db)
JWTManager(app)

app.register_blueprint(api, url_prefix="/api")

@app.route("/")
def sitemap():
    return jsonify({"msg": "Welcome to LevelUp API"})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3001, debug=True)
