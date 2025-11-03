from datetime import datetime, timezone
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Float, DateTime, Text, Date, Time, Integer, ForeignKey, Table
from sqlalchemy.orm import mapped_column, relationship
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

# Tabla intermedia (relación muchos a muchos)
activity_user = Table(
    "activity_user",
    db.Model.metadata,
    db.Column("id", Integer, primary_key=True),
    db.Column("user_id", Integer, ForeignKey("user.id")),
    db.Column("activity_id", Integer, ForeignKey("activity.id")),
    db.Column("joined_at", DateTime, default=lambda: datetime.now(timezone.utc))
)

# MODELO: User
class User(db.Model):
    __tablename__ = "user"

    id = mapped_column(Integer, primary_key=True)
    name = mapped_column(String(50), nullable=False)
    email = mapped_column(String(120), unique=True, nullable=False)
    password_hash = mapped_column(String(200), nullable=False)
    avatar_url = mapped_column(String(200))
    biography = mapped_column(Text)
    sports = mapped_column(String(200))
    level = mapped_column(String(20))
    latitude = mapped_column(Float)
    longitude = mapped_column(Float)
    created_at = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))

    # Relaciones
    activities_created = relationship("Activity", back_populates="creator", lazy=True)
    activities_joined = relationship("Activity", secondary=activity_user, back_populates="participants")
    messages_sent = relationship("Message", back_populates="sender", lazy=True)

    # Métodos de seguridad
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "avatar_url": self.avatar_url,
            "biography": self.biography,
            "sports": self.sports,
            "level": self.level,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "created_at": self.created_at.isoformat(),
        }


# MODELO: Activity
class Activity(db.Model):
    __tablename__ = "activity"

    id = mapped_column(Integer, primary_key=True)
    title = mapped_column(String(100), nullable=False)
    sport = mapped_column(String(50), nullable=False)
    description = mapped_column(Text)
    latitude = mapped_column(Float, nullable=False)
    longitude = mapped_column(Float, nullable=False)
    date = mapped_column(Date, nullable=False)
    time = mapped_column(Time, nullable=False)
    created_by = mapped_column(Integer, ForeignKey("user.id"))
    max_participants = mapped_column(Integer)
    created_at = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))

    # Relaciones
    creator = relationship("User", back_populates="activities_created")
    participants = relationship("User", secondary=activity_user, back_populates="activities_joined")
    messages = relationship("Message", back_populates="activity", lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "sport": self.sport,
            "description": self.description,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "date": str(self.date),
            "time": str(self.time),
            "created_by": self.created_by,
            "creator_name": self.creator.name if self.creator else None,
            "max_participants": self.max_participants,
            "created_at": self.created_at.isoformat(),
            "participants": [p.id for p in self.participants],
        }


# MODELO: Message
class Message(db.Model):
    __tablename__ = "message"

    id = mapped_column(Integer, primary_key=True)
    activity_id = mapped_column(Integer, ForeignKey("activity.id"))
    sender_id = mapped_column(Integer, ForeignKey("user.id"))
    message = mapped_column(Text, nullable=False)
    created_at = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))

    sender = relationship("User", back_populates="messages_sent")
    activity = relationship("Activity", back_populates="messages")

    def serialize(self):
        return {
            "id": self.id,
            "activity_id": self.activity_id,
            "sender_id": self.sender_id,
            "message": self.message,
            "created_at": self.created_at.isoformat(),
        }
