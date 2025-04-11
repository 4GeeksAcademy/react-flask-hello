from flask import Blueprint
from flask_cors import CORS

api = Blueprint('api', __name__)
CORS(api)

from .routes import register_routes

register_routes(api)