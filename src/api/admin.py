  
import os
from flask_admin import Admin
from .models import db, User, Subscription, Testimony, Session, Instructor, Types_of_session
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    # Aquí va cada admin.add_view por cada modelo
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Subscription, db.session))
    admin.add_view(ModelView(Testimony, db.session))
    admin.add_view(ModelView(Session, db.session))
    admin.add_view(ModelView(Instructor, db.session))
    admin.add_view(ModelView(Types_of_session, db.session))




    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))