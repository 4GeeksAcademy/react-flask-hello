from flask import Blueprint, request, jsonify
from ..models import db, HistorialDeServicios, Clientes, Citas, Notas
from flask_jwt_extended import jwt_required

historial_routes = Blueprint('historial_routes', __name__, url_prefix='/api')


@historial_routes.route('/historial/cliente/<int:cliente_id>', methods=['GET'])
# @jwt_required()
def obtener_historial_cliente(cliente_id):
    cliente = Clientes.query.get(cliente_id)

    if not cliente:
        return jsonify({"error": "Cliente no encontrado"}), 404

    historiales = HistorialDeServicios.query.filter_by(
        cliente_id=cliente_id).all()

    if not historiales:
        return jsonify({"msg": f"No se han encontrado registros de historial para el cliente {cliente.nombre}"}), 404

    serialized_historiales = [historial.serialize_historial()
                              for historial in historiales]
    return jsonify(serialized_historiales), 200


@historial_routes.route('/historial', methods=['POST'])
# @jwt_required()
def agregar_historial():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Datos no encontrados"}), 400

    campos_requeridos = [
        "cliente_id",
        "cita_id"
    ]

    for campo in campos_requeridos:
        if campo not in data:
            return jsonify({"error": f"El campo {campo} es obligatorio"}), 400

    cliente = Clientes.query.get(data["cliente_id"])
    if not cliente:
        return jsonify({"error": "Cliente no encontrado"}), 404

    cita = Citas.query.get(data["cita_id"])
    if not cita:
        return jsonify({"error": "Cita no encontrada"}), 404

    if cita.cliente_id != cliente.id:
        return jsonify({"error": "La cita no pertenece a este cliente"}), 400

    historial_existente = HistorialDeServicios.query.filter_by(
        cita_id=data["cita_id"]).first()
    if historial_existente:
        return jsonify({"error": "Ya existe un registro de historial para esta cita"}), 400

    try:
        nuevo_historial = HistorialDeServicios(
            cliente_id=data["cliente_id"],
            cita_id=data["cita_id"],
            nota_id=data.get("nota_id")
        )

        if "nota_id" in data and data["nota_id"]:
            nota = Notas.query.get(data["nota_id"])
            if not nota:
                return jsonify({"error": "Nota no encontrada"}), 404

            if nota.cliente_id != cliente.id:
                return jsonify({"error": "La nota no pertenece a este cliente"}), 400

        db.session.add(nuevo_historial)
        db.session.commit()

        return jsonify({
            "msg": "Registro de historial creado con éxito",
            "historial": nuevo_historial.serialize_historial()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@historial_routes.route('/historial/<int:historial_id>', methods=['DELETE'])
# @jwt_required()
def borrar_historial(historial_id):
    
    historial = HistorialDeServicios.query.get(historial_id)

    if not historial:
        return jsonify({"error": "Registro de historial no encontrado"}), 404

    try:
        db.session.delete(historial)
        db.session.commit()

        return jsonify({"msg": "Registro de historial eliminado correctamente"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500