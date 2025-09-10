import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from api.database.db import db
from api.models.test import Test


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(Test, db.session))
    # Add your models here, for e   xample this is how we add a the User model to the admin

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))