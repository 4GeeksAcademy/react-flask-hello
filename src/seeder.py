from api.models import db, User, MentorProfile, StudentProfile, MentorTopic, Mentoring, Review, Comments, ExperienceLevelEnum, StatusEnum, PaymentStatusEnum, DifficultyLevelEnum, LanguageEnum
from datetime import datetime
from app import app
from werkzeug.security import generate_password_hash


def seed_db():
    db.drop_all()
    db.create_all()

    # Crear usuarios (3 mentores, 5 estudiantes)
    mentors = []
    students = []
    for i in range(1, 4):
        user = User(email=f"mentor{i}@example.com",  # mentor1 .. mentor3
                    password=generate_password_hash('user123'), role=True)
        db.session.add(user)
        db.session.flush()
        mentors.append(user)
    for i in range(1, 6):
        user = User(email=f"student{i}@example.com",  # student1 .. student5
                    password=generate_password_hash('user123'), role=False)
        db.session.add(user)
        db.session.flush()
        students.append(user)
    db.session.commit()

    # Crear perfiles de mentor
    mentor_profiles = []
    for i, mentor in enumerate(mentors, start=1):
        profile = MentorProfile(
            username=f"mentor{i}",
            name=f"Mentor {i}",
            avatar=f"https://example.com/avatar{i}.png",
            user_id=mentor.id,
            hourly_rate=40.0 + i * 10,
            years_experience=3 + i,
            bio=f"Mentor experto en área {i}.",
            availability="Lunes a viernes",
            linkedin_url=f"https://linkedin.com/in/mentor{i}",
            website=f"https://mentor{i}.com",
            skills="Python, Flask, SQL",
            interests="Educación, Tecnología",
            language=LanguageEnum.SPANISH if i % 2 == 1 else LanguageEnum.ENGLISH,
            location="Madrid" if i == 1 else "Barcelona"
        )
        db.session.add(profile)
        db.session.flush()
        mentor_profiles.append(profile)
    db.session.commit()

    # Crear perfiles de estudiante
    student_profiles = []
    for i, student in enumerate(students, start=1):
        profile = StudentProfile(
            user_id=student.id,
            interests="Programación, IA",
            goals=f"Meta estudiante {i}",
            experience_level=ExperienceLevelEnum.BEGINNER if i < 3 else ExperienceLevelEnum.INTERMEDIATE,
            skills="HTML, CSS",
            language=LanguageEnum.SPANISH if i % 2 == 1 else LanguageEnum.ENGLISH,
            location="Valencia" if i == 1 else "Sevilla"
        )
        db.session.add(profile)
        db.session.flush()
        student_profiles.append(profile)
    db.session.commit()

    # Crear temas de mentoría
    topics = []
    for i, mentor_profile in enumerate(mentor_profiles, start=1):
        topic = MentorTopic(
            mentor_profile_id=mentor_profile.id,
            title=f"Tema {i}",
            description=f"Descripción del tema {i}",
            difficulty_level=DifficultyLevelEnum.BEGINNER if i == 1 else DifficultyLevelEnum.INTERMEDIATE,
            price=25.0 + i * 5,
            duration=30.0 + i * 2
        )
        db.session.add(topic)
        db.session.flush()
        topics.append(topic)
    db.session.commit()

    # Crear mentorías, reviews y comentarios
    for i, student_profile in enumerate(student_profiles, start=1):
        mentor_profile = mentor_profiles[i % 3]
        topic = topics[i % 3]
        mentoring = Mentoring(
            topic_id=topic.id,
            mentor_profile_id=mentor_profile.id,
            student_id=student_profile.id,
            scheduled_at=datetime.utcnow(),
            duration_minutes=60 + i * 10,
            status=StatusEnum.CONFIRMED,
            pricing_topic=topic.price,
            notes=f"Sesión {i}",
            payment_status=PaymentStatusEnum.PAID
        )
        db.session.add(mentoring)
        db.session.flush()

        review = Review(
            mentoring_id=mentoring.id,
            reviewer_id=student_profile.user_id,
            reviewed_id=mentor_profile.user_id,
            role=False,
            ranking=4.0 + (i % 2),
            title=f"Review {i}",
            comment=f"Comentario de la sesión {i}.",
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        db.session.add(review)

        comment = Comments(
            user_id=student_profile.user_id,
            message=f"Comentario del estudiante {i} para mentor {mentor_profile.id}",
            id_mentor=mentor_profile.id,
            id_student=student_profile.id,
            created_at=datetime.utcnow()
        )
        db.session.add(comment)
    db.session.commit()

    print("seeder ejecutado correctamente")


if __name__ == "__main__":
    with app.app_context():
        seed_db()
