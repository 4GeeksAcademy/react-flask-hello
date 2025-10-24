"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from flask import Blueprint
from .user import user_bp
from .events import events_bp
from .cart import cart_bp
from .purchase import purchase_bp
from .maps import maps_bp
from .resetemail_bp import resetemail_bp


api = Blueprint('api', __name__)

api.register_blueprint(user_bp)
api.register_blueprint(events_bp)
api.register_blueprint(cart_bp)
api.register_blueprint(purchase_bp)
api.register_blueprint(maps_bp)
api.register_blueprint(resetemail_bp)