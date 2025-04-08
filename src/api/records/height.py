"""
En este archivo están todas las rutas de records Altura
Ruta /api/records/height 
"""
from flask import request, jsonify, Blueprint
from api.models import db, Height
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

height_blueprint = Blueprint('height', __name__)

@height_blueprint.route('/', methods=['POST'])
@jwt_required()
def add_height_record():
    current_user_id = get_jwt_identity()

    data = request.get_json()

    if not data or not data.get('height') or not data.get('manual_datetime'):
        return jsonify({"msg": "Faltan campos por rellenar"}), 400

    try:

        new_height = Height(
            user_id=current_user_id,
            height=data['height'],
            manual_datetime=datetime.strptime(
                data['manual_datetime'], "%d-%m-%Y %H:%M"),
            comments=data.get('comments')
        )

        db.session.add(new_height)
        db.session.commit()

        return jsonify({"message": "Registro creado con éxito"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al guardar el registro", "error": str(e)}), 500


@height_blueprint.route('/', methods=['GET'])
@jwt_required()
def get_height_records():
    current_user_id = get_jwt_identity()

    try:

        records = Height.query.filter_by(user_id=current_user_id).order_by(
            Height.manual_datetime.desc()).all()

        return jsonify([
            {
                'id': record.id,
                'height': record.height,
                'manual_datetime': record.manual_datetime.strftime("%d-%m-%Y %H:%M"),
                'comments': record.comments
            }
            for record in records
        ]), 200

    except Exception as e:
        return jsonify({"msg": "Error al obtener los registros", "error": str(e)}), 500


@height_blueprint.route('/<int:record_id>', methods=['DELETE'])
@jwt_required()
def delete_height_record(record_id):
    current_user_id = get_jwt_identity()

    try:

        record = Height.query.filter_by(
            id=record_id, user_id=current_user_id).first()

        if not record:
            return jsonify({"msg": "Registro no encontrado"}), 404

        db.session.delete(record)
        db.session.commit()

        return jsonify({"msg": "Registro eliminado correctamente"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al eliminar el registro", "error": str(e)}), 500