from __future__ import annotations

from datetime import date
from typing import List, Optional

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import (
    String,
    Boolean,
    LargeBinary,
    ForeignKey,
    Date,
    CheckConstraint,
    UniqueConstraint,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    is_active: Mapped[bool] = mapped_column(
        Boolean, default=True, nullable=False)
    security_question: Mapped[Optional[str]] = mapped_column(
        String(255), nullable=True)
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
        }


class Listing(db.Model):
    __tablename__ = "listings"

    id: Mapped[int] = mapped_column(primary_key=True)

    # FK to User
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )

    # Optional pointer to a "current" booking (nullable)
    booking_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("bookings.id", use_alter=True,
                   name="fk_listings_current_booking"),
        nullable=True
    )

    airbnb_address: Mapped[str] = mapped_column(String(255), nullable=False)
    airbnb_zipcode: Mapped[Optional[str]] = mapped_column(
        String(15), nullable=True)

    # relationships
    owner: Mapped["User"] = relationship(back_populates="listings")

    bookings: Mapped[List["Booking"]] = relationship(
        back_populates="listing",
        foreign_keys="[Booking.listing_id]",
        cascade="all, delete-orphan",
        passive_deletes=True
    )

    # "current" booking object corresponding to booking_id above
    current_booking: Mapped[Optional["Booking"]] = relationship(
        "Booking",
        foreign_keys="[Listing.booking_id]",
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

    # A calendar event identifier (UID from Google/ICS)
    google_calendar_id: Mapped[Optional[str]] = mapped_column(
        String(255), nullable=True, index=True)

    # FK to Listing (standard one-to-many: a Listing can have many Bookings)
    listing_id: Mapped[int] = mapped_column(
        ForeignKey("listings.id", ondelete="CASCADE"),
        nullable=False
    )

    # Guest info (you'll punch these in from Airbnb)
    airbnb_guest_first_name: Mapped[Optional[str]
                                    ] = mapped_column(String(120), nullable=True)
    airbnb_guest_last_name:  Mapped[Optional[str]
                                    ] = mapped_column(String(120), nullable=True)

    airbnb_checkin: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    airbnb_checkout: Mapped[Optional[date]
                            ] = mapped_column(Date, nullable=True)

    # If you copy the Airbnb profile image URL instead of raw bytes:
    airbnb_guestpic_url: Mapped[Optional[str]
                                ] = mapped_column(String(500), nullable=True)

    # Raw JPEG bytes for guest picture (nullable). Keep if you later upload bytes.
    airbnb_guestpic: Mapped[Optional[bytes]] = mapped_column(
        LargeBinary, nullable=True)

    # Extras we can parse from ICS description now
    reservation_url: Mapped[Optional[str]] = mapped_column(
        String(500), nullable=True)
    phone_last4:     Mapped[Optional[str]] = mapped_column(
        String(4), nullable=True)

    # Flag to show which rows still need manual guest details
    needs_manual_details: Mapped[bool] = mapped_column(
        Boolean, default=True, nullable=False)

    # relationships
    listing: Mapped["Listing"] = relationship(
        back_populates="bookings",
        foreign_keys="[Booking.listing_id]"
    )

    __table_args__ = (
        CheckConstraint(
            "(airbnb_checkin IS NULL OR airbnb_checkout IS NULL) OR (airbnb_checkout >= airbnb_checkin)",
            name="ck_booking_checkout_after_checkin",
        ),
        UniqueConstraint("listing_id", "google_calendar_id",
                         name="uq_booking_listing_googleid"),
    )

    def __repr__(self) -> str:
        return f"<Booking id={self.id} listing_id={self.listing_id}>"

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
            "phone_last4": self.phone_last4,
            "airbnb_guestpic_url": self.airbnb_guestpic_url,
            "needs_manual_details": self.needs_manual_details,
        }
