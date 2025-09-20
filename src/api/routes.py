from __future__ import annotations

import os
import re
import json
import pytz
import requests
from datetime import datetime, timedelta
from flask import Blueprint, current_app, jsonify, request
from icalendar import Calendar

# If you’re using SQLAlchemy elsewhere in your app, you can import the db and models,
# but nothing in this ICS endpoint requires the database.
# from models import db, Booking

api = Blueprint("api", __name__)

# ---- Config helpers ---------------------------------------------------------


def _env(name: str, default: str | None = None) -> str | None:
    return os.environ.get(name, default)


# Public ICS URL to your calendar (from your .env)
RESERVATIONS_ICS_URL = _env("RESERVATIONS_ICS_URL")
DEFAULT_TZ = _env("DEFAULT_TIMEZONE", "America/New_York")

# ---- Regex helpers ----------------------------------------------------------

RE_URL = re.compile(r"(https?://[^\s)]+)", re.I)
RE_IMG = re.compile(r"(https?://\S+\.(?:png|jpe?g|webp|gif))", re.I)

# ---- Datetime helpers -------------------------------------------------------


def _to_tz(dt, tzname: str):
    """Convert a date/datetime (possibly naive) to target tz, return date-only events as date boundaries."""
    tz = pytz.timezone(tzname)
    if isinstance(dt, datetime):
        if dt.tzinfo is None:
            return tz.localize(dt)
        return dt.astimezone(tz)
    # All-day date comes in as date; interpret as midnight in target tz
    return tz.localize(datetime(dt.year, dt.month, dt.day, 0, 0, 0))


def _fix_all_day_checkout(start, end):
    """
    Google all-day events in ICS export set DTEND to the day AFTER the event ends (exclusive).
    For “nights” style reservations, we show checkout as end - 1 day.
    Only apply when the event is all-day.
    """
    if isinstance(start, datetime) or isinstance(end, datetime):
        return end  # not an all-day event
    # both are date → subtract one day for display
    return end - timedelta(days=1)

# ---- Image extraction -------------------------------------------------------


def _first_image_from_vevent(vevent) -> str | None:
    """
    Try to extract an image URL from ICS:
      1) ATTACH: lines (one or many)
      2) Any image-looking URL inside DESCRIPTION
    Note: Public Google Calendar ICS often omits file attachments; this is best-effort only.
    """
    attach = vevent.get("attach")
    if attach:
        cands = attach if isinstance(attach, list) else [attach]
        for a in cands:
            url = str(a)
            if RE_IMG.search(url):
                return url

    desc = str(vevent.get("description") or "")
    m_img = RE_IMG.search(desc)
    if m_img:
        return m_img.group(1)
    return None

# ---- ICS parsing core -------------------------------------------------------


def _fetch_reserved_rows(tzname: str) -> list[dict]:
    """
    Download the ICS feed and return a list of dicts with:
      { event, checkin, checkout, reservation_url, image }
    """
    if not RESERVATIONS_ICS_URL:
        raise RuntimeError("RESERVATIONS_ICS_URL is not configured")

    r = requests.get(RESERVATIONS_ICS_URL, timeout=20)
    r.raise_for_status()
    cal = Calendar.from_ical(r.content)

    rows: list[dict] = []
    for component in cal.walk():
        if component.name != "VEVENT":
            continue

        summary = str(component.get("summary") or "")
        # Only include events that look like reservations.
        # If you want ALL events, remove this filter.
        if "reserved" not in summary.lower():
            continue

        uid = str(component.get("uid") or "").strip()
        if not uid:
            continue

        dtstart = component.get("dtstart") and component.get("dtstart").dt
        dtend = component.get("dtend") and component.get("dtend").dt
        if not dtstart or not dtend:
            continue

        # Normalize to the requested tz
        start_local = _to_tz(dtstart, tzname)
        end_local = _to_tz(dtend, tzname)

        # If it’s an all-day event, fix the exclusive DTEND → display checkout = end - 1 day
        checkout_display = end_local
        if not isinstance(dtstart, datetime) and not isinstance(dtend, datetime):
            checkout_display = _to_tz(
                _fix_all_day_checkout(dtstart, dtend), tzname)

        # Parse description for a URL (Airbnb/confirmation/etc.)
        desc = str(component.get("description") or "")
        m_url = RE_URL.search(desc)
        reservation_url = m_url.group(1) if m_url else None

        # Best-effort image
        image_url = _first_image_from_vevent(component)

        rows.append({
            "event": uid,                               # event uid
            "checkin": start_local.isoformat(),         # start
            "checkout": checkout_display.isoformat(),   # end (fixed for all-day)
            "reservation_url": reservation_url,         # link, if present
            # best-effort ATTACH or img URL in description
            "image": image_url,
        })

    rows.sort(key=lambda x: x["checkin"])
    return rows

# ---- Routes ----------------------------------------------------------------


@api.route("/api/calendar/reserved", methods=["GET"])
def calendar_reserved():
    """
    Public: read from public ICS and return normalized reservations.
    Query params:
      - tz=America/New_York (optional)
    """
    tzname = request.args.get("tz") or DEFAULT_TZ
    try:
        rows = _fetch_reserved_rows(tzname)
        return jsonify(rows), 200
    except Exception as e:
        current_app.logger.exception("calendar_reserved failed: %s", e)
        return jsonify({"error": str(e)}), 500
