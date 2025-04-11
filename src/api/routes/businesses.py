from flask import Blueprint, request, jsonify
from ..models import db, Businesses
from flask_jwt_extended import jwt_required

businesses_routes = Blueprint('businesses_routes', __name__)

@businesses_routes.route('/businesses', methods=['GET'])
# @jwt_required()
def get_businesses():
    businesses = Businesses.query.all()
    serialized_business = [business.serialize_business() for business in businesses]
    return jsonify(serialized_business), 200

@businesses_routes.route('/businesses/<string:business_tax_id>', methods=['GET'])
# @jwt_required()
def get_business(business_tax_id):
    business = Businesses.query.filter_by(business_tax_id=business_tax_id).first()
    if not business:
        return jsonify({"error": "business not found"}), 404
    return jsonify(business.serialize_business()), 200

@businesses_routes.route('/businesses', methods=['POST'])
# @jwt_required()
def add_business():
    data = request.get_json()
    if not data:
        return jsonify({"error": "data not found"}), 404

    required_fields = [
        "name",
        "tax_id",
        "postal_code"
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"the field {field} is required"}), 400

    existing_business = Businesses.query.filter_by(
        business_tax_id=data["tax_id"]).first()

    if existing_business:
        return jsonify({"error": "the business already exists"}), 400

    try:
        new_business = Businesses(
            business_name=data["name"],
            business_tax_id=data["tax_id"],
            business_postal_code=data["postal_code"],
        )

        db.session.add(new_business)
        db.session.commit()

        return jsonify({
            "msg": "business created successfully",
            "business": new_business.serialize_business()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "error": str(e)
        }), 500

@businesses_routes.route('/businesses/<int:business_id>', methods=['PUT'])
# @jwt_required()
def update_business(business_id):
    data = request.get_json()

    if not data:
        return jsonify({"error": "data not found"}), 400

    existing_business = Businesses.query.get(business_id)

    if not existing_business:
        return jsonify({"error": "business not found"}), 404

    try:
        existing_business.business_name = data.get(
            "name", existing_business.business_name)
        existing_business.business_postal_code = data.get(
            "postal_code", existing_business.business_postal_code)

        db.session.commit()

        return jsonify({
            "msg": "Business updated successfully",
            "business": existing_business.serialize_business()
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@businesses_routes.route('/businesses/<int:business_id>', methods=['DELETE'])
# @jwt_required()
def delete_business(business_id):
    business = Businesses.query.get(business_id)

    if not business:
        return jsonify({
            "error": "business not found"
        }), 404

    try:
        db.session.delete(business)
        db.session.commit()

        return jsonify({
            "msg": "Business deleted successfully"
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500