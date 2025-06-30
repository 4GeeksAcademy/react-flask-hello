
import click
from api.models import db, User

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    @app.cli.command()
    @click.argument("name")
    def test_db(name):
        print("create user")
        user1 = User(email="test@test.com", password="123456", is_active=True)
        db.session.add(user1)
        db.session.commit()
        print("User: ", user1.email)

    @app.cli.command()
    def init_db():
        """Initialize the database with sample data."""
        print("Creating database...")
        db.create_all()
        
        # Crear productos de ejemplo
        sample_products = [
            {
                "name": "iPhone 15 Pro",
                "description": "El iPhone más avanzado con chip A17 Pro y cámara de calidad profesional.",
                "price": 999.99,
                "stock": 50,
                "category": CategoryEnum.ELECTRONICS,
                "image_url": "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop"
            },
            {
                "name": "MacBook Air M2",
                "description": "Potente y portátil con el chip M2 de Apple.",
                "price": 1299.99,
                "stock": 30,
                "category": CategoryEnum.ELECTRONICS,
                "image_url": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop"
            },
            {
                "name": "Camiseta Premium",
                "description": "Camiseta de algodón 100% orgánico, suave y cómoda.",
                "price": 29.99,
                "stock": 100,
                "category": CategoryEnum.CLOTHING,
                "image_url": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop"
            },
            {
                "name": "Jeans Clásicos",
                "description": "Jeans de mezclilla clásicos, perfectos para cualquier ocasión.",
                "price": 79.99,
                "stock": 75,
                "category": CategoryEnum.CLOTHING,
                "image_url": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop"
            },
            {
                "name": "Sofá Moderno",
                "description": "Sofá de 3 plazas con diseño moderno y materiales de alta calidad.",
                "price": 899.99,
                "stock": 15,
                "category": CategoryEnum.HOME,
                "image_url": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop"
            },
            {
                "name": "Mesa de Centro",
                "description": "Mesa de centro de madera maciza con acabado natural.",
                "price": 299.99,
                "stock": 25,
                "category": CategoryEnum.HOME,
                "image_url": "https://images.unsplash.com/photo-1549497538-303791108f95?w=500&h=500&fit=crop"
            },
            {
                "name": "Auriculares Inalámbricos",
                "description": "Auriculares con cancelación de ruido y hasta 30 horas de batería.",
                "price": 199.99,
                "stock": 60,
                "category": CategoryEnum.ELECTRONICS,
                "image_url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
            },
            {
                "name": "Zapatillas Deportivas",
                "description": "Zapatillas de running con tecnología de amortiguación avanzada.",
                "price": 129.99,
                "stock": 80,
                "category": CategoryEnum.SPORTS,
                "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop"
            },
            {
                "name": "Libro: Programación Python",
                "description": "Guía completa para aprender Python desde cero hasta nivel avanzado.",
                "price": 49.99,
                "stock": 40,
                "category": CategoryEnum.BOOKS,
                "image_url": "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&h=500&fit=crop"
            },
            {
                "name": "Set de Maquillaje",
                "description": "Kit completo de maquillaje profesional con todos los esenciales.",
                "price": 89.99,
                "stock": 35,
                "category": CategoryEnum.BEAUTY,
                "image_url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&h=500&fit=crop"
            },
            {
                "name": "Tablet 10 pulgadas",
                "description": "Tablet con pantalla HD de 10 pulgadas, perfecta para trabajo y entretenimiento.",
                "price": 299.99,
                "stock": 45,
                "category": CategoryEnum.ELECTRONICS,
                "image_url": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop"
            },
            {
                "name": "Chaqueta de Cuero",
                "description": "Chaqueta de cuero genuino con diseño atemporal.",
                "price": 199.99,
                "stock": 20,
                "category": CategoryEnum.CLOTHING,
                "image_url": "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop"
            }
        ]
        
        for product_data in sample_products:
            product = Product(**product_data)
            db.session.add(product)
        
        # Crear usuario administrador de ejemplo
        admin_user = User(
            email="admin@onix.com",
            first_name="Admin",
            last_name="Onix",
            phone="1234567890",
            address="123 Admin Street",
            city="Tech City",
            postal_code="12345"
        )
        admin_user.set_password("admin123")
        db.session.add(admin_user)
        
        # Crear usuario de prueba
        test_user = User(
            email="user@test.com",
            first_name="Test",
            last_name="User",
            phone="0987654321",
            address="456 Test Avenue",
            city="User City",
            postal_code="54321"
        )
        test_user.set_password("test123")
        db.session.add(test_user)
        
        db.session.commit()
        print("Database initialized with sample data!")
        print("Admin user: admin@onix.com / admin123")
        print("Test user: user@test.com / test123")

    @app.cli.command()
    def drop_db():
        """Drop all database tables."""
        db.drop_all()
        print("Database dropped!")

    @app.cli.command()
    def reset_db():
        """Reset database with fresh data."""
        db.drop_all()
        db.create_all()
        
        # Ejecutar init_db
        ctx = app.make_shell_context()
        with app.app_context():
            init_db.callback()
        
        print("Database reset completed!")