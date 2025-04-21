from flask import Blueprint, request, jsonify
from api.models import db, Mission, UserMission
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

missions_api = Blueprint('missions_api', __name__)

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
    return jsonify({"msg": "Mission completed!"}), 200