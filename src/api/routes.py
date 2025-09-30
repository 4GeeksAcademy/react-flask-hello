import time
import re
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity,
    get_jwt, unset_jwt_cookies
)
from api.models import db, User, Favorite, Event, FavoriteMember, RSVP
from flask import request, jsonify, Blueprint
from flask_cors import CORS

api = Blueprint('api', __name__)
# 'api' is your Blueprint instance
CORS(
    api,
    origins=[
        "https://friendly-computing-machine-pxw4p4r46rq2r7gp-3001.app.github.dev",
        "http://localhost:3000",
        "http://localhost:3001"
    ],
    supports_credentials=True,
    allow_headers="*",
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    expose_headers="*"
)
api = Blueprint('api', __name__)

login_attempts = {}
jwt_blacklist = set()

# Logout Endpoint


@api.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    jwt_blacklist.add(jti)
    response = jsonify(msg="Logout successful")
    unset_jwt_cookies(response)
    return response, 200


@api.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods',
                         'GET,POST,PUT,DELETE,OPTIONS')
    return response

# JWT blacklist check (add to your JWT setup in app.py)
# from flask_jwt_extended import JWTManager
# jwt = JWTManager(app)
# @jwt.token_in_blocklist_loader
# def check_if_token_revoked(jwt_header, jwt_payload):
#     return jwt_payload["jti"] in jwt_blacklist

# User Profile Endpoint


@api.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify(msg="User not found"), 404
    return jsonify({
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name
    }), 200


@api.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    data = request.get_json()
    user.first_name = data.get("first_name", user.first_name)
    user.last_name = data.get("last_name", user.last_name)
    user.email = data.get("email", user.email)
    user.location = data.get("location", user.location)
    user.language = data.get("language", user.language)
    db.session.commit()
    return jsonify(msg="Profile updated"), 200

# Password Reset (request and reset)


@api.route('/password-reset/request', methods=['POST'])
def request_password_reset():
    data = request.get_json()
    email = data.get("email")
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify(msg="User not found"), 404
    # Generate token and send email (pseudo-code)
    reset_token = create_access_token(identity=user.id, expires_delta=False)
    # send_email(user.email, reset_token)  # Implement this
    return jsonify(msg="Password reset email sent"), 200


@api.route('/password-reset/confirm', methods=['POST'])
def confirm_password_reset():
    data = request.get_json()
    token = data.get("token")
    new_password = data.get("new_password")
    # Decode token and reset password
    from flask_jwt_extended import decode_token
    try:
        identity = decode_token(token)["sub"]
        user = User.query.get(identity)
        user.password = generate_password_hash(new_password)
        db.session.commit()
        return jsonify(msg="Password updated"), 200
    except Exception:
        return jsonify(msg="Invalid token"), 400

# Login Attempt Limiting (complete logic)


@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    identifier = email
    now = time.time()
    attempts = login_attempts.get(identifier, {"count": 0, "last": now})

    if attempts["count"] >= 5 and now - attempts["last"] < 300:
        return jsonify(msg="Too many login attempts. Try again later."), 429

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        attempts["count"] += 1
        attempts["last"] = now
        login_attempts[identifier] = attempts
        return jsonify(msg="Invalid credentials"), 401

    # if not user.is_verified:
    #     return jsonify(msg="Email not verified"), 403

    login_attempts[identifier] = {"count": 0, "last": now}
    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200

# Email Verification (pseudo-code)


@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    first_name = data.get("first_name")
    last_name = data.get("last_name")

    if not email or not password:
        return jsonify(msg="Email and password required"), 400
    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return jsonify(msg="Invalid email format"), 400
    if User.query.filter_by(email=email).first():
        return jsonify(msg="Email already registered"), 409
    if len(password) < 8 or not any(c.isdigit() for c in password) or not any(c.isupper() for c in password):
        return jsonify(msg="Password must be at least 8 chars, include a digit and uppercase"), 400

    hashed_pw = generate_password_hash(password)
    user = User(email=email, password=hashed_pw,
                first_name=first_name, last_name=last_name)
    db.session.add(user)
    db.session.commit()
    return jsonify(msg="Signup successful"), 201


# Event CRUD

@api.route('/my-events', methods=['GET'])
@jwt_required()
def my_events():
    user_id = get_jwt_identity()
    # Events created by user (if Event has a creator field)
    created_events = []
    if hasattr(Event, 'creator_id'):
        created_events = Event.query.filter_by(creator_id=user_id).all()
    # Events RSVP'd by user
    rsvp_event_ids = [
        rsvp.event_id for rsvp in RSVP.query.filter_by(user_id=user_id).all()]
    rsvp_events = Event.query.filter(Event.id.in_(
        rsvp_event_ids)).all() if rsvp_event_ids else []
    # Combine and deduplicate
    all_events = {event.id: event for event in created_events + rsvp_events}
    return jsonify([event.serialize() for event in all_events.values()]), 200


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
    event = Event(title=title, description=description,
                  location=location, date=date, time=time_)
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


@api.route('/my-rsvps', methods=['GET'])
@jwt_required()
def my_rsvps():
    user_id = get_jwt_identity()
    rsvps = RSVP.query.filter_by(user_id=user_id).all()
    result = []
    for rsvp in rsvps:
        event = Event.query.get(rsvp.event_id)
        result.append({
            "event_id": rsvp.event_id,
            "event_title": event.title if event else None,
            "event_date": event.date.isoformat() if event and event.date else None,
            "event_location": event.location if event else None,
            "status": rsvp.response
        })
    return jsonify(result), 200


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
    favorite = Favorite.query.filter_by(
        user_id=user_id, event_id=event_id).first()
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
    favorite = FavoriteMember.query.filter_by(
        user_id=user_id, member_id=member_id).first()
    if not favorite:
        return jsonify({"error": "Favorite not found"}), 404
    db.session.delete(favorite)
    db.session.commit()
    return jsonify({"msg": "Favorite removed"}), 200


def send_email(recipient, token):
    print(f"Send password reset email to {recipient} with token: {token}")


def send_verification_email(recipient, token):
    print(f"Send verification email to {recipient} with token: {token}")
