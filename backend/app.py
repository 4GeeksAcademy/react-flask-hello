from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

EVENTBRITE_TOKEN = "FDIOJ3HFYP42QXSWQWHW"


@app.route("/api/public-events")
def public_events():
    lat = request.args.get("lat")
    lon = request.args.get("lon")
    url = (
        f"https://www.eventbriteapi.com/v3/events/search/"
        f"?location.latitude={lat}&location.longitude={lon}&token={EVENTBRITE_TOKEN}"
    )
    resp = requests.get(url)
    return jsonify(resp.json())


@app.route("/api/events")
def get_events():
    # Example: fetch events for a specific location (e.g., New York)
    lat = request.args.get("lat", "40.7128")
    lon = request.args.get("lon", "-74.0060")
    url = (
        f"https://www.eventbriteapi.com/v3/events/search/"
        f"?location.latitude={lat}&location.longitude={lon}&token={EVENTBRITE_TOKEN}"
    )
    resp = requests.get(url)
    return jsonify(resp.json())


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3001, debug=True)
