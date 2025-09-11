from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory event storage for demonstration
EVENTS = [
    {
        "id": 1,
        "title": "Mock Music Festival",
        "date": "2025-09-15",
        "location": "Central Park",
        "description": "A fun outdoor music festival for all ages.",
        "rsvp": 42,
        "icon": "🎵",
    },
    {
        "id": 2,
        "title": "Tech Conference",
        "date": "2025-10-01",
        "location": "Convention Center",
        "description": "Join the latest in tech and innovation.",
        "rsvp": 87,
        "icon": "💻",
    },
    {
        "id": 3,
        "title": "Art Expo",
        "date": "2025-11-05",
        "location": "Art Gallery",
        "description": "Explore modern art from local artists.",
        "rsvp": 30,
        "icon": "🎨",
    },
]


@app.route("/api/events", methods=["GET", "POST"])
def events():
    if request.method == "POST":
        data = request.json
        event = {
            "id": len(EVENTS) + 1,
            "title": data.get("title"),
            "date": data.get("date"),
            "location": data.get("location"),
            "description": data.get("description"),
            "icon": data.get("icon", "🎉"),
            "rsvp": 0,
        }
        EVENTS.append(event)
        return jsonify(event), 201
    return jsonify(EVENTS)


@app.route("/api/events/<int:event_id>/rsvp", methods=["POST"])
def rsvp(event_id):
    for event in EVENTS:
        if event["id"] == event_id:
            event["rsvp"] += 1
            return jsonify({"message": "RSVP successful", "event": event})
    return jsonify({"error": "Event not found"}), 404


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3001, debug=True)
