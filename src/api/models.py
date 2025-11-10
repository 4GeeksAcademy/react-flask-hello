from flask_sqlalchemy import SQLAlchemy
import enum
from sqlalchemy import String, Boolean, ForeignKey, Integer, Float, Text, DateTime, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship, foreign
from datetime import datetime


db = SQLAlchemy()

# Definición de ENUMs


class ExperienceLevelEnum(enum.Enum):
    BEGINNER = "BEGINNER"
    INTERMEDIATE = "INTERMEDIATE"
    ADVANCED = "ADVANCED"


class StatusEnum(enum.Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    COMPLETED = "completed"
    CANCELED = "canceled"
    SCHEDULED = "scheduled"


class PaymentStatusEnum(enum.Enum):
    PENDING = "pending"
    PAID = "paid"
    FAILED = "failed"
    REFUNDED = "refunded"


class DifficultyLevelEnum(enum.Enum):
    BEGINNER = "BEGINNER"
    INTERMEDIATE = "INTERMEDIATE"
    ADVANCED = "ADVANCED"


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
        String(255), unique=False, nullable=False)
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
        profile_data = None
        if self.role and self.mentor_profile:
            profile_data = self.mentor_profile.serialize()
        elif not self.role and self.student_profile:
            profile_data = self.student_profile.serialize()
        return {
            'id': self.id,
            'email': self.email,
            'role': 'mentor' if self.role else 'student',
            'profile': profile_data,
            'comments': [comment.serialize() for comment in self.comments] if self.comments else [],
            'reviews_given': [review.serialize() for review in self.reviews_given] if self.reviews_given else [],
            'reviews_received': [review.serialize() for review in self.reviews_received] if self.reviews_received else []
        }


class MentorProfile(db.Model):
    __tablename__ = 'mentor_profile'
    id: Mapped[int] = mapped_column(
        primary_key=True)
    username: Mapped[str] = mapped_column(
        String(20), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(
        String(50), nullable=False)
    avatar: Mapped[str] = mapped_column(
        String(200), unique=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow)
    user_id: Mapped[int] = mapped_column(
        Integer, ForeignKey('user.id'), unique=True, nullable=False)
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

    # agregamos campos de calendly
    calendly_access_token: Mapped[str] = mapped_column(Text, nullable=True)
    calendly_refresh_token: Mapped[str] = mapped_column(Text, nullable=True)
    calendly_token_expires_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow)
    calendly_user_uri: Mapped[str] = mapped_column(String(255), nullable=True)
    calendly_username: Mapped[str] = mapped_column(String(100), nullable=True)
    calendly_connected: Mapped[bool] = mapped_column(
        Boolean(), nullable=False, default=False)
    scheduling_url: Mapped[str] = mapped_column(String(255), nullable=True)
    calendly_webhook_uri: Mapped[str] = mapped_column(
        String(255), nullable=True)
    calendly_signing_key: Mapped[str] = mapped_column(
        String(255), nullable=True)

    # Relaciones
    user = relationship("User", back_populates="mentor_profile")
    topics = relationship("MentorTopic",
                          back_populates="mentor",
                          lazy=True)
    mentorings = relationship("Mentoring",
                              primaryjoin="MentorProfile.user_id == foreign(Mentoring.mentor_profile_id)",
                              back_populates="mentor_profile",
                              lazy=True)
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
            'skills': self.skills.strip("{}").split(",") if self.skills else [],
            'interests': self.interests,
            'language': self.language.value if self.language else None,
            'location': self.location,
            # ejemplo para evitar loop infinito
            'user': {"email": self.user.email} if self.user else None,
            'calendly_connected': self.calendly_connected,
            'calendly_scheduling_url': self.scheduling_url
        }

    def serialize_basic(self):
        return {
            'user_id': self.user_id,
            'username': self.username,
            'name': self.name,
            'avatar': self.avatar,
            'email': self.user.email if self.user else None
        }


