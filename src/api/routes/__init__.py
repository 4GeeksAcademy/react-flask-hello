from .auth import auth_routes
from .usuarios import usuarios_routes
from .negocios import negocios_routes
from .clientes import clientes_routes
from .servicios import servicios_routes
from .citas import citas_routes
from .pagos import pagos_routes
from .notas import notas_routes
from .historial import historial_routes  


def register_routes(api):
    """Registrar todos los blueprints de rutas con el blueprint principal de la API"""
    api.register_blueprint(auth_routes)
    api.register_blueprint(usuarios_routes)
    api.register_blueprint(negocios_routes)
    api.register_blueprint(clientes_routes)
    api.register_blueprint(servicios_routes)
    api.register_blueprint(citas_routes)
    api.register_blueprint(pagos_routes)
    api.register_blueprint(notas_routes)
    api.register_blueprint(historial_routes) 