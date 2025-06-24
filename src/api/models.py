from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer, DateTime, Date, ForeignKey, Sequence, Enum, Numeric
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime, date
import enum
from typing import List

db = SQLAlchemy()

#----------------------------ENUMS-----------------------------------------------------------
class RoleEnum(enum.Enum):
    administrator = "administrator"
    client = "client"

class CarRole(enum.Enum):
    available = "available"
    rent = "rent"
    
#-------------------------------------User class----------------------------------------------------
class User(db.Model):
    __tablename__ = 'users'
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(256), nullable=False)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    address: Mapped[str] = mapped_column(String(120), nullable=False)
    phone: Mapped[str] = mapped_column(String(120), nullable=False)
    role: Mapped[enum.Enum] = mapped_column(Enum(RoleEnum), default=RoleEnum.client, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    
    # Relaciones
    bookings = relationship('Booking', back_populates='user', lazy='dynamic')
    cars = relationship('Car', back_populates='user', lazy='dynamic')
    paypal_payments = relationship('PaypalPayment', back_populates='user')
    mercadopago_payments = relationship('MercadoPagoPayment', back_populates='user')

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "role": self.role.value,
            "is_active": self.is_active,
            "bookings_count": self.bookings.count(),
            "cars_count": self.cars.count()
        }

#-------------------------------------Car class----------------------------------------------------
class Car(db.Model):
    __tablename__ = 'cars'  
    
    license_plate: Mapped[str] = mapped_column(String(20), primary_key=True) 
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    color: Mapped[str] = mapped_column(String(120), nullable=False)
    type: Mapped[str] = mapped_column(String(120), nullable=False)
    serial_number: Mapped[str] = mapped_column(String(20), nullable=False)
    pieces: Mapped[int] = mapped_column(Integer, nullable=False)
    price: Mapped[int] = mapped_column(Integer, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    status: Mapped[enum.Enum] = mapped_column(Enum(CarRole), default=CarRole.available, nullable=False)
    
    model: Mapped[str] = mapped_column(String(120), nullable=False)
    make: Mapped[str] = mapped_column(String(120), nullable=False)
    year: Mapped[int] = mapped_column(Integer, nullable=False)

    fuel_type: Mapped[str] = mapped_column(String(50))
    transmission: Mapped[str] = mapped_column(String(50))
    cylinders: Mapped[int] = mapped_column(Integer)
    displacement: Mapped[str] = mapped_column(String(50))
    drive: Mapped[str] = mapped_column(String(50))
    image_url: Mapped[str] = mapped_column(String(500))

    # Relaciones
    bookings = relationship('Booking', back_populates='car', lazy='dynamic')
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=False)
    user = relationship('User', back_populates='cars')

    def serialize(self):
        return {
            "license_plate": self.license_plate,
            "name": self.name,
            "color": self.color,
            "type": self.type,
            "serial_number": self.serial_number,
            "pieces": self.pieces,
            "price": self.price,
            "status": self.status.value,
            "created_at": self.created_at.isoformat(),
            "is_active": self.is_active,

            # External API
           
            "make": self.make,
            "model": self.model,
            "year": self.year,

            "image_url": self.image_url,
            "user_id": self.user_id
        }

#-------------------------------------Booking class----------------------------------------------------
class Booking(db.Model):
    __tablename__ = 'bookings'

    id: Mapped[int] = mapped_column(Integer, Sequence('booking_id_seq'), primary_key=True, autoincrement=True)
    location: Mapped[str] = mapped_column(String(300), nullable=False)
    car_model: Mapped[str] = mapped_column(String(300), nullable=False)  # Cambiado de 'car' a 'car_model'
    amount: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)  # Cambiado a Numeric
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    start_day: Mapped[date] = mapped_column(Date, nullable=False)
    end_day: Mapped[date] = mapped_column(Date, nullable=False)
    
    # Relaciones
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=False)
    user = relationship('User', back_populates='bookings')
    
    car_id: Mapped[str] = mapped_column(ForeignKey('cars.license_plate'), nullable=False)
    car = relationship('Car', back_populates='bookings')
    
    paypal_payments = relationship('PaypalPayment', back_populates='booking')
    mercadopago_payments = relationship('MercadoPagoPayment', back_populates='booking')

    def serialize(self):
        return {
            "id": self.id,
            "location": self.location,
            "car_model": self.car_model,
            "amount": float(self.amount),
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat(),
            "start_day": self.start_day.isoformat(),
            "end_day": self.end_day.isoformat(),
            "user_id": self.user_id,
            "car_id": self.car_id
        }

#-------------------------------------PaypalPayment class----------------------------------------------------
class PaypalPayment(db.Model):
    __tablename__ = 'paypal_payments'
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    payment_id: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    amount: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    currency: Mapped[str] = mapped_column(String(3), default='USD', nullable=False)
    status: Mapped[str] = mapped_column(String(20), nullable=False)
    payer_email: Mapped[str] = mapped_column(String(120), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    
    # Relaciones
    booking_id: Mapped[int] = mapped_column(ForeignKey('bookings.id'), nullable=False)
    booking = relationship('Booking', back_populates='paypal_payments')
    
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=False)
    user = relationship('User', back_populates='paypal_payments')

    def serialize(self):
        return {
            "id": self.id,
            "payment_id": self.payment_id,
            "amount": float(self.amount),
            "currency": self.currency,
            "status": self.status,
            "payer_email": self.payer_email,
            "created_at": self.created_at.isoformat(),
            "booking_id": self.booking_id,
            "user_id": self.user_id
        }

#-------------------------------------MercadoPagoPayment class----------------------------------------------------
class MercadoPagoPayment(db.Model):
    __tablename__ = 'mercadopago_payments'
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    payment_id: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    amount: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    currency: Mapped[str] = mapped_column(String(3), default='ARS', nullable=False)
    status: Mapped[str] = mapped_column(String(20), nullable=False)
    payer_id: Mapped[str] = mapped_column(String(50), nullable=False)
    payment_method: Mapped[str] = mapped_column(String(30))
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    
    # Relaciones
    booking_id: Mapped[int] = mapped_column(ForeignKey('bookings.id'), nullable=False)
    booking = relationship('Booking', back_populates='mercadopago_payments')
    
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=False)
    user = relationship('User', back_populates='mercadopago_payments')

    def serialize(self):
        return {
            "id": self.id,
            "payment_id": self.payment_id,
            "amount": float(self.amount),
            "currency": self.currency,
            "status": self.status,
            "payer_id": self.payer_id,
            "payment_method": self.payment_method,
            "created_at": self.created_at.isoformat(),
            "booking_id": self.booking_id,
            "user_id": self.user_id
        }