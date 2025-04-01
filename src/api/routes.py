from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Usuarios, Admins, Negocio, Servicio, Clientes, Nota, Pagos, Citas, Calendario, Problemas, HistorialDeServicios
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def example():
    

    return jsonify(), 200
