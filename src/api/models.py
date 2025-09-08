from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

db = SQLAlchemy()


class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    name: Mapped[str] = mapped_column(String(120), nullable=False, unique=False)
    age: Mapped[int] = mapped_column(nullable=False, unique=False)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "age": self.age
            # do not serialize the password, its a security breach
        }

class Favorites(db.Model):
    __tablename__ = "favorites"
    id: Mapped[int] = mapped_column(primary_key=True)
    # add issue to convert user to a foreign key 
    user: Mapped[str] = mapped_column(String(50), unique=False, nullable=True)
    show = relationship("Show",backref="favorites")

    def serialize(self):
        return {
            "id": self.id,
            "user":self.user,
            "show": [item.showTitle for item in self.show] 
         }

class Show(db.Model):
    __tablename__ = "show"
    id: Mapped[int] = mapped_column(primary_key=True)
    showTitle: Mapped[str] = mapped_column(String(50), unique=False, nullable=True)
    favorites_id: Mapped[int] = mapped_column(ForeignKey("favorites.id")) 


    def serialize(self):
        return {
            "id": self.id,
            "showTitle": self.showTitle,
            "favorites_id": self.favorites_id
            }
    


    # season model needed

    # class Season(db.Model):
    # __tablename__ = "show"
    # id: Mapped[int] = mapped_column(primary_key=True)
    # showTitle: Mapped[str] = mapped_column(String(50), unique=False, nullable=True)
    # favorites_id: Mapped[int] = mapped_column(ForeignKey("favorites.id")) 


    # def serialize(self):
    #     return {
    #         "id": self.id,
    #         "showTitle": self.showTitle,
    #         "favorites_id": self.favorites_id
    #         }