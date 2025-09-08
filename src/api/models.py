from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

class ingredients(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    item: Mapped[str] = mapped_column(nullable=False)
    item: Mapped[str] = mapped_column(nullable=False)   
    item: Mapped[str] = mapped_column(nullable=False) 
    item: Mapped[str] = mapped_column(nullable=False)

class Custom(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    # "strIngredient1": "Tequila",whiskey,vodka,gin,bourben,brandy
    #         "strIngredient2": "Triple sec",agave,bitters,grand marnie,
    #       
    #         "strIngredient4": "Salt",sugar,,lemon,lime,pinapple,
    

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }