
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from api.database.db import db

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    username: Mapped[str] = mapped_column(String(120), nullable=False)
  


    def serialize(self):
        return {
           "id": self.id,
            "email": self.email,
             "username" :self.username
            # do not serialize the password, its a security breach
        }
    