from api.models import db, Achievement

def seed_achievements():
    achievements_data = [
        {"key": "first_level", "title": "First Level", "description": "Complete your first weekly mission."},
        {"key": "perfect_combo", "title": "Perfect Combo", "description": "Complete 3 missions in one week."},
        {"key": "zen_mode", "title": "Zen Mode", "description": "Do a guided meditation."},
        {"key": "breathe_recharge", "title": "Breathe and Recharge", "description": "Complete a conscious breathing session."},
        {"key": "knowledge_initiate", "title": "Knowledge Initiate", "description": "Listen to your first full podcast."},
        {"key": "strength_level", "title": "Strength Level", "description": "Complete a yoga or functional training session."},
        {"key": "legendary_day", "title": "Legendary Day", "description": "Do yoga and meditation on the same day."},
        {"key": "supreme_explorer", "title": "Supreme Explorer", "description": "Explore different branches in one week."},
        {"key": "unstoppable_mission", "title": "Unstoppable Mission", "description": "Complete missions for 4 consecutive weeks."},
        {"key": "labyrinth_king", "title": "Labyrinth King", "description": "Complete all branches of the skill tree."},
        {"key": "mindfulness_jedi", "title": "Mindfulness Jedi Master", "description": "Complete 10 meditation sessions."},
        {"key": "serenity_winds", "title": "Serenity Winds", "description": "Do 3 conscious breathing sessions in one week."},
        {"key": "virtual_gymnast", "title": "Virtual Gymnast", "description": "Complete 5 yoga or functional training sessions."},
        {"key": "digital_bibliophile", "title": "Digital Bibliophile", "description": "Listen to 3 different podcasts."},
        {"key": "burst_mode", "title": "Burst Mode", "description": "Complete 7 missions in one week."}
    ]

    for data in achievements_data:
        existing = Achievement.query.filter_by(key=data["key"]).first()
        if not existing:
            new_achievement = Achievement(
                key=data["key"],
                title=data["title"],
                description=data["description"],
                icon_url=f"/icons/{data['key']}.svg"
            )
            db.session.add(new_achievement)
    db.session.commit()
    print("✅ Logros insertados correctamente.")
