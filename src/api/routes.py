"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import requests
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
# ==>> loads the environment variables from the .env file, pip install python-dotenv
from dotenv import load_dotenv
from werkzeug.security import check_password_hash, generate_password_hash
# ==>> this is used to create a JWT token for the user, pip install flask-jwt-extended
from flask_jwt_extended import create_access_token, decode_token
from datetime import timedelta


load_dotenv()    # reads .env and sets those variables into your environment
FRONTEND_URL = os.getenv("FRONTEND_URL")
if not FRONTEND_URL:
    raise RuntimeError("Missing required env var: FRONTEND_URL")

# db and User → for querying the database.
# check_password_hash → for checking if the password is correct.
# create_access_token → for making a token.

# ==>>a collection of routes, error handlers, etc., that you group together in one file (here, api/routes.py).
api = Blueprint('api', __name__)

# Allow CORS requests to this API
# ==>> you can talk to your flask endpoins whithout the browser blocking the request.
CORS(api)


# ==>> this is the endpoint that will be called from the front end
# ==>> Search Places by coordinates: Accepts E.G: { latitude: 40.75, longitude: -73.99, cocktail: "Mojito" }
@api.route('/places', methods=['POST'])
def get_places_of_drinks():

    # ==>> get the google api key from the environment variables
    GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
    
    # ==>>Looks at the body of the incoming HTTP request and it parses the JSON text and returns a Python dict (or list) representing that JSON.
    data = request.get_json()

    if not isinstance(data, dict):  # ==>> check if the data is a dictionary
        # ==>> if the data is not a dictionary, return a 400 error
        return jsonify({"error": "Payload must be a JSON object"}), 400

    if not GOOGLE_API_KEY:
        # ==>> if the key is not found, return a 500 error
        return jsonify({"error": "Google API key not found"}), 500

    # ==>> get the page token from the request that is used for pagination.
    page_token = data.get("next_page_token")
    # ==>> url for the google api
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"

    if page_token:  # ==>> check if the page token is present in the request # We’re loading a “next” page
        params = {
            "pagetoken": page_token,  # ==>> pass the page token to the request
            "key": GOOGLE_API_KEY  # ==>> get the google api key from the environment variables
        }
    else:
        opennow = data.get("opennow")
        latitude = data.get("latitude")
        longitude = data.get("longitude")
        cocktail = data.get("cocktail")

        # ==>> check if all the values are present in the request
        if not all([latitude, longitude, cocktail]):
            # ==>> return a 400 error if any of the values are missing
            return jsonify({"error": "Missing data"}), 400
        try:
            latitude = float(latitude)
            longitude = float(longitude)

        except (ValueError, TypeError):  # ==>> check if the values are numbers
            # ==>> if not, return a 400 error
            return jsonify({"error":  "Latitude and longitude must be numbers"}), 400
            # First page: use location, radius, keyword…
        params = {  # ==>> parameters for the google api
            "location": f"{latitude},{longitude}",  # ==>> location of the user
            "radius": 5000,
            "type": "bar",
            "keyword": cocktail,
            "key": GOOGLE_API_KEY
        }
        if opennow:  # ==>> check if the opennow parameter is present in the request
            # ==>> add the opennow parameter to the request
            params["opennow"] = "true"

    # ==>> make a request to the google api with the parameters
    res = requests.get(url, params=params)

    if res.status_code != 200:  # ==>> check if the request was successful
        return jsonify({
            "error": "Failed to fetch data from Google",
            "details": res.text
        }), 500
    body = res.json()
    print("📄 [Flask] Google JSON:", body)
    places = body.get("results", [])
    next_page_token = body.get("next_page_token")

    filtered_places = []
    for place in places:
        if place.get("business_status") != "OPERATIONAL":
            continue
        # ==>> ↓↓↓get the photo reference of the place.↓↓↓ This accesses the "photos" key in the place dictionary, which is a list of dictionaries. ↓↓↓It tries to get the first dictionary in that list (or an empty dictionary if the list is empty) and then accesses the "photo_reference" key.
        ref = place.get("photos", [{}])[0].get("photo_reference")
        # ==>> check if the photo reference is not empty   ##  ↑↑↑one representative image per place,↑↑↑ and the first one is usually the best (it’s what Google thinks is most relevant)↑↑↑
        if ref:
            photo_url = (
                f"https://maps.googleapis.com/maps/api/place/photo"  # ==>> url for the google api
                f"?maxwidth=400"
                f"&photoreference={ref}"  # ==>> photo reference of the place
                f"&key={GOOGLE_API_KEY}"  # ==>> google api key
            )
        else:
            photo_url = None

        filtered_places.append({
            "name":              place.get("name"),
            # ==>> get the address of the place, First, it tries to get the "vicinity" key (a nearby address). If "vicinity" is not available, it falls back to "formatted_address" (the full address).
            "address":           place.get("vicinity") or place.get("formatted_address"),
            "rating":            place.get("rating"),
            # ==>> get the location of the place This accesses the "geometry" key in the place dictionary, which contains a "location" key.  "location" is another dictionary with latitude and longitude values.
            "location":          place["geometry"]["location"],
            "user_ratings_total": place.get("user_ratings_total"),
            "place_id":          place.get("place_id"),
            "photo_url":         photo_url

        })
    return jsonify({
        "places":    filtered_places,
        "next_page_token": next_page_token
    }), 200   # ==>> return the filtered places as a json object with a 200 status code


