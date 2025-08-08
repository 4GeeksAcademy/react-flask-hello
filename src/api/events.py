from flask import Blueprint, request, jsonify
from api.models import db, Event
from api.utils import geocode_address
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_cors import CORS

events_bp = Blueprint('events', __name__,)
CORS(events_bp)


@events_bp.route('/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    return jsonify([e.serialize() for e in events]), 200

@events_bp.route('/events/<int:id>', methods=['GET'])
def get_event(id):
    event = Event.query.get(id)
    if not event:
        return jsonify({"msg": "Evento no encontrado"}), 404
    return jsonify(event.serialize()), 200

@events_bp.route('/events/<int:id>', methods=['DELETE'])
def delete_event(id):
    event = Event.query.get(id)
    if not event:
        return jsonify({"msg": "Evento no encontrado"}), 404

    db.session.delete(event)
    db.session.commit()
    return jsonify({"msg": "Evento eliminado correctamente"}), 200



@events_bp.route('/events', methods=['POST'])
@jwt_required()
def create_event():
    current_user = get_jwt_identity()
    if current_user['role'] not in ['admin', 'artista']:
        return jsonify({"msg": "No autorizado para crear eventos"}), 403

    data = request.get_json()
    try:
        lat = data.get("lat")
        lng = data.get("lng")

        if not lat or not lng:
            lat, lng = geocode_address(data["location"])
            if not lat or not lng:
                return jsonify({"msg": "No se pudo geocodificar la dirección"}), 400

        new_event = Event(
            title=data["title"],
            date=data["date"],
            description=data.get("description"),
            location=data.get("location"),
            lat=lat,
            lng=lng,
            artist_id=data.get("artist_id")
        )

        db.session.add(new_event)
        db.session.commit()
        return jsonify(new_event.serialize()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al crear evento", "error": str(e)}), 500
