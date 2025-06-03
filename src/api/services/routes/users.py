from flask import Blueprint
from src.api.services.controllers.users_controller import (
    create_user, get_users, get_user,
    update_user, delete_user, join_event, leave_event, get_user_events
)

users_bp = Blueprint('users', __name__)

# Registro de rutas con decoradores explícitos
users_bp.add_url_rule('/', view_func=create_user, methods=['POST'])
users_bp.add_url_rule('/', view_func=get_users, methods=['GET'])
users_bp.add_url_rule('/<int:user_id>', view_func=get_user, methods=['GET'])
users_bp.add_url_rule('/<int:user_id>', view_func=update_user, methods=['PUT'])
users_bp.add_url_rule(
    '/<int:user_id>', view_func=delete_user, methods=['DELETE'])
users_bp.add_url_rule('/<int:user_id>/join',
                      view_func=join_event, methods=['POST'])
users_bp.add_url_rule('/<int:user_id>/leave',
                      view_func=leave_event, methods=['POST'])
users_bp.add_url_rule('/<int:user_id>/events',
                      view_func=get_user_events, methods=['GET'])
