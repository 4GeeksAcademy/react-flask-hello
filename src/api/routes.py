from flask import request, jsonify, Blueprint
from api.models import db, User, Favorite, Event, FavoriteMember, RSVP
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import re
import time

api = Blueprint('api', __name__)

login_attempts = {}

# Signup
@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    first_name = data.get("first_name")
    last_name = data.get("last_name")

    if not email or not password:
        return jsonify({"error": "Missing fields"}), 400
    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return jsonify({"error": "Invalid email format"}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400
    if len(password) < 8 or not any(c.isdigit() for c in password) or not any(c.isupper() for c in password):
        return jsonify({"error": "Password must be at least 8 characters, include a number and an uppercase letter."}), 400

    hashed_pw = generate_password_hash(password)
    user = User(email=email, password=hashed_pw, first_name=first_name, last_name=last_name)
    db.session.add(user)
    db.session.commit()
    access_token = create_access_token(identity=user.id)
    return jsonify({"msg": "User created", "token": access_token}), 201

# Login
@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    identifier = email
    now = time.time()
    attempts = login_attempts.get(identifier, {"count": 0, "last": now})

    if attempts["count"] >= 5 and now - attempts["last"] < 300:
        return jsonify({"error": "Too many login attempts. Try again in 5 minutes."}), 429

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        attempts["count"] += 1
        attempts["last"] = now
        login_attempts[identifier] = attempts
        return jsonify({"error": "Invalid credentials"}), 401

    login_attempts[identifier] = {"count": 0, "last": now}
    access_token = create_access_token(identity=user.id)
    return jsonify({"msg": "Login successful", "token": access_token}), 200

# Event CRUD
@api.route('/events', methods=['POST'])
@jwt_required()
def create_event():
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    location = data.get('location')
    date = data.get('date')
    time_ = data.get('time')
    if not title or not location or not date or not time_:
        return jsonify({"error": "Missing fields"}), 400
    event = Event(title=title, description=description, location=location, date=date, time=time_)
    db.session.add(event)
    db.session.commit()
    return jsonify(event.serialize()), 201

@api.route('/events', methods=['GET'])
def list_events():
    events = Event.query.all()
    return jsonify([event.serialize() for event in events]), 200

@api.route('/events/<int:event_id>', methods=['GET'])
def get_event(event_id):
    event = Event.query.get(event_id)
    if not event:
        return jsonify({"error": "Event not found"}), 404
    return jsonify(event.serialize()), 200

@api.route('/events/<int:event_id>', methods=['PUT'])
@jwt_required()
def update_event(event_id):
    event = Event.query.get(event_id)
    if not event:
        return jsonify({"error": "Event not found"}), 404
    data = request.get_json()
    event.title = data.get('title', event.title)
    event.description = data.get('description', event.description)
    event.location = data.get('location', event.location)
    event.date = data.get('date', event.date)
    event.time = data.get('time', event.time)
    db.session.commit()
    return jsonify(event.serialize()), 200

@api.route('/events/<int:event_id>', methods=['DELETE'])
@jwt_required()
def delete_event(event_id):
    event = Event.query.get(event_id)
    if not event:
        return jsonify({"error": "Event not found"}), 404
    db.session.delete(event)
    db.session.commit()
    return jsonify({"msg": "Event deleted"}), 200

# RSVP
@api.route('/events/<int:event_id>/rsvp', methods=['POST'])
@jwt_required()
def rsvp_event(event_id):
    user_id = get_jwt_identity()
    response = request.json.get('response')
    if response not in ["yes", "no", "maybe"]:
        return jsonify({"error": "Invalid response"}), 400
    event = Event.query.get(event_id)
    if not event:
        return jsonify({"error": "Event not found"}), 404
    rsvp = RSVP.query.filter_by(user_id=user_id, event_id=event_id).first()
    if rsvp:
        rsvp.response = response
    else:
        rsvp = RSVP(user_id=user_id, event_id=event_id, response=response)
        db.session.add(rsvp)
    db.session.commit()
    return jsonify(rsvp.serialize()), 200

@api.route('/events/<int:event_id>/rsvp', methods=['GET'])
@jwt_required()
def get_event_rsvps(event_id):
    rsvps = RSVP.query.filter_by(event_id=event_id).all()
    return jsonify([rsvp.serialize() for rsvp in rsvps]), 200

# Favorites
@api.route('/favorites', methods=['POST'])
@jwt_required()
def add_favorite():
    user_id = get_jwt_identity()
    event_id = request.json.get('event_id')
    if not event_id or not Event.query.get(event_id):
        return jsonify({"error": "Event not found"}), 404
    if Favorite.query.filter_by(user_id=user_id, event_id=event_id).first():
        return jsonify({"msg": "Already favorited"}), 400
    favorite = Favorite(user_id=user_id, event_id=event_id)
    db.session.add(favorite)
    db.session.commit()
    return jsonify({"msg": "Event favorited", "favorite": favorite.serialize()}), 201

@api.route('/favorites', methods=['GET'])
@jwt_required()
def list_favorites():
    user_id = get_jwt_identity()
    favorites = Favorite.query.filter_by(user_id=user_id).all()
    return jsonify([fav.serialize() for fav in favorites]), 200

@api.route('/favorites/<int:event_id>', methods=['DELETE'])
@jwt_required()
def remove_favorite(event_id):
    user_id = get_jwt_identity()
    favorite = Favorite.query.filter_by(user_id=user_id, event_id=event_id).first()
    if not favorite:
        return jsonify({"error": "Favorite not found"}), 404
    db.session.delete(favorite)
    db.session.commit()
    return jsonify({"msg": "Favorite removed"}), 200

# Favorite Members
@api.route('/favorite-members', methods=['POST'])
@jwt_required()
def add_favorite_member():
    user_id = get_jwt_identity()
    member_id = request.json.get('member_id')
    if not member_id or not User.query.get(member_id):
        return jsonify({"error": "Member not found"}), 404
    if FavoriteMember.query.filter_by(user_id=user_id, member_id=member_id).first():
        return jsonify({"msg": "Already favorited"}), 400
    favorite = FavoriteMember(user_id=user_id, member_id=member_id)
    db.session.add(favorite)
    db.session.commit()
    return jsonify({"msg": "Member favorited", "favorite": favorite.serialize()}), 201

@api.route('/favorite-members', methods=['GET'])
@jwt_required()
def list_favorite_members():
    user_id = get_jwt_identity()
    favorites = FavoriteMember.query.filter_by(user_id=user_id).all()
    return jsonify([fav.serialize() for fav in favorites]), 200

@api.route('/favorite-members/<int:member_id>', methods=['DELETE'])
@jwt_required()
def remove_favorite_member(member_id):
    user_id = get_jwt_identity()
    favorite = FavoriteMember.query.filter_by(user_id=user_id, member_id=member_id).first()
    if not favorite:
        return jsonify({"error": "Favorite not found"}), 404
    db.session.delete(favorite)
    db.session.commit()
    return jsonify({"msg": "Favorite removed"}), 200