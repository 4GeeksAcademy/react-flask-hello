from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Text
from sqlalchemy.orm import Mapped, mapped_column

db = SQLAlchemy()


class CTAdmin(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    _password: Mapped[str] = mapped_column(
        "password", String(128), nullable=False)

    @property
    def password(self):
        raise AttributeError('Password is not a readable attribute.')

    @password.setter
    def password(self, password):
        from app import bcrypt
        self._password = bcrypt.generate_password_hash(
            password).decode('utf-8')

    # Método para verificar el password
    def check_password(self, password):
        from app import bcrypt
        return bcrypt.check_password_hash(self._password, password)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email
        }


class Lead(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(
        String(120), unique=False, nullable=False)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    phone: Mapped[str] = mapped_column(String(15), unique=True, nullable=False)
    company: Mapped[str] = mapped_column(
        String(50), unique=False, nullable=True)
    message: Mapped[str] = mapped_column(Text, nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "company": self.company,
            "message": self.message
        }


class TokenBlockedList(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    jti: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)

    def __repr__(self):
        return f'<CTAdmin {self.email}>'
