import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
# Importa todos tus modelos aquí
from .models import db, User, Evento, Tarea, Gasto


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    # Agrega los modelos al admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Evento, db.session))
    admin.add_view(ModelView(Tarea, db.session))
    admin.add_view(ModelView(Gasto, db.session))
