from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer, DateTime, Date, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime, date

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(256), nullable=False)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    
    # Relación con Administrador (Muchos usuarios a un administrador)
    admin_id: Mapped[int] = mapped_column(ForeignKey('administrators.id'), nullable=True)
    admin = relationship('Administrator', back_populates='users')
    
    # Relación con Reservas (Un usuario puede tener muchas reservas)
    reservas = relationship('Reserva', back_populates='user', lazy='dynamic')

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "is_active": self.is_active,
            "admin_id": self.admin_id,
            "reservas_count": self.reservas.count()
        }

class Reserva(db.Model):
    __tablename__ = 'reservas'

    id: Mapped[int] = mapped_column(Integer, primary_key=True) 
    location: Mapped[str] = mapped_column(String(300), nullable=False)
    car: Mapped[str] = mapped_column(String(300), nullable=False)
    price: Mapped[float] = mapped_column(Integer, nullable=False)  
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    days: Mapped[date] = mapped_column(Date, nullable=False)
    
    # Relación con Usuario (Muchas reservas pertenecen a un usuario)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=False)
    user = relationship('User', back_populates='reservas')

    def serialize(self):
        return {
            "id": self.id,
            "location": self.location,
            "car": self.car, 
            "price": self.price,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat(),
            "days": self.days.isoformat(),
            "user_id": self.user_id
        }

class Administrator(db.Model):
    __tablename__ = 'administrators'
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(256), nullable=False)
    
    # Relación con Usuarios (Un admin gestiona muchos usuarios)
    users = relationship('User', back_populates='admin', lazy='dynamic')
    
    # Los administradores pueden ver todas las reservas (sin relación directa)
    def get_all_reservas(self):
        return Reserva.query.join(User).filter(User.admin_id == self.id).all()

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "users_count": self.users.count(),
            "reservas_count": len(self.get_all_reservas())
        }