"""
En este archivo están todas las rutas de Datos Generales
Ruta /api/users/general-data
"""
from flask import request, jsonify, Blueprint
from api.models import db, GeneralData, Gender, BloodType, PhysicalActivity
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

users_bp = Blueprint('users', __name__)


@users_bp.route('/general-data', methods=['GET'])
@jwt_required()
def get_general_data():
    try:
        current_user_id = get_jwt_identity()

        # Buscar datos generales
        general_data = GeneralData.query.filter_by(
            user_id=current_user_id).first()

        if not general_data:
            return jsonify({'msg': 'No hay datos generales registrados para este usuario'}), 404

        return jsonify({
            'general_data': general_data.serialize_general_data()
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Método POST para crear datos generales
@users_bp.route('/general-data', methods=['POST'])
@jwt_required()
def add_general_data():
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()

        # Verificar que se proporcionen los datos necesarios
        # Estos datos los debe ingresar el Usuario, son requeridos(Obligatorios)
        required_fields = ['name', 'birth_date', 'phone', 'gender']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'El campo {field} es requerido'}), 400

        # Parsear la fecha de nacimiento al formato DD-MM-YY
        try:
            # Puede ser que el usuario ingresa la fecha en formato DD-MM-YYYY o DD-MM-YY
            birth_date_str = data['birth_date']
            # Varios formatos comunes
            for fmt in ['%d-%m-%Y', '%d-%m-%y', '%d/%m/%Y', '%d/%m/%y']:
                try:
                    birth_date = datetime.strptime(birth_date_str, fmt)
                    # Pasa al formato deseado DD-MM-YY
                    formatted_birth_date = birth_date.strftime('%d-%m-%y')
                    break
                except ValueError:
                    continue
            else:
                # Si ninguno de los formatos funciona
                return jsonify({'error': 'Formato de fecha inválido. Use DD-MM-YYYY o DD-MM-YY'}), 400
        except Exception as e:
            return jsonify({'error': f'Error al procesar la fecha: {str(e)}'}), 400

        # Verificar si ya existen datos generales
        existing_data = GeneralData.query.filter_by(
            user_id=current_user_id).first()
        if existing_data:
            return jsonify({'error': 'Ya existen datos generales para este usuario. Deseas editarlos'}), 409

        # Crear nuevos datos generales con la fecha formateada
        general_data = GeneralData(
            user_id=current_user_id,
            name=data['name'],
            birth_date=formatted_birth_date,  # Usamos la fecha formateada
            phone=data['phone'],
            gender=Gender[data['gender']] if data['gender'] in [
                g.name for g in Gender] else None
        )

        # Añadir campos opcionales si se proporcionan
        if 'last_weight' in data:
            general_data.last_weight = data['last_weight']
        if 'last_height' in data:
            general_data.last_height = data['last_height']
        if 'BMI' in data:
            general_data.BMI = data['BMI']
        if 'blood_type' in data:
            general_data.blood_type = BloodType[data['blood_type']] if data['blood_type'] in [
                bt.name for bt in BloodType] else None
        if 'dietary_preferences' in data:
            general_data.dietary_preferences = data['dietary_preferences']
        if 'physical_activity' in data:
            general_data.physical_activity = PhysicalActivity[data['physical_activity']] if data['physical_activity'] in [
                pa.name for pa in PhysicalActivity] else None

        db.session.add(general_data)
        db.session.commit()

        return jsonify({
            'msg': 'Datos generales creados exitosamente',
            'general_data': general_data.serialize_general_data()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

    
@users_bp.route('/general-data', methods=['PUT'])
@jwt_required()
def update_general_data():
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()

        # Función para parsear fechas en múltiples formatos
        general_data = GeneralData.query.filter_by(
            user_id=current_user_id).first()

        if not general_data:
            return jsonify({'error': 'No existen datos generales para este usuario'}), 404

        # Función para parsear fechas en múltiples formatos
        def parse_date(date):
            formats = ['%d-%m-%Y', '%Y-%m-%d']
            for format in formats:
                try:
                    return datetime.strptime(date, format).date()
                except ValueError:
                    continue
            raise ValueError('Invalid date format')

        # Actualización directa de campos
        if 'name' in data:
            general_data.name = data['name']

        if 'birth_date' in data:
            # Manejar tanto DD-MM-YYYY como YYYY-MM-DD
            if isinstance(data['birth_date'], str):
                general_data.birth_date = parse_date(data['birth_date'])
            else:
                general_data.birth_date = data['birth_date']

        if 'phone' in data:
            general_data.phone = data['phone']

        if 'gender' in data:
            general_data.gender = Gender[data['gender']] if data['gender'] in [
                g.name for g in Gender] else None

        if 'last_weight' in data:
             general_data.last_weight = float(data['last_weight']) if data['last_weight'] is not None else None

        if 'last_height' in data:
            general_data.last_height = float(
                data['last_height']) if data['last_height'] is not None else None

        if 'blood_type' in data:
            general_data.blood_type = BloodType[data['blood_type']] if data['blood_type'] in [
                bt.name for bt in BloodType] else None

        if 'dietary_preferences' in data:
            general_data.dietary_preferences = data['dietary_preferences']

        if 'physical_activity' in data:
            general_data.physical_activity = (
                PhysicalActivity[data['physical_activity']]
                if data['physical_activity'] in [pa.name for pa in PhysicalActivity]
                else None
            )

        db.session.commit()

        return jsonify({
            'msg': 'Datos generales actualizados exitosamente',
            'general_data': general_data.serialize_general_data()
        }), 200

    except ValueError as e:
        return jsonify({'error': str(e)}), 422
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
