import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from .models import db, User, Category, PetType, Product

# Vista personalizada para ProductCategory
class ProductCategoryAdmin(ModelView):
    form_columns = ['category', 'product']  

    column_labels = {
        'category': 'Categoría',
        'product': 'Producto',
    }

    column_searchable_list = ['category.name', 'product.name']
    column_list = ['id', 'category', 'product']

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    # Agregar vistas de modelos
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Category, db.session))
    admin.add_view(ModelView(PetType, db.session))
    admin.add_view(ModelView(Product, db.session))
   