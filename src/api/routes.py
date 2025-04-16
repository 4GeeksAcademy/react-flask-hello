from flask import Blueprint, jsonify, request
from src.api.models import db, AppUser, Mission, UserMission, Favorite, Achievement, UserAchievement, MoodTag, Stat, LevelFrame
from datetime import datetime
from src.api.utils import hash_password, check_password, generate_token

api = Blueprint('api', __name__)

# --- USER ROUTES ---

@api.route('/register', methods=['POST'])
def register_user():
    data = request.json
    hashed_pw = hash_password(data['password'])
    user = AppUser(
        username=data['username'],
        email=data['email'],
        password_hash=hashed_pw
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "Usuario creado exitosamente"}), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.json
    user = AppUser.query.filter_by(email=data['email']).first()
    if not user or not check_password(data['password'], user.password_hash):
        return jsonify({"msg": "Credenciales inválidas"}), 401
    return jsonify({"msg": "Login correcto", "user_id": user.id}), 200

@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = AppUser.query.get(user_id)
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    return jsonify(user.serialize()), 200


# --- MISSION ROUTES ---

@api.route('/missions', methods=['GET'])
def get_all_missions():
    missions = Mission.query.all()
    return jsonify([m.serialize() for m in missions]), 200

@api.route('/missions/<int:mission_id>', methods=['GET'])
def get_mission(mission_id):
    mission = Mission.query.get(mission_id)
    if not mission:
        return jsonify({"msg": "Misión no encontrada"}), 404
    return jsonify(mission.serialize()), 200


# --- FAVORITES ---

@api.route('/users/<int:user_id>/favorites', methods=['GET'])
def get_favorites(user_id):
    favs = Favorite.query.filter_by(user_id=user_id).all()
    return jsonify([f.serialize() for f in favs]), 200

@api.route('/favorites', methods=['POST'])
def add_favorite():
    data = request.json
    fav = Favorite(user_id=data['user_id'], mission_id=data['mission_id'])
    db.session.add(fav)
    db.session.commit()
    return jsonify({"msg": "Favorito añadido"}), 201


# --- MOOD TAGS ---

@api.route('/users/<int:user_id>/mood', methods=['POST'])
def set_mood(user_id):
    data = request.json
    mood = MoodTag(user_id=user_id, keyword=data['keyword'])
    db.session.add(mood)
    db.session.commit()
    return jsonify({"msg": "Estado de ánimo actualizado"}), 200


# --- USER MISSIONS ---

@api.route('/users/<int:user_id>/missions', methods=['GET'])
def get_user_missions(user_id):
    user_missions = UserMission.query.filter_by(user_id=user_id).all()
    return jsonify([um.serialize() for um in user_missions]), 200

@api.route('/usermission', methods=['POST'])
def accept_mission():
    data = request.json
    user_mission = UserMission(
        user_id=data['user_id'],
        mission_id=data['mission_id'],
        status="in_progress",
        accepted_at=datetime.utcnow()
    )
    db.session.add(user_mission)
    db.session.commit()
    return jsonify({"msg": "Misión aceptada"}), 201

@api.route('/usermission/<int:usermission_id>', methods=['PUT'])
def complete_mission(usermission_id):
    um = UserMission.query.get(usermission_id)
    if not um:
        return jsonify({"msg": "Misión no encontrada"}), 404
    um.status = "completed"
    um.completed_at = datetime.utcnow()
    um.completion_percentage = 100
    db.session.commit()
    return jsonify({"msg": "Misión completada"}), 200


# --- STATS ---

@api.route('/users/<int:user_id>/stats', methods=['GET'])
def get_stats(user_id):
    stats = Stat.query.filter_by(user_id=user_id).all()
    return jsonify([s.serialize() for s in stats]), 200


# --- ACHIEVEMENTS ---

@api.route('/users/<int:user_id>/achievements', methods=['GET'])
def get_user_achievements(user_id):
    records = UserAchievement.query.filter_by(user_id=user_id).all()
    return jsonify([a.serialize() for a in records]), 200

@api.route('/achievements', methods=['GET'])
def get_all_achievements():
    achievements = Achievement.query.all()
    return jsonify([a.serialize() for a in achievements]), 200


# --- LEVEL FRAMES ---

@api.route('/level-frames', methods=['GET'])
def get_level_frames():
    frames = LevelFrame.query.all()
    return jsonify([f.serialize() for f in frames]), 200
