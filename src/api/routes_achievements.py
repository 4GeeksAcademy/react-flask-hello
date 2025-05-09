from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.models import db, UserAchievement, Achievement

achievements_api = Blueprint('achievements_api', __name__)

@achievements_api.route('/user/achievements', methods=['GET'])
@jwt_required()
def get_user_achievements():
    user_id = get_jwt_identity()
    user_achievements = UserAchievement.query.filter_by(user_id=user_id).all()

    result = []
    for ua in user_achievements:
        achievement = Achievement.query.get(ua.achievement_id)
        if achievement:
            result.append({
                "id": achievement.id,
                "title": achievement.title,
                "unlocked_at": ua.unlocked_at.isoformat()
            })

    return jsonify(result), 200
