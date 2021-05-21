  
import os
from flask_admin import Admin
from .models import db, User, Product, Cart, Supermarket, Coupons, Couponlist
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='Global Market Admin', template_mode='bootstrap3')

    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Supermarket, db.session))
    admin.add_view(ModelView(Product, db.session))
    admin.add_view(ModelView(Cart, db.session))
    admin.add_view(ModelView(Coupons, db.session))
    admin.add_view(ModelView(Couponlist, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))