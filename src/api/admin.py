  
import os
from flask_admin import Admin
from .models import db, User, Subscription, Testimony, Session, Contact, Instructor, Types_of_session, Jivamukti_yoga, Vinyasa_yoga, Rocket_yoga, Ashtanga_yoga, Hatha_yoga, Meditation, Harmonium
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
    admin.add_view(ModelView(Jivamukti_yoga, db.session))
    admin.add_view(ModelView(Vinyasa_yoga, db.session))
    admin.add_view(ModelView(Rocket_yoga, db.session))
    admin.add_view(ModelView(Ashtanga_yoga, db.session))
    admin.add_view(ModelView(Hatha_yoga, db.session))
    admin.add_view(ModelView(Meditation, db.session))
    admin.add_view(ModelView(Harmonium, db.session))
    admin.add_view(ModelView(Contact, db.session))







    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))