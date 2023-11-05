
import os
from flask_admin import Admin
from .models import db, User, Business_user, Trip, Offers, Review, Favorites
from flask_admin.contrib.sqla import ModelView


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='TRIP NEXUS', template_mode='bootstrap3')

    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Business_user, db.session))
    admin.add_view(ModelView(Trip, db.session))
    admin.add_view(ModelView(Offers, db.session))
    admin.add_view(ModelView(Review, db.session))
    admin.add_view(ModelView(Favorites, db.session))
    
    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))