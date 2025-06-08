from flask import request, jsonify
from ...models import db, Event, User
from sqlalchemy.exc import SQLAlchemyError
from ...utils import token_required
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity

# @jwt_required()  # Este decorador asegura que solo un usuario autenticado pueda crear eventos
# Crear un nuevo evento (requiere token JWT manualmente verificado)


def create_event():  # Recibimos el usuario autenticado desde el decorador
    verify_jwt_in_request()  # Verifica token JWT sin decorador
    print("🛂 Token recibido:", request.headers.get("Authorization"))
    print("🔍 RAW JSON recibido:", request.data)
    print("🔍 Encabezado Content-Type:", request.content_type)

    try:
        current_user_email = get_jwt_identity()
        user = User.query.filter_by(email=current_user_email).first()
        data = request.get_json()

        # Para ver qué recibe el backend y si falta algo o tipos incorrectos
        print("📦 Datos recibidos en backend:", data)

        # Validación datos obligatorios
        if not all([data.get('title'), data.get('date'), data.get('time'), data.get('capacity')]):
            return jsonify({"error": "Faltan campos obligatorios"}), 400

        new_event = Event(
            title=data.get('title'),
            description=data.get('description'),
            date=data.get('date'),
            time=data.get('time'),
            difficulty=data.get('difficulty'),
            capacity=data.get('capacity'),
            # direction=data.get('direction'),
            latitude=654,  # data.get('latitude'),
            longitude=247,  # data.get('longitude'),
            weather=data.get('weather'),
            distance=data.get('distance'),
            duration=data.get('duration'),
            creator_id=user.id
        )
        db.session.add(new_event)
        db.session.commit()
        return jsonify(new_event.to_dict()), 201

    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Obtener todos los eventos con soporte para filtrar por dificultad


def get_events():
    difficulty = request.args.get('difficulty')
    if difficulty:
        events = Event.query.filter_by(difficulty=difficulty).all()
    else:
        events = Event.query.all()
    return jsonify([event.to_dict() for event in events]), 200

# Obtener solo un evento por ID


def get_event(event_id):
    event = Event.query.get(event_id)
    if not event:
        return jsonify({"error": "Evento no encontrado"}), 404
    return jsonify(event.to_dict()), 200

# Actualizar un evento (requiere token, usa decorador personalizado)


@token_required  # Protege para que solo usuarios autenticados puedan actualizar
def update_event(current_user, event_id):
    event = Event.query.get(event_id)
    if not event:
        return jsonify({"error": "Evento no encontrado"}), 404

    data = request.get_json()
    print("📦 Datos recibidos:", data)  # para ver qué recibe el backend

    # Actualiza solo los campos que llegan
    event.title = data.get('title', event.title)
    event.description = data.get('description', event.description)
    event.date = data.get('date', event.date)
    event.time = data.get('time', event.time)
    event.difficulty = data.get('difficulty', event.difficulty)
    event.capacity = data.get('capacity', event.capacity)
    event.latitude = data.get('latitude', event.latitude)
    event.longitude = data.get('longitude', event.longitude)
    event.weather = data.get('weather', event.weather)
    event.distance = data.get('distance', event.distance)
    event.duration = data.get('duration', event.duration)

    try:
        db.session.commit()
        return jsonify(event.to_dict()), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Eliminar un evento


@token_required
def delete_event(current_user, event_id):
    event = Event.query.get(event_id)
    if not event:
        return jsonify({"error": "Evento no encontrado"}), 404

    try:
        db.session.delete(event)
        db.session.commit()
        return jsonify({"message": "Evento eliminado"}), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Unirse a un evento


@token_required
def join_event(current_user, event_id):
    event = Event.query.get(event_id)
    user = current_user  # Ya no necesitas `user_id` desde el body

    if not event:
        return jsonify({"error": "Evento no encontrado"}), 404

    if user in event.joined_users:
        return jsonify({"message": "El usuario ya está registrado"}), 400

    event.joined_users.append(user)
    try:
        db.session.commit()
        return jsonify({"message": "Usuario unido al evento"}), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Salir de un evento


@token_required
def leave_event(current_user, event_id):
    event = Event.query.get(event_id)
    user = current_user

    if not event:
        return jsonify({"error": "Evento no encontrado"}), 404

    if user not in event.joined_users:
        return jsonify({"message": "El usuario no está registrado"}), 400

    event.joined_users.remove(user)
    try:
        db.session.commit()
        return jsonify({"message": "Usuario eliminado del evento"}), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
