"""
API routes: auth, calendar (ICS) fetch, DB sync, and admin updates.

Environment (optional):
- RESERVATIONS_ICS_URL: ICS feed for your Airbnb→Google calendar.
- RESERVATIONS_LISTING_ID: default listing id for syncs (int).
"""

from __future__ import annotations

import os
import re
from datetime import datetime, date, timedelta, timezone
from zoneinfo import ZoneInfo
from typing import List, Dict, Any

import requests
from icalendar import Calendar
from flask import Blueprint, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from sqlalchemy import select

from api.models import db, User, Listing, Booking

api = Blueprint("api", __name__)
CORS(api, supports_credentials=True, origins="*")

# -----------------------------
# Auth endpoints (simple demo)
# -----------------------------


@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email")
    password = request.json.get("password")
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        return jsonify({"msg": "Bad email or password"}), 401
    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id": user.id})

@api.route('/reset-password', methods=['POST'])
def reset_password():
    # Expect JSON: { "email": "user@email.com", "new_password": "NewStrongPass123!" }
    data = request.get_json() or {}
    email = (data.get("email") or "").strip().lower()
    new_password = (data.get("new_password") or "").strip()

    if not email or not new_password:
        return jsonify({"error": "email_and_new_password_required"}), 400
    if len(new_password) < 8:
        return jsonify({"error": "password_too_short"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "user_not_found"}), 404

    
    user.password = generate_password_hash(new_password)     
    
    db.session.commit()
    return jsonify({"ok": True}), 200

@api.route("/signup", methods=["POST"])
def signup():
    email = request.json.get("email")
    password = request.json.get("password")
    favorite_pet = request.json.get("pet")

    existing_user = User.query.filter_by(email=email).first()
    if existing_user is not None:
        return jsonify({"msg": "User already exists"}), 409

    new_user = User(email=email, password=password, security_question=favorite_pet, is_active=True)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "User created successfully"}), 201


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email")
    password = request.json.get("password")
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        return jsonify({"msg": "Bad email or password"}), 401
    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id": user.id})


@api.route("/account", methods=["GET"])
@jwt_required()
def protect_account():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({"id": user.id, "email": user.email}), 200


@api.route("/preview", methods=["GET"])
@jwt_required()
def protect_preview():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({"id": user.id, "email": user.email}), 200


@api.route("/admin/users", methods=["GET"])
def list_all_users():
    """
    Get all users in the database. Requires authentication.
    Returns user info without sensitive data like passwords.
    """
    users = User.query.all()
    return jsonify({
        "total_users": len(users),
        "users": [user.serialize() for user in users]
    }), 200


@api.route("/hello", methods=["GET"])
def handle_hello():
    return jsonify({
        "message": "Hello! I'm a message that came from the backend. Check the network tab."
    }), 200

# -----------------------------------------
# Calendar (ICS) parsing + JSON exposure
# -----------------------------------------


ICS_URL = os.getenv(
    "RESERVATIONS_ICS_URL",
    # Fallback to your provided calendar ID
    "https://calendar.google.com/calendar/ical/"
    "r2jpg8uh13234dsjiducroruahlv7i2r%40import.calendar.google.com/public/basic.ics"
)

RE_URL = re.compile(r"Reservation URL:\s*(\S+)", re.I)
RE_LAST4 = re.compile(r"Phone Number.*?:\s*(\d{4})", re.I)


def _to_local_date(dt_obj, tz: ZoneInfo) -> date:
    """Normalize a datetime/date from ICS to local date in tz."""
    if isinstance(dt_obj, datetime):
        if dt_obj.tzinfo is None:
            dt_obj = dt_obj.replace(tzinfo=timezone.utc)
        return dt_obj.astimezone(tz).date()
    return dt_obj  # already a date


