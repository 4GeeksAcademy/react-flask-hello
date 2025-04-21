import os
from flask_admin import Admin
from api.models import db, AppUser, Mission, UserMission, Favorite, Achievement, UserAchievement, MoodTag, Stat, LevelFrame
from flask_admin.contrib.sqla import ModelView

# ❌ Comentado porque no estás usando esto todavía:
# from src.api.models import PasswordResetToken

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'super-secret')
    admin = Admin(app, name='LevelUp Admin', template_mode='bootstrap4')

    # Agregá solo los modelos que quieras administrar desde el panel
    admin.add_view(ModelView(AppUser, db.session))
    admin.add_view(ModelView(Mission, db.session))
    admin.add_view(ModelView(UserMission, db.session))
    admin.add_view(ModelView(Favorite, db.session))
    admin.add_view(ModelView(Achievement, db.session))
    admin.add_view(ModelView(UserAchievement, db.session))
    admin.add_view(ModelView(MoodTag, db.session))
    admin.add_view(ModelView(Stat, db.session))
    admin.add_view(ModelView(LevelFrame, db.session))
    
    # admin.add_view(ModelView(PasswordResetToken, db.session))  # ❌ Comentado por ahora
