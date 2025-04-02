from flask import Blueprint, request, jsonify
from api.models.models import db, Field
from flask_jwt_extended import jwt_required

fields = Blueprint('fields_api', __name__)

# POST /fields - Crear una nueva parcela
@fields.route('/fields', methods=['POST'])
@jwt_required() 
def create_field():
    body = request.get_json()

    required_fields = ["name", "area", "crop", "sowing_date", "street", "number", "postal_code", "city", "user_id"]
    if not body or not all(field in body for field in required_fields):
        return jsonify({"error": "You must provide name, area, crop, sowing_date, street, number, postal_code, city and user_id"}), 400

    try:
        new_field = Field(
            name=body.get("name"),
            area=body.get("area"),
            crop=body.get("crop"),
            sowing_date=body.get("sowing_date"), 
            street=body.get("street"),
            number=body.get("number"),
            postal_code=body.get("postal_code"),
            city=body.get("city"),
            user_id=body.get("user_id")
        )
        db.session.add(new_field)
        db.session.commit()
        db.session.refresh(new_field)
        return jsonify(new_field.serialize_field()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# GET /fields - Obtener todas las parcelas
@fields.route('/fields', methods=['GET'])
@jwt_required() 
def get_all_fields():
    all_fields = Field.query.all()
    serialized_fields = [field.serialize_field() for field in all_fields]
    return jsonify(serialized_fields), 200

# GET /fields/<int:id> - Obtener una parcela por id
@fields.route('/fields/<int:id>', methods=['GET'])
@jwt_required() 
def get_field_by_id(id):
    field = Field.query.get(id)
    if not field:
        return jsonify({"error": "Field not found"}), 404
    return jsonify(field.serialize_field()), 200

# PUT /fields/<int:id> - Actualizar una parcela
@fields.route('/fields/<int:id>', methods=['PUT'])
@jwt_required()  # Se puede quitar o ajustar según sea necesario
def update_field(id):
    field = Field.query.get(id)
    if not field:
        return jsonify({"error": "Field not found"}), 404

    body = request.get_json()
    try:
        if "name" in body:
            field.name = body["name"]
        if "area" in body:
            field.area = body["area"]
        if "crop" in body:
            field.crop = body["crop"]
        if "sowing_date" in body:
            field.sowing_date = body["sowing_date"]
        if "street" in body:
            field.street = body["street"]
        if "number" in body:
            field.number = body["number"]
        if "postal_code" in body:
            field.postal_code = body["postal_code"]
        if "city" in body:
            field.city = body["city"]
        if "user_id" in body:
            field.user_id = body["user_id"]

        db.session.commit()
        db.session.refresh(field)
        return jsonify(field.serialize_field()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# DELETE /fields/<int:id> - Eliminar una parcela
@fields.route('/fields/<int:id>', methods=['DELETE'])
@jwt_required()  # Se puede quitar o ajustar según los requerimientos
def delete_field(id):
    field = Field.query.get(id)
    if not field:
        return jsonify({"error": "Field not found"}), 404

    try:
        db.session.delete(field)
        db.session.commit()
        return jsonify({"message": "Field successfully deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
 