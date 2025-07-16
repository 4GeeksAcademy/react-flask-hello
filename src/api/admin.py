
import os
from flask_admin import Admin
from .models import db, User, Orden_de_trabajo, Vehiculos, Servicio, AuxOrdenServicio
from flask_admin.contrib.sqla import ModelView


class OrdenTrabajoModelView(ModelView):
    column_auto_selected_related = True
    column_list = ['id_ot', 'fecha_ingreso', 'estado_servicio', 'fecha_final',
                   'usuario_id', 'vehiculo_id', 'mecanico_id', 'cliente', 'mecanico', 'vehiculo', 'servicios_asociados']


class vehiculosModelView(ModelView):
    column_auto_selected_related = True
    column_list = ['id_vehiculo', 'matricula', 'marca',
                   'modelo', 'year', 'user_id', 'user', 'ordenes_trabajo']


class servicioModelView(ModelView):
    column_auto_selected_related = True
    column_list = ['id_service', 'name_service', 'price', 'ordenes_asociadas']


class auxOrdenServicioModelView(ModelView):
    column_auto_selected_related = True
    column_list = ['id', 'orden_id', 'orden', 'servicio_id', 'servicio']


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='AutoTek Admin', template_mode='bootstrap3')

    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(OrdenTrabajoModelView(Orden_de_trabajo, db.session))
    admin.add_view(vehiculosModelView(Vehiculos, db.session))
    admin.add_view(servicioModelView(Servicio, db.session))
    admin.add_view(auxOrdenServicioModelView(AuxOrdenServicio, db.session))
    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))
