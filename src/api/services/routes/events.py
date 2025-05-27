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

events_bp = Blueprint('events', __name__, url_prefix='/api/events')

# Rutas relacionadas con eventos
events_bp.add_url_rule('/', view_func=create_event,
                       methods=['POST'])              # Crear evento
# Obtener todos los eventos
events_bp.add_url_rule('/', view_func=get_events, methods=['GET'])
events_bp.add_url_rule('/<int:event_id>', view_func=get_event,
                       methods=['GET'])    # Obtener un evento
events_bp.add_url_rule('/<int:event_id>', view_func=update_event,
                       methods=['PUT'])  # Actualizar evento
events_bp.add_url_rule('/<int:event_id>', view_func=delete_event,
                       methods=['DELETE'])  # Eliminar evento
events_bp.add_url_rule('/<int:event_id>/join',
                       # Unirse a evento
                       view_func=join_event, methods=['POST'])
events_bp.add_url_rule('/<int:event_id>/leave',
                       # Salir de evento
                       view_func=leave_event, methods=['POST'])
