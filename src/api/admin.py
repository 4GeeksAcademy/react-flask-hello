  
import os
from flask_admin import Admin
from .models import db, User, Rol, Profile, AccountSettings, Task, Category, TaskOffered, TaskDealed, Payment, Review, Message, Dispute, Admin_action
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Rol, db.session))
    admin.add_view(ModelView(Profile, db.session))
    admin.add_view(ModelView(AccountSettings, db.session))
    admin.add_view(ModelView(Task, db.session))
    admin.add_view(ModelView(Category, db.session))
    admin.add_view(ModelView(TaskOffered, db.session))
    admin.add_view(ModelView(TaskDealed, db.session))
    admin.add_view(ModelView(Payment, db.session))
    admin.add_view(ModelView(Review, db.session))
    admin.add_view(ModelView(Message, db.session))
    admin.add_view(ModelView(Dispute, db.session))
    admin.add_view(ModelView(Admin_action, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))