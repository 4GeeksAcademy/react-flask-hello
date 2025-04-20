from .auth import auth_routes
from .users import users_routes
from .businesses import businesses_routes
from .clients import clients_routes
from .services import services_routes
from .appointments import appointments_routes
from .payments import payments_routes
from .notes import notes_routes
from .history import history_routes  


def register_routes(api):

    api.register_blueprint(auth_routes)
    api.register_blueprint(users_routes)
    api.register_blueprint(businesses_routes)
    api.register_blueprint(clients_routes)
    api.register_blueprint(services_routes)
    api.register_blueprint(appointments_routes)
    api.register_blueprint(payments_routes)
    api.register_blueprint(notes_routes)
    api.register_blueprint(history_routes) 