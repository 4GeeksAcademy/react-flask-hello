from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Text
from sqlalchemy.orm import Mapped, mapped_column

db = SQLAlchemy()


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
