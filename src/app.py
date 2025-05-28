from src.api.models import db
from src.api.services.routes.users import users_bp
from src.api.services.routes.events import events_bp
from dotenv import load_dotenv
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask import Flask
import os


# Cargar variables de entorno
load_dotenv()

# Inicializa la app
app = Flask(__name__)
CORS(app)

# Configuración de la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///SportConnect.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicialización de extensiones
db.init_app(app)
migrate = Migrate(app, db)

# Registro de Blueprints
app.register_blueprint(users_bp, url_prefix='/api/users')
app.register_blueprint(events_bp, url_prefix='/api/events')

# Ruta base


@app.route('/')
def index():
    return {"message": "API SportConnect funcionando"}


# Debug / desarrollo
if __name__ == '__main__':
    print("Rutas registradas:")
    print(app.url_map)
    app.run(debug=True)
