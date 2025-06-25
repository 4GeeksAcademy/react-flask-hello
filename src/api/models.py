from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer, DateTime, Enum
from sqlalchemy.orm import Mapped, mapped_column
import enum

db = SQLAlchemy()

class ProjectStatus(enum.Enum):
    yet_to_start = "yet to start"
    in_progress = "in progress"
    done = "done"
    dismissed = "dismissed"

class User(db.Model):
    __tablename__ = 'user'
    id: Mapped[int] = mapped_column(primary_key=True)
    full_name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    phone: Mapped[int] = mapped_column(Integer, nullable=True)
    country: Mapped[str] = mapped_column(String(120), nullable=False)
    created_at: Mapped[DateTime] = mapped_column(DateTime, nullable=False)
    profile_picture_url: Mapped[str] = mapped_column(String, unique=True, nullable=True)
    random_profile_color: Mapped[int] = mapped_column(Integer, nullable=True)
    time_zone: Mapped[str] = mapped_column(String(120), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

class Proyect(db.Model):
    __tablename__ = 'proyect'
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(120), nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=True)
    created_at: Mapped[DateTime] = mapped_column(DateTime, nullable=False)
    proyect_picture_url: Mapped[str] = mapped_column(String, unique=True, nullable=True)
    due_date: Mapped[DateTime] = mapped_column(DateTime, nullable=False)
    status: Mapped[ProjectStatus] = mapped_column(Enum(ProjectStatus), nullable=False, default=ProjectStatus.yet_to_start)
