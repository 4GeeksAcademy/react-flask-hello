import os
from flask import Flask, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_restx import Api
from flask_migrate import Migrate
from config import Config  
from api.utils import APIException, generate_sitemap
from api.admin import setup_admin
from api.commands import setup_commands

# Initialize Flask app
app = Flask(__name__)
app.url_map.strict_slashes = False
app.config.from_object(Config)

# Database setup
db = SQLAlchemy()
db.init_app(app)
MIGRATE = Migrate(app, db, compare_type=True)

# Initialize API docs
api = Api(app, title="Cocktail Recipe API", version="1.0", description="Manage cocktail recipes")

# Register Blueprints
try:
    from cocktails import cocktail_bp
    from users import user_bp
    from favorites import favorites_bp

    app.register_blueprint(cocktail_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(favorites_bp)
except ImportError as e:
    print(f"Error importing blueprints: {e}")

# Admin panel and CLI commands
setup_admin(app)
setup_commands(app)

# Error handler for API exceptions
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Sitemap generator for development
ENV = os.getenv("FLASK_ENV", "production")  # Default to "production" if ENV not set
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')

@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# Serve static files
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    full_path = os.path.join(static_file_dir, path)
    if not os.path.isfile(full_path):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # Avoid cache memory
    return response

# Start the Flask app
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=os.getenv("FLASK_DEBUG", "0") == "1")
