from flask import Blueprint, request, jsonify
from ..models import db, ServiceHistory, Clients, Appointments, Notes
from flask_jwt_extended import jwt_required

history_routes = Blueprint('history_routes', __name__)


@history_routes.route('/history/client/<int:client_id>', methods=['GET'])
@jwt_required()
def get_client_history(client_id):
    client = Clients.query.get(client_id)

    if not client:
        return jsonify({"error": "Client not found"}), 404

    history_records = ServiceHistory.query.filter_by(
        client_id=client_id).all()

    if not history_records:
        return jsonify({"msg": f"No history records found for client {client.name}"}), 404

    serialized_history = [history.serialize_history()
                          for history in history_records]
    return jsonify(serialized_history), 200


@history_routes.route('/history', methods=['POST'])
@jwt_required()
def add_history():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Data not found"}), 400

    required_fields = [
        "client_id",
        "appointment_id"
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"The field {field} is required"}), 400

    client = Clients.query.get(data["client_id"])
    if not client:
        return jsonify({"error": "Client not found"}), 404

    appointment = Appointments.query.get(data["appointment_id"])
    if not appointment:
        return jsonify({"error": "Appointment not found"}), 404

    if appointment.client_id != client.id:
        return jsonify({"error": "The appointment does not belong to this client"}), 400

    existing_history = ServiceHistory.query.filter_by(
        appointment_id=data["appointment_id"]).first()
    if existing_history:
        return jsonify({"error": "A history record already exists for this appointment"}), 400

    try:
        new_history = ServiceHistory(
            client_id=data["client_id"],
            appointment_id=data["appointment_id"],
            note_id=data.get("note_id")
        )

        if "note_id" in data and data["note_id"]:
            note = Notes.query.get(data["note_id"])
            if not note:
                return jsonify({"error": "Note not found"}), 404

            if note.client_id != client.id:
                return jsonify({"error": "The note does not belong to this client"}), 400

        db.session.add(new_history)
        db.session.commit()

        return jsonify({
            "msg": "History record created successfully",
            "history": new_history.serialize_history()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@history_routes.route('/history/<int:history_id>', methods=['DELETE'])
@jwt_required()
def delete_history(history_id):
    
    history = ServiceHistory.query.get(history_id)

    if not history:
        return jsonify({"error": "History record not found"}), 404

    try:
        db.session.delete(history)
        db.session.commit()

        return jsonify({"msg": "History record deleted successfully"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500