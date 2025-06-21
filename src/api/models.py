from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer, DateTime, ForeignKey, Date
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime, date

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(256), nullable=False)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    phone: Mapped[int] = mapped_column(Integer(10), nullable=False) 
    address: Mapped[str] = mapped_column(String(300), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    
    # Relación con Administrador (muchos usuarios a un administrador)
    admin_id: Mapped[int] = mapped_column(ForeignKey('administrators.id'), nullable=True)  
    admin = relationship('Administrator', back_populates='users')

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "phone": self.phone,
            "address": self.address,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat(),
            "admin_id": self.admin_id
        }

class Administrator(db.Model):
    __tablename__ = 'administrators'
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(256), nullable=False)
    
    # Relación uno-a-muchos con Usuarios
    users = relationship('User', back_populates='admin', lazy='dynamic', cascade='all, delete-orphan')

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "user_count": self.users.count() 
        }
    
class Reservas(db.Model):
    __tablename__ = 'reservas'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    phone: Mapped[int] = mapped_column(Integer(10), nullable=False) 
    location: Mapped[str] = mapped_column(String(300), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    dates: Mapped[date] = mapped_column(Date)