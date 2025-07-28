import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from wtforms import PasswordField
from api.models import db, User, bcrypt

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    class UserAdmin(ModelView):
        column_list = ('email', 'password', 'is_active')
        form_columns = ('email', 'password', 'is_active')
        form_extra_fields = {
            'password': PasswordField('Password')
        }

        def on_model_change(self, form, model, is_created):
            if form.password.data:
                model.password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
            super().on_model_change(form, model, is_created)

    admin.add_view(UserAdmin(User, db.session))