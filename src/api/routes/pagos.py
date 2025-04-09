from flask import Blueprint, request, jsonify
from ..models import db, Pagos, Clientes
from flask_jwt_extended import jwt_required

pagos_routes = Blueprint('pagos_routes', __name__)

@pagos_routes.route('/pagos', methods=['GET'])
# @jwt_required()
def obtener_pagos():
    pagos = Pagos.query.all()
    if not pagos:
        return jsonify({"msg": "no se han encontrado pagos"}), 404

    serialized_pagos = [pago.serialize_pago() for pago in pagos]
    return jsonify(serialized_pagos), 200

@pagos_routes.route('/pagos/<int:cliente_id>', methods=['GET'])
# @jwt_required()
def obtener_pago(cliente_id):
    pagos = Pagos.query.filter_by(cliente_id=cliente_id).all()
    if not pagos:
        return jsonify({"error": "pago no encontrado"}), 404

    pagos_realizados = [pago.serialize_pago() for pago in pagos]
    return jsonify(pagos_realizados), 200

@pagos_routes.route('/pagos', methods=['POST'])
# @jwt_required()
def agregar_pago():
    data = request.get_json()
    if not data:
        return jsonify({"error": "data no encontrada"}), 404

    campos_requeridos = [
        "email_cliente",
        "metodo_pago",
        "total_estimado",
        "pagos_realizados",
        "fecha_pago",
        "estado"
    ]

    for campo in campos_requeridos:
        if campo not in data:
            return jsonify({"error": f"el campo {campo} es obligatorio"}), 400

    try:
        cliente = Clientes.query.filter_by(
            email=data["email_cliente"]).first()
        if not cliente:
            return jsonify({"error": "Cliente no encontrado"}), 404

        nuevo_pago = Pagos(
            cliente_id=cliente.id,
            metodo_pago=data["metodo_pago"],
            total_estimado=data["total_estimado"],
            pagos_realizados=data["pagos_realizados"],
            fecha_pago=data["fecha_pago"],
            estado=data["estado"]
        )

        db.session.add(nuevo_pago)
        db.session.commit()

        return jsonify({
            "msg": "Pago registrado con éxito",
            "pago": nuevo_pago.serialize_pago()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500