# 👇 ❇️ Riki for the group success  12 Abril 👊

from flask import Blueprint, request, jsonify
from api.models.models import db, Field
from flask_jwt_extended import jwt_required
from datetime import datetime
from flask_jwt_extended import jwt_required, get_jwt_identity
import requests
import time


fields = Blueprint('fields_api', __name__)


# 👇 ✅ POST /fields - Crear una nueva parcela

@fields.route('/fields', methods=['POST'])
@jwt_required()
def create_field():
    body = request.get_json()
    user_id = get_jwt_identity()

    required_fields = ["name", "area", "crop",
                       "street", "number", "postal_code", "city"]
    if not all(field in body for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    coords = body.get("coordinates")

    if not coords:
        try:
            calle = body.get("street", "")
            numero = body.get("number", "")
            if numero.lower() == "s/n":
                numero = ""

            city_clean = body.get("city", "").split(",")[0].strip()
            headers = {
                "User-Agent": "DroneFarmBot/1.0 (contacto@dronfarm.com)"}

            # Primer intento: dirección completa
            direccion = f"{calle} {numero}, {body.get('postal_code')} {city_clean}, España"
            geo_url = f"https://nominatim.openstreetmap.org/search?q={direccion}&format=json"
            geo_res = requests.get(geo_url, headers=headers)
            time.sleep(1)
            geo_data = geo_res.json()

            # Fallback: solo ciudad + CP si no hay resultados
            if not geo_data:
                fallback_dir = f"{body.get('postal_code')} {city_clean}, España"
                print("🔁 Fallback geocoding con:", fallback_dir)
                fallback_url = f"https://nominatim.openstreetmap.org/search?q={fallback_dir}&format=json"
                fallback_res = requests.get(fallback_url, headers=headers)
                time.sleep(1)
                geo_data = fallback_res.json()

            if geo_data and geo_data[0].get("lat") and geo_data[0].get("lon"):
                lat = geo_data[0]["lat"]
                lon = geo_data[0]["lon"]
                coords = f"{lat}, {lon}"
            else:
                print("❌ Dirección no encontrada ni con fallback:", direccion)
                coords = None

        except Exception as geo_err:
            print("🌐 Geocoding error:", geo_err)
            coords = None

    try:
        new_field = Field(
            name=body.get("name"),
            area=body.get("area"),
            crop=body.get("crop"),
            street=body.get("street"),
            number=body.get("number"),
            postal_code=body.get("postal_code"),
            city=body.get("city"),
            user_id=user_id,
            coordinates=coords
        )

        db.session.add(new_field)
        db.session.commit()
        db.session.refresh(new_field)

        return jsonify(new_field.serialize_field()), 201

    except ValueError:
        return jsonify({"error": "Invalid date or number format"}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# 👇 ✅ GET /fields - Obtener todas las parcelas

@fields.route('/fields', methods=['GET'])
@jwt_required()
def get_all_fields():
    all_fields = Field.query.all()
    serialized_fields = [field.serialize_field() for field in all_fields]
    return jsonify(serialized_fields), 200


# 👇 ✅ GET /fields/user/<int:user_id> - Obtener una parcela por user_id

@fields.route('/user/<int:user_id>', methods=['GET'])
@jwt_required()
def get_fields_by_user(user_id):
    fields = Field.query.filter_by(user_id=user_id).all()

    if not fields:
        return jsonify([]), 200  # Devuelve lista vacía si no hay parcelas

    return jsonify([f.serialize_field() for f in fields]), 200


# 👇 ✅ GET /fields/<int:id> - Obtener una parcela por id

@fields.route('/fields/<int:id>', methods=['GET'])
@jwt_required()
def get_field_by_id(id):
    field = Field.query.get(id)
    if not field:
        return jsonify({"error": "Field not found"}), 404
    return jsonify(field.serialize_field()), 200


# 👇 ✅ PUT /fields/<int:id> - Actualizar una parcela

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


# 👇 ✅ DELETE /fields/<int:id> - Eliminar una parcela

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
