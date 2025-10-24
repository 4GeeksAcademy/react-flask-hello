from flask import Blueprint, request, jsonify
from api.models import db, Event, Artist
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from flask_cors import CORS

events_bp = Blueprint('events', __name__)
CORS(events_bp)


@events_bp.route('/events', methods=['GET'])
def get_events():
    """Obtener todos los eventos"""

    try:
        events = Event.query.all()
        return jsonify([event.serialize() for event in events]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@events_bp.route('/events/<int:event_id>', methods=['GET'])
def get_event(event_id):
    """Obtener un evento específico por ID"""
    try:
        event = Event.query.get_or_404(event_id)
        return jsonify(event.serialize()), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@events_bp.route('/events', methods=['POST'])

def create_event():

    """Crear un nuevo evento"""
    try:
        
        data = request.get_json()

        # Validar datos requeridos
        required_fields = ['title', 'date', 'location', 'price']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({"error": f"El campo '{field}' es requerido"}), 400

        # Validar precio
        try:
            price = float(data['price'])
            if price < 0:
                return jsonify({"error": "El precio no puede ser negativo"}), 400
        except (ValueError, TypeError):
            return jsonify({"error": "El precio debe ser un número válido"}), 400

        # Validar coordenadas si están presentes
        lat = None
        lng = None
        if data.get('lat') and data.get('lng'):
            try:
                lat = float(data['lat'])
                lng = float(data['lng'])
                # Validar rango de coordenadas
                if not (-90 <= lat <= 90) or not (-180 <= lng <= 180):
                    return jsonify({"error": "Coordenadas inválidas"}), 400
            except (ValueError, TypeError):
                return jsonify({"error": "Las coordenadas deben ser números válidos"}), 400

        # Manejar artista

        artist_id = None
        if 'artist_name' in data and data['artist_name']:
            artist = Artist.query.filter_by(name=data['artist_name']).first()
            if not artist:
                artist = Artist(name=data['artist_name'])
                db.session.add(artist)
                db.session.flush()
            artist_id = artist.id

        # Crear evento
        new_event = Event(
            title=data['title'],
            date=data['date'],
            description=data.get('image', ''),
            # image=data['image'],
            location=data['location'],
            lat=lat,
            lng=lng,
            artist_id=artist_id,
            price=price

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


@events_bp.route('/events/<int:event_id>', methods=['PUT'])
@jwt_required()
def update_event(event_id):
    """Actualizar un evento existente"""
    try:
        user_id = get_jwt_identity()
        event = Event.query.get_or_404(event_id)
        data = request.get_json()

        # Validar datos requeridos
        required_fields = ['title', 'date', 'location', 'price']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({"error": f"El campo '{field}' es requerido"}), 400

        # Validar precio
        try:
            price = float(data['price'])
            if price < 0:
                return jsonify({"error": "El precio no puede ser negativo"}), 400
        except (ValueError, TypeError):
            return jsonify({"error": "El precio debe ser un número válido"}), 400

        # Validar coordenadas si están presentes
        lat = None
        lng = None
        if data.get('lat') and data.get('lng'):
            try:
                lat = float(data['lat'])
                lng = float(data['lng'])
                # Validar rango de coordenadas
                if not (-90 <= lat <= 90) or not (-180 <= lng <= 180):
                    return jsonify({"error": "Coordenadas inválidas"}), 400
            except (ValueError, TypeError):
                return jsonify({"error": "Las coordenadas deben ser números válidos"}), 400

        # Manejar artista
        artist_id = None
        if 'artist_name' in data and data['artist_name']:
            artist = Artist.query.filter_by(name=data['artist_name']).first()
            if not artist:
                artist = Artist(name=data['artist_name'])
                db.session.add(artist)
                db.session.flush()
            artist_id = artist.id

        # Actualizar campos del evento
        event.title = data['title']
        event.date = data['date']
        event.description = data.get('description', '')
        # event.image = data('image')
        event.location = data['location']
        event.lat = lat
        event.lng = lng
        event.artist_id = artist_id
        event.price = price

        db.session.commit()

        return jsonify({
            "message": "Evento actualizado exitosamente",
            "event": event.serialize()
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@events_bp.route('/events/<int:event_id>', methods=['DELETE'])
@jwt_required()
def delete_event(event_id):
    """Eliminar un evento"""
    try:
        user_id = get_jwt_identity()
        event = Event.query.get_or_404(event_id)

        # Verificar si el evento tiene compras asociadas
        if event.purchases:
            return jsonify({
                "error": "No se puede eliminar el evento porque tiene compras asociadas"
            }), 400

        db.session.delete(event)
        db.session.commit()

        return jsonify({
            "message": "Evento eliminado exitosamente"
        }), 200


    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500



@events_bp.route('/events/search', methods=['GET'])
def search_events():
    """Buscar eventos por diferentes criterios"""
    try:
        # Obtener parámetros de búsqueda
        title = request.args.get('title', '')
        location = request.args.get('location', '')
        artist_name = request.args.get('artist', '')
        date_from = request.args.get('date_from', '')
        date_to = request.args.get('date_to', '')
        min_price = request.args.get('min_price', '')
        max_price = request.args.get('max_price', '')

        # Construir query
        query = Event.query

        if title:
            query = query.filter(Event.title.ilike(f'%{title}%'))

        if location:
            query = query.filter(Event.location.ilike(f'%{location}%'))

        if artist_name:
            query = query.join(Artist).filter(
                Artist.name.ilike(f'%{artist_name}%'))


        if date_from:
            query = query.filter(Event.date >= date_from)

        if date_to:
            query = query.filter(Event.date <= date_to)

        if min_price:
            try:
                query = query.filter(Event.price >= float(min_price))
            except ValueError:
                return jsonify({"error": "min_price debe ser un número válido"}), 400

        if max_price:
            try:
                query = query.filter(Event.price <= float(max_price))
            except ValueError:
                return jsonify({"error": "max_price debe ser un número válido"}), 400

        events = query.all()
        return jsonify([event.serialize() for event in events]), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@events_bp.route('/events/stats', methods=['GET'])
def get_events_stats():
    """Obtener estadísticas básicas de eventos"""
    try:
        total_events = Event.query.count()

        # Precio promedio
        avg_price_result = db.session.query(db.func.avg(Event.price)).scalar()
        avg_price = float(avg_price_result) if avg_price_result else 0

        # Eventos por artista
        events_by_artist = db.session.query(
            Artist.name,
            db.func.count(Event.id).label('count')
        ).join(Event).group_by(Artist.name).all()

        # Próximos eventos (eventos futuros)
        from datetime import date
        upcoming_events = Event.query.filter(
            Event.date >= str(date.today())).count()

        return jsonify({
            "total_events": total_events,
            "average_price": round(avg_price, 2),
            "upcoming_events": upcoming_events,
            "events_by_artist": [{"artist": artist, "count": count} for artist, count in events_by_artist]
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@events_bp.route('/events/nearby', methods=['GET'])
def get_nearby_events():
    """Obtener eventos cercanos a una ubicación"""
    try:
        lat = request.args.get('lat', type=float)
        lng = request.args.get('lng', type=float)
        radius = request.args.get(
            'radius', default=10, type=float)  # Radio en km

        if not lat or not lng:
            return jsonify({"error": "Se requieren parámetros 'lat' y 'lng'"}), 400

        # Fórmula básica para calcular distancia (aproximada)
        # Para una implementación más precisa, usar PostGIS o similar
        events = Event.query.filter(
            Event.lat.isnot(None),
            Event.lng.isnot(None)
        ).all()

        nearby_events = []
        for event in events:
            # Cálculo simplificado de distancia (no exacto pero funcional)
            lat_diff = abs(lat - event.lat)
            lng_diff = abs(lng - event.lng)

            # Aproximación: 1 grado ≈ 111 km
            distance = ((lat_diff ** 2 + lng_diff ** 2) ** 0.5) * 111

            if distance <= radius:
                event_data = event.serialize()
                event_data['distance'] = round(distance, 2)
                nearby_events.append(event_data)

        # Ordenar por distancia
        nearby_events.sort(key=lambda x: x['distance'])

        return jsonify(nearby_events), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@events_bp.route('/events/upcoming', methods=['GET'])
def get_upcoming_events():
    """Obtener eventos próximos (futuros)"""
    try:
        from datetime import date
        limit = request.args.get('limit', default=10, type=int)

        events = Event.query.filter(
            Event.date >= str(date.today())
        ).order_by(Event.date.asc()).limit(limit).all()

        return jsonify([event.serialize() for event in events]), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500