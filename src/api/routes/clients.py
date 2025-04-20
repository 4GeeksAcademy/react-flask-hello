from flask import Blueprint, request, jsonify
from ..models import db, Clients, Services, Calendar, Appointments, ClientService, Businesses
from flask_jwt_extended import jwt_required
from ..api_calendar import GoogleCalendarManager
from datetime import datetime, UTC

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

    # Obtener solo las instancias de servicio no completadas
    active_instances = ClientService.query.filter_by(
        client_id=client_id,
        completed=False
    ).order_by(ClientService.created_at.desc()).all()

    # Serializar las instancias con información del servicio
    services_data = []
    for instance in active_instances:
        service = Services.query.get(instance.service_id)
        if service:
            service_data = service.serialize_service()
            service_data.update({
                "instance_id": instance.id,
                "created_at": instance.created_at.isoformat() if instance.created_at else None
            })
            services_data.append(service_data)

    return jsonify(services_data), 200


@clients_routes.route('/clients/<int:client_id>/services', methods=['POST'])
# @jwt_required()
def add_service_to_client(client_id):
    client = Clients.query.get(client_id)

    if not client:
        return jsonify({"error": "Client not found"}), 404

    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    if "service_id" in data:
        service_ids = [data["service_id"]]
    elif "service_ids" in data:
        service_ids = data["service_ids"]
    else:
        return jsonify({"error": "Service ID is required"}), 400

    if not isinstance(service_ids, list) or len(service_ids) == 0:
        return jsonify({"error": "service_ids must be a non-empty list"}), 400

    added_services = []
    errors = []

    for service_id in service_ids:
        service = Services.query.get(service_id)

        if not service:
            errors.append(f"Service with ID {service_id} not found")
            continue

        new_instance = ClientService(
            client_id=client_id,
            service_id=service_id,
            completed=False,
            created_at=datetime.utcnow()
        )

        db.session.add(new_instance)
        added_services.append(service)

    if not added_services and errors:
        db.session.rollback()
        return jsonify({"error": "; ".join(errors)}), 400

    try:
        db.session.commit()
        return jsonify({
            "msg": f"{len(added_services)} services added successfully",
            "service_instances": [instance.serialize() for instance in client.service_instances],
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


@clients_routes.route('/services/<int:service_id>/complete', methods=['PUT'])
# @jwt_required()
def complete_service(service_id):
    try:

        client_service = ClientService.query.filter_by(
            service_id=service_id).first()

        if not client_service:
            return jsonify({"error": "El servicio no se encontró o no está asignado a ningún cliente"}), 404

        client_service.completed = True
        client_service.completed_date = db.func.now()

        service = Services.query.get(service_id)
        client = Clients.query.get(client_service.client_id)

        if not service:
            return jsonify({"error": "No se pudo encontrar el servicio después de marcarlo como completado"}), 500

        db.session.commit()

        response_data = {
            "id": service.id,
            "name": service.name,
            "description": service.description,
            "price": service.price,
            "completed": True,
            "completed_date": client_service.completed_date.isoformat() if client_service.completed_date else None,
            "client_id": client.id if client else None,
            "client_name": client.name if client else None
        }

        return jsonify({
            "message": "Servicio marcado como completado exitosamente",
            "service": response_data
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error al marcar el servicio como completado: {str(e)}"}), 500


@clients_routes.route('/clients/<int:client_id>/completed-services', methods=['GET'])
# @jwt_required()
def get_client_completed_services(client_id):
    client = Clients.query.get(client_id)

    if not client:
        return jsonify({"error": "Cliente no encontrado"}), 404

    try:
        completed_instances = ClientService.query.filter_by(
            client_id=client_id,
            completed=True
        ).order_by(ClientService.completed_date.desc()).all()

        completed_services = []
        for instance in completed_instances:
            service = Services.query.get(instance.service_id)
            if service:
                service_data = service.serialize_service()
                service_data.update({
                    "instance_id": instance.id,
                    "completed": True,
                    "completed_date": instance.completed_date.isoformat() if instance.completed_date else None
                })
                completed_services.append(service_data)

        return jsonify(completed_services), 200

    except Exception as e:
        print(f"Error al obtener servicios completados: {str(e)}")
        return jsonify({"error": f"Error al obtener servicios completados: {str(e)}"}), 500


@clients_routes.route('/clients/<int:client_id>/services/<int:service_id>/status', methods=['GET'])
# @jwt_required()
def get_client_service_status(client_id, service_id):
    client = Clients.query.get(client_id)
    if not client:
        return jsonify({"error": "Cliente no encontrado"}), 404

    service = Services.query.get(service_id)
    if not service:
        return jsonify({"error": "Servicio no encontrado"}), 404

    # Verificamos la relación y su estado
    client_service = ClientService.query.filter_by(
        client_id=client_id,
        service_id=service_id
    ).first()

    if not client_service:
        return jsonify({"error": "El cliente no tiene este servicio asignado"}), 404

    return jsonify({
        "completed": client_service.completed,
        "completed_date": client_service.completed_date.isoformat() if client_service.completed_date else None
    }), 200


@clients_routes.route('/service-instances/<int:instance_id>/complete', methods=['PUT'])
# @jwt_required()
def complete_service_instance(instance_id):
    try:
        client_service = ClientService.query.get(instance_id)

        if not client_service:
            return jsonify({"error": "Service instance not found"}), 404

        client_service.completed = True
        client_service.completed_date = datetime.utcnow()

        service = Services.query.get(client_service.service_id)
        client = Clients.query.get(client_service.client_id)

        if not service:
            return jsonify({"error": "Service information not found"}), 500

        db.session.commit()

        response_data = {
            "instance_id": client_service.id,
            "service_id": service.id,
            "name": service.name,
            "description": service.description,
            "price": str(service.price),
            "completed": True,
            "completed_date": client_service.completed_date.isoformat() if client_service.completed_date else None,
            "client_id": client.id if client else None,
            "client_name": client.name if client else None
        }

        return jsonify({
            "message": "Service marked as completed successfully",
            "service": response_data
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error marking service as completed: {str(e)}"}), 500
    

@clients_routes.route('/service-instances/<int:instance_id>', methods=['DELETE'])
# @jwt_required()
def remove_service_instance(instance_id):
    instance = ClientService.query.get(instance_id)

    if not instance:
        return jsonify({"error": "Service instance not found"}), 404

    client_id = instance.client_id

    try:
        db.session.delete(instance)
        db.session.commit()
        
        active_instances = ClientService.query.filter_by(
            client_id=client_id, 
            completed=False
        ).all()
        
        services_data = []
        for active_instance in active_instances:
            service = Services.query.get(active_instance.service_id)
            if service:
                service_data = service.serialize_service()
                service_data.update({
                    "instance_id": active_instance.id,
                    "created_at": active_instance.created_at.isoformat() if active_instance.created_at else None
                })
                services_data.append(service_data)
        
        return jsonify({
            "msg": "Service instance removed successfully",
            "active_services": services_data
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
