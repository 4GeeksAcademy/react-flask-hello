from flask import request, jsonify
from src.api.models import db, Event, User
from sqlalchemy.exc import SQLAlchemyError
from src.api.utils import token_required


@token_required  # Este decorador asegura que solo un usuario autenticado pueda crear eventos
def create_event(current_user):  # Recibimos el usuario autenticado desde el decorador
    try:
        data = request.get_json()
        new_event = Event(
            title=data.get('title'),
            description=data.get('description'),
            date=data.get('date'),
            time=data.get('time'),
            difficulty=data.get('difficulty'),
            capacity=data.get('capacity'),
            latitude=data.get('latitude'),
            longitude=data.get('longitude'),
            weather=data.get('weather'),
            distance=data.get('distance'),
            duration=data.get('duration'),
            creator_id=data.get('creator_id')
        )
        db.session.add(new_event)
        db.session.commit()
        return jsonify(new_event.to_dict()), 201
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


def get_events():
    events = Event.query.all()
    return jsonify([event.to_dict() for event in events]), 200


def get_event(event_id):
    event = Event.query.get(event_id)
    if not event:
        return jsonify({"error": "Evento no encontrado"}), 404
    return jsonify(event.to_dict()), 200


def get_events():
    difficulty = request.args.get('difficulty') 

    if difficulty:
        events = Event.query.filter_by(difficulty=difficulty).all()
    else:
        events = Event.query.all()

    return jsonify([event.to_dict() for event in events]), 200


@token_required  # Protege para que solo usuarios autenticados puedan actualizar
def update_event(current_user, event_id):
    event = Event.query.get(event_id)
    if not event:
        return jsonify({"error": "Evento no encontrado"}), 404

    data = request.get_json()
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
