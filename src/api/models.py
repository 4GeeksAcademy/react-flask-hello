from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer, ForeignKey, DateTime, Date, create_engine
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime, date
import bcrypt

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True)
    password: Mapped[str] = mapped_column(String)
    is_active: Mapped[Boolean] = mapped_column(Boolean)

    def serialize(self):
        return {
            "id": generete_id(),
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
    assign_doctor: Mapped[int] = mapped_column(ForeignKey("doctors.id"), nullable=True)
    is_active: Mapped[Boolean] = mapped_column(Boolean)

    appointments: Mapped[list["Appointment"]] = relationship(
     "Appointment", back_populates="patient")

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "birth_date": self.birth_date.strftime("%d-%m-%Y"),
            "is_active": self.is_active,
            "assign_doctor": self.assign_doctor
        }
    
    #Funcion para obtener todos los pacientes
    @staticmethod
    def all_patients():
        return Patient.query.all()
    
    #Funcion para crear un paciente
    @classmethod
    def create(cls, email, first_name, last_name, password, birth_date, assign_doctor):
        new_patient = cls(
            email =email,
            first_name =first_name,
            last_name =last_name,
            birth_date =birth_date,
            assign_doctor =assign_doctor,
            password=password,
            is_active = True
            )
        db.session.add(new_patient)
        db.session.commit()
        return new_patient
    
# Funcion para modificar ciertos parametros de la clase
    def update(self, email=None, password=None, assign_doctor=None):
        if email is not None:
            self.email = email

        if password is not None:
            self.password = password

        if assign_doctor is not None:
            self.assign_doctor = assign_doctor
        
        db.session.commit()
        return self.serialize()
    
    #Funcion para dejar inactivo a un paciente
    def soft_delete(self):
        self.is_active=False
        db.session.commit()
        return self.serialize()
    

class Doctor(db.Model):
    __tablename__ = "doctors"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True)
    first_name: Mapped[str] = mapped_column(String(255), nullable=False)
    last_name: Mapped[str] = mapped_column(String(255), nullable=False)
    specialty: Mapped[str] = mapped_column(String(80))
    center_id: Mapped[int] = mapped_column(Integer, ForeignKey(
        "centers.id", ondelete="SET NULL"), index=True, nullable=True)
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
            "specialty": self.specialty,
            "center_id": self.center_id,
            "work_days": self.work_days,
            "is_active": self.is_active,
        }
   
    @staticmethod
    def all_doctors():
        return Doctor.query.all()
    
    @classmethod
    def create(cls, email, first_name, last_name, password, specialty, center_id, work_days):
        new_doctor = cls(
            email =email,
            first_name =first_name,
            last_name =last_name,
            specialty =specialty,
            center_id =center_id,
            work_days=work_days,
            password=password,
            is_active = True
            )
        db.session.add(new_doctor)
        db.session.commit()
        return new_doctor
    

    def update(self, email=None, password=None, center_id=None, work_days=None):
        if email is not None:
            self.email = email
        if password is not None:
            self.password = password
        if work_days is not None:
            self.work_days = work_days
        if center_id is not None:
            self.center_id = center_id
        
        db.session.commit()
        return self.serialize()

    

class Appointment(db.Model):
    __tablename__ = "appointments"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    doctor_id: Mapped[int] = mapped_column(Integer, ForeignKey(
        "doctors.id"), nullable=False, index=True)
    patient_id: Mapped[int] = mapped_column(Integer, ForeignKey(
        "patients.id"), nullable=False, index=True)
    center_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("centers.id"), index=True)
    appointment_date: Mapped[datetime] = mapped_column(DateTime)
    status: Mapped[str] = mapped_column(String)

    doctor: Mapped["Doctor"] = relationship(
        "Doctor", back_populates="appointments")
    patient: Mapped["Patient"] = relationship(
        "Patient", back_populates="appointments")
    center: Mapped["Center"] = relationship("Center")

    def serialize(self) -> dict:
            return {
                "id": self.id,
                "doctor_id": self.doctor_id,
                "patient_id": self.patient_id,
                "center_id": self.center_id,
                "appointment_date": self.appointment_date.strptime("%d-%m-%Y %H:%M"),
                "medical_record": self.medical_record,
                "status": self.status
            }
    

    @classmethod
    def create(cls, doctor_id, patient_id, center_id, appointment_date, medical_record):
        new_appointment = cls(
            doctor_id=doctor_id,
            patient_id=patient_id,
            center_id=center_id,
            appointment_date=appointment_date,
            status="Pending"
        )
        db.session.add(new_appointment)
        db.session.commit()
        return new_appointment
    
    def update(self, appointment_date=None, medical_record=None, status=None):
        if appointment_date is not None:
            self.appointment_date = appointment_date

        if status is not None:
            self.status = status

        db.session.commit()
        return self
    
    def cancel(self):
        self.status = "Cancelled"
        db.session.commit()
        return self

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
    
    @classmethod
    def create(cls, name, address, zip_code, phone, type_center):
        new_center = cls(
            name=name,
            address=address,
            zip_code=zip_code,
            phone=phone,
            type_center=type_center
            )
        db.session.add(new_center)
        db.session.commit()
        return new_center