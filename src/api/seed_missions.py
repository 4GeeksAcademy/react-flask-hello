from api.models import db, Mission

missions_data = [
    {"id": 1, "title": "Workout", "description": "Full-body strength training to improve endurance and muscle tone."},
    {"id": 2, "title": "Running", "description": "Cardio exercise to boost heart health and stamina."},
    {"id": 3, "title": "Meditation", "description": "Mindfulness practice to reduce stress and improve focus."},
    {"id": 4, "title": "Mobility", "description": "Improve flexibility and prevent injury through mobility drills."},
    {"id": 5, "title": "Yoga", "description": "Combine movement and breath to enhance body-mind connection."},
    {"id": 6, "title": "Hydration", "description": "Track your water intake today and stay well hydrated."},
    {"id": 7, "title": "Healthy Meal", "description": "Prepare and eat a healthy meal packed with vegetables."},
    {"id": 8, "title": "Stretching", "description": "10-minute stretch session to improve posture and blood flow."},
    {"id": 9, "title": "Digital Detox", "description": "Avoid social media and screens for at least 1 hour today."},
    {"id": 10, "title": "Gratitude", "description": "Write down 3 things you're grateful for today."},
    {"id": 11, "title": "Journaling", "description": "Take 10 minutes to write freely about your day or goals."},
    {"id": 12, "title": "Mindful Walk", "description": "Go for a walk and focus on sights, sounds, and sensations."},
    {"id": 13, "title": "Declutter", "description": "Organize one space in your home to reduce visual noise."},
    {"id": 14, "title": "Cold Shower", "description": "Start your day with a cold shower for energy and discipline."},
    {"id": 15, "title": "Early Wake-Up", "description": "Wake up 30 minutes earlier and use that time for yourself."},
    {"id": 16, "title": "Read", "description": "Read 10+ pages from any book that inspires or educates."},
]

def seed_missions():
    for m in missions_data:
        if not Mission.query.get(m["id"]):
            mission = Mission(
                id=m["id"],
                title=m["title"],
                description=m["description"],
                xp_reward=200,
                is_daily=True
            )
            db.session.add(mission)
    db.session.commit()
    print("✅ Misiones cargadas.")
