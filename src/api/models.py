from __future__ import annotations

from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


# ---- User -------------------------------------------------------------------
# Minimal User model so api/admin.py can `from .models import db, User`
class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    # store hashed password
    password = db.Column(db.String(255), nullable=False)
    is_active = db.Column(db.Boolean, nullable=False, default=True)

    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    def __repr__(self) -> str:  # pragma: no cover
        return f"<User {self.id} {self.email}>"

    def serialize(self) -> dict:
        return {
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active,
        }


# ---- Listing ----------------------------------------------------------------
# Lightweight Listing model; safe to have even if you’re not using it yet.
class Listing(db.Model):
    __tablename__ = "listings"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=True)
    street = db.Column(db.String(255), nullable=True)
    city = db.Column(db.String(120), nullable=True)
    state = db.Column(db.String(80), nullable=True)
    image_url = db.Column(db.String(1024), nullable=True)

    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    def __repr__(self) -> str:  # pragma: no cover
        return f"<Listing {self.id} {self.name or ''}>"

    def serialize(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "street": self.street,
            "city": self.city,
            "state": self.state,
            "image_url": self.image_url,
        }


# ---- Booking ----------------------------------------------------------------
# No phone/last4 anywhere. Dates & optional guest picture supported.
class Booking(db.Model):
    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key=True)

    # Google event UID
    google_calendar_id = db.Column(db.String(255), index=True, nullable=True)

    # Optional association to a listing (kept simple: no FK constraint required)
    listing_id = db.Column(db.Integer, nullable=True)

    # Optional guest names (manual)
    airbnb_guest_first_name = db.Column(db.String(120), nullable=True)
    airbnb_guest_last_name = db.Column(db.String(120), nullable=True)

    # Reservation dates
    airbnb_checkin = db.Column(db.DateTime, nullable=True)
    airbnb_checkout = db.Column(db.DateTime, nullable=True)

    # Reservation link (e.g., from calendar description)
    reservation_url = db.Column(db.String(1024), nullable=True)

    # Optional image per booking (if you save one later)
    airbnb_guestpic_url = db.Column(db.String(1024), nullable=True)

    # Bookkeeping
    needs_manual_details = db.Column(db.Boolean, nullable=False, default=True)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    def __repr__(self) -> str:  # pragma: no cover
        return f"<Booking {self.id} {self.google_calendar_id or ''}>"

    def serialize(self) -> dict:
        return {
            "id": self.id,
            "google_calendar_id": self.google_calendar_id,
            "listing_id": self.listing_id,
            "airbnb_guest_first_name": self.airbnb_guest_first_name,
            "airbnb_guest_last_name": self.airbnb_guest_last_name,
            "airbnb_checkin": self.airbnb_checkin.isoformat() if self.airbnb_checkin else None,
            "airbnb_checkout": self.airbnb_checkout.isoformat() if self.airbnb_checkout else None,
            "reservation_url": self.reservation_url,
            "airbnb_guestpic_url": self.airbnb_guestpic_url,
            "needs_manual_details": self.needs_manual_details,
        }
