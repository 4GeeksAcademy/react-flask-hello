import os
from flask import Blueprint, render_template_string, request, redirect, url_for
from flask_admin import Admin, AdminIndexView
from flask_admin.contrib.sqla import ModelView
from flask_login import current_user, login_user
from wtforms import form, fields, validators, PasswordField

from .models import db, Lead, CTAdmin, TokenBlockedList

# --- Blueprint y Formulario de Login ---

admin_auth = Blueprint('admin_auth', __name__)

class LoginForm(form.Form):
    email = fields.StringField(validators=[validators.DataRequired()])
    password = fields.PasswordField(validators=[validators.DataRequired()])

    def validate_email(self, field):
        user = self.get_user()
        if user is None or not user.is_admin:
            raise validators.ValidationError('Invalid user or permissions')
        if not user.check_password(self.password.data):
            raise validators.ValidationError('Invalid password')

    def get_user(self):
        return db.session.scalar(db.select(CTAdmin).where(CTAdmin.email == self.email.data))

@admin_auth.route('/login', methods=('GET', 'POST'))
def login():
    
    form = LoginForm(request.form)
    if request.method == 'POST' and form.validate():
        user = form.get_user()
        login_user(user)
        return redirect(url_for('admin.index'))
    
    login_template = """
<!DOCTYPE html>
<html>
  <head>
    <title>Admin Login</title>
    <style>
      body { font-family: sans-serif; background: #f8f9fa; }
      .container { width: 300px; margin: 100px auto; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
      h1 { text-align: center; color: #333; }
      .form-group { margin-bottom: 15px; }
      label { display: block; margin-bottom: 5px; color: #555; }
      input { width: 100%; padding: 8px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px; }
      button { width: 100%; padding: 10px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
      button:hover { background-color: #0056b3; }
      .errors { color: red; font-size: 0.9em; list-style-type: none; padding: 0; }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Admin Login</h1>
      <form method="POST">
        <div class="form-group">
          <label for="email">Email</label>
          {{ form.email(id="email") }}
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          {{ form.password(id="password") }}
        </div>
        <button type="submit">Login</button>
        {% if form.errors %}
          <ul class="errors">
            {% for field_name, field_errors in form.errors|dictsort %}
              {% for error in field_errors %}
                <li>{{ error }}</li>
              {% endfor %}
            {% endfor %}
          </ul>
        {% endif %}
      </form>
    </div>
  </body>
</html>
"""
    return render_template_string(login_template, form=form)

# --- Vistas Seguras 

class SecureModelView(ModelView):
    def is_accessible(self):
        return current_user.is_authenticated and hasattr(current_user, 'is_admin') and current_user.is_admin
    def inaccessible_callback(self, name, **kwargs):
        return redirect(url_for('admin_auth.login', next=request.url))

class SecureAdminIndexView(AdminIndexView):
     def is_accessible(self):
        return current_user.is_authenticated and hasattr(current_user, 'is_admin') and current_user.is_admin
     def inaccessible_callback(self, name, **kwargs):
        return redirect(url_for('admin_auth.login', next=request.url))

class CTAdminModelView(SecureModelView):
    # Esto define las columnas que se muestran en la lista
    column_list = ('id', 'email', 'is_admin')
    
    # Esto define los campos que aparecen en el formulario de creación/edición
    
    form_columns = ('email', 'password_field', 'is_admin')
    
    # Ocultamos la columna real _password de la vista
    column_exclude_list = ['_password']
    
    # Creamos el campo 'password_field' que no existe en el modelo
    form_extra_fields = {
        'password_field': PasswordField('Password', [validators.DataRequired()])
    }
    
    def on_model_change(self, form, model, is_created):
        if form.password_field.data:
            model.password = form.password_field.data

# --- Función de Configuración Principal ---

def setup_admin(app):
    
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    app.register_blueprint(admin_auth, url_prefix='/dashboard')
    admin = Admin(app, name='CloudTech Admin', template_mode='bootstrap3',
                  url='/dashboard',
                  index_view=SecureAdminIndexView(name="Home", url="/dashboard"))
    admin.add_view(SecureModelView(Lead, db.session))
    admin.add_view(CTAdminModelView(CTAdmin, db.session)) 
    admin.add_view(SecureModelView(TokenBlockedList, db.session))