class StudentProfile(db.Model):
    __tablename__ = 'student_profile'
    id: Mapped[int] = mapped_column(
        primary_key=True)
    user_id: Mapped[int] = mapped_column(
        Integer, ForeignKey('user.id'), unique=True, nullable=False)
    username: Mapped[str] = mapped_column(
        String(20), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(
        String(50), nullable=False)
    avatar: Mapped[str] = mapped_column(
        String(200), nullable=True)
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
        "Mentoring",
        primaryjoin="StudentProfile.user_id == foreign(Mentoring.student_id)",
        back_populates="student_profile", lazy=True)

    comments = relationship(
        "Comments", back_populates="student", foreign_keys="Comments.id_student")

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'username': self.username,
            'name': self.name,
            'avatar': self.avatar,
            'interests': self.interests,
            'goals': self.goals,
            'experience_level': self.experience_level.value if self.experience_level else None,
            'skills': self.skills,
            'language': self.language.value if self.language else None,
            'location': self.location
        }

    def serialize_basic(self):
        return {
            'user_id': self.user_id,
            'username': self.username,
            'name': self.name,
            'avatar': self.avatar,
            'email': self.user.email if self.user else None,
            'interests': self.interests,
            'experience_level': self.experience_level.value if self.experience_level else None,
            'skills': self.skills,
            'location': self.location

        }


class MentorTopic(db.Model):
    __tablename__ = 'mentor_topic'
    id: Mapped[int] = mapped_column(
        primary_key=True)
    mentor_profile_id: Mapped[int] = mapped_column(
        Integer, ForeignKey('mentor_profile.user_id'), nullable=False)
    title: Mapped[str] = mapped_column(
        String(50), nullable=False)
    description: Mapped[str] = mapped_column(
        Text, nullable=True)
    difficulty_level: Mapped[DifficultyLevelEnum] = mapped_column(
        Enum(DifficultyLevelEnum), nullable=True)
    price: Mapped[float] = mapped_column(
        Float, nullable=False)
    duration: Mapped[int] = mapped_column(
        Integer, nullable=True)

    # campos de calendly
    calendly_event_type_uri: Mapped[str] = mapped_column(
        String(255), unique=True, nullable=True)
    calendly_event_type_slug: Mapped[str] = mapped_column(
        String(255), nullable=True)

    # Relaciones
    mentor = relationship("MentorProfile", back_populates="topics")
    mentorings = relationship("Mentoring", back_populates="topic")

    def serialize(self):
        return {
            'id': self.id,
            'mentor_profile_id': self.mentor_profile_id,
            'title': self.title,
            'description': self.description,
            'difficulty_level': self.difficulty_level.value if self.difficulty_level else None,
            'price': self.price,
            'duration': self.duration,
            'calendly_event_type_uri': self.calendly_event_type_uri,
            'calendly_event_type_slug': self.calendly_event_type_slug
        }


class Mentoring(db.Model):
    __tablename__ = 'mentoring'
    id: Mapped[int] = mapped_column(primary_key=True)
    topic_id: Mapped[int] = mapped_column(
        Integer, ForeignKey('mentor_topic.id'), nullable=False)
    mentor_profile_id: Mapped[int] = mapped_column(
        Integer, nullable=False)
    student_id: Mapped[int] = mapped_column(
        Integer, nullable=False)
    scheduled_at: Mapped[datetime] = mapped_column(
        DateTime,  default=datetime.utcnow, onupdate=datetime.utcnow)
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

    # campos de calendly
    calendly_invitee_uri: Mapped[str] = mapped_column(
        String(255), unique=True, nullable=True)
    calendly_event_uri: Mapped[str] = mapped_column(String(255), nullable=True)
    start_time: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow)
    end_time: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow)

    # Relationships
    topic = relationship("MentorTopic", back_populates="mentorings")
    mentor_profile = relationship("MentorProfile",
                                  primaryjoin="foreign(Mentoring.mentor_profile_id)== MentorProfile.user_id",
                                  back_populates="mentorings",
                                  lazy=True)
    student_profile = relationship(
        "StudentProfile",
        primaryjoin="foreign(Mentoring.student_id)== StudentProfile.user_id",
        back_populates="mentorings",
        lazy=True)
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
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'start_time': self.start_time,
            'end_time': self.end_time,
            'mentor_profile': self.mentor_profile.serialize_basic() if self.mentor_profile else None,
            'student_profile': self.student_profile.serialize_basic() if self.student_profile else None,
            'topic': self.topic.serialize() if self.topic else None
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
