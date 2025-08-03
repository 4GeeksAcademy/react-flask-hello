from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Text, Float, ForeignKey, DateTime
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from typing import List, Optional
from datetime import datetime
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    purchases: Mapped[List["Purchase"]] = relationship(back_populates="user")



    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            
        }
    

class Artist(db.Model):
    __tablename__ = "artist"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    genere: Mapped[Optional[str]] = mapped_column(String(120))
    social_link: Mapped[Optional[str]] = mapped_column(String(255))


    events: Mapped[List["Event"]] = relationship(back_populates="artist")

    

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "genere": self.genere,
            "social_link":self.social_link,
            "events": [event.serialize() for event in self.events]

        }


class Event(db.Model):
    __tablename__ = "event"
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(120), nullable=False)
    date: Mapped[str] = mapped_column(String(50), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text)
    location: Mapped[Optional[str]] = mapped_column(String(255))
    lat: Mapped[Optional[float]] = mapped_column(Float)
    lng: Mapped[Optional[float]] = mapped_column(Float)
    artist_id: Mapped[Optional[int]] = mapped_column(ForeignKey("artist.id"))

    artist = relationship("Artist", back_populates="events")
    purchases: Mapped[List["Purchase"]] = relationship(back_populates="event")

    def serialize(self):
        return {
            "id":  self.id,
            "title": self.title,
            "date": self.date,
            "description": self.description,
            "location": self.location,
            "lat": self.lat,
            "lng": self.lng,
            "artist_id": self.artist_id
        }


class Purchase(db.Model):
    __tablename__ = "purchase"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
    event_id: Mapped[int] = mapped_column(ForeignKey("event.id"), nullable=False)
    quantity: Mapped[int] = mapped_column(nullable=False, default=1)
    timestamp: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user: Mapped["User"] = relationship(back_populates="purchases")
    event: Mapped["Event"] = relationship(back_populates="purchases")

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "event_id": self.event_id,
            "quantity": self.quantity,
            "timestamp": self.timestamp

        }
    
class CartItem (db.Model):
    __tablename__ ="cart_item"

    id : Mapped[int] = mapped_column(primary_key=True)
    user_id : Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
    event_id : Mapped[int] = mapped_column(ForeignKey("event.id"), nullable=False)
    quantity : Mapped[int] = mapped_column(nullable=False)

    user: Mapped["User"] = relationship("User", backref="cart_items")
    event: Mapped["Event"] = relationship()

    def serialize (self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "event_id": self.event_id,
            "quantity": self.quantity,
        }

