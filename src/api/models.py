from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer, DateTime, Date, ForeignKey, Sequence, Enum, Numeric
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime, date
import enum

db = SQLAlchemy()

#----------------------------EMUS-----------------------------------------------------------
class RoleEnum(enum.Enum):
    administrator = "administrator"
    client = "client"
    
#-------------------------------------User class----------------------------------------------------
class User(db.Model):
    __tablename__ = 'users'
    
    id: Mapped[int] = mapped_column(Integer, Sequence('admin_id_seq'), primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(256), nullable=False)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    role: Mapped[enum.Enum] = mapped_column(Enum(RoleEnum), default=RoleEnum.client, nullable=False)
    
    
    # Relación con bookings (Un usuario puede tener muchas bookings)
    bookings = relationship('Booking', back_populates='user', lazy='dynamic')

    # Relación con bookings (Un usuario puede tener muchas autos)
    cars = relationship('Car', back_populates='user', lazy='dynamic')

    #Relación con los metodos de pago
    paypal_payments = relationship('PaypalPayment', back_populates='user')
    mercadopago_payments = relationship('MercadoPagoPayment', back_populates='user')

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "is_active": self.is_active,
            "admin_id": self.admin_id,
            "bookings_count": self.bookings.count()
        }



#-------------------------------------Booking class----------------------------------------------------
class Booking(db.Model):
    __tablename__ = 'bookings'

    id: Mapped[int] = mapped_column(Integer, Sequence('admin_id_seq'), primary_key=True, autoincrement=True)
    location: Mapped[str] = mapped_column(String(300), nullable=False)
    car: Mapped[str] = mapped_column(String(300), nullable=False)
    amount: Mapped[float] = mapped_column(Integer, nullable=False)  
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    start_day: Mapped[date] = mapped_column(Date, nullable=False)
    end_day: Mapped[date] = mapped_column(Date, nullable=False)
    
    # Relación con Usuario (Muchas bookings pertenecen a un usuario)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=False)
    user = relationship('User', back_populates='bookings')

    # Relación con Usuario (Muchas bookings pertenecen a un auto)
    car_id: Mapped[int] = mapped_column(ForeignKey('car.id'), nullable=False)
    cars = relationship('Car', back_populates='bookings')

    def serialize(self):
        return {
            "id": self.id,
            "location": self.location,
            "car": self.car, 
            "amount": self.amount,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat(),
            "start_day": self.start_day.isoformat(),
            "end_day": self.end_day.isoformat(),
            "user_id": self.user_id,
            "car_id": self.car_id
        }

#-------------------------------------Car class----------------------------------------------------

class Car(db.Model):
    __tablename__ = 'car'
    
    license_plate: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    color: Mapped[str] = mapped_column(String(120), nullable=False)
    type: Mapped[str] = mapped_column(String(120), nullable=False)
    model: Mapped[int] = mapped_column(Integer(4), nullable=False)
    serial_number: Mapped[str] = mapped_column(String(20), nullable=False)
    piezes: Mapped[int] = mapped_column(Integer(4), nullable=False)
    price: Mapped[int] = mapped_column(Integer(4), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    role: Mapped[enum.Enum] = mapped_column(Enum(RoleEnum), default=RoleEnum.client, nullable=False)
    
    
    # Relación con bookings (Un auto puede tener muchas bookings)
    cars = relationship('Car', back_populates='booking', lazy='dynamic')

    # Relación con Usuario (Muchas autos pertenecen a un usuario)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=False)
    user = relationship('User', back_populates='bookings')

    def serialize(self):
        return {
            "license_plate": self.license_plate,
            "name": self.name,
            "color": self.color,
            "type": self.type,
            "model": self.model,
            "serial_number": self.serial_number,
            "piezes": self.piezes,
            "price": self.price,
            "created_at": self.created_at,
            "is_active": self.is_active,
            "role": self.role,
            "admin_id": self.admin_id,
            "bookings_count": self.bookings.count()
        }
    
    #-------------------------------------PaypalPayment class----------------------------------------------------
class PaypalPayment(db.Model):
    __tablename__ = 'paypal_payments'
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    payment_id: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)  # ID de transacción de PayPal
    amount: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)  # Monto con 2 decimales
    currency: Mapped[str] = mapped_column(String(3), default='USD', nullable=False)  # USD, EUR, etc.
    status: Mapped[str] = mapped_column(String(20), nullable=False)  # "completed", "pending", "failed"
    payer_email: Mapped[str] = mapped_column(String(120), nullable=False)  # Email del pagador
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    
    # Relación con booking (Un pago está asociado a una booking)
    booking_id: Mapped[int] = mapped_column(ForeignKey('bookings.id'), nullable=False)
    booking = relationship('booking', back_populates='paypal_payments')

    # Relación con Usuario (quién realizó el pago)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=False)
    user = relationship('User', back_populates='paypal_payments')
    

    def serialize(self):
        return {
            "payment_id": self.payment_id,
            "amount": float(self.amount),
            "currency": self.currency,
            "status": self.status,
            "payer_email": self.payer_email,
            "created_at": self.created_at.isoformat()
        }
    

#-------------------------------------MercadoPago Payment class----------------------------------------------------

class MercadoPagoPayment(db.Model):
    __tablename__ = 'mercadopago_payments'
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    payment_id: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)  # ID de MercadoPago
    amount: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)  # Monto en ARS, BRL, etc.
    currency: Mapped[str] = mapped_column(String(3), default='ARS', nullable=False)  # ARS, BRL, etc.
    status: Mapped[str] = mapped_column(String(20), nullable=False)  # "approved", "pending", "rejected"
    payer_id: Mapped[str] = mapped_column(String(50), nullable=False)  # ID del pagador en MercadoPago
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    
    # Relación con booking
    booking_id: Mapped[int] = mapped_column(ForeignKey('bookings.id'), nullable=False)
    booking = relationship('booking', back_populates='mercadopago_payments')
    
     # Relación con Usuario
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=False)
    user = relationship('User', back_populates='mercadopago_payments')

    def serialize(self):
        return {
            "payment_id": self.payment_id,
            "amount": float(self.amount),
            "currency": self.currency,
            "status": self.status,
            "payer_id": self.payer_id,
            "booking_id": self.payment_method,
            "created_at": self.created_at.isoformat()
        }