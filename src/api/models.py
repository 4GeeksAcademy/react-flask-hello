from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class AppUser(db.Model):
    __tablename__ = 'appuser'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    avatar_url = db.Column(db.String(255))
    level = db.Column(db.Integer, default=1)
    xp_total = db.Column(db.Integer, default=0)
    mood_actual = db.Column(db.String(100))
    objetivo_personal = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    missions = db.relationship('UserMission', backref='user', lazy=True)
    favorites = db.relationship('Favorite', backref='user', lazy=True)
    achievements = db.relationship('UserAchievement', backref='user', lazy=True)
    moods = db.relationship('MoodTag', backref='user', lazy=True)
    stats = db.relationship('Stat', backref='user', lazy=True)
    reset_tokens = db.relationship('PasswordResetToken', backref='user', lazy=True)

class Mission(db.Model):
    __tablename__ = 'mission'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    type = db.Column(db.String(50))  # manual, video, podcast
    category = db.Column(db.String(100))
    duration_minutes = db.Column(db.Integer)
    xp_reward = db.Column(db.Integer)
    content_url = db.Column(db.String(255))
    is_daily = db.Column(db.Boolean, default=False)
    is_weekly = db.Column(db.Boolean, default=False)

    user_missions = db.relationship('UserMission', backref='mission', lazy=True)
    favorites = db.relationship('Favorite', backref='mission', lazy=True)

class UserMission(db.Model):
    __tablename__ = 'usermission'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('appuser.id'))
    mission_id = db.Column(db.Integer, db.ForeignKey('mission.id'))
    status = db.Column(db.String(50))  # pending, in_progress, completed
    accepted_at = db.Column(db.DateTime, default=datetime.utcnow)
    completed_at = db.Column(db.DateTime)
    completion_percentage = db.Column(db.Integer)

class Favorite(db.Model):
    __tablename__ = 'favorite'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('appuser.id'))
    mission_id = db.Column(db.Integer, db.ForeignKey('mission.id'))
    added_at = db.Column(db.DateTime, default=datetime.utcnow)

class Achievement(db.Model):
    __tablename__ = 'achievement'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    icon_url = db.Column(db.String(255))

    unlocked = db.relationship('UserAchievement', backref='achievement', lazy=True)

class UserAchievement(db.Model):
    __tablename__ = 'userachievement'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('appuser.id'))
    achievement_id = db.Column(db.Integer, db.ForeignKey('achievement.id'))
    unlocked_at = db.Column(db.DateTime, default=datetime.utcnow)

class MoodTag(db.Model):
    __tablename__ = 'moodtag'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('appuser.id'))
    keyword = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Stat(db.Model):
    __tablename__ = 'stat'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('appuser.id'))
    date = db.Column(db.Date, nullable=False)
    type = db.Column(db.String(50))  # daily, weekly, global
    xp_earned = db.Column(db.Integer)
    missions_completed = db.Column(db.Integer)
    minutes_invested = db.Column(db.Integer)

class LevelFrame(db.Model):
    __tablename__ = 'levelframe'

    level = db.Column(db.Integer, primary_key=True)
    frame_url = db.Column(db.String(255))

class PasswordResetToken(db.Model):
    __tablename__ = 'passwordresettoken'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('appuser.id'))
    token = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)