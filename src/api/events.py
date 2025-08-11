from flask import Blueprint, request, jsonify
from api.models import db, Event, Artist
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from flask_cors import CORS

events_bp = Blueprint('events', __name__)  # ← CAMBIAR 'api' por 'events_bp'
CORS(events_bp)


# ← Y cambiar todas las '@api.route' por '@events_bp.route'
@events_bp.route('/events', methods=['GET'])
def get_events():
    try:
        events = Event.query.all()
        return jsonify([event.serialize() for event in events]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@events_bp.route('/events', methods=['POST'])
@jwt_required()
def create_event():
    try:
        claims = get_jwt()
        user_id = get_jwt_identity()

        # ✅ QUITAR VERIFICACIÓN DE ROL COMPLETAMENTE
        # if claims['role'] not in ['admin', 'artista']:
        #     return jsonify({"error": "No tienes permisos para crear eventos"}), 403

        data = request.get_json()

        artist_id = None
        if 'artist_name' in data and data['artist_name']:
            artist = Artist.query.filter_by(name=data['artist_name']).first()
            if not artist:
                artist = Artist(name=data['artist_name'])
                db.session.add(artist)
                db.session.flush()
            artist_id = artist.id

        new_event = Event(
            title=data['title'],
            date=data['date'],
            description=data.get('description', ''),
            location=data.get('location', ''),
            lat=float(data['lat']) if data.get('lat') else None,
            lng=float(data['lng']) if data.get('lng') else None,
            artist_id=artist_id
        )

        db.session.add(new_event)
        db.session.commit()

        return jsonify({
            "message": "Evento creado exitosamente",
            "event": new_event.serialize()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

