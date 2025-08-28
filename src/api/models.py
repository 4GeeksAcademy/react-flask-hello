from __future__ import annotations

from datetime import date
from typing import List, Optional

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import (
    String, Boolean, LargeBinary, ForeignKey, Date, CheckConstraint
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    security_question: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    # Store raw JPEG bytes (nullable). If you prefer a URL/path, change to String(...)
    jpeg: Mapped[Optional[bytes]] = mapped_column(LargeBinary, nullable=True)

    # relationships
    listings: Mapped[List["Listing"]] = relationship(
        back_populates="owner",
        cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        return f"<User id={self.id} email={self.email!r}>"

    def serialize(self) -> dict:
        return {
            "id": self.id,
            "email": self.email,
            "security_question": self.security_question,
            # Do not include password or jpeg in API output
        }


class Listing(db.Model):
    __tablename__ = "listings"

    id: Mapped[int] = mapped_column(primary_key=True)

    # FK to User
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )

    # Optional pointer to a “current” booking (kept nullable to avoid cycles during creation)
    booking_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("bookings.id", use_alter=True, name="fk_listings_current_booking"),
        nullable=True
    )

    airbnb_address: Mapped[str] = mapped_column(String(255), nullable=False)
    airbnb_zipcode: Mapped[Optional[str]] = mapped_column(String(15), nullable=True)

    # relationships
    owner: Mapped["User"] = relationship(back_populates="listings")

    bookings: Mapped[List["Booking"]] = relationship(
        back_populates="listing",
        cascade="all, delete-orphan",
        passive_deletes=True
    )

    # “current” booking object corresponding to booking_id above
    current_booking: Mapped[Optional["Booking"]] = relationship(
        "Booking",
        foreign_keys="Listing.booking_id",
        post_update=True,
        viewonly=False,
        uselist=False,
    )

    def __repr__(self) -> str:
        return f"<Listing id={self.id} user_id={self.user_id}>"

    def serialize(self) -> dict:
        return {
            "id": self.id,
            "user_id": self.user_id,
            "booking_id": self.booking_id,
            "airbnb_address": self.airbnb_address,
            "airbnb_zipcode": self.airbnb_zipcode,
        }


class Booking(db.Model):
    __tablename__ = "bookings"

    id: Mapped[int] = mapped_column(primary_key=True)

    # A calendar event identifier (e.g., from Google Calendar)
    google_calendar_id: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)

    # FK to Listing (standard one-to-many: a Listing can have many Bookings)
    listing_id: Mapped[int] = mapped_column(
        ForeignKey("listings.id", ondelete="CASCADE"),
        nullable=False
    )

    airbnb_guest_first_name: Mapped[Optional[str]] = mapped_column(String(120), nullable=True)
    airbnb_checkin: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    airbnb_checkout: Mapped[Optional[date]] = mapped_column(Date, nullable=True)

    # Raw JPEG bytes for guest picture (nullable). Swap to String(...) if storing a URL/path.
    airbnb_guestpic: Mapped[Optional[bytes]] = mapped_column(LargeBinary, nullable=True)

    # Ensure checkout is not before checkin (only enforced when both present)
    __table_args__ = (
        CheckConstraint(
            "(airbnb_checkin IS NULL OR airbnb_checkout IS NULL) OR (airbnb_checkout >= airbnb_checkin)",
            name="ck_booking_checkout_after_checkin",
        ),
    )

    # relationships
    listing: Mapped["Listing"] = relationship(back_populates="bookings")

    def __repr__(self) -> str:
        return f"<Booking id={self.id} listing_id={self.listing_id}>"

    def serialize(self) -> dict:
        return {
            "id": self.id,
            "google_calendar_id": self.google_calendar_id,
            "listing_id": self.listing_id,
            "airbnb_guest_first_name": self.airbnb_guest_first_name,
            "airbnb_checkin": self.airbnb_checkin.isoformat() if self.airbnb_checkin else None,
            "airbnb_checkout": self.airbnb_checkout.isoformat() if self.airbnb_checkout else None,
            # Do not include airbnb_guestpic bytes in API output
        }
