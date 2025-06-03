from flask import request, jsonify
from src.api.models import db, User, Event
from flask_jwt_extended import jwt_required


def create_user():
    data = request.get_json()
    if not data or not all(k in data for k in ('name', 'email', 'password')):
        return jsonify({"error": "Faltan campos obligatorios"}), 400

    # Verificar si el email ya está en uso
    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"error": "El email ya está registrado"}), 400

    user = User(name=data["name"], email=data["email"],
                password=data["password"])
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201


@jwt_required
def get_users(current_user):
    users = User.query.all()
    return jsonify([u.to_dict() for u in users]), 200


def get_user(current_user, user_id):
    # Solo permite que un usuario vea su propio perfil o extenderlo a admins
    if current_user.id != user_id:
        return jsonify({"error": "Acceso no autorizado"}), 403

    user = User.query.get_or_404(user_id)
    return jsonify(user.to_dict()), 200


@jwt_required
def update_user(current_user, user_id):
    if current_user.id != user_id:
        return jsonify({"error": "No puedes modificar otro usuario"}), 403

    user = User.query.get_or_404(user_id)
    data = request.get_json()

    user.name = data.get("name", user.name)
    user.email = data.get("email", user.email)
    user.password = data.get("password", user.password)

    db.session.commit()
    return jsonify(user.to_dict()), 200


@jwt_required
def delete_user(current_user, user_id):
    if current_user.id != user_id:
        return jsonify({"error": "No pudes eliminar otro usuario"}), 403

    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": f"Usuario con ID {user_id} eliminado"}), 200


@jwt_required
def join_event(current_user, event_id):
    user = current_user
    event = Event.query.get(event_id)

    if not event:
        return jsonify({"error": "Evento no encontrado"}), 404

    if user in event.participants:
        return jsonify({"message": "Ya estás inscrito en el evento"}), 200

    event.participants.append(user)
    db.session.commit()

    return jsonify({"message": f"Usuario {user.id} unido al evento {event_id}"}), 200


@jwt_required
def leave_event(current_user, event_id):
    user = current_user
    event = Event.query.get(event_id)

    if not event:
        return jsonify({"error": "Evento no encontrado"}), 404

    if user not in event.participants:
        return jsonify({"error": "No estás inscrito en este evento"}), 400

    event.participants.remove(user)
    db.session.commit()
    return jsonify({"message": f"Usuario {user.id} ha salido del evento {event_id}"}), 200


@jwt_required
def get_user_events(current_user, user_id):
    if current_user.id != user_id:
        return jsonify({"error": "No autorizado"}), 403

    user = User.query.get_or_404(user_id)
    events = user.joined_events
    return jsonify([event.to_dict() for event in events]), 200
