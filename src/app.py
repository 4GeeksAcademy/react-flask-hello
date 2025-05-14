from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Required environment variables
FRONTEND_URL = os.getenv("FRONTEND_URL")
DATABASE_URL = os.getenv("DATABASE_URL")
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
FLASK_DEBUG = os.getenv("FLASK_DEBUG", "0")

# Ensure critical environment variables are set
if not FRONTEND_URL:
    raise RuntimeError("Missing required env var: FRONTEND_URL")
if not DATABASE_URL:
    raise RuntimeError("Missing required env var: DATABASE_URL")
if not JWT_SECRET_KEY:
    raise RuntimeError("Missing required env var: JWT_SECRET_KEY")

# Fix database URL formatting for PostgreSQL
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://")

print("🔗 FRONTEND_URL:", FRONTEND_URL)
print("🗄️ DATABASE_URL:", DATABASE_URL)
print("🔒 JWT_SECRET_KEY:", JWT_SECRET_KEY)

"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_cors import CORS
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager

# Environment setup
ENV = "development" if FLASK_DEBUG == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')

app = Flask(__name__)
CORS(app)
app.url_map.strict_slashes = False

# JWT Configuration
app.config["JWT_SECRET_KEY"] = JWT_SECRET_KEY
jwt = JWTManager(app)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# Setup Admin and Commands
setup_admin(app)
setup_commands(app)

# Register API routes with prefix
app.register_blueprint(api, url_prefix='/api')

# Handle errors as JSON responses
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Generate sitemap
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# Serve static files
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # Avoid cache memory
    return response

# Run the application
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=(FLASK_DEBUG == "1"))
