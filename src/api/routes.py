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
#hola
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
        new_user = AppUser(username=data['username'], email=data['email'], password_hash=hashed_pw)
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
    return jsonify({"msg": "Login correcto", "token": token, "user_id": user.id}), 200

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
    try:
        data = request.json
        print("📩 Payload recibido en /usermission:", data)

        user_id = data.get("user_id")
        mission_id = data.get("mission_id")

        if not user_id or not mission_id:
            return jsonify({"msg": "Faltan datos necesarios"}), 400

        user = AppUser.query.get(user_id)
        mission = Mission.query.get(mission_id)

        if not user:
            return jsonify({"msg": "Usuario no encontrado"}), 404

        if not mission:
            return jsonify({"msg": "Misión no encontrada"}), 404

        # 🔒 Límite de 4 misiones por día
        today = datetime.utcnow().date()
        misiones_hoy = UserMission.query.filter(
            UserMission.user_id == user_id,
            db.func.date(UserMission.accepted_at) == today
        ).count()

        if misiones_hoy >= 5:
            return jsonify({"msg": "Límite de 4 misiones diarias alcanzado"}), 403

        # Crear la UserMission
        user_mission = UserMission(
            user_id=user_id,
            mission_id=mission_id,
            status="in_progress",
            accepted_at=datetime.utcnow()
        )
        db.session.add(user_mission)
        db.session.commit()

        print(f"✅ Misión {mission_id} aceptada por usuario {user_id} (UserMission ID: {user_mission.id})")

        return jsonify({
            "msg": "Misión aceptada",
            "usermission_id": user_mission.id
        }), 201

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"msg": "Error interno del servidor"}), 500


    except Exception as e:
        import traceback
        traceback.print_exc()
        print("❌ Error interno en /usermission:", str(e))
        return jsonify({"msg": "Error interno del servidor"}), 500


@api.route('/usermission/<int:usermission_id>', methods=['PUT'])
def complete_mission(usermission_id):
    um = UserMission.query.get(usermission_id)
    if not um:
        return jsonify({"msg": "Misión no encontrada"}), 404

    um.status = "completed"
    um.completed_at = datetime.utcnow()
    um.completion_percentage = 100

    # Obtener misión y usuario
    mission = Mission.query.get(um.mission_id)
    user = AppUser.query.get(um.user_id)

    # --- Añadir XP ---
    xp_gain = 200
    user.xp_total += xp_gain

    # Subir de nivel si corresponde
    while user.xp_total >= 1000:
        user.level += 1
        user.xp_total -= 1000

    # --- Logros ---
    user_id = user.id

    if mission.title.lower() == "meditation":
        achievement = Achievement.query.filter_by(title="Zen Mode").first()
        if achievement:
            already = UserAchievement.query.filter_by(user_id=user_id, achievement_id=achievement.id).first()
            if not already:
                db.session.add(UserAchievement(user_id=user_id, achievement_id=achievement.id))

    completed_missions = UserMission.query.filter_by(user_id=user_id, status="completed").count()
    if completed_missions == 3:
        achievement = Achievement.query.filter_by(title="Perfect Combo").first()
        if achievement:
            already = UserAchievement.query.filter_by(user_id=user_id, achievement_id=achievement.id).first()
            if not already:
                db.session.add(UserAchievement(user_id=user_id, achievement_id=achievement.id))

        # Actualizar o crear Stat para hoy
    today = datetime.utcnow().date()
    stat = Stat.query.filter_by(user_id=user.id, date=today).first()

    if stat:
        stat.xp_earned = (stat.xp_earned or 0) + xp_gain
        stat.missions_completed = (stat.missions_completed or 0) + 1
    else:
        stat = Stat(
            user_id=user.id,
            date=today,
            xp_earned=xp_gain,
            missions_completed=1,
            minutes_invested=20
        )
        db.session.add(stat)
            

    db.session.commit()

    return jsonify({"msg": f"Misión completada. +{xp_gain} XP ganados."}), 200


# --- STATS ---

@api.route('/users/<int:user_id>/stats', methods=['GET'])
def get_stats(user_id):
    stats = Stat.query.filter_by(user_id=user_id).all()
    return jsonify([s.serialize() for s in stats]), 200

# --- ACHIEVEMENTS ---

@api.route('/achievements/<int:user_id>', methods=['GET'])
def get_user_achievement_keys(user_id):
    records = UserAchievement.query.filter_by(user_id=user_id).all()
    keys = []
    for ua in records:
        achievement = Achievement.query.get(ua.achievement_id)
        if achievement:
            keys.append(achievement.key)
    return jsonify({"unlocked_achievements": keys}), 200

@api.route('/achievements', methods=['GET'])
def get_all_achievements():
    achievements = Achievement.query.all()
    return jsonify([a.serialize() for a in achievements]), 200

@api.route('/achievements/unlock', methods=['POST'])
def unlock_achievements():
    data = request.json
    user_id = data.get("user_id")
    keys = data.get("achievements", [])

    for key in keys:
        achievement = Achievement.query.filter_by(key=key).first()
        if achievement:
            exists = UserAchievement.query.filter_by(user_id=user_id, achievement_id=achievement.id).first()
            if not exists:
                ua = UserAchievement(user_id=user_id, achievement_id=achievement.id)
                db.session.add(ua)

    db.session.commit()
    return jsonify({"msg": "Logros desbloqueados"}), 200

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

    stats = Stat.query.filter_by(user_id=user_id).all()
    total_tasks = sum(s.missions_completed or 0 for s in stats)
    total_xp = sum(s.xp_earned or 0 for s in stats)
    first_day = min((s.date for s in stats), default=today)
    days_in_app = (today - first_day).days + 1 if stats else 0

    start_week = today - timedelta(days=today.weekday())
    week_stats = [s for s in stats if s.date >= start_week]
    week_xp = sum(s.xp_earned or 0 for s in week_stats)

    achievements = UserAchievement.query.filter_by(user_id=user_id).all()
    achievement_data = [{
        'title': a.achievement.title,
        'icon_url': a.achievement.icon_url,
        'unlocked_at': a.unlocked_at.isoformat()
    } for a in achievements]

    calendar_data = [{
        'date': s.date.isoformat(),
        'missions_completed': s.missions_completed
    } for s in stats if s.missions_completed and s.date.month == today.month]

    return jsonify({
        'user': user.serialize(),
        'missions_today': missions_today_data,
        'stats': {
            'tasks_completed': total_tasks,
            'time_in_app_days': days_in_app,
            'daily_missions_today': len(missions_today),
            'total_xp': total_xp
        },
        'weekly_progress': {
            'xp': week_xp
        },
        'calendar': calendar_data,
        'achievements': achievement_data,
        'reflection': user.mood_actual or ''
    }), 200
