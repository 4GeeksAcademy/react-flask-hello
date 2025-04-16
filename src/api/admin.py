from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from src.api.models import db, AppUser, Mission, UserMission, Favorite, Achievement, UserAchievement, MoodTag, Stat, LevelFrame, PasswordResetToken

def setup_admin(app):
    admin = Admin(app, name='LEVEL UP Admin', template_mode='bootstrap4')

    admin.add_view(ModelView(AppUser, db.session))
    admin.add_view(ModelView(Mission, db.session))
    admin.add_view(ModelView(UserMission, db.session))
    admin.add_view(ModelView(Favorite, db.session))
    admin.add_view(ModelView(Achievement, db.session))
    admin.add_view(ModelView(UserAchievement, db.session))
    admin.add_view(ModelView(MoodTag, db.session))
    admin.add_view(ModelView(Stat, db.session))
    admin.add_view(ModelView(LevelFrame, db.session))
    admin.add_view(ModelView(PasswordResetToken, db.session))
