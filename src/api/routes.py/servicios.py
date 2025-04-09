from flask import Blueprint, request, jsonify
from ..models import db, Servicios
from flask_jwt_extended import jwt_required

servicios_routes = Blueprint('servicios_routes', __name__, url_prefix='/api')

@servicios_routes.route('/servicios', methods=['GET'])
# @jwt_required()
def obtener_servicios():
    servicios = Servicios.query.all()
    serialized_servicio = [servicio.serialize_servicio()
                           for servicio in servicios]
    return jsonify(serialized_servicio), 200

@servicios_routes.route('/servicios/<string:nombre>', methods=['GET'])
# @jwt_required()
def obtener_servicio(nombre):
    Servicio = Servicios.query.filter_by(nombre=nombre).first()
    if not Servicio:
        return jsonify({"error": "Servicio no encontrado"}), 404
    return jsonify(Servicio.serialize_servicio()), 200

@servicios_routes.route('/servicios', methods=['POST'])
# @jwt_required()
def agregar_servicio():
    data = request.get_json()
    if not data:
        return jsonify({"error": "data no encontrada"}), 404

    campos_requeridos = [
        "nombre",
        "descripcion",
        "precio",
        "negocio_id"
    ]

    for campo in campos_requeridos:
        if campo not in data:
            return jsonify({"error": f"el campo {campo} es obligatorio"}), 400

    servicio_existente = Servicios.query.filter_by(
        nombre=data["nombre"]).first()

    if servicio_existente:
        return jsonify({"error": "el servicio ya existe"}), 400

    try:
        nuevo_servicio = Servicios(
            nombre=data["nombre"],
            descripcion=data["descripcion"],
            precio=data["precio"],
            negocio_id=data["negocio_id"]
        )

        db.session.add(nuevo_servicio)
        db.session.commit()

        return jsonify({
            "msg": "servicio creado con éxito",
            "servicio": nuevo_servicio.serialize_servicio()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "error": str(e)
        }), 500

@servicios_routes.route('/servicios/varios', methods=['POST'])
# @jwt_required()
def agregar_servicios_varios():
    data = request.get_json()
    if not data or not isinstance(data, list):
        return jsonify({"error": "Se esperaba un arreglo de servicios"}), 400

    campos_requeridos = ["nombre", "descripcion", "precio", "negocio_id"]
    servicios_creados = []
    servicios_existentes = []

    try:
        for servicio_data in data:
            for campo in campos_requeridos:
                if campo not in servicio_data:
                    return jsonify({"error": f"el campo {campo} es obligatorio en uno de los servicios"}), 400

            servicio_existente = Servicios.query.filter_by(
                nombre=servicio_data["nombre"]).first()
            if servicio_existente:
                servicios_existentes.append(servicio_data["nombre"])
                continue

            nuevo_servicio = Servicios(
                nombre=servicio_data["nombre"],
                descripcion=servicio_data["descripcion"],
                precio=servicio_data["precio"],
                negocio_id=servicio_data["negocio_id"]
            )

            db.session.add(nuevo_servicio)
            servicios_creados.append(nuevo_servicio)

        db.session.commit()

        return jsonify({
            "msg": f"{len(servicios_creados)} servicios creados con éxito",
            "servicios_creados": [s.serialize_servicio() for s in servicios_creados],
            "servicios_existentes": servicios_existentes
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "error": str(e)
        }), 500

@servicios_routes.route('/servicios/<string:nombre_servicio>', methods=['PUT'])
# @jwt_required()
def actualizar_servicio(nombre_servicio):
    data = request.get_json()

    if not data:
        return jsonify({"error": "Data no encontrada"}), 400

    servicio_existente = Servicios.query.filter_by(
        nombre=nombre_servicio).first()

    if not servicio_existente:
        return jsonify({"error": "Servicio no encontrado"}), 404

    try:
        servicio_existente.descripcion = data.get(
            "descripcion", servicio_existente.descripcion)
        servicio_existente.precio = data.get(
            "precio", servicio_existente.precio)

        db.session.commit()

        return jsonify({
            "msg": "Servicio actualizado con éxito",
            "servicio": servicio_existente.serialize_servicio()
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@servicios_routes.route('/servicios/<string:nombre_servicio>', methods=['DELETE'])
# @jwt_required()
def borrar_servicio(nombre_servicio):
    servicio = Servicios.query.filter_by(nombre=nombre_servicio).first()

    if not servicio:
        return jsonify({
            "error": "servicio no encontrado"
        }), 404

    try:
        db.session.delete(servicio)
        db.session.commit()

        return jsonify({
            "msg": "servicio borrado correctamente"
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500