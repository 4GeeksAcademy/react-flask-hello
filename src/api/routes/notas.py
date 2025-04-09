from flask import Blueprint, request, jsonify
from ..models import db, Notas, Clientes
from flask_jwt_extended import jwt_required

notas_routes = Blueprint('notas_routes', __name__)

@notas_routes.route('/notas', methods=['GET'])
# @jwt_required()
def obtener_notas():
    notas = Notas.query.all()
    if not notas:
        return jsonify({"error": "notas no encontradas"}), 404
    serialized_notas = [nota.serialize_nota() for nota in notas]
    return jsonify(serialized_notas), 200

@notas_routes.route('/notas/<int:cliente_id>', methods=['GET'])
# @jwt_required()
def obtener_notas_cliente(cliente_id):
    notas = Notas.query.filter_by(cliente_id=cliente_id).all()
    if not notas:
        return jsonify({"msg": "notas no encontradas"}), 404
    serialized_notas = [nota.serialize_nota() for nota in notas]
    return jsonify(serialized_notas), 200

@notas_routes.route('/notas', methods=['POST'])
# @jwt_required()
def agregar_nota():
    data = request.get_json()
    if not data:
        return jsonify({"error": "data no encontrada"}), 404

    campos_requeridos = [
        "email_cliente",
        "descripcion",
    ]

    for campo in campos_requeridos:
        if campo not in data:
            return jsonify({"error": f"el campo {campo} es obligatorio"}), 400

    try:
        cliente = Clientes.query.filter_by(
            email=data["email_cliente"]).first()

        if not cliente:
            return jsonify({"error": "cliente no encontrado"}), 404

        nueva_nota = Notas(
            cliente_id=cliente.id,
            descripcion=data["descripcion"]
        )

        db.session.add(nueva_nota)
        db.session.commit()

        return jsonify({
            "msg": "nota registrada con éxito",
            "nota": nueva_nota.serialize_nota()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@notas_routes.route('/notas/<int:nota_id>', methods=['DELETE'])
# @jwt_required()
def borrar_nota(nota_id):
    # Buscar la nota por su ID (clave primaria)
    nota = Notas.query.get(nota_id)

    if not nota:
        return jsonify({
            "error": "nota no encontrada"
        }), 404

    try:
        db.session.delete(nota)
        db.session.commit()

        return jsonify({
            "msg": "nota borrada correctamente"
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500