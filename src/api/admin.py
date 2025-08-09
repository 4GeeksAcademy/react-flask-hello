import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from api.database.db import db


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'

    # Add your models here, for example this is how we add a the User model to the admin

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))