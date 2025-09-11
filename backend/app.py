from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

EVENTBRITE_TOKEN = "FDIOJ3HFYP42QXSWQWHW"


@app.route("/api/public-events")
def public_events():
    lat = request.args.get("lat")
    lon = request.args.get("lon")
    url = (
        f"https://www.eventbriteapi.com/v3/events/search/"
        f"?location.latitude={lat}&location.longitude={lon}&token={EVENTBRITE_TOKEN}"
        # need token for line 15, place in .env file
        # not pulling events from everbrite
        #everbrite token is to pull events from everbrite. so we can post new events and everbrite events
    )
    resp = requests.get(url)
    return jsonify(resp.json())


@app.route("/api/events") 
def get_events():
    lat = request.args.get("lat", "40.7128")  # Default: New York City
    lon = request.args.get("lon", "-74.0060")
    url = (
        f"https://www.eventbriteapi.com/v3/events/search/"
        f"?location.latitude={lat}&location.longitude={lon}&expand=venue&token={EVENTBRITE_TOKEN}"
    )
    resp = requests.get(url)
    if resp.status_code != 200:
        return jsonify({"error": "Failed to fetch events"}), 500

    data = resp.json()
    # Extract and format events for frontend
    events = []
    for e in data.get("events", []):
        events.append(
            {
                "id": e.get("id"),
                "title": e.get("name", {}).get("text"),
                "date": e.get("start", {}).get("local"),
                "location": e.get("venue", {}).get("address", {}).get(
                    "localized_address_display", "Unknown"
                ),
                "description": e.get("description", {}).get("text", "")[:120] + "...",
                "icon": "🎉",
                "rsvp": "?",  # Eventbrite doesn't provide RSVP count in search API
            }
        )
    return jsonify(events)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3001, debug=True)
