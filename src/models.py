from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer, ForeignKey, Date, create_engine
from sqlalchemy.orm import Mapped, mapped_column, relationship

engine = create_engine('sqlite:///my_database.db')

db = SQLAlchemy()

# -----------------------
# Models
# -----------------------

class User(db.Model):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    first_name: Mapped[str] = mapped_column(String(255), nullable=False)
    last_name: Mapped[str] = mapped_column(String(255), nullable=False)
    birth_date: Mapped[Date] = mapped_column(Date)
    email: Mapped[str] = mapped_column(String(255), unique=True)
    doctor_id: Mapped[int] = mapped_column(Integer)
    patient_id: Mapped[str] = mapped_column(Integer)

    doctors: Mapped["Doctor"] = relationship("Doctor")
    patients: Mapped["Patient"] = relationship("Patient")

    def __repr__(self):
        return f"<User id={self.id} name={self.email}>"


class Center(db.Model):
    __tablename__ = "centers"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    address: Mapped[str] = mapped_column(String(512))
    zip_code: Mapped[str] = mapped_column(String(30))
    phone: Mapped[int] = mapped_column(Integer)
    type_center: Mapped[str] = mapped_column(String(80))

    doctors: Mapped["Doctor"] = relationship(
        "Doctor", back_populates="center", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Center id={self.id} name={self.name}>"


class Doctor(db.Model):
    __tablename__ = "doctors"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    center_id: Mapped[int] = mapped_column(Integer, ForeignKey(
        "centers.id", ondelete="SET NULL"), index=True)
    work_days: Mapped[int] = mapped_column(Integer)
    active: Mapped[bool] = mapped_column(Boolean)


    center: Mapped["Center"] = relationship("Center", back_populates="doctors")
    appointments: Mapped["Appointment"] = relationship(
        "Appointment", back_populates="doctor", cascade="all, delete-orphan")
    patients: Mapped["Patient"] = relationship("Patient")

    def __repr__(self):
        return f"<Doctor id={self.id} center_id={self.center_id} agenda={self.agenda}>"


class Patient(db.Model):
    __tablename__ = "patients"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    assign_doctor: Mapped[int] = mapped_column(ForeignKey=("doctors.id"))    
    

    appointments: Mapped["Appointment"] = relationship(
        "Appointment", back_populates="patient", cascade="all, delete-orphan")
    doctors: Mapped["Doctor"] = relationship(
        "Doctor", back_populates="patient", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Patient id={self.id}"


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
    

    def __repr__(self):
        return f"<Appointment id={self.id} doctor={self.doctor_id} patient={self.patient_id} start={self.slot_start}>"




