"""
En este archivo están todas las rutas de records Peso
Ruta /api/records/weight 
"""
from flask import request, jsonify, Blueprint
from api.models import db, Weight
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

weight_blueprint = Blueprint('weight', __name__)

@weight_blueprint.route('/', methods=['POST'])
@jwt_required()
def add_weight_record():
    current_user_id = get_jwt_identity()

    data = request.get_json()

    if not data or not data.get('weight') or not data.get('manual_datetime'):
        return jsonify({"msg": "Faltan campos por rellenar"}), 400

    try:
        new_weight = Weight(
            user_id=current_user_id,
            weight=data['weight'],
            manual_datetime=datetime.strptime(
                data['manual_datetime'], "%d-%m-%Y %H:%M"),
            comments=data.get('comments')
        )

        db.session.add(new_weight)
        db.session.commit()

        return jsonify({"message": "Registro creado con éxito"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al guardar el registro", "error": str(e)}), 500


@weight_blueprint.route('/', methods=['GET'])
@jwt_required()
def get_weight_records():
    current_user_id = get_jwt_identity()

    try:

        records = Weight.query.filter_by(user_id=current_user_id).order_by(
            Weight.manual_datetime.desc()).all()

        return jsonify([
            {
                'id': record.id,
                'weight': record.weight,
                'manual_datetime': record.manual_datetime.strftime("%d-%m-%Y %H:%M"),
                'comments': record.comments
            }
            for record in records
        ]), 200

    except Exception as e:
        return jsonify({"msg": "Error al obtener los registros", "error": str(e)}), 500


@weight_blueprint.route('/<int:record_id>', methods=['DELETE'])
@jwt_required()
def delete_weight_record(record_id):
    current_user_id = get_jwt_identity()

    try:

        record = Weight.query.filter_by(
            id=record_id, user_id=current_user_id).first()

        if not record:
            return jsonify({"msg": "Registro no encontrado"}), 404

        db.session.delete(record)
        db.session.commit()

        return jsonify({"msg": "Registro eliminado correctamente"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al eliminar el registro", "error": str(e)}), 500

