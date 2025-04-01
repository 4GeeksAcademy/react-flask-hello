from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, DateTime, Float, Enum, Date, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship, ForeignKey
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import date
from datetime import datetime
from typing import List
import enum

db = SQLAlchemy()

# Por ahora 10 Tablas, 01/04/2025 => 8/10
class User(db.Model):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(256), nullable=False)
    registration_date: Mapped[datetime] = mapped_column(
        DateTime(), default=datetime.now, nullable=False)

    # Relaciones
    general_data = relationship("GeneralData", back_populates="user")
    emergency_contacts = relationship(
        "EmergencyContact", back_populates="user")
    medical_history = relationship("MedicalHistory", back_populates="user")
    weight_history: Mapped[List["Weight"]
                           ] = relationship(back_populates="user")
    height_history: Mapped[List["Height"]
                           ] = relationship(back_populates="user")
    pulse_history: Mapped[List["Pulse"]
                          ] = relationship(back_populates="user")
    blood_pressure_history: Mapped[List["BloodPressure"]] = relationship(
        back_populates="user")

    # Constructor para la clase User que inicializa con email y password

    def __init__(self, email, password):
        self.email = email
        self.set_password(password)

    # Método para establecer la contraseña (hasheada)
    def set_password(self, password):
        self.password = generate_password_hash(password)

    # Método para verificar si una contraseña coincide con el hash almacenado
    def check_password(self, password):
        return check_password_hash(self.password, password)

    def serialize_user(self):

        return {
            "id": self.id,
            "email": self.email,
            "registration_date": self.registration_date.isoformat(),
        }


class Gender (enum.Enum):

    # Enumeraciones para los campos con opciones fijas
    # Tomar en cuenta en el frontend que los inputs del select, sean exactamente iguales que los que están en los "Enum"
    # Opciones de Generos
    GENDER_MALE = "M"
    GENDER_FEMALE = "F"
    GENDER_OTHER = "O"


class BloodType (enum.Enum):

    # Tipos de sangre
    BLOOD_A_POSITIVE = "A+"
    BLOOD_A_NEGATIVE = "A-"
    BLOOD_B_POSITIVE = "B+"
    BLOOD_B_NEGATIVE = "B-"
    BLOOD_AB_POSITIVE = "AB+"
    BLOOD_AB_NEGATIVE = "AB-"
    BLOOD_O_POSITIVE = "O+"
    BLOOD_O_NEGATIVE = "O-"


class DietaryPreferences (enum.Enum):

    # Preferencias alimenticias
    DIET_VEGETARIAN = "Vegetariano"
    DIET_VEGAN = "Vegano"
    DIET_OTHER = "Otro"


class PhysicalActivity (enum.Enum):

    # Actividad Fisica
    ACTIVITY_SEDENTARY = "Sedentario"
    ACTIVITY_LIGHT = "Leve"
    ACTIVITY_MODERATE = "Moderado"
    ACTIVITY_INTENSE = "Intenso"
    ACTIVITY_ATHLETE = "Atleta"


class GeneralData(db.Model):
    __tablename__ = 'general_data'

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'), unique=True)
    name: Mapped[str] = mapped_column(String(50), nullable=False)
    birth_date: Mapped[date] = mapped_column(Date, nullable=False)
    phone: Mapped[str] = mapped_column(String(20), nullable=True)
    last_weight: Mapped[float] = mapped_column(
        Float(precision=2), nullable=True)
    last_height: Mapped[float] = mapped_column(
        Float(precision=2), nullable=True)
    BMI:  Mapped[float] = mapped_column(Float(precision=2), nullable=True)
    gender: Mapped[Gender] = mapped_column(
        Enum(Gender, name="gender_enum"), nullable=False)
    blood_type: Mapped[BloodType] = mapped_column(
        Enum(BloodType, name="blood_type_enum"), nullable=True)
    dietary_preferences: Mapped[DietaryPreferences] = mapped_column(
        Enum(DietaryPreferences, name="dietary_preference_enum"), nullable=True)
    physical_activity: Mapped[PhysicalActivity] = mapped_column(
        Enum(PhysicalActivity, name="activity_level_enum"), nullable=True)

    # Relación con el usuario
    user = relationship("User", back_populates="general_data")

    def serialize_general_data(self):

        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'birth_date': self.birth_date.isoformat(),
            'phone': self.phone,
            'last_weight': self.last_weight,
            'last_height': self.last_height,
            'BMI': self.BMI,
            'gender': self.gender.value if self.gender else None,
            'blood_type': self.blood_type.value if self.blood_type else None,
            'dietary_preferences': self.dietary_preferences.value if self.dietary_preferences else None,
            'physical_activity': self.physical_activity.value if self.physical_activity else None,
        }