# ==>> Search Places in a specific location:Accepts E.G: { zip_code: "10001" } Returns { latitude: 40.75, longitude: -73.99}
@api.route('/places/by-location', methods=['POST'])
def get_places_by_location():
    data = request.get_json()
    GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
    print(">>> [by-location] STEP 1: data =", data, " type:", type(data))
    if not isinstance(data, dict):
        return jsonify({"error": "Data must be a JSON object"}), 400
    if not GOOGLE_API_KEY:
        return jsonify({"error": "Google API key not found"}), 500

    page_token = data.get("next_page_token")
    filtered_places = []

    if page_token:  # ==>> check if the page token is present in the request # We’re loading a “next” page
        # ==>> url for the google api
        places_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
        places_params = {
            "pagetoken": page_token,  # ==>> pass the page token to the request
            "key": GOOGLE_API_KEY  # ==>> get the google api key from the environment variables
        }
        # ==>> make a request to the google api with the parameters
        places_res = requests.get(places_url, params=places_params)
        if places_res.status_code != 200:  # ==>> check if the request was successful
            return jsonify({"error": "Failed to fetch data from Google", "details": places_res.text}), 500
        body = places_res.json()  # ==>> parse the response as json
        raw_places = body.get("results", [])
        next_page_token = body.get("next_page_token")

    else:
        location = data.get("location")
        cocktail = data.get("cocktail")
        print(">>> [by-location] STEP 2: location, cocktail =",
              location, cocktail)

        if not all([location, cocktail]):  # ==>> check if all the values are present in the request
            print(">>> [by-location] Missing location or cocktail")
            # ==>> return a 400 error if any of the values are missing
            return jsonify({"error": "Missing data"}), 400

        # ==>> Call Geocoding API
        geo_url = "https://maps.googleapis.com/maps/api/geocode/json"
        geo_params = {
            "address": location,
            "key": GOOGLE_API_KEY
        }
        geo_res = requests.get(geo_url, params=geo_params)
        print(">>> [by-location] STEP 3b: geocode status =",
              geo_res.status_code)
        print(">>> [by-location] geocode body snippet:",
              geo_res.text[:200], "…")

        if geo_res.status_code != 200:  # ==>> check if the request was successful
            # ==>> return a 500 error if the request failed
            return jsonify({"error": "Failed to fetch data from Google Geocoding API"}), 500
        geo_data = geo_res.json()  # ==>> # parse JSON into a dict
        # ==>> get the results from the response
        results = geo_data.get("results", [])
        if not results:
            # ==>> return a 404 error if there are no results
            return jsonify({"error": "No results found"}), 404

        # ==>> get the location data from the first result
        location_data = results[0]["geometry"]["location"]
        # ==>> extract latitude and longitude
        lat, lng = location_data["lat"], location_data["lng"]
        print(
            f">>> [by-location] STEP 4: resolved '{location_data}' → lat={lat}, lng={lng}")

        # Build Nearby Search request
        places_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
        places_params = {
            "location":  f"{lat},{lng}",
            "radius":    5000,
            "type":      "bar",
            "keyword":   cocktail,
            "key":        GOOGLE_API_KEY
        }

        if data.get("opennow"):  # ==>> check if the opennow parameter is present in the request
            # ==>> add the opennow parameter to the request
            places_params["opennow"] = "true"
        print(">>> [by-location] STEP 5: places params =", places_params)

        places_res = requests.get(places_url, params=places_params)
        print(">>> [by-location] STEP 5b: places status =",
              places_res.status_code)
        print(">>> [by-location] places body snippet:",
              places_res.text[:200], "…")
        if places_res.status_code != 200:
            return jsonify({"error": "Failed to fetch data from Google Places API", "details": places_res.text}), 500
        body = places_res.json()
        raw_places = body.get("results", [])
        next_page_token = body.get("next_page_token")
        print(">>> [by-location] STEP 6: received",
              len(raw_places), "raw places")

    for place in raw_places:
        if place.get("business_status") != "OPERATIONAL":
            continue
        # ==>> ↓↓↓get the photo reference of the place.↓↓↓ This accesses the "photos" key in the place dictionary, which is a list of dictionaries. ↓↓↓It tries to get the first dictionary in that list (or an empty dictionary if the list is empty) and then accesses the "photo_reference" key.
        ref = place.get("photos", [{}])[0].get("photo_reference")
        # ==>> check if the photo reference is not empty   ##  ↑↑↑one representative image per place,↑↑↑ and the first one is usually the best (it’s what Google thinks is most relevant)↑↑↑
        if ref:
            photo_url = (
                f"https://maps.googleapis.com/maps/api/place/photo"  # ==>> url for the google api
                f"?maxwidth=400"
                f"&photoreference={ref}"  # ==>> photo reference of the place
                f"&key={GOOGLE_API_KEY}"  # ==>> google api key
            )
        else:
            photo_url = None

        filtered_places.append(
            {
                "name":              place.get("name"),
                "address":           place.get("vicinity") or place.get("formatted_address"),
                "rating":            place.get("rating"),
                "user_ratings_total": place.get("user_ratings_total"),
                "location":          place["geometry"]["location"],
                "place_id":          place.get("place_id"),
                "photo_url":         photo_url
            })
    print(
        f">>> [by-location] STEP 7: filtered down to {len(filtered_places)} bars")
    return jsonify({
        "places":            filtered_places,
        "next_page_token":   next_page_token
    }), 200


