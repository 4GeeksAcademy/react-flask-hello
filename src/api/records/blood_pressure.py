"""
En este archivo están todas las rutas de records Tensión/PresiónArterial
Ruta /api/records/bloodpresure
"""
from flask import request, jsonify, Blueprint
from api.models import db, BloodPressure
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

blood_pressure_blueprint = Blueprint('blood_pressure', __name__)


@blood_pressure_blueprint.route('/', methods=['POST'])
@jwt_required()
def add_bloodpressure_record():
    current_user_id = get_jwt_identity()

    data = request.get_json()

    if not data or not data.get('systolic') or not data.get('diastolic') or not data.get('manual_datetime'):
        return jsonify({"msg": "Faltan campos por rellenar"}), 400

    try:
        new_bloodpressure = BloodPressure(
            user_id=current_user_id,
            systolic=data['systolic'],
            diastolic=data['diastolic'],
            manual_datetime=datetime.strptime(
                data['manual_datetime'], "%d-%m-%Y %H:%M"),
            comments=data.get('comments')
        )

        db.session.add(new_bloodpressure)
        db.session.commit()

        return jsonify({"message": "Registro creado con éxito"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al guardar el registro", "error": str(e)}), 500


@blood_pressure_blueprint.route('/', methods=['GET'])
@jwt_required()
def get_bloodpressure_records():
    current_user_id = get_jwt_identity()

    try:

        records = BloodPressure.query.filter_by(user_id=current_user_id).order_by(
            BloodPressure.manual_datetime.desc()).all()

        return jsonify([
            {
                'id': record.id,
                'systolic': record.systolic,
                'diastolic': record.diastolic,
                'manual_datetime': record.manual_datetime.strftime("%d-%m-%Y %H:%M"),
                'comments': record.comments
            }
            for record in records
        ]), 200

    except Exception as e:
        return jsonify({"msg": "Error al obtener los registros", "error": str(e)}), 500


@blood_pressure_blueprint.route('/<int:record_id>', methods=['DELETE'])
@jwt_required()
def delete_bloodpressure_record(record_id):
    current_user_id = get_jwt_identity()

    try:

        record = BloodPressure.query.filter_by(
            id=record_id, user_id=current_user_id).first()

        if not record:
            return jsonify({"msg": "Registro no encontrado o no tienes permiso para eliminarlo"}), 404

        db.session.delete(record)
        db.session.commit()

        return jsonify({"message": "Registro eliminado con éxito"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al eliminar el registro", "error": str(e)}), 500
