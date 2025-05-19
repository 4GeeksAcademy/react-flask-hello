# src/api/routes_profile.py
from flask import Blueprint, jsonify
from datetime import date, timedelta
from .models import db, AppUser, UserMission, Mission, UserAchievement, Achievement, Stat

profile_bp = Blueprint('profile_bp', __name__)

@profile_bp.route('/api/profile/<int:user_id>', methods=['GET'])
def get_profile(user_id):
    user = AppUser.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    today = date.today()

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
            'daily_missions_today': len(missions_today)
        },
        'weekly_progress': {
            'xp': week_xp
        },
        'calendar': calendar_data,
        'achievements': achievement_data,
        'reflection': user.mood_actual or ''
    })
