from flask import Blueprint, request, jsonify
from api.models import db, Mission, UserMission, UserAchievement
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

missions_api = Blueprint('missions_api', __name__)

@missions_api.route('/missions', methods=['GET'])
@jwt_required()
def get_missions():
    missions = Mission.query.all()
    return jsonify([mission.serialize() for mission in missions]), 200

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

    existing = UserMission.query.filter_by(user_id=user_id, mission_id=id).first()
    if existing:
        return jsonify({"msg": "Mission already accepted"}), 400

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

    if user_mission.status == "completed":
        return jsonify({"msg": "Mission already completed"}), 400

    user_mission.status = "completed"
    user_mission.completed_at = datetime.utcnow()
    user_mission.completion_percentage = 100

    mission = Mission.query.get(id)
    if mission.achievement_id:
        exists = UserAchievement.query.filter_by(user_id=user_id, achievement_id=mission.achievement_id).first()
        if not exists:
            user_achievement = UserAchievement(user_id=user_id, achievement_id=mission.achievement_id)
            db.session.add(user_achievement)

    db.session.commit()
    return jsonify({"msg": "Mission completed!"}), 200

@missions_api.route('/users/<int:user_id>/missions', methods=['GET'])
@jwt_required()
def get_user_missions(user_id):
    user_missions = UserMission.query.filter_by(user_id=user_id).all()
    return jsonify([um.serialize() for um in user_missions]), 200
