from flask import Blueprint, jsonify, request
from api.models import db, AppUser, Mission, UserMission, Favorite, Achievement, UserAchievement, MoodTag, Stat, LevelFrame
from datetime import datetime, timedelta
from api.utils import (
    hash_password,
    check_password,
    generate_token,
    generate_auth_token,
    token_required
)

api = Blueprint('api', __name__)

# --- AUTHENTICATION ---

@api.route('/register', methods=['POST'])
def register_user():
    try:
        data = request.json

        if not all(k in data for k in ("email", "username", "password")):
            return jsonify({"msg": "Faltan campos obligatorios"}), 400

        if AppUser.query.filter_by(email=data["email"]).first():
            return jsonify({"msg": "Este email ya está registrado"}), 400

        hashed_pw = hash_password(data['password'])
        print(hashed_pw)
        new_user = AppUser(
            username=data['username'],
            email=data['email'],
            password_hash=hashed_pw
        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"msg": "Usuario creado exitosamente"}), 201

    except Exception as e:
        print("⚠️ ERROR en /register:", e)
        return jsonify({"msg": "Error interno del servidor"}), 500


@api.route('/login', methods=['POST'])
def login():
    data = request.json
    if not all(k in data for k in ("email", "password")):
        return jsonify({"msg": "Faltan credenciales"}), 400
    user = AppUser.query.filter_by(email=data['email']).first()
    if not user or not check_password(data['password'], user.password_hash):
        return jsonify({"msg": "Credenciales inválidas"}), 401
    token = generate_auth_token(user.id)
    return jsonify({
        "msg": "Login correcto",
        "token": token,
        "user_id": user.id
    }), 200

@api.route('/perfil', methods=['GET'])
@token_required
def perfil(user_id):
    user = AppUser.query.get(user_id)
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    return jsonify(user.serialize()), 200

# --- USERS ---

@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = AppUser.query.get(user_id)
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    return jsonify(user.serialize()), 200

# --- MISSIONS ---

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

# --- PROFILE ---

@api.route('/profile/<int:user_id>', methods=['GET'])
def get_full_profile(user_id):
    user = AppUser.query.get(user_id)
    if not user:
        return jsonify({'msg': 'Usuario no encontrado'}), 404

    today = datetime.utcnow().date()

    # Misiones diarias aceptadas hoy
    missions_today = UserMission.query.join(Mission).filter(
        UserMission.user_id == user_id,
        Mission.is_daily == True,
        db.func.date(UserMission.accepted_at) == today
    ).all()

    missions_today_data = [{
        'title': m.mission.title,
        'status': m.status,
        'completed_at': m.completed_at
    } for m in missions_today]

    # Stats agregadas
    stats = Stat.query.filter_by(user_id=user_id).all()
    total_tasks = sum(s.missions_completed or 0 for s in stats)
    total_xp = sum(s.xp_earned or 0 for s in stats)
    first_day = min((s.date for s in stats), default=today)
    days_in_app = (today - first_day).days + 1 if stats else 0

    # Semana actual
    start_week = today - timedelta(days=today.weekday())
    week_stats = [s for s in stats if s.date >= start_week]
    week_xp = sum(s.xp_earned or 0 for s in week_stats)

    # Logros del usuario
    achievements = UserAchievement.query.filter_by(user_id=user_id).all()
    achievement_data = [{
        'title': a.achievement.title,
        'icon_url': a.achievement.icon_url,
        'unlocked_at': a.unlocked_at.isoformat()
    } for a in achievements]

    # Actividad en el calendario del mes
    calendar_data = [{
        'date': s.date.isoformat(),
        'missions_completed': s.missions_completed
    } for s in stats if s.missions_completed and s.date.month == today.month]

    return jsonify({
        'user': user.serialize(),  # ya incluye user_id como id
        'missions_today': missions_today_data,
        'stats': {
            'tasks_completed': total_tasks,
            'time_in_app_days': days_in_app,
            'daily_missions_today': len(missions_today)
        },
        'weekly_progress': {
            'xp': week_xp
        },
        'calendar': calendar_data,
        'achievements': achievement_data,
        'reflection': user.mood_actual or ''
    }), 200

