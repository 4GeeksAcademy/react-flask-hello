from flask import Flask
from .config import Config
from .extensions import db, migrate, jwt


def create_app(): 
    app = Flask(__name__)
    app.config.from_object(Config)

    #inicializacion de extensiones

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    #importacion de blueprints

    from .routes import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    return app

