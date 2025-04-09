from flask import Blueprint, request, jsonify
from ..models import db, Negocios
from flask_jwt_extended import jwt_required

negocios_routes = Blueprint('negocios_routes', __name__, url_prefix='/api')

@negocios_routes.route('/negocios', methods=['GET'])
# @jwt_required()
def obtener_negocios():
    negocios = Negocios.query.all()
    serialized_negocio = [negocio.serialize_negocio() for negocio in negocios]
    return jsonify(serialized_negocio), 200

@negocios_routes.route('/negocios/<string:negocios_cif>', methods=['GET'])
# @jwt_required()
def obtener_negocio(negocios_cif):
    negocio = Negocios.query.filter_by(negocio_cif=negocios_cif).first()
    if not negocio:
        return jsonify({"error": "negocio no encontrado"}), 404
    return jsonify(negocio.serialize_negocio()), 200

@negocios_routes.route('/negocios', methods=['POST'])
# @jwt_required()
def agregar_negocio():
    data = request.get_json()
    if not data:
        return jsonify({"error": "data no encontrada"}), 404

    campos_requeridos = [
        "nombre",
        "CIF",
        "CP",
    ]

    for campo in campos_requeridos:
        if campo not in data:
            return jsonify({"error": f"el campo {campo} es obligatorio"}), 400

    negocio_existente = Negocios.query.filter_by(
        negocio_cif=data["CIF"]).first()

    if negocio_existente:
        return jsonify({"error": "el negocio ya existe"}), 400

    try:
        nuevo_negocio = Negocios(
            nombre_negocio=data["nombre"],
            negocio_cif=data["CIF"],
            negocio_cp=data["CP"],
        )

        db.session.add(nuevo_negocio)
        db.session.commit()

        return jsonify({
            "msg": "negocio creado con éxito",
            "negocio": nuevo_negocio.serialize_negocio()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "error": str(e)
        }), 500

@negocios_routes.route('/negocios/<int:negocio_id>', methods=['PUT'])
# @jwt_required()
def actualizar_negocio(negocio_id):
    data = request.get_json()

    if not data:
        return jsonify({"error": "data no encontrada"}), 400

    negocio_existente = Negocios.query.get(negocio_id)

    if not negocio_existente:
        return jsonify({"error": "negocio no encontrado"}), 404

    try:
        negocio_existente.nombre_negocio = data.get(
            "nombre", negocio_existente.nombre_negocio)
        negocio_existente.negocio_cp = data.get(
            "CP", negocio_existente.negocio_cp)

        db.session.commit()

        return jsonify({
            "msg": "Negocio actualizado con éxito",
            "Negocio": negocio_existente.serialize_negocio()
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@negocios_routes.route('/negocios/<int:negocio_id>', methods=['DELETE'])
# @jwt_required()
def borrar_negocio(negocio_id):
    negocio = Negocios.query.get(negocio_id)

    if not negocio:
        return jsonify({
            "error": "negocio no encontrado"
        }), 404

    try:
        db.session.delete(negocio)
        db.session.commit()

        return jsonify({
            "msg": "Negocio borrado correctamente"
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500