from flask import Blueprint, request, jsonify
from ..models import db, Services, Businesses
from flask_jwt_extended import jwt_required

services_routes = Blueprint('services_routes', __name__)

@services_routes.route('/services', methods=['GET'])
# @jwt_required()
def get_services():
    services = Services.query.all()
    serialized_service = [service.serialize_service()
                           for service in services]
    return jsonify(serialized_service), 200

@services_routes.route('/services/<string:name>', methods=['GET'])
# @jwt_required()
def get_service(name):
    service = Services.query.filter_by(name=name).first()
    if not service:
        return jsonify({"error": "Service not found"}), 404
    return jsonify(service.serialize_service()), 200

@services_routes.route('/services', methods=['POST'])
# @jwt_required()
def add_service():
    data = request.get_json()
    if not data:
        return jsonify({"error": "data not found"}), 404

    required_fields = [
        "name",
        "description",
        "price",
        "business_id"
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"the field {field} is required"}), 400

    existing_service = Services.query.filter_by(
        name=data["name"]).first()

    if existing_service:
        return jsonify({"error": "the service already exists"}), 400

    try:
        new_service = Services(
            name=data["name"],
            description=data["description"],
            price=data["price"],
            business_id=data["business_id"]
        )

        db.session.add(new_service)
        db.session.commit()

        return jsonify({
            "msg": "service created successfully",
            "service": new_service.serialize_service()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "error": str(e)
        }), 500

@services_routes.route('/services/multiple', methods=['POST'])
# @jwt_required()
def add_multiple_services():
    data = request.get_json()
    if not data or not isinstance(data, list):
        return jsonify({"error": "An array of services was expected"}), 400

    required_fields = ["name", "description", "price", "business_id"]
    created_services = []
    existing_services = []

    try:
        for service_data in data:
            for field in required_fields:
                if field not in service_data:
                    return jsonify({"error": f"the field {field} is required in one of the services"}), 400

            existing_service = Services.query.filter_by(
                name=service_data["name"]).first()
            if existing_service:
                existing_services.append(service_data["name"])
                continue

            new_service = Services(
                name=service_data["name"],
                description=service_data["description"],
                price=service_data["price"],
                business_id=service_data["business_id"]
            )

            db.session.add(new_service)
            created_services.append(new_service)

        db.session.commit()

        return jsonify({
            "msg": f"{len(created_services)} services created successfully",
            "created_services": [s.serialize_service() for s in created_services],
            "existing_services": existing_services
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "error": str(e)
        }), 500

@services_routes.route('/services/<string:service_name>', methods=['PUT'])
# @jwt_required()
def update_service(service_name):
    data = request.get_json()

    if not data:
        return jsonify({"error": "Data not found"}), 400

    existing_service = Services.query.filter_by(
        name=service_name).first()

    if not existing_service:
        return jsonify({"error": "Service not found"}), 404

    try:
        existing_service.description = data.get(
            "description", existing_service.description)
        existing_service.price = data.get(
            "price", existing_service.price)

        db.session.commit()

        return jsonify({
            "msg": "Service updated successfully",
            "service": existing_service.serialize_service()
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@services_routes.route('/services/<string:service_name>', methods=['DELETE'])
# @jwt_required()
def delete_service(service_name):
    service = Services.query.filter_by(name=service_name).first()

    if not service:
        return jsonify({
            "error": "service not found"
        }), 404

    try:
        db.session.delete(service)
        db.session.commit()

        return jsonify({
            "msg": "service deleted successfully"
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
@services_routes.route('/business/<int:business_id>/services', methods=['GET'])
# @jwt_required()
def get_business_services(business_id):
    """Get all services for a specific business"""
    business = Businesses.query.get(business_id)
    
    if not business:
        return jsonify({"error": f"Business with ID {business_id} not found"}), 404
        
    # Get all services for this business
    services = Services.query.filter_by(business_id=business_id).all()
    
    if not services:
        # Return an empty array instead of 404 if no services found
        return jsonify([]), 200
        
    serialized_services = [service.serialize_service() for service in services]
    return jsonify(serialized_services), 200