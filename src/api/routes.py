"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.controllers.weather_controller import get_weather_info

from flask import Blueprint
# from api.controllers.events_controller import (
# create_event,
# get_events,
# get_event,
# update_event,
# delete_event,
# leave_event,
# join_event,

# )
api = Blueprint('api', __name__)

events_bp = Blueprint('events', __name__)

# events_bp.route('/', methods=['POST'])(create_event)  # Crear un nuevo evento
# events_bp.route('/', methods=['GET'])(get_events)  # Obtener todos los eventos
# events_bp.route('/<int:event_id>/join',
# methods = ['POST'](join_event)  # Unirse a un evento
# Obtener un evento por ID
# events_bp.route('/<int:event_id>', methods=['GET'])(get_event)
# Actualizar un evento por ID
# events_bp.route('/<int:event_id>', methods=['PUT'])(update_event)
# Eliminar evento
# events_bp.route('/<int:event_id>', methods=['DELETE'])(delete_event)
# events_bp.route('/<int:event_id>/leave', methods=['POST'])(leave_event)


users_bp = Blueprint('users', __name__)
# users_bp.route('/', methods=['POST'])(create_user)
# users_bp.route('/', methods=['GET'])(get_users)
# users_bp.route('/<int:user_id>', methods=['GET'])(get_user)
# <--- Esto es necesario
# users_bp.route('/<int:user_id>', methods=['PUT'])(update_user)
# users_bp.route('/<int:user_id>', methods=['DELETE'])(delete_user)
# users_bp.route('/<int:user_id>/join', methods=['POST'])(join_event)
# users_bp.route('/<int:user_id>/leave', methods=['POST'])(leave_event)
# users_bp.route('/<int:user_id>/events', methods=['GET'])(get_user_events)

# Nuevo blueprint
weather_bp = Blueprint('weather', __name__)
weather_bp.route('/', methods=['GET'])(get_weather_info)
