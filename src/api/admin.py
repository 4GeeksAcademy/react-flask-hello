  
import os
from flask_admin import Admin
from .models import db, User, Booking, Car
from flask_admin.contrib.sqla import ModelView
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity


# class AdminOnly(ModelView):
#     def is_accessible(self):
#         try:
#             verify_jwt_in_request()
#             user_id = get_jwt_identity()
#             if not user_id:
#                 return False
#             user = User.query.get(user_id)
#             return user and user.role.name == 'admin'  # O usa `user.role == RoleEnum.admin` si tenés enums
#         except Exception:
#             return False  # No hay JWT o es inválido


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Booking, db.session))
    admin.add_view(ModelView(Car, db.session))
    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))