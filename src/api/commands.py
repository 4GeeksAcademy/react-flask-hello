import click
from flask.cli import with_appcontext
from api.models import db, AppUser, Mission
import datetime

# 🔧 Comando para insertar datos de prueba en la base de datos
@click.command('create-dummy-data')
@with_appcontext
def create_dummy_data():
    user = AppUser(
        username="testuser",
        email="test@example.com",
        password_hash="hashedpassword",
        avatar_url="https://example.com/avatar.jpg",
        level=1,
        xp_total=0,
        mood_actual="motivated",
        objetivo_personal="Ser mi mejor versión"
    )
    db.session.add(user)
    db.session.commit()

    mission = Mission(
        title="Camina 30 minutos",
        description="Sal a caminar durante media hora",
        type="manual",
        category="ejercicio",
        duration_minutes=30,
        xp_reward=50,
        content_url="",
        is_daily=True,
        is_weekly=False
    )
    db.session.add(mission)
    db.session.commit()

    click.echo("✔️ Usuario y misión de prueba creados exitosamente")