# ==>> Endpoint for the Place Details API within the Google Maps Platform. It allows you to request detailed information about a specific place, such as a business or point of interest.
@api.route('/places/details', methods=['POST'])
def get_place_details():
    # ==>> get the google api key from the environment variables
    GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
    if not GOOGLE_API_KEY:  # ==>> check if the google api key is present
        # ==>> return a 500 error if the google api key is missing
        return jsonify({"error": "Google API key not found"}), 500
    data = request.get_json()  # ==>> get the data from the request
    place_id = data.get("place_id")  # ==>> get the place id from the request

    if not place_id:  # ==>> check if the place id is present in the request
        # ==>> return a 400 error if the place id is missing
        return jsonify({"error": "Missing place_id"}), 400

    # ==>> url for the google api
    url = "https://maps.googleapis.com/maps/api/place/details/json"
    params = {
        "place_id": place_id,
        # ==>> fields to be returned in the response
        "fields": "name,formatted_phone_number,opening_hours,website,reviews,photos,formatted_address",
        "key": GOOGLE_API_KEY
    }
    # ==>> make a request to the google api with the parameters
    res = requests.get(url, params=params)
    if res.status_code != 200:  # ==>> check if the request was successful
        # ==>> return a 500 error if the request failed
        return jsonify({"error": "Failed to fetch data from Google", "details": res.text}), 500

    body = res.json()  # ==>> parse the response as json
    # Grab the “result” object from the Google response (or an empty dict if it’s missing)
    details = body.get("result", {})
    if not details:  # ==>> check if the details are present in the response
        # ==>> return a 404 error if the details are missing
        return jsonify({"error": "No details found"}), 404

    photo_urls = []  # ==>> initialize an empty list for the photo urls
    for i in details.get("photos", []):  # ==>> iterate over the photos in the details
        # ==>> get the photo reference from the photo
        ref = i.get("photo_reference")
        photo_urls.append(
            f"https://maps.googleapis.com/maps/api/place/photo"
            f"?maxwidth=400"
            f"&photoreference={ref}"
            f"&key={GOOGLE_API_KEY}"
        )

    return jsonify({
        "name": details.get("name"),
        "formatted_address": details.get("formatted_address"),
        "formatted_phone_number": details.get("formatted_phone_number", "N/A"),
        "opening_hours": details.get("opening_hours", {}),
        "website": details.get("website"),
        "reviews": details.get("reviews", []),
        "photos": photo_urls,  # ==>> return the photo urls as a list
    }), 200


