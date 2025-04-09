from flask import Blueprint, request, jsonify
from ..models import Usuarios
from flask_jwt_extended import create_access_token

auth_routes = Blueprint('auth_routes', __name__)

@auth_routes.route('/login', methods=['POST'])
def crear_token():
    data = request.get_json()

    campos_requeridos = ['username', 'password']
    for campo in campos_requeridos:
        if campo not in data:
            return jsonify({"Error": f"el campo {campo} es obligatorio"}), 400

    usuario_existente = Usuarios.query.filter_by(
        username=data['username']).first()

    if not usuario_existente or not usuario_existente.check_password(data['password']):
        return jsonify({"error": "credencial incorrecta"}), 401

    token_acceso = create_access_token(identity=str(usuario_existente.id))

    return jsonify({
        "token_acceso": token_acceso,
        "usuario": usuario_existente.serialize_usuario()
    }), 200