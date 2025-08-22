from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column

db = SQLAlchemy()

UserRole = db.Table(
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(
        'user.id'), primary_key=True),
    db.Column('role_id', db.Integer, db.ForeignKey(
        'rol.id'), primary_key=True)
)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    modified_at = db.Column(db.DateTime, nullable=False)
    roles = db.relationship('Rol', secondary=UserRole,)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "created_at": self.created_at,
            "modified_at": self.modified_at,
            # no serializar "password" para no exponerlo
        }


class Rol(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), unique=True, nullable=False)
    user = db.relationship('User', secondary=UserRole)

    def serialize(self):
        return {
            "id": self.id,
            "type": self.type,
        }


class Profile(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    avatar = db.Column(db.String(100), nullable=True)
    city = db.Column(db.String(50), nullable=False)
    birth_date = db.Column(db.Date, nullable=True)
    bio = db.Column(db.String(250), nullable=True)
    skills = db.Column(db.String(250), nullable=True)
    rating_avg = db.Column(db.Float, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False)
    modified_at = db.Column(db.DateTime, nullable=False)

    def serialize(self):
        return {
            "user_id": self.user_id,
            "name": self.name,
            "last_name": self.last_name,
            "avatar": self.avatar,
            "city": self.city,
            "birth_date": self.birth_date,
            "bio": self.bio,
            "skills": self.skills,
            "rating_avg": self.rating_avg,
            "created_at": self.created_at,
            "modified_at": self.modified_at,
        }


class Account_settings(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    phone = db.Column(db.String(20), nullable=True)
    billing_info = db.Column(db.String(250), nullable=True)
    language = db.Column(db.String(50), nullable=True)
    marketing_emails = db.Column(db.Boolean, nullable=True)
    crated_at = db.Column(db.DateTime, nullable=False)
    modified_at = db.Column(db.DateTime, nullable=False)

    def serialize(self):
        return {
            "user_id": self.user_id,
            "phone": self.phone,
            "billing_info": self.billing_info,
            "language": self.language,
            "marketing_emails": self.marketing_emails,
            "created_at": self.crated_at,
            "modified_at": self.modified_at,
        }