def _fetch_reserved_rows(tz_name: str = "America/New_York") -> List[Dict[str, Any]]:
    """Fetch 'Reserved' events from ICS and return rows with dates + extras."""
    tz = ZoneInfo(tz_name)
    resp = requests.get(ICS_URL, timeout=30)
    resp.raise_for_status()
    cal = Calendar.from_ical(resp.content)

    rows: List[Dict[str, Any]] = []

    for vevent in cal.walk("vevent"):
        summary = str(vevent.get("summary") or "")
        if "reserved" not in summary.lower():
            continue

        uid = str(vevent.get("uid") or "").strip()
        dtstart = vevent.get("dtstart")
        dtend = vevent.get("dtend")
        if not dtstart or not dtend:
            continue

        s_raw = dtstart.dt
        e_raw = dtend.dt

        # All-day if both are date objects (not datetimes)
        is_all_day = (
            isinstance(s_raw, date) and not isinstance(s_raw, datetime)
            and isinstance(e_raw, date) and not isinstance(e_raw, datetime)
        )

        checkin = _to_local_date(s_raw, tz)
        checkout = _to_local_date(e_raw, tz)
        if is_all_day:
            # ICS all-day DTEND is EXCLUSIVE → subtract 1 day
            checkout = checkout - timedelta(days=1)

        # Parse description for extra details
        desc = str(vevent.get("description") or "")
        m_url = RE_URL.search(desc)
        m_last4 = RE_LAST4.search(desc)

        rows.append({
            "uid": uid,
            "checkin": checkin.isoformat(),
            "checkout": checkout.isoformat(),
            "reservation_url": m_url.group(1) if m_url else None,
            "phone_last4": m_last4.group(1) if m_last4 else None,
        })

    rows.sort(key=lambda r: (r["checkin"], r["checkout"]))
    return rows


@api.route("/calendar/reserved", methods=["GET"])
def calendar_reserved():
    """
    Returns JSON [{uid, checkin, checkout, reservation_url, phone_last4}]
    Optional query: ?start=YYYY-MM-DD&end=YYYY-MM-DD&tz=America/New_York
    """
    tz = request.args.get("tz", "America/New_York")
    qstart = request.args.get("start")
    qend = request.args.get("end")

    rows = _fetch_reserved_rows(tz_name=tz)

    if qstart:
        s = date.fromisoformat(qstart)
        rows = [r for r in rows if date.fromisoformat(r["checkout"]) >= s]
    if qend:
        e = date.fromisoformat(qend)
        rows = [r for r in rows if date.fromisoformat(r["checkin"]) <= e]

    return jsonify(rows), 200

# ------------------------------------------------
# Admin: sync ICS rows into DB as Booking records
# ------------------------------------------------


@api.route("/admin/sync-reserved", methods=["POST"])
def sync_reserved_to_db():
    """
    Upsert ICS 'Reserved' rows into bookings for a listing.
    Accepts JSON or query param: { "listing_id": 1 }
    Uses env RESERVATIONS_LISTING_ID if not provided.
    """
    listing_id = None
    if request.is_json:
        listing_id = request.json.get("listing_id")
    if not listing_id:
        listing_id = request.args.get(
            "listing_id") or os.getenv("RESERVATIONS_LISTING_ID")

    if not listing_id:
        return jsonify({"error": "listing_id required"}), 400

    try:
        listing_id = int(listing_id)
    except Exception:
        return jsonify({"error": "listing_id must be an integer"}), 400

    # Ensure listing exists
    if not db.session.get(Listing, listing_id):
        return jsonify({"error": f"listing_id {listing_id} not found"}), 404

    rows = _fetch_reserved_rows()
    created = updated = 0

    for r in rows:
        uid = r["uid"]
        ci = date.fromisoformat(r["checkin"])
        co = date.fromisoformat(r["checkout"])

        booking = db.session.execute(
            select(Booking).where(
                Booking.listing_id == listing_id,
                Booking.google_calendar_id == uid
            )
        ).scalar_one_or_none()

        if booking is None:
            booking = Booking(
                listing_id=listing_id,
                google_calendar_id=uid,
                needs_manual_details=True
            )
            db.session.add(booking)
            created += 1
        else:
            updated += 1

        booking.airbnb_checkin = ci
        booking.airbnb_checkout = co
        booking.reservation_url = r.get("reservation_url")
        booking.phone_last4 = r.get("phone_last4")

    db.session.commit()
    return jsonify({"ok": True, "created": created, "updated": updated}), 200