class EmergencyContact(db.Model):
    __tablename__ = 'emergency_contacts'

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey('users.id'), nullable=False)
    first_name_contact: Mapped[str] = mapped_column(
        String(100), nullable=False)
    last_name_contact: Mapped[str] = mapped_column(String(100), nullable=False)
    relationship_type: Mapped[str] = mapped_column(String(50), nullable=False)
    phone_contact: Mapped[str] = mapped_column(String(20), nullable=False)
    email_contact: Mapped[str] = mapped_column(String(100), nullable=False)

    # Relación con el usuario
    user = relationship(
        "User", back_populates="emergency_contacts")

    def serialize_emergency_contacts(self):

        return {
            'id': self.id,
            'user_id': self.user_id,
            'first_name_contact': self.first_name_contact,
            'last_name_contact': self.last_name_contact,
            'relationship_type': self.relationship_type,
            'phone_contact': self.phone_contact,
            'email_contact': self.email_contact
        }


class MedicalHistory(db.Model):
    __tablename__ = 'medical_history'

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey('users.id'), nullable=False)
    registration_date:  Mapped[datetime] = mapped_column(
        DateTime, default=datetime.now, nullable=False)
    kinship: Mapped[str] = mapped_column(
        String(50), nullable=False)  # parentesco(Madre-Padre)
    disease: Mapped[str] = mapped_column(
        String(150), nullable=False)  # enfermedad

    # Relación con el usuario
    user = relationship(
        "User", back_populates="medical_history")

    def serialize_medical_history(self):

        return {
            'id': self.id,
            'user_id': self.user_id,
            'registration_date': self.registration_date.isoformat(),
            'kinship': self.kinship,
            'disease': self.disease
        }


class Weight(db.Model):
    __tablename__ = 'weight'

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey('users.id'), nullable=False)
    registration_date:  Mapped[datetime] = mapped_column(
        DateTime, default=datetime.now, nullable=False)
    weight: Mapped[float] = mapped_column(Float(precision=2), nullable=False)

    # Relación con el usuario
    user = relationship("User", back_populates="weight_history")

    def serialize_weight(self):

        return {
            'id': self.id,
            'user_id': self.user_id,
            'registration_date': self.registration_date.isoformat(),
            'weight': self.weight
        }


class Height(db.Model):
    __tablename__ = 'height'

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey('users.id'), nullable=False)
    registration_date:  Mapped[datetime] = mapped_column(
        DateTime, default=datetime.now, nullable=False)
    height: Mapped[float] = mapped_column(Float(precision=2), nullable=False)

    # Relacion con el Usuario
    user = relationship("User", back_populates="height_history")

    def serialize_height(self):

        return {
            'id': self.id,
            'user_id': self.user_id,
            'registration_date': self.registration_date.isoformat(),
            'height': self.height
        }


class Pulse(db.Model):
    __tablename__ = 'pulse'

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey('users.id'), nullable=False)
    registration_date: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.now)
    pulse: Mapped[int] = mapped_column(Integer, nullable=False)

    # Relationship
    user = relationship("User", back_populates="pulse_history")

    def serialize_pulse(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'registration_date': self.registration_date.isoformat(),
            'pulse': self.pulse
        }


class BloodPressure(db.Model):
    __tablename__ = 'blood_pressure'

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey('users.id'), nullable=False)
    registration_date: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.now)
    systolic: Mapped[int] = mapped_column(Integer, nullable=False)  # Sistólica
    diastolic: Mapped[int] = mapped_column(
        Integer, nullable=False)  # Diastólica

    # Relacion con Usuario
    user = relationship("User", back_populates="blood_pressure_history")

    def serialize_blood_pressure(self):

        return {
            'id': self.id,
            'user_id': self.user_id,
            'registration_date': self.registration_date.isoformat(),
            'systolic': self.systolic,
            'diastolic': self.diastolic
        }
