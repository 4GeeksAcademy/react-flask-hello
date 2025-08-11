from flask import Blueprint, request, jsonify
from api.models import db, Event
from api.utils import geocode_address
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_cors import CORS

events_bp = Blueprint('events', __name__,)
CORS(events_bp)

# Listar los eventos
@events_bp.route('/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    return jsonify([e.serialize() for e in events]), 200

#obtener eveno por id
@events_bp.route('/events/<int:id>', methods=['GET'])
def get_event(id):
    event = Event.query.get(id)
    if not event:
        return jsonify({"msg": "Evento no encontrado"}), 404
    return jsonify(event.serialize()), 200


# eliminar evento
@events_bp.route('/events/<int:id>', methods=['DELETE'])
def delete_event(id):
    event = Event.query.get(id)
    if not event:
        return jsonify({"msg": "Evento no encontrado"}), 404

    db.session.delete(event)
    db.session.commit()
    return jsonify({"msg": "Evento eliminado correctamente"}), 200


#crear evento incluye price 
@events_bp.route('/events', methods=['POST'])
@jwt_required()
def create_event():
    current_user = get_jwt_identity()  # lo mantengo sin modificar tu lógica de token
    if not isinstance(current_user, dict) or current_user.get('role') not in ['admin', 'artista']:
        return jsonify({"msg": "No autorizado para crear eventos"}), 403

    data = request.get_json() or {}

    # Requeridos
    required = ['title', 'date']
    for field in required:
        if field not in data:
            return jsonify({"msg": f"El campo '{field}' es obligatorio"}), 400

    # price
    if "price" not in data:
        return jsonify({"msg": "El campo 'price' es obligatorio"}), 400
    try:
        price = float(data["price"])
    except (TypeError, ValueError):
        return jsonify({"msg": "El 'price' debe ser numérico"}), 400
    if price < 0:
        return jsonify({"msg": "El 'price' no puede ser negativo"}), 400

    try:
        lat = data.get("lat")
        lng = data.get("lng")
        location = data.get("location")

        # borrar si se tiene que borrar lng y latitud
        if (lat is None or lng is None) and location:
            lat, lng = geocode_address(location)
            if lat is None or lng is None:
                return jsonify({"msg": "No se pudo geocodificar la dirección"}), 400

        new_event = Event(
            title=data["title"],
            date=data["date"],
            description=data.get("description"),
            location=location,
            lat=lat,
            lng=lng,
            artist_id=data.get("artist_id"),
            price=price
        )

        db.session.add(new_event)
        db.session.commit()
        return jsonify(new_event.serialize()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al crear evento", "error": str(e)}), 500


#ACTUALIZAR EVENTO COMPLETO (PUT) INCLUYE PRECIO
@events_bp.route('/events/<int:id>', methods=['PUT'])
@jwt_required()
def update_event(id):
    current_user = get_jwt_identity()  # mantengo tu lógica
    if not isinstance(current_user, dict) or current_user.get('role') not in ['admin', 'artista']:
        return jsonify({"msg": "No autorizado"}), 403

    data = request.get_json() or {}

    event = Event.query.get(id)
    if not event:
        return jsonify({"msg": "Evento no encontrado"}), 404

    # Validaciones simples
    if 'title' in data and not data['title']:
        return jsonify({"msg": "'title' no puede estar vacío"}), 400
    if 'date' in data and not data['date']:
        return jsonify({"msg": "'date' no puede estar vacío"}), 400

    # price (si viene)
    if 'price' in data:
        try:
            price_val = float(data['price'])
        except (TypeError, ValueError):
            return jsonify({"msg": "El 'price' debe ser numérico"}), 400
        if price_val < 0:
            return jsonify({"msg": "El 'price' no puede ser negativo"}), 400
        event.price = price_val

    # Campos editables
    for field in ['title', 'date', 'description', 'location', 'artist_id']:
        if field in data:
            setattr(event, field, data[field])

    # lat/lng si se proveen; si no, intenta geocodificar cuando cambie location
    lat = data.get('lat', event.lat)
    lng = data.get('lng', event.lng)
    if 'location' in data and (data.get('lat') is None or data.get('lng') is None) and data['location']:
        g_lat, g_lng = geocode_address(data['location'])
        if g_lat is None or g_lng is None:
            return jsonify({"msg": "No se pudo geocodificar la nueva dirección"}), 400
        lat, lng = g_lat, g_lng
    event.lat = lat
    event.lng = lng

    try:
        db.session.commit()
        return jsonify(event.serialize()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al actualizar evento", "error": str(e)}), 500
    

# RUTAS DE PRECIO (consultar/actualizar solo el precio)

@events_bp.route('/events/<int:id>/price', methods=['GET'])
def get_event_price(id):
    event = Event.query.get(id)
    if not event:
        return jsonify({"msg": "Evento no encontrado"}), 404
    return jsonify({"id": event.id, "price": float(event.price) if event.price is not None else None}), 200    


