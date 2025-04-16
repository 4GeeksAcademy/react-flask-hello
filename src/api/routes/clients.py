from flask import Blueprint, request, jsonify
from ..models import db, Clients, Services, Calendar, Appointments, ClientService, Businesses
from flask_jwt_extended import jwt_required
from ..api_calendar import GoogleCalendarManager

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
        "email",
        "business_id"
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"the field {field} is required"}), 400

    existing_client = Clients.query.filter_by(
        client_id_number=data["client_id_number"]).first()

    if existing_client:
        return jsonify({"error": "the client already exists"}), 400
    
    business = Businesses.query.get(data["business_id"])
    if not business:
        return jsonify({"error": f"El negocio con ID {data['business_id']} no existe"}), 404

    try:
        new_client = Clients(
            name=data["name"],
            address=data["address"],
            phone=data["phone"],
            client_id_number=data["client_id_number"],
            email=data["email"],
            business_id=data["business_id"] 
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
    try:
        client = Clients.query.get(client_id)

        if not client:
            return jsonify({"error": "Client not found"}), 404

        calendar_manager = GoogleCalendarManager()

        appointments = Appointments.query.filter_by(client_id=client_id).all()

        db.session.begin_nested()

        calendars = Calendar.query.join(Appointments).filter(
            Appointments.client_id == client_id
        ).all()

        deleted_events = []

        if calendars:
            print(
                f"Deleting {len(calendars)} calendar entries for the client {client_id}")
            for calendar in calendars:
                if calendar_manager and calendar_manager.service:
                    success = calendar_manager.delete_event(
                        event_id=calendar.google_event_id)
                    if success:
                        deleted_events.append(calendar.google_event_id)
                    else:
                        print(
                            f"Error deleting event from Google Calendar: {calendar.google_event_id}")

                db.session.delete(calendar)

        ClientService.query.filter_by(client_id=client_id).delete()

        for appointment in appointments:
            db.session.delete(appointment)

        db.session.delete(client)

        db.session.commit()

        return jsonify({
            "message": "Client successfully deleted",
            "client_id": client_id,
            "deleted_events": deleted_events
        }), 200

    except Exception as e:
        db.session.rollback()
        print(f"Error deleting client {client_id}: {str(e)}")
        return jsonify({"error": f"Error deleting client: {str(e)}"}), 500


# ------------------------------------- Routes for client-service ---------------------------


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

    # Verifica si se recibió service_id (singular) o service_ids (plural)
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    # Intentar leer service_id (para compatibilidad con código anterior)
    if "service_id" in data:
        service_ids = [data["service_id"]]
    # Si no existe service_id, buscar service_ids
    elif "service_ids" in data:
        service_ids = data["service_ids"]
    else:
        return jsonify({"error": "Service ID is required"}), 400
    
    # Validar que service_ids sea una lista
    if not isinstance(service_ids, list) or len(service_ids) == 0:
        return jsonify({"error": "service_ids must be a non-empty list"}), 400

    added_services = []
    errors = []

    for service_id in service_ids:
        service = Services.query.get(service_id)
        
        if not service:
            errors.append(f"Service with ID {service_id} not found")
            continue
            
        if service in client.services:
            errors.append(f"The client already has the service '{service.name}' contracted")
            continue
            
        client.services.append(service)
        added_services.append(service)

    if not added_services and errors:
        db.session.rollback()
        return jsonify({"error": "; ".join(errors)}), 400

    try:
        db.session.commit()
        return jsonify({
            "msg": f"{len(added_services)} services added successfully",
            "services": [s.serialize_service() for s in client.services],
            "warnings": errors if errors else None
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
