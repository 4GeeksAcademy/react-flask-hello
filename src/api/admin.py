
import os
from flask_admin import Admin
from .models import db, Lead, CTAdmin, TokenBlockedList
from flask_admin.contrib.sqla import ModelView
from wtforms import PasswordField


class CTAdminModelView(ModelView):
    column_list = ('id', 'email')
    form_columns = ('email', 'password_field')
    column_exclude_list = ['_password']
    form_extra_fields = {
        'password_field': PasswordField('Password')
    }

    def on_model_change(self, form, model, is_created):
        if form.password_field.data:
            model.password = form.password_field.data
        elif is_created and not form.password_field.data:
            raise ValueError(
                'El password es obligatorio para nuevos administradores')


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='CloudTech Admin', template_mode='bootstrap3')

    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(Lead, db.session))
    admin.add_view(CTAdminModelView(CTAdmin, db.session))
    admin.add_view(ModelView(TokenBlockedList, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))
