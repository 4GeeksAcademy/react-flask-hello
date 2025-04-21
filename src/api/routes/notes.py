from flask import Blueprint, request, jsonify
from ..models import db, Notes, Clients
from flask_jwt_extended import jwt_required

notes_routes = Blueprint('notes_routes', __name__)

@notes_routes.route('/notes', methods=['GET'])
@jwt_required()
def get_notes():
    notes = Notes.query.all()
    if not notes:
        return jsonify({"msg": "notes not found"}), 200
    serialized_notes = [note.serialize_note() for note in notes]
    return jsonify(serialized_notes), 200

@notes_routes.route('/notes/<int:client_id>', methods=['GET'])
@jwt_required()
def get_client_notes(client_id):
    notes = Notes.query.filter_by(client_id=client_id).all()
    if not notes:
        return jsonify({"msg": "notes not found"}), 200
    serialized_notes = [note.serialize_note() for note in notes]
    return jsonify(serialized_notes), 200

@notes_routes.route('/notes', methods=['POST'])
@jwt_required()
def add_note():
    data = request.get_json()
    if not data:
        return jsonify({"error": "data not found"}), 404

    required_fields = [
        "client_email",
        "description",
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"the field {field} is required"}), 400

    try:
        client = Clients.query.filter_by(
            email=data["client_email"]).first()

        if not client:
            return jsonify({"error": "client not found"}), 404

        new_note = Notes(
            client_id=client.id,
            description=data["description"]
        )

        db.session.add(new_note)
        db.session.commit()

        return jsonify({
            "msg": "note registered successfully",
            "note": new_note.serialize_note()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@notes_routes.route('/notes/<int:note_id>', methods=['DELETE'])
@jwt_required()
def delete_note(note_id):
    
    note = Notes.query.get(note_id)

    if not note:
        return jsonify({
            "error": "note not found"
        }), 404

    try:
        db.session.delete(note)
        db.session.commit()

        return jsonify({
            "msg": "note deleted successfully"
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500