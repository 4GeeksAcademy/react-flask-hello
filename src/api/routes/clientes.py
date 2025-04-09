from flask import Blueprint, request, jsonify
from ..models import db, Clientes, Servicios
from flask_jwt_extended import jwt_required

clientes_routes = Blueprint('clientes_routes', __name__)

@clientes_routes.route('/clientes', methods=['GET'])
# @jwt_required()
def obtener_clientes():
    clientes = Clientes.query.all()
    serialized_clientes = [cliente.serialize_cliente() for cliente in clientes]
    return jsonify(serialized_clientes), 200

@clientes_routes.route('/clientes/<int:cliente_id>', methods=['GET'])
# @jwt_required()
def obtener_cliente(cliente_id):
    cliente = Clientes.query.get(cliente_id)
    if not cliente:
        return jsonify({"error": "cliente no encontrado"}), 404
    return jsonify(cliente.serialize_cliente()), 200

@clientes_routes.route('/clientes', methods=['POST'])
# @jwt_required()
def agregar_cliente():
    data = request.get_json()
    if not data:
        return jsonify({"error": "data no encontrada"}), 404

    campos_requeridos = [
        "nombre",
        "dirección",
        "telefono",
        "cliente_dni",
        "email"
    ]

    for campo in campos_requeridos:
        if campo not in data:
            return jsonify({"error": f"el campo {campo} es obligatorio"}), 400

    cliente_existente = Clientes.query.filter_by(
        cliente_dni=data["cliente_dni"]).first()

    if cliente_existente:
        return jsonify({"error": "el cliente ya existe"}), 400

    try:
        nuevo_cliente = Clientes(
            nombre=data["nombre"],
            dirección=data["dirección"],
            telefono=data["telefono"],
            cliente_dni=data["cliente_dni"],
            email=data["email"],
        )
        db.session.add(nuevo_cliente)

        if "servicios_ids" in data and isinstance(data["servicios_ids"], list):
            for servicio_id in data["servicios_ids"]:
                servicio = Servicios.query.get(servicio_id)
                if servicio:
                    nuevo_cliente.servicios.append(servicio)

        db.session.commit()

        return jsonify({
            "msg": "Cliente creado con éxito",
            "Cliente": nuevo_cliente.serialize_cliente()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "error": str(e)
        }), 500

@clientes_routes.route('/clientes/<int:cliente_id>', methods=['PUT'])
# @jwt_required()
def actualizar_cliente(cliente_id):
    data = request.get_json()

    if not data:
        return jsonify({"error": "data no encontrada"}), 400

    cliente = Clientes.query.get(cliente_id)

    if not cliente:
        return jsonify({"error": "Cliente no encontrado"}), 404

    try:
        cliente.nombre = data.get("nombre", cliente.nombre)
        cliente.dirección = data.get("dirección", cliente.dirección)
        cliente.telefono = data.get("telefono", cliente.telefono)
        cliente.email = data.get("email", cliente.email)

        db.session.commit()

        return jsonify({
            "msg": "Cliente actualizado con éxito",
            "Usuario": cliente.serialize_cliente()
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@clientes_routes.route('/clientes/<int:cliente_id>', methods=['DELETE'])
# @jwt_required()
def borrar_cliente(cliente_id):
    cliente = Clientes.query.filter_by(id=cliente_id).first()

    if not cliente:
        return jsonify({
            "error": "cliente no encontrado"
        }), 404

    try:
        db.session.delete(cliente)
        db.session.commit()

        return jsonify({
            "msg": "Cliente borrado correctamente"
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Rutas para la relación cliente-servicio
@clientes_routes.route('/clientes/<int:cliente_id>/servicios', methods=['GET'])
# @jwt_required()
def obtener_servicios_cliente(cliente_id):
    cliente = Clientes.query.get(cliente_id)

    if not cliente:
        return jsonify({"error": "cliente no encontrado"}), 404

    servicios = [servicio.serialize_servicio()
                 for servicio in cliente.servicios]

    return jsonify(servicios), 200

@clientes_routes.route('/clientes/<int:cliente_id>/servicios', methods=['POST'])
# @jwt_required()
def agregar_servicio_cliente(cliente_id):
    cliente = Clientes.query.get(cliente_id)

    if not cliente:
        return jsonify({"error": "Cliente no encontrado"}), 404

    data = request.get_json()

    if not data or "servicio_id" not in data:
        return jsonify({"error": "Se requiere el ID del servicio"}), 400

    servicio = Servicios.query.get(data["servicio_id"])

    if not servicio:
        return jsonify({"error": "Servicio no encontrado"}), 404

    # Verificar si el cliente ya tiene este servicio
    if servicio in cliente.servicios:
        return jsonify({"error": "El cliente ya tiene este servicio contratado"}), 400

    # Agregar el servicio al cliente
    cliente.servicios.append(servicio)

    try:
        db.session.commit()
        return jsonify({
            "msg": "Servicio agregado con éxito",
            "servicios": [s.serialize_servicio() for s in cliente.servicios]
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@clientes_routes.route('/clientes/<int:cliente_id>/servicios/<int:servicio_id>', methods=['DELETE'])
# @jwt_required()
def quitar_servicio_cliente(cliente_id, servicio_id):
    cliente = Clientes.query.get(cliente_id)

    if not cliente:
        return jsonify({"error": "Cliente no encontrado"}), 404

    servicio = Servicios.query.get(servicio_id)

    if not servicio:
        return jsonify({"error": "Servicio no encontrado"}), 404

    # Verificar si el cliente tiene este servicio
    if servicio not in cliente.servicios:
        return jsonify({"error": "El cliente no tiene este servicio contratado"}), 404

    # Quitar el servicio del cliente
    cliente.servicios.remove(servicio)

    try:
        db.session.commit()
        return jsonify({
            "msg": "Servicio eliminado con éxito",
            "servicios": [s.serialize_servicio() for s in cliente.servicios]
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500