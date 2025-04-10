from flask import Blueprint, request, jsonify
from ..models import db, Clients, Services
from flask_jwt_extended import jwt_required

clients_routes = Blueprint('clients_routes', __name__)

@clients_routes.route('/clients', methods=['GET'])
# @jwt_required()
def get_clients():
    clients = Clients.query.all()
    serialized_clients = [client.serialize_client() for client in clients]
    return jsonify(serialized_clients), 200

@clients_routes.route('/clients/<int:client_id>', methods=['GET'])
# @jwt_required()
def get_client(client_id):
    client = Clients.query.get(client_id)
    if not client:
        return jsonify({"error": "client not found"}), 404
    return jsonify(client.serialize_client()), 200

@clients_routes.route('/clients', methods=['POST'])
# @jwt_required()
def add_client():
    data = request.get_json()
    if not data:
        return jsonify({"error": "data not found"}), 404

    required_fields = [
        "name",
        "address",
        "phone",
        "client_id_number",
        "email"
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"the field {field} is required"}), 400

    existing_client = Clients.query.filter_by(
        client_id_number=data["client_id_number"]).first()

    if existing_client:
        return jsonify({"error": "the client already exists"}), 400

    try:
        new_client = Clients(
            name=data["name"],
            address=data["address"],
            phone=data["phone"],
            client_id_number=data["client_id_number"],
            email=data["email"],
        )
        db.session.add(new_client)

        if "services_ids" in data and isinstance(data["services_ids"], list):
            for service_id in data["services_ids"]:
                service = Services.query.get(service_id)
                if service:
                    new_client.services.append(service)

        db.session.commit()

        return jsonify({
            "msg": "Client created successfully",
            "client": new_client.serialize_client()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "error": str(e)
        }), 500

@clients_routes.route('/clients/<int:client_id>', methods=['PUT'])
# @jwt_required()
def update_client(client_id):
    data = request.get_json()

    if not data:
        return jsonify({"error": "data not found"}), 400

    client = Clients.query.get(client_id)

    if not client:
        return jsonify({"error": "Client not found"}), 404

    try:
        client.name = data.get("name", client.name)
        client.address = data.get("address", client.address)
        client.phone = data.get("phone", client.phone)
        client.email = data.get("email", client.email)

        db.session.commit()

        return jsonify({
            "msg": "Client updated successfully",
            "client": client.serialize_client()
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@clients_routes.route('/clients/<int:client_id>', methods=['DELETE'])
# @jwt_required()
def delete_client(client_id):
    client = Clients.query.filter_by(id=client_id).first()

    if not client:
        return jsonify({
            "error": "client not found"
        }), 404

    try:
        db.session.delete(client)
        db.session.commit()

        return jsonify({
            "msg": "Client deleted successfully"
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Routes for client-service relationship
@clients_routes.route('/clients/<int:client_id>/services', methods=['GET'])
# @jwt_required()
def get_client_services(client_id):
    client = Clients.query.get(client_id)

    if not client:
        return jsonify({"error": "client not found"}), 404

    services = [service.serialize_service()
                 for service in client.services]

    return jsonify(services), 200

@clients_routes.route('/clients/<int:client_id>/services', methods=['POST'])
# @jwt_required()
def add_service_to_client(client_id):
    client = Clients.query.get(client_id)

    if not client:
        return jsonify({"error": "Client not found"}), 404

    data = request.get_json()

    if not data or "service_id" not in data:
        return jsonify({"error": "Service ID is required"}), 400

    service = Services.query.get(data["service_id"])

    if not service:
        return jsonify({"error": "Service not found"}), 404
    
    if service in client.services:
        return jsonify({"error": "The client already has this service contracted"}), 400

    client.services.append(service)

    try:
        db.session.commit()
        return jsonify({
            "msg": "Service added successfully",
            "services": [s.serialize_service() for s in client.services]
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@clients_routes.route('/clients/<int:client_id>/services/<int:service_id>', methods=['DELETE'])
# @jwt_required()
def remove_service_from_client(client_id, service_id):
    client = Clients.query.get(client_id)

    if not client:
        return jsonify({"error": "Client not found"}), 404

    service = Services.query.get(service_id)

    if not service:
        return jsonify({"error": "Service not found"}), 404

    if service not in client.services:
        return jsonify({"error": "The client does not have this service contracted"}), 404

    client.services.remove(service)

    try:
        db.session.commit()
        return jsonify({
            "msg": "Service removed successfully",
            "services": [s.serialize_service() for s in client.services]
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500