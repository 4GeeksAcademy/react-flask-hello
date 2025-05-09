import click
from flask.cli import with_appcontext
from api.models import db, Achievement, Mission

@click.command('populate-achievements')
@with_appcontext
def populate_achievements():
    asociaciones = [
        {"achievement_title": "First Level", "mission_title": "First Mission"},
        {"achievement_title": "Perfect Combo", "mission_title": "Combo Mission"},
        {"achievement_title": "Zen Mode", "mission_title": "Meditate"},
        {"achievement_title": "Breathe and Recharge", "mission_title": "Breathing"},
        {"achievement_title": "Knowledge Initiate", "mission_title": "Podcast"},
        {"achievement_title": "Strength Level", "mission_title": "Workout"},
        {"achievement_title": "Legendary Day", "mission_title": "Yoga and Meditate"},
        {"achievement_title": "Supreme Explorer", "mission_title": "Explore"},
        {"achievement_title": "Unstoppable Mission", "mission_title": "Consistency"},
        {"achievement_title": "Labyrinth King", "mission_title": "Skill Tree"},
        {"achievement_title": "Mindfulness Jedi Master", "mission_title": "10 Meditations"},
        {"achievement_title": "Serenity Winds", "mission_title": "Breath Master"},
        {"achievement_title": "Virtual Gymnast", "mission_title": "5 Yoga Sessions"},
        {"achievement_title": "Digital Bibliophile", "mission_title": "Podcast Explorer"},
        {"achievement_title": "Burst Mode", "mission_title": "Mission Burst"}
    ]

    linked = 0
    for pair in asociaciones:
        achievement = Achievement.query.filter_by(title=pair["achievement_title"]).first()
        mission = Mission.query.filter_by(title=pair["mission_title"]).first()

        if achievement and mission:
            mission.achievement_id = achievement.id
            db.session.commit()
            linked += 1
        elif not mission:
            click.echo(f"⚠️ Misión '{pair['mission_title']}' no encontrada.")
        elif not achievement:
            click.echo(f"⚠️ Logro '{pair['achievement_title']}' no encontrado.")

    click.echo(f"🔗 {linked} logros correctamente vinculados a misiones.")
