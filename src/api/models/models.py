from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import Integer
from sqlalchemy import Date, Float, String, ForeignKey, DateTime
from datetime import datetime


db = SQLAlchemy()


class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(nullable=False)
    lastname: Mapped[str] = mapped_column(nullable=False)
    dni: Mapped[str] = mapped_column(Integer, unique=True, nullable=False)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    rolId: Mapped[int] = mapped_column(
        Integer, default=2)  # rol id 2 => Agricultor

    def __init__(self, name, lastname, dni, email, password, rolId=2):

        self.name = name
        self.lastname = lastname
        self.dni = dni
        self.email = email
        self.set_password(password)
        self.rolId = rolId

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "rolId": self.rolId
            # do not serialize the password, its a security breach
        }


# MODELO DE PARCELA (Con serialize)
class Field(db.Model):
    __tablename__ = "fields"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100))

    area: Mapped[float] = mapped_column(Float)
    crop: Mapped[str] = mapped_column(String(100))
    sowing_date: Mapped[Date] = mapped_column(Date)

    street: Mapped[str] = mapped_column(String(100))
    number: Mapped[str] = mapped_column(String(10))
    postal_code: Mapped[str] = mapped_column(String(10))
    city: Mapped[str] = mapped_column(String(100))
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"), nullable=False)

    def serialize_field(self):
        return {
            "id": self.id,
            "name": self.name,
            "area": self.area,
            "crop": self.crop,
            "sowing_date": self.sowing_date.isoformat() if self.sowing_date else None,
            "street": self.street,
            "number": self.number,
            "postal_code": self.postal_code,
            "city": self.city,
            "user_id": self.user_id

        }

# MODELO DE IMAGEN (Con serialize)


class Image(db.Model):
    __tablename__ = "images"

    id: Mapped[int] = mapped_column(primary_key=True)
    file_name: Mapped[str] = mapped_column(String(255), nullable=False)
    url: Mapped[str] = mapped_column(String(500), nullable=False)
    upload_date: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow)

    field_id: Mapped[int] = mapped_column(
        ForeignKey("parcels.id"), nullable=False)

    def serialize_image(self):
        return {
            "id": self.id,
            "file_name": self.file_name,
            "url": self.url,
            "upload_date": self.upload_date.isoformat(),
            "field_id": self.field_id
        }

# MODELO DE INFORME (Con serialize)
# MODELO DE PRESUPUESTO (Con serialize)
