from flask import Blueprint, request, jsonify
from api.models import db, Event
from api.utils import geocode_address

events_bp = Blueprint('events', __name__,)

@events_bp.route('/events', methods=['POST'])
def create_event():
        data = request.get_json()
        lat = data.get("lat")
        lng = data.get("lng")
        if not lat or not lng:
            lat, lng = geocode_address(data.get("location"))
            if not lat or not lng:
                return jsonify({"msg": "No se pudo geocodificar"}), 400
        try:
            event = Event(
                title=data["title"],
                date=data["date"],
                description=data.get("description"),
                location=data.get("location"),
                lat=lat,
                lng=lng,
                artist_id=data.get("artist_id")
            )
            db.session.add(event)
            db.session.commit()
            return jsonify(event.serialize()), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({"msg": "Error", "error": str(e)}), 500