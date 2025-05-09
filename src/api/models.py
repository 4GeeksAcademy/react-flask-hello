from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class AppUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    avatar_url = db.Column(db.String(255))
    level = db.Column(db.Integer, default=1)
    xp_total = db.Column(db.Integer, default=0)
    mood_actual = db.Column(db.String(100))
    objetivo_personal = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    favorites = db.relationship('Favorite', backref='user', lazy=True)
    stats = db.relationship('Stat', backref='user', lazy=True)
    moodtags = db.relationship('MoodTag', backref='user', lazy=True)
    missions = db.relationship('UserMission', backref='user', lazy=True)
    achievements = db.relationship('UserAchievement', backref='user', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "level": self.level,
            "xp_total": self.xp_total,
            "avatar_url": self.avatar_url,
            "mood_actual": self.mood_actual,
            "objetivo_personal": self.objetivo_personal,
            "created_at": self.created_at.isoformat()
        }

class Mission(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    type = db.Column(db.String(20))
    category = db.Column(db.String(100))
    duration_minutes = db.Column(db.Integer)
    xp_reward = db.Column(db.Integer)
    content_url = db.Column(db.String(255))
    is_daily = db.Column(db.Boolean, default=False)
    is_weekly = db.Column(db.Boolean, default=False)

    achievement_id = db.Column(db.Integer, db.ForeignKey('achievement.id'))
    user_missions = db.relationship('UserMission', backref='mission', lazy=True)
    favorites = db.relationship('Favorite', backref='mission', lazy=True)

class UserMission(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('app_user.id'))
    mission_id = db.Column(db.Integer, db.ForeignKey('mission.id'))
    status = db.Column(db.String(20))
    accepted_at = db.Column(db.DateTime, default=datetime.utcnow)
    completed_at = db.Column(db.DateTime)
    completion_percentage = db.Column(db.Integer)

class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('app_user.id'))
    mission_id = db.Column(db.Integer, db.ForeignKey('mission.id'))
    added_at = db.Column(db.DateTime, default=datetime.utcnow)

class Achievement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    icon_url = db.Column(db.String(255))

class UserAchievement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('app_user.id'))
    achievement_id = db.Column(db.Integer, db.ForeignKey('achievement.id'))
    unlocked_at = db.Column(db.DateTime, default=datetime.utcnow)

class MoodTag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('app_user.id'))
    keyword = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Stat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('app_user.id'))
    date = db.Column(db.Date, nullable=False)
    type = db.Column(db.String(20))
    xp_earned = db.Column(db.Integer)
    missions_completed = db.Column(db.Integer)
    minutes_invested = db.Column(db.Integer)

class LevelFrame(db.Model):
    level = db.Column(db.Integer, primary_key=True)
    frame_url = db.Column(db.String(255))
