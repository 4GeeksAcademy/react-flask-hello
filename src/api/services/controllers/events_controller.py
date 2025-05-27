from flask import request, jsonify
from src.api.models import db, Event, User
from sqlalchemy.exc import SQLAlchemyError


def create_event():
    try:
        data = request.get_json()
        new_event = Event(
            name=data.get('name'),
            description=data.get('description'),
            date=data.get('date'),
            location=data.get('location'),
            capacity=data.get('capacity')
        )
        db.session.add(new_event)
        db.session.commit()
        return jsonify(new_event.serialize()), 201
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


def get_events():
    events = Event.query.all()
    return jsonify([event.serialize() for event in events]), 200


def get_event(event_id):
    event = Event.query.get(event_id)
    if not event:
        return jsonify({"error": "Evento no encontrado"}), 404
    return jsonify(event.serialize()), 200


def update_event(event_id):
    event = Event.query.get(event_id)
    if not event:
        return jsonify({"error": "Evento no encontrado"}), 404

    data = request.get_json()
    event.name = data.get('name', event.name)
    event.description = data.get('description', event.description)
    event.date = data.get('date', event.date)
    event.location = data.get('location', event.location)
    event.capacity = data.get('capacity', event.capacity)

    try:
        db.session.commit()
        return jsonify(event.serialize()), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


def delete_event(event_id):
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


def join_event(event_id):
    data = request.get_json()
    user_id = data.get("user_id")
    event = Event.query.get(event_id)
    user = User.query.get(user_id)

    if not event or not user:
        return jsonify({"error": "Usuario o Evento no encontrado"}), 404

    if user in event.participants:
        return jsonify({"message": "El usuario ya está registrado"}), 400

    event.participants.append(user)
    try:
        db.session.commit()
        return jsonify({"message": "Usuario unido al evento"}), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


def leave_event(event_id):
    data = request.get_json()
    user_id = data.get("user_id")
    event = Event.query.get(event_id)
    user = User.query.get(user_id)

    if not event or not user:
        return jsonify({"error": "Usuario o Evento no encontrado"}), 404

    if user not in event.participants:
        return jsonify({"message": "El usuario no está registrado"}), 400

    event.participants.remove(user)
    try:
        db.session.commit()
        return jsonify({"message": "Usuario eliminado del evento"}), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
