
import os
from flask_admin import Admin
from .models import db, User
from .models import db, Book
from .models import db, Gallery
from flask_admin.contrib.sqla import ModelView



def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='Books Market', template_mode='bootstrap3')

    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))

    # You can duplicate that line to add mew models
    admin.add_view(ModelView(Book, db.session))
    admin.add_view(ModelView(Gallery, db.session))
