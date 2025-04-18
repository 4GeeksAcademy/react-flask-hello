from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Enum, ForeignKey, Numeric, DateTime, Date
from sqlalchemy.orm import Mapped, mapped_column, relationship
from werkzeug.security import generate_password_hash, check_password_hash
from typing import Optional
from datetime import datetime

db = SQLAlchemy()


class Admins(db.Model):
    __tablename__ = "admins"
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(
        String(50), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(
        Enum("Admin", name="role_admin"), nullable=False)

    def __init__(self, username, password, role):
        self.username = username
        self.role = role
        self.set_password(password)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def serialize_admins(self):
        return {
            "id": self.id,
            "username": self.username,
            "role": self.role,
            "password": self.password_hash
        }


class Businesses(db.Model):
    __tablename__ = "business"
    id: Mapped[int] = mapped_column(primary_key=True)
    business_name: Mapped[str] = mapped_column(String(50), nullable=False)
    business_tax_id: Mapped[str] = mapped_column(
        String(15), unique=True, nullable=False)
    business_postal_code: Mapped[str] = mapped_column(
        String(10), nullable=False)

    users = relationship("Users", back_populates="business")
    services = relationship("Services", back_populates="business")
    clients = relationship("Clients", back_populates="business")

    def serialize_business(self):
        return {
            "id": self.id,
            "name": self.business_name,
            "tax_id": self.business_tax_id,
            "postal_code": self.business_postal_code
        }


class Users(db.Model):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(
        String(50), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    business_tax_id: Mapped[str] = mapped_column(
        ForeignKey("business.business_tax_id"), nullable=False)
    role: Mapped[str] = mapped_column(
        Enum("master", "manager", "employee", name="role_enum"), nullable=False)

    business = relationship("Businesses", back_populates="users")
    appointments = relationship("Appointments", back_populates="user",
                                cascade="all, delete-orphan")

    def __init__(self, username, password, business_tax_id, role="employee"):
        self.username = username
        self.business_tax_id = business_tax_id
        self.role = role
        self.set_password(password)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def serialize_user(self):
        return {
            "id": self.id,
            "username": self.username,
            "role": self.role,
            "password": self.password_hash
        }


class Services(db.Model):
    __tablename__ = 'service'
    id: Mapped[int] = mapped_column(primary_key=True)
    business_id: Mapped[int] = mapped_column(
        ForeignKey("business.id"), nullable=False)  # limit (8)
    name: Mapped[str] = mapped_column(
        String(75), unique=True, nullable=False)
    description: Mapped[str] = mapped_column(String(500),  nullable=False)
    # price with numeric, but can be with Float or even Biginteger
    price: Mapped[int] = mapped_column(Numeric(10, 2), nullable=False)

    business = relationship("Businesses", back_populates="services")
    clients = relationship(
        "Clients", secondary="client_service", back_populates="services")
    appointments = relationship("Appointments", back_populates="service",
                                cascade="all, delete-orphan")

    def serialize_service(self):
        return {
            "id": self.id,
            "business_id": self.business_id,
            "name": self.name,
            "description": self.description,
            "price": self.price
        }


class Clients(db.Model):
    __tablename__ = "clients"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(75), nullable=False)
    address: Mapped[str] = mapped_column(String(255), nullable=True)
    phone: Mapped[str] = mapped_column(String(15), nullable=False)
    client_id_number: Mapped[str] = mapped_column(
        String(20), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(
        String(100), unique=True, nullable=False)
    business_id: Mapped[int] = mapped_column(ForeignKey("business.id"), nullable=False)

    business = relationship("Businesses", back_populates="clients")
    services = relationship("Services", secondary="client_service", back_populates="clients")
    notes = relationship("Notes", back_populates="client", cascade="all, delete-orphan")
    payments = relationship("Payments", back_populates="client", cascade="all, delete-orphan")
    appointments = relationship("Appointments", back_populates="client", cascade="all, delete-orphan")
    service_history = relationship("ServiceHistory", back_populates="client", cascade="all, delete-orphan")

    def serialize_client(self):
        return {
            "id": self.id,
            "name": self.name,
            "address": self.address,
            "phone": self.phone,
            "client_id_number": self.client_id_number,
            "email": self.email,
            "business_id": self.business_id,  # Incluir business_id en la serialización
            "services": [service.serialize_service() for service in self.services] if self.services else [],
            "notes": [note.serialize_note() for note in self.notes],
            "payments": [payment.serialize_payment() for payment in self.payments] if self.payments else [],
            "appointments": [appointment.serialize_appointment() for appointment in self.appointments] if self.appointments else [],
            "service_history": [history.serialize_history() for history in self.service_history] if self.service_history else []
        }


class Notes(db.Model):
    __tablename__ = "note"
    id: Mapped[int] = mapped_column(primary_key=True)
    client_id: Mapped[int] = mapped_column(
        ForeignKey("clients.id"), nullable=False)
    description: Mapped[str] = mapped_column(String(500), nullable=False)
    client = relationship("Clients", back_populates="notes")
    service_history = relationship(
        "ServiceHistory", back_populates="note")

    def serialize_note(self):
        return {
            "id": self.id,
            "client_id": self.client_id,
            "client_name": self.client.name,
            "description": self.description
        }


class Payments(db.Model):
    __tablename__ = "payments"
    id: Mapped[int] = mapped_column(primary_key=True)
    client_id: Mapped[int] = mapped_column(
        ForeignKey("clients.id"), nullable=False)
    payment_method: Mapped[str] = mapped_column(
        Enum("cash", "card", name="payment_method_enum"), nullable=False)
    estimated_total: Mapped[int] = mapped_column(
        Numeric(10, 2), nullable=False)
    payments_made: Mapped[int] = mapped_column(
        Numeric(10, 2), nullable=False, default=0)
    payment_date: Mapped[Date] = mapped_column(Date, nullable=True)
    status: Mapped[str] = mapped_column(Enum(
        "pending", "paid",  name="status_enum"), nullable=False, default="pending")

    client = relationship("Clients", back_populates="payments")

    def serialize_payment(self):
        return {
            "id": self.id,
            "client_id": self.client_id,
            "payment_method": self.payment_method,
            "estimated_total": str(self.estimated_total),
            "payments_made": self.payments_made,
            "pending_payments": max(0, self.estimated_total - self.payments_made),
            "payment_date": self.payment_date.isoformat() if self.payment_date else None,
            "status": self.status
        }


class Appointments(db.Model):
    __tablename__ = "appointments"
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"), nullable=False)
    client_id: Mapped[int] = mapped_column(
        ForeignKey("clients.id"), nullable=False)
    service_id: Mapped[int] = mapped_column(
        ForeignKey("service.id"), nullable=False)
    business_id: Mapped[int] = mapped_column(ForeignKey("business.id"), nullable=False)
    date_time: Mapped[DateTime] = mapped_column(DateTime, nullable=False)
    status: Mapped[str] = mapped_column(Enum(
        "pending", "confirmed", "cancelled", "completed", name="appointment_status"), nullable=False, default="pending")

    user = relationship("Users", back_populates="appointments")
    client = relationship("Clients", back_populates="appointments")
    service = relationship("Services", back_populates="appointments")
    calendar = relationship(
        "Calendar", back_populates="appointment", uselist=False)
    service_history = relationship(
        "ServiceHistory", back_populates="appointment", cascade="all, delete-orphan")
    business = relationship("Businesses", backref="appointments")

    def serialize_appointment(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "user_name": self.user.username,
            "client_id": self.client_id,
            "client_name": self.client.name,
            "client_email": self.client.email,
            "service_id": self.service_id,
            "service_name": self.service.name,
            "client_services": [service.serialize_service() for service in self.client.services] if self.client.services else [],
            "date_time": self.date_time.isoformat(),
            "status": self.status,
            "calendar": self.calendar.serialize_calendar() if self.calendar else None
        }


class Calendar(db.Model):
    __tablename__ = "calendar"
    id: Mapped[int] = mapped_column(primary_key=True)
    start_date_time: Mapped[DateTime] = mapped_column(
        DateTime, nullable=False)
    end_date_time: Mapped[DateTime] = mapped_column(DateTime, nullable=False)
    appointment_id: Mapped[int] = mapped_column(
        ForeignKey("appointments.id"), nullable=False, unique=True)
    google_event_id: Mapped[str] = mapped_column(String(255), nullable=True)
    last_sync: Mapped[DateTime] = mapped_column(DateTime, nullable=True)
    business_id: Mapped[int] = mapped_column(ForeignKey("business.id"), nullable=True)

    appointment = relationship("Appointments", back_populates="calendar")
    business = relationship("Businesses", backref="calendar_events")

    def serialize_calendar(self):
        return {
            "id": self.id,
            "start_date_time": self.start_date_time.isoformat(),
            "end_date_time": self.end_date_time.isoformat(),
            "appointment_id": self.appointment_id,
            "google_event_id": self.google_event_id,
            "last_sync": self.last_sync.isoformat() if self.last_sync else None
        }


class ServiceHistory(db.Model):
    __tablename__ = "service_history"

    id: Mapped[int] = mapped_column(primary_key=True)
    client_id: Mapped[int] = mapped_column(
        ForeignKey("clients.id"), nullable=False)
    appointment_id: Mapped[int] = mapped_column(
        ForeignKey("appointments.id"), nullable=False)
    note_id: Mapped[int] = mapped_column(ForeignKey("note.id"), nullable=True)

    client = relationship("Clients", back_populates="service_history")
    appointment = relationship(
        "Appointments", back_populates="service_history")
    note = relationship("Notes", back_populates="service_history")

    def serialize_history(self):
        return {
            "id": self.id,
            "client_id": self.client_id,
            "client_name": self.client.name if self.client else None,
            "appointment_id": self.appointment_id,
            "appointment_info": {
                "date_time": self.appointment.date_time.isoformat() if self.appointment else None,
                "service": self.appointment.service.name if self.appointment and self.appointment.service else None,
                "status": self.appointment.status if self.appointment else None
            },
            "note_id": self.note_id,
            "note_description": self.note.description if self.note else None
        }


class ClientService(db.Model):
    __tablename__ = "client_service"

    client_id: Mapped[int] = mapped_column(
        ForeignKey("clients.id"), primary_key=True)
    service_id: Mapped[int] = mapped_column(
        ForeignKey("service.id"), primary_key=True)
   
    completed: Mapped[bool] = mapped_column(default=False)
    completed_date: Mapped[Optional[datetime]] = mapped_column(nullable=True)
    
    def serialize(self) -> dict:
        return {
            "client_id": self.client_id,
            "service_id": self.service_id,
            "completed": self.completed,
            "completed_date": self.completed_date.isoformat() if self.completed_date else None
        }