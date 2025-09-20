from __future__ import annotations

import os
import re
import pytz
import requests
from datetime import datetime, timedelta
from flask import Blueprint, current_app, jsonify, request
from icalendar import Calendar

api = Blueprint("api", __name__)


def _env(name: str, default: str | None = None) -> str | None:
    return os.environ.get(name, default)


RESERVATIONS_ICS_URL = _env("RESERVATIONS_ICS_URL")
DEFAULT_TZ = _env("DEFAULT_TIMEZONE", "America/New_York")

# --- URL helpers -------------------------------------------------------------

RE_URL = re.compile(r"(https?://[^\s)]+)", re.I)

# Accept common image URL patterns (with or without file extension)
RE_EXT_IMAGE = re.compile(r"\.(?:png|jpe?g|webp|gif)(?:\?.*)?$", re.I)

# Google Drive link patterns
RE_DRIVE_FILE_VIEW = re.compile(
    r"https?://drive\.google\.com/file/d/([^/]+)/view(?:\?[^ ]*)?", re.I)
RE_DRIVE_OPEN = re.compile(
    r"https?://drive\.google\.com/open\?id=([^&]+)", re.I)
RE_DRIVE_UC = re.compile(
    r"https?://drive\.google\.com/uc\?(?:export=\w+&)?id=([^&]+)", re.I)


def to_direct_image_url(url: str) -> str:
    """
    Convert known providers (Google Drive) to a direct image URL.
    If it already looks like an image or a direct-drive link, return as-is/converted.
    """
    if not url:
        return url

    # Google Drive conversions
    m = RE_DRIVE_FILE_VIEW.search(url) or RE_DRIVE_OPEN.search(
        url) or RE_DRIVE_UC.search(url)
    if m:
        file_id = m.group(1)
        # Direct view endpoint that returns an image content-type
        return f"https://drive.google.com/uc?export=view&id={file_id}"

    # Otherwise, if it looks like a normal image (by extension), return as is
    if RE_EXT_IMAGE.search(url):
        return url

    # Fallback: return original (may still work if server responds with image content-type)
    return url

# --- Datetime helpers --------------------------------------------------------


def _to_tz(dt, tzname: str):
    tz = pytz.timezone(tzname)
    if isinstance(dt, datetime):
        if dt.tzinfo is None:
            return tz.localize(dt)
        return dt.astimezone(tz)
    return tz.localize(datetime(dt.year, dt.month, dt.day, 0, 0, 0))


def _fix_all_day_checkout(start, end):
    if isinstance(start, datetime) or isinstance(end, datetime):
        return end
    return end - timedelta(days=1)

# --- Image extraction --------------------------------------------------------


def _first_image_from_vevent(vevent) -> str | None:
    """
    Extract an image URL from an event via:
      1) ATTACH property (may be one or many)
      2) Any URL in DESCRIPTION (first match)
    For Google Drive links, convert to a direct-view URL.
    """
    # 1) ATTACH
    attach = vevent.get("attach")
    if attach:
        cands = attach if isinstance(attach, list) else [attach]
        for a in cands:
            url = to_direct_image_url(str(a))
            if url:
                return url

    # 2) DESCRIPTION scan for any URL
    desc = str(vevent.get("description") or "")
    m = RE_URL.search(desc)
    if m:
        return to_direct_image_url(m.group(1))

    return None

# --- Core ICS parsing --------------------------------------------------------


def _fetch_reserved_rows(tzname: str) -> list[dict]:
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
        # Only "Reserved ..." events; remove this if you want all events
        if "reserved" not in summary.lower():
            continue

        uid = str(component.get("uid") or "").strip()
        if not uid:
            continue

        dtstart = component.get("dtstart") and component.get("dtstart").dt
        dtend = component.get("dtend") and component.get("dtend").dt
        if not dtstart or not dtend:
            continue

        start_local = _to_tz(dtstart, tzname)
        end_local = _to_tz(dtend, tzname)

        checkout_display = end_local
        if not isinstance(dtstart, datetime) and not isinstance(dtend, datetime):
            checkout_display = _to_tz(
                _fix_all_day_checkout(dtstart, dtend), tzname)

        desc = str(component.get("description") or "")
        m_url = RE_URL.search(desc)
        reservation_url = m_url.group(1) if m_url else None

        image_url = _first_image_from_vevent(component)

        rows.append({
            "event": uid,                         # UID
            "title": summary.strip(),             # e.g., "Reserved - Andres"
            "checkin": start_local.isoformat(),
            "checkout": checkout_display.isoformat(),
            "reservation_url": reservation_url,
            "image": image_url,                   # now direct-view if it's a Drive link
        })

    rows.sort(key=lambda x: x["checkin"])
    return rows

# --- Route -------------------------------------------------------------------


@api.route("/calendar/reserved", methods=["GET"])
def calendar_reserved():
    tzname = request.args.get("tz") or DEFAULT_TZ
    try:
        rows = _fetch_reserved_rows(tzname)
        return jsonify(rows), 200
    except Exception as e:
        current_app.logger.exception("calendar_reserved failed: %s", e)
        return jsonify({"error": str(e)}), 500
