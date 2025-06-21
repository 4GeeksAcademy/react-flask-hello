from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer, DateTime, Date, ForeignKey, Sequence, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime, date
import enum

db = SQLAlchemy()

class RoleEnum(enum.Enum):
    administrator = "administrator"
    client = "client"
    

class User(db.Model):
    __tablename__ = 'users'
    
    id: Mapped[int] = mapped_column(Integer, Sequence('admin_id_seq'), primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(256), nullable=False)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    role: Mapped[enum.Enum] = mapped_column(Enum(RoleEnum), default=RoleEnum.client, nullable=False)
    
    
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

    id: Mapped[int] = mapped_column(Integer, Sequence('admin_id_seq'), primary_key=True, autoincrement=True)
    location: Mapped[str] = mapped_column(String(300), nullable=False)
    car: Mapped[str] = mapped_column(String(300), nullable=False)
    price: Mapped[float] = mapped_column(Integer, nullable=False)  
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    start_day: Mapped[date] = mapped_column(Date, nullable=False)
    end_day: Mapped[date] = mapped_column(Date, nullable=False)
    
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
            "start_day": self.start_day.isoformat(),
            "end_day": self.end_day.isoformat(),
            "user_id": self.user_id
        }

