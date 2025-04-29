"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from dotenv import load_dotenv  #==>> loads the environment variables from the .env file, pip install python-dotenv
load_dotenv()    # reads .env and sets those variables into your environment
import os
from flask import Flask
import requests   





api = Blueprint('api', __name__) # ==>>a collection of routes, error handlers, etc., that you group together in one file (here, api/routes.py).

# Allow CORS requests to this API
CORS(api) # ==>> you can talk to your flask endpoins whithout the browser blocking the request.


@api.route('/places', methods=['POST']) #==>> this is the endpoint that will be called from the front end
def get_places_of_drinks():
    data = request.get_json()    #==>>Looks at the body of the incoming HTTP request and it parses the JSON text and returns a Python dict (or list) representing that JSON.
    print(">>> Received raw payload:", data)  #==>> print the data received from the request
    if not isinstance(data, dict): #==>> check if the data is a dictionary
        print(">>> STEP 2: Bad payload (not a dict)") #==>> print the error message
        return jsonify({"error": "Payload must be a JSON object"}), 400 #==>> if the data is not a dictionary, return a 400 error
    
    latitude = data.get("latitude") 
    longitude = data.get("longitude")
    cocktail = data.get("cocktail")
    print(f">>>  Parsed fields → cocktail={cocktail!r}, latitude={latitude!r}, longitude={longitude!r}") #==>> print the values of the latitude, longitude and cocktail received from the request

    if not all([latitude,longitude,cocktail]): #==>> check if all the values are present in the request
        print(">>> STEP 4: Missing one of the required fields")
        return jsonify({"errror": "Missing data"}), 400 #==>> return a 400 error if any of the values are missing
    
    try:
        latitude = float(latitude)
        longitude = float(longitude)
        print(f">>> STEP 5: Coerced lat/lng to floats → {latitude}, {longitude}")
    except (ValueError, TypeError): #==>> check if the values are numbers
        print(">>> STEP 5: Invalid lat/lng, cannot cast to float")
       
        return jsonify({"error":  "Latitude and longitude must be numbers"}), 500  #==>> if not, return a 500 error    
    
    GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY") #==>> get the google api key from the environment variables
    if not GOOGLE_API_KEY:
       print(">>> STEP 6: Missing Google API key in env")
       return jsonify ({"error": "Google API key not found"}), 500  #==>> if the key is not found, return a 500 error 
    
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"  #==>> url for the google api
    params = { #==>> parameters for the google api
        "location": f"{latitude},{longitude}", #==>> location of the user
        "radius": 5000, 
        "type": "bar",
        "keyword": cocktail,
        "key": GOOGLE_API_KEY 
        
    }
    print(">>> STEP 7: Calling Google Places with params:", params)
    res = requests.get(url, params=params) #==>> make a request to the google api with the parameters
    print(">>> STEP 8: Google responded with status", res.status_code)
    print(">>> STEP 8b: Google raw body:", res.text[:500], "…")  # first 500 chars
    if res.status_code != 200: #==>> check if the request was successful
        return jsonify({
            "error": "Failed to fetch data from Google",
            "details": res.text 
        }), 500 
    places = res.json().get("results",[]) #==>> get the results from the response
    print(f">>> STEP 9: Google returned {len(places)} results")
    filtered_places = []
    for place in places:
        if place.get("business_status") != "OPERATIONAL":
            continue 
        
        filtered_places.append({
            "name":              place.get("name"),
            "address":           place.get("vicinity") or place.get("formatted_address"),
            "rating":            place.get("rating"),
            "user_ratings_total":place.get("user_ratings_total"),
            "location":          place["geometry"]["location"],
            "place_id":          place.get("place_id"),
            "photo_reference":   place.get("photos", [{}])[0].get("photo_reference")
        })
        print(f">>> STEP 10: Filtered down to {len(filtered_places)} operational bars")
        print(">>> STEP 11: Returning to client:", filtered_places)

     
    return jsonify( filtered_places), 200 #==>> return the filtered places as a json object with a 200 status code
  


