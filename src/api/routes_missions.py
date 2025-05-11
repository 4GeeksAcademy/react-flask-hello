from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime, timedelta
from api.models import db, Mission, UserMission, Achievement, UserAchievement

missions_api = Blueprint('missions_api', __name__)

# Función para desbloquear logros
def unlock_achievement(user_id, title):
    achievement = Achievement.query.filter_by(title=title).first()
    if not achievement:
        return False

    already_unlocked = UserAchievement.query.filter_by(
        user_id=user_id,
        achievement_id=achievement.id
    ).first()

    if already_unlocked:
        return False

    new_unlock = UserAchievement(
        user_id=user_id,
        achievement_id=achievement.id
    )
    db.session.add(new_unlock)
    db.session.commit()
    return True

@missions_api.route('/missions', methods=['GET'])
@jwt_required()
def get_missions():
    missions = Mission.query.all()
    result = [mission.serialize() for mission in missions]
    return jsonify(result), 200

@missions_api.route('/missions/<int:id>', methods=['GET'])
@jwt_required()
def get_single_mission(id):
    mission = Mission.query.get(id)
    if not mission:
        return jsonify({'msg': 'Mission not found'}), 404
    return jsonify(mission.serialize()), 200

@missions_api.route('/missions/<int:id>/accept', methods=['POST'])
@jwt_required()
def accept_mission(id):
    user_id = get_jwt_identity()
    mission = Mission.query.get(id)
    if not mission:
        return jsonify({"msg": "Mission not found"}), 404

    user_mission = UserMission(
        user_id=user_id,
        mission_id=id,
        status="in_progress",
        accepted_at=datetime.utcnow(),
        completion_percentage=0
    )
    db.session.add(user_mission)
    db.session.commit()
    return jsonify({"msg": "Mission accepted!"}), 201

@missions_api.route('/missions/<int:id>/complete', methods=['POST'])
@jwt_required()
def complete_mission(id):
    user_id = get_jwt_identity()
    user_mission = UserMission.query.filter_by(user_id=user_id, mission_id=id).first()
    if not user_mission:
        return jsonify({"msg": "Mission not accepted yet"}), 400

    user_mission.status = "completed"
    user_mission.completed_at = datetime.utcnow()
    user_mission.completion_percentage = 100
    db.session.commit()

    unlocked = []

    # Verificar tipo de misión para logros
    if user_mission.mission.type == "meditation":
        if unlock_achievement(user_id, "Zen Mode"):
            unlocked.append("Zen Mode")

    # Verificar si se completaron 3 misiones esta semana (Perfect Combo)
    start_of_week = datetime.utcnow() - timedelta(days=datetime.utcnow().weekday())
    end_of_week = start_of_week + timedelta(days=7)

    missions_this_week = UserMission.query.filter(
        UserMission.user_id == user_id,
        UserMission.completed_at >= start_of_week,
        UserMission.completed_at < end_of_week,
        UserMission.status == "completed"
    ).count()

    if missions_this_week >= 3:
        if unlock_achievement(user_id, "Perfect Combo"):
            unlocked.append("Perfect Combo")

    return jsonify({
        "msg": "Mission completed!",
        "achievementsUnlocked": unlocked
    }), 200