# ------------------------------------------------
# Admin: manually punch guest names and profile pic
# ------------------------------------------------


@api.route("/admin/bookings/<int:booking_id>", methods=["PATCH"])
def admin_update_booking(booking_id: int):
    b = db.session.get(Booking, booking_id)
    if not b:
        return jsonify({"error": "not found"}), 404

    data = request.get_json(silent=True) or {}
    if "first_name" in data:
        b.airbnb_guest_first_name = (data["first_name"] or "").strip() or None
    if "last_name" in data:
        b.airbnb_guest_last_name = (data["last_name"] or "").strip() or None
    if "guestpic_url" in data:
        b.airbnb_guestpic_url = (data["guestpic_url"] or "").strip() or None
    if "listing_id" in data:
        try:
            new_listing_id = int(data["listing_id"])
            if db.session.get(Listing, new_listing_id):
                b.listing_id = new_listing_id
        except Exception:
            pass

    # Mark complete if both names are present (tweak rule as desired)
    if b.airbnb_guest_first_name and b.airbnb_guest_last_name:
        b.needs_manual_details = False

    db.session.commit()
    return jsonify(b.serialize()), 200

# -----------------------------
# Public bookings read API
# -----------------------------


@api.route("/bookings", methods=["GET"])
def list_bookings():
    """
    Optional filters:
      ?listing_id=1
      ?start=YYYY-MM-DD   (returns bookings whose checkout >= start)
      ?end=YYYY-MM-DD     (returns bookings whose checkin  <= end)
    """
    q = select(Booking)
    listing_id = request.args.get("listing_id")
    start = request.args.get("start")
    end = request.args.get("end")

    if listing_id:
        try:
            q = q.where(Booking.listing_id == int(listing_id))
        except Exception:
            return jsonify({"error": "listing_id must be an integer"}), 400
    if start:
        s = date.fromisoformat(start)
        q = q.where(Booking.airbnb_checkout >= s)
    if end:
        e = date.fromisoformat(end)
        q = q.where(Booking.airbnb_checkin <= e)

    items = db.session.execute(q).scalars().all()
    return jsonify([b.serialize() for b in items]), 200
# -----------------------------
# Restaurant endpoints
# -----------------------------


@api.route("/restaurants/nearby", methods=["GET"])
def get_nearby_restaurants():
    """Get nearby restaurants using Yelp API"""
    latitude = request.args.get('latitude')
    longitude = request.args.get('longitude')
    radius = request.args.get('radius', 5000)  # Default 5km radius

    if not latitude or not longitude:
        return jsonify({"error": "Latitude and longitude are required"}), 400

    yelp_api_key = os.getenv('YELP_API_KEY')
    if not yelp_api_key:
        return jsonify({"error": "Yelp API key not configured"}), 500

    headers = {
        'Authorization': f'Bearer {yelp_api_key}',
    }

    params = {
        'latitude': latitude,
        'longitude': longitude,
        'radius': radius,
        'categories': 'restaurants',
        'limit': 5,
        'sort_by': 'distance'
    }

    try:
        response = requests.get(
            'https://api.yelp.com/v3/businesses/search',
            headers=headers,
            params=params
        )

        if response.status_code == 200:
            data = response.json()
            return jsonify(data), 200
        else:
            return jsonify({"error": "Failed to fetch restaurants"}), response.status_code

    except Exception as e:
        return jsonify({"error": str(e)}), 500
