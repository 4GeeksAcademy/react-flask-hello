import os
from flask_admin import Admin
from api.models import db, User, Product, Order, CartItem
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='Onix 2.0 Admin', template_mode='bootstrap3')
    
    # Add administrative views here
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Product, db.session))
    admin.add_view(ModelView(Order, db.session))
    admin.add_view(ModelView(CartItem, db.session))
    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))