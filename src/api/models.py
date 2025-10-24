from flask_sqlalchemy import SQLAlchemy
import enum
from sqlalchemy import String, Boolean, ForeignKey, Integer, Float, Text, DateTime, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime


db = SQLAlchemy()

# Definición de ENUMs


class ExperienceLevelEnum(enum.Enum):
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"


class StatusEnum(enum.Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class PaymentStatusEnum(enum.Enum):
    PENDING = "pending"
    PAID = "paid"
    FAILED = "failed"
    REFUNDED = "refunded"


class DifficultyLevelEnum(enum.Enum):
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"


class LanguageEnum(enum.Enum):
    SPANISH = "SPANISH"
    ENGLISH = "ENGLISH"
    FRENCH = "FRENCH"
    GERMAN = "GERMAN"


# Models
class User(db.Model):
    __tablename__ = 'user'
    id: Mapped[int] = mapped_column(
        primary_key=True)
    email: Mapped[str] = mapped_column(
        String(30), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(
        String(255), unique=True, nullable=False)
    role: Mapped[bool] = mapped_column(
        Boolean(), nullable=False)  # False=student, True=mentor

    # Relaciones
    mentor_profile = relationship(
        "MentorProfile", back_populates='user', uselist=False)
    student_profile = relationship(
        "StudentProfile", back_populates='user', uselist=False)
    comments = relationship(
        "Comments", back_populates="user")
    reviews_given = relationship(
        "Review", back_populates="reviewer", foreign_keys="Review.reviewer_id")
    reviews_received = relationship(
        "Review", back_populates="reviewed", foreign_keys="Review.reviewed_id")

    def serialize(self):
        return {
            'id': self.id,
            'email': self.email,
            'role': self.role,  # False=student, True=mentor
        }


class MentorProfile(db.Model):
    __tablename__ = 'mentor_profile'
    id: Mapped[int] = mapped_column(
        primary_key=True)
    username: Mapped[str] = mapped_column(
        String(20), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(
        String(15), nullable=False)
    avatar: Mapped[str] = mapped_column(
        String(200), unique=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow)
    user_id: Mapped[int] = mapped_column(
        Integer, ForeignKey('user.id'), nullable=False)
    hourly_rate: Mapped[float] = mapped_column(
        Float, nullable=False)
    years_experience: Mapped[int] = mapped_column(
        Integer, nullable=False)
    bio: Mapped[str] = mapped_column(
        Text, nullable=True)
    availability: Mapped[str] = mapped_column(
        String(400), nullable=True)
    linkedin_url: Mapped[str] = mapped_column(
        String(100), nullable=True)
    website: Mapped[str] = mapped_column(
        String(100), nullable=True)
    skills: Mapped[str] = mapped_column(
        Text, nullable=True)
    interests: Mapped[str] = mapped_column(
        Text, nullable=True)
    language: Mapped[LanguageEnum] = mapped_column(
        Enum(LanguageEnum), nullable=False)
    location: Mapped[str] = mapped_column(
        String(30), nullable=True)

    # Relaciones
    user = relationship("User", back_populates="mentor_profile")
    topics = relationship("MentorTopic", back_populates="mentor_profile")
    mentorings = relationship("Mentoring", back_populates="mentor_profile")
    comments = relationship(
        "Comments", back_populates="mentor", foreign_keys="Comments.id_mentor")

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'username': self.username,
            'name': self.name,
            'avatar': self.avatar,
            'hourly_rate': self.hourly_rate,
            'years_experience': self.years_experience,
            'bio': self.bio,
            'availability': self.availability,
            'linkedin_url': self.linkedin_url,
            'website': self.website,
            'skills': self.skills,
            'interests': self.interests,
            'language': self.language.value if self.language else None,
            'location': self.location
        }


class StudentProfile(db.Model):
    __tablename__ = 'student_profile'
    id: Mapped[int] = mapped_column(
        primary_key=True)
    user_id: Mapped[int] = mapped_column(
        Integer, ForeignKey('user.id'), nullable=False)
    interests: Mapped[str] = mapped_column(
        Text, nullable=True)
    goals: Mapped[str] = mapped_column(
        Text, nullable=True)
    experience_level: Mapped[ExperienceLevelEnum] = mapped_column(
        Enum(ExperienceLevelEnum), nullable=True)
    skills: Mapped[str] = mapped_column(
        Text, nullable=True)
    language: Mapped[LanguageEnum] = mapped_column(
        Enum(LanguageEnum), nullable=False)
    location: Mapped[str] = mapped_column(
        String(30), nullable=True)

    # Relaciones
    user = relationship("User", back_populates="student_profile")
    mentorings = relationship(
        "Mentoring", back_populates="student", foreign_keys="Mentoring.student_id")
    comments = relationship(
        "Comments", back_populates="student", foreign_keys="Comments.id_student")

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'interests': self.interests,
            'goals': self.goals,
            'experience_level': self.experience_level.value if self.experience_level else None,
            'skills': self.skills,
            'language': self.language.value if self.language else None,
            'location': self.location
        }


class MentorTopic(db.Model):
    __tablename__ = 'mentor_topic'
    id: Mapped[int] = mapped_column(
        primary_key=True)
    mentor_profile_id: Mapped[int] = mapped_column(
        Integer, ForeignKey('mentor_profile.id'), nullable=False)
    title: Mapped[str] = mapped_column(
        String(50), nullable=False)
    description: Mapped[str] = mapped_column(
        Text, nullable=True)
    difficulty_level: Mapped[DifficultyLevelEnum] = mapped_column(
        Enum(DifficultyLevelEnum), nullable=True)
    price: Mapped[float] = mapped_column(
        Float, nullable=False)

    # Relaciones
    mentor_profile = relationship("MentorProfile", back_populates="topics")
    mentorings = relationship("Mentoring", back_populates="topic")

    def serialize(self):
        return {
            'id': self.id,
            'mentor_profile_id': self.mentor_profile_id,
            'title': self.title,
            'description': self.description,
            'difficulty_level': self.difficulty_level.value if self.difficulty_level else None,
            'price': self.price
        }


class Mentoring(db.Model):
    __tablename__ = 'mentoring'
    id: Mapped[int] = mapped_column(primary_key=True)
    topic_id: Mapped[int] = mapped_column(
        Integer, ForeignKey('mentor_topic.id'), nullable=False)
    mentor_profile_id: Mapped[int] = mapped_column(
        Integer, ForeignKey('mentor_profile.id'), nullable=False)
    student_id: Mapped[int] = mapped_column(
        Integer, ForeignKey('student_profile.id'), nullable=False)
    scheduled_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False)
    duration_minutes: Mapped[int] = mapped_column(
        Integer, nullable=False)
    status: Mapped[StatusEnum] = mapped_column(
        Enum(StatusEnum), nullable=False)
    pricing_topic: Mapped[float] = mapped_column(
        Float, nullable=False)
    notes: Mapped[str] = mapped_column(Text, nullable=True)
    payment_status: Mapped[PaymentStatusEnum] = mapped_column(
        Enum(PaymentStatusEnum), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    topic = relationship("MentorTopic", back_populates="mentorings")
    mentor_profile = relationship("MentorProfile", back_populates="mentorings")
    student = relationship(
        "StudentProfile", back_populates="mentorings", foreign_keys=[student_id])
    reviews = relationship("Review", back_populates="mentoring")

    def serialize(self):
        return {
            'id': self.id,
            'topic_id': self.topic_id,
            'mentor_profile_id': self.mentor_profile_id,
            'student_id': self.student_id,
            'scheduled_at': self.scheduled_at.isoformat() if self.scheduled_at else None,
            'duration_minutes': self.duration_minutes,
            'status': self.status.value,
            'pricing_topic': self.pricing_topic,
            'notes': self.notes,
            'payment_status': self.payment_status.value if self.payment_status else None,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }


class Review(db.Model):
    __tablename__ = 'review'
    id: Mapped[int] = mapped_column(primary_key=True)
    mentoring_id: Mapped[int] = mapped_column(
        Integer, ForeignKey('mentoring.id'), nullable=False)
    reviewer_id: Mapped[int] = mapped_column(
        Integer, ForeignKey('user.id'), nullable=False)
    reviewed_id: Mapped[int] = mapped_column(
        Integer, ForeignKey('user.id'), nullable=False)
    role: Mapped[bool] = mapped_column(
        Boolean(), nullable=False)  # False=student, True=mentor
    ranking: Mapped[float] = mapped_column(
        Float, nullable=False)
    title: Mapped[str] = mapped_column(
        String(100), nullable=True)
    comment: Mapped[str] = mapped_column(
        Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    mentoring = relationship("Mentoring", back_populates="reviews")
    reviewer = relationship("User", foreign_keys=[reviewer_id])
    reviewed = relationship("User", foreign_keys=[reviewed_id])

    def serialize(self):
        return {
            'id': self.id,
            'mentoring_id': self.mentoring_id,
            'reviewer_id': self.reviewer_id,
            'reviewed_id': self.reviewed_id,
            'role': self.role,
            'ranking': self.ranking,
            'title': self.title,
            'comment': self.comment,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }


class Comments(db.Model):
    __tablename__ = 'comments'
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(
        Integer, ForeignKey('user.id'), nullable=False)
    message: Mapped[str] = mapped_column(
        Text, nullable=False)
    id_mentor: Mapped[int] = mapped_column(
        Integer, ForeignKey('mentor_profile.id'), nullable=False)
    id_student: Mapped[int] = mapped_column(
        Integer, ForeignKey('student_profile.id'), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="comments")
    mentor = relationship("MentorProfile")
    student = relationship("StudentProfile")

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'message': self.message,
            'id_mentor': self.id_mentor,
            'id_student': self.id_student,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
