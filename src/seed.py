# src/seed.py
import os
from app import create_app
from api.models import db, User, Category, Task

app = create_app()

with app.app_context():
    # Users
    if not User.query.filter_by(email="demo@tasky.com").first():
        u = User(email="demo@tasky.com", username="demo", password="demo123")
        db.session.add(u)

    # Categories
    names = ["General", "Hogar", "Mascotas", "Jardín", "Muebles"]
    for n in names:
        if not Category.query.filter_by(name=n).first():
            db.session.add(Category(name=n))

    db.session.commit()

    # Tasks
    user = User.query.filter_by(email="demo@tasky.com").first()
    if user and not Task.query.first():
        db.session.add(Task(title="Armar mueble",
                            description="Necesito armar un mueble sencillo",
                            publisher_id=user.id, location="CDMX", price=300))
        db.session.add(Task(title="Pasear perro",
                            description="Paseo de 30 min",
                            publisher_id=user.id, location="CDMX", price=120))
        db.session.commit()

    print("Seed listo ✅")