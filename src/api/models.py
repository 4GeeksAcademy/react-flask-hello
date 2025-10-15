from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer, ForeignKey, Date, create_engine
from sqlalchemy.orm import Mapped, mapped_column, relationship

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True)
    password: Mapped[str] = mapped_column(String)
    is_active: Mapped[Boolean] = mapped_column(Boolean)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active,
        }


class Patient(db.Model):
    __tablename__ = "patients"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True)
    first_name: Mapped[str] = mapped_column(String(255), nullable=False)
    last_name: Mapped[str] = mapped_column(String(255), nullable=False)
    birth_date: Mapped[Date] = mapped_column(Date)
    password: Mapped[str] = mapped_column(String)
    assign_doctor: Mapped[int] = mapped_column(ForeignKey("doctors.id"))
    is_active: Mapped[Boolean] = mapped_column(Boolean)

    appointments: Mapped["Appointment"] = relationship(
     "Appointment", back_populates="patient")

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "birth_date": self.birth_date,
            "is_active": self.is_active,
            "assign_doctor": self.assign_doctor
        }

class Doctor(db.Model):
    __tablename__ = "doctors"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True)
    first_name: Mapped[str] = mapped_column(String(255), nullable=False)
    last_name: Mapped[str] = mapped_column(String(255), nullable=False)
    specialty: Mapped[str] = mapped_column(String(80))
    center_id: Mapped[int] = mapped_column(Integer, ForeignKey(
        "centers.id", ondelete="SET NULL"), index=True)
    work_days: Mapped[int] = mapped_column(Integer)
    is_active: Mapped[bool] = mapped_column(Boolean)
    password: Mapped[str] = mapped_column(String(255))


    center: Mapped["Center"] = relationship("Center", back_populates="doctors")
    appointments: Mapped["Appointment"] = relationship(
        "Appointment", back_populates="doctor")
    
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "center_id": self.center_id,
            "work_days": self.work_days,
            "is_active": self.is_active,
        }

class Appointment(db.Model):
    __tablename__ = "appointments"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    doctor_id: Mapped[int] = mapped_column(Integer, ForeignKey(
        "doctors.id", ondelete="CASCADE"), nullable=False, index=True)
    patient_id: Mapped[int] = mapped_column(Integer, ForeignKey(
        "patients.id", ondelete="CASCADE"), nullable=False, index=True)
    center_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("centers.id", ondelete="SET NULL"), index=True)
    

    doctor: Mapped["Doctor"] = relationship(
        "Doctor", back_populates="appointments")
    patient: Mapped["Patient"] = relationship(
        "Patient", back_populates="appointments")
    center: Mapped["Center"] = relationship("Center")

def serialize(self):
        return {
            "id": self.id,
            "doctor_id": self.doctor_id,
            "patient_id": self.patient_id,
            "center_id": self.center_id,
        }

class Center(db.Model):
    __tablename__ = "centers"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    address: Mapped[str] = mapped_column(String(255))
    zip_code: Mapped[str] = mapped_column(String(30))
    phone: Mapped[int] = mapped_column(Integer)
    type_center: Mapped[str] = mapped_column(String(80))

    doctors: Mapped["Doctor"] = relationship(
        "Doctor", back_populates="center")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "address": self.address,
            "zip_code": self.zip_code,
            "phone": self.phone,
            "type_center": self.type_center,
        }