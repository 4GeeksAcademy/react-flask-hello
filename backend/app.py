import requests
from flask import Flask, request, jsonify

app = Flask(__name__)

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
    # Example: return a static list of events for testing
    events = [
        {
            "title": "Concert Night",
            "date": "Sep 10, 2025",
            "rsvp": 42,
            "icon": "🎵",
            "location": "Downtown Arena",
        },
        {
            "title": "Foodie Meetup",
            "date": "Sep 15, 2025",
            "rsvp": 28,
            "icon": "🍴",
            "location": "Central Park",
        },
        {
            "title": "Tech Hackathon",
            "date": "Sep 20, 2025",
            "rsvp": 65,
            "icon": "💻",
            "location": "Innovation Hub",
        },
    ]
    return jsonify(events)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3001, debug=True)
