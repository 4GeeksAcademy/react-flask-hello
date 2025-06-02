from flask import Blueprint
from src.api.services.controllers.events_controller import (
    create_event,
    get_events,
    get_event,
    update_event,
    delete_event,
    leave_event,
    join_event
)

events_bp = Blueprint('events', __name__)

# Crear un nuevo evento
events_bp.add_url_rule('/', view_func=create_event, methods=['POST'])

# Obtener todos los eventos (con soporte para filtrar por dificultad)
events_bp.add_url_rule('/', view_func=get_events, methods=['GET'])

# Obtener un evento específico
events_bp.add_url_rule('/<int:event_id>', view_func=get_event, methods=['GET'])

# Actualizar un evento existente
events_bp.add_url_rule('/<int:event_id>', view_func=update_event, methods=['PUT'])

# Eliminar un evento
events_bp.add_url_rule('/<int:event_id>', view_func=delete_event, methods=['DELETE'])

# Unirse a un evento
events_bp.add_url_rule('/<int:event_id>/join', view_func=join_event, methods=['POST'])

# Salir de un evento
events_bp.add_url_rule('/<int:event_id>/leave', view_func=leave_event, methods=['POST'])