@api.route('/signin', methods=['POST'])
def sign_in_user():
    data = request.get_json()  # ==>> get the data from the request
    if not data:
        # ==>> check if the data is present
        return jsonify({"error": "Missing data"}), 400
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400
    # ==>> query the database for the user first value is the column name, second is the value from the request.
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    if not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid password"}), 401

    access_token = create_access_token(identity=user.id)

    return jsonify({
        "token": access_token,
        "user": user.serialize()
    }), 200

# Jackie


@api.route("/signup", methods=["POST"])
def signup():
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    phone = request.json.get("phone", None)

    if not name or not email or not password or not phone:
        return jsonify({"msg": "Name, email, phone and password are required"}), 400

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"msg": "User already exists"}), 409

    hashed_password = generate_password_hash(password)

    new_user = User(
        name=name,
        email=email,
        phone=phone,
        password=hashed_password,
        is_active=True,
    )

    db.session.add(new_user)
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print("Error saving user:", e)
        return jsonify({"msg": "Database error"}), 500

    return jsonify({"msg": "User created successfully"}), 201

@api.route("/reset-password", methods=["PUT"])
def reset_password():
    data = request.get_json() or {} # ==>> get the data from the request or empty dict
    token = data.get("token")
    new_password = data.get("new_password")
    print("➡️  Received token:", token)
    print("➡️  Raw JWT_SECRET_KEY:", os.getenv("JWT_SECRET_KEY"))
    if not token or not new_password:
        return jsonify({"error": "Token and new password are required"}), 400
    
    try:
        decoded = decode_token(token)
        user_id = decoded["sub"]
        print("✅  Decoded claims:", decoded)
    except Exception as e:
        print("❌  decode_token error:", e)
        return jsonify({"error": "Invalid or expired token"}),400 

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error":"User not found"}), 404 
    
    
    user.password = generate_password_hash(new_password)
    db.session.commit()  
    return jsonify({"msg": "Password reset successfully"}), 200


@api.route('/password-request', methods=['POST'])
def request_password_reset():    
    data = request.get_json() or {}
    email = data.get("email")
    if not email:
        return jsonify({"error": "Email is required"}), 400

     # Always send a generic response regardless of user existence 
    user = User.query.filter_by(email=email).first()
    generic_msg = {
      "msg": "If you entered a valid email, you will receive a password reset link shortly."
    }
    if not user:
        return jsonify(generic_msg), 200
     
    # Generate a token valid for 1 hour 
    reset_token = create_access_token(
      identity=str(user.id), expires_delta=timedelta(hours=1)
    )
      # Simulate email by printing the token with reset link
    reset_link = f"{FRONTEND_URL}/reset-password?token={reset_token}"
    print(f"Password reset link for {email}: {reset_link}")
    
    return jsonify(generic_msg), 200



@api.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200
