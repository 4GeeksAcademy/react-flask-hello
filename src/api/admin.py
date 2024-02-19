import os
from flask_admin import Admin
from .models import db, User, Evento, Categoria, Asistencia, Aficiones
from flask_admin.contrib.sqla import ModelView 


class AsistenciaView(ModelView):
    column_list = ('evento_id', 'user_id')  # Lista de columnas que deseas mostrar en la vista
    form_columns = ('evento_id', 'user_id')
    can_create = True


class AficionesView(ModelView):
    column_list = ('categoria_id', 'user_id')  # Lista de columnas que deseas mostrar en la vista
    form_columns = ('categoria_id', 'user_id')
    can_create = True


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')
    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Categoria, db.session))
    admin.add_view(ModelView(Evento, db.session))

    admin.add_view(AsistenciaView(Asistencia, db.session))
    admin.add_view(AficionesView(Aficiones, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))