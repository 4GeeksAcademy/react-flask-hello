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
load_dotenv()    # reads .env and sets those variables into your environment


# ==>>a collection of routes, error handlers, etc., that you group together in one file (here, api/routes.py).
api = Blueprint('api', __name__)

# Allow CORS requests to this API
# ==>> you can talk to your flask endpoins whithout the browser blocking the request.
CORS(api)


# ==>> this is the endpoint that will be called from the front end
# ==>> Search Places by coordinates: Accepts E.G: { latitude: 40.75, longitude: -73.99, cocktail: "Mojito" }
@api.route('/places', methods=['POST'])
def get_places_of_drinks():  
    GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY") # ==>> get the google api key from the environment variables  
    data = request.get_json()# ==>>Looks at the body of the incoming HTTP request and it parses the JSON text and returns a Python dict (or list) representing that JSON.
   
    if not isinstance(data, dict):  # ==>> check if the data is a dictionary        
        return jsonify({"error": "Payload must be a JSON object"}), 400  # ==>> if the data is not a dictionary, return a 400 error   
       
    if not GOOGLE_API_KEY:       
        return jsonify({"error": "Google API key not found"}), 500   # ==>> if the key is not found, return a 500 error
    
    page_token = data.get("next_page_token") # ==>> get the page token from the request that is used for pagination.   
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"   # ==>> url for the google api

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

   
     if not all([latitude, longitude, cocktail ]):  # ==>> check if all the values are present in the request       
        return jsonify({"error": "Missing data"}), 400  # ==>> return a 400 error if any of the values are missing
     try:
        latitude = float(latitude)
        longitude = float(longitude)

     except (ValueError, TypeError):  # ==>> check if the values are numbers        
        return jsonify({"error":  "Latitude and longitude must be numbers"}), 400  # ==>> if not, return a 400 error    
        # First page: use location, radius, keyword…
     params = {  # ==>> parameters for the google api
        "location": f"{latitude},{longitude}",  # ==>> location of the user
        "radius": 5000,
        "type": "bar",
        "keyword": cocktail,
        "key": GOOGLE_API_KEY        
     }
     if opennow:  # ==>> check if the opennow parameter is present in the request
        params["opennow"] = "true"  # ==>> add the opennow parameter to the request

    
    res = requests.get(url, params=params) # ==>> make a request to the google api with the parameters
    
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
        ref = place.get("photos", [{}])[0].get("photo_reference")  # ==>> ↓↓↓get the photo reference of the place.↓↓↓ This accesses the "photos" key in the place dictionary, which is a list of dictionaries. ↓↓↓It tries to get the first dictionary in that list (or an empty dictionary if the list is empty) and then accesses the "photo_reference" key.
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
            "address":           place.get("vicinity") or place.get("formatted_address"),  # ==>> get the address of the place, First, it tries to get the "vicinity" key (a nearby address). If "vicinity" is not available, it falls back to "formatted_address" (the full address).
            "rating":            place.get("rating"),                                      
            "location":          place["geometry"]["location"],                              # ==>> get the location of the place This accesses the "geometry" key in the place dictionary, which contains a "location" key.  "location" is another dictionary with latitude and longitude values.
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
        places_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"  # ==>> url for the google api
        places_params = {
            "pagetoken": page_token,  # ==>> pass the page token to the request
            "key": GOOGLE_API_KEY  # ==>> get the google api key from the environment variables
        }
        places_res = requests.get(places_url, params=places_params)  # ==>> make a request to the google api with the parameters
        if places_res.status_code != 200: # ==>> check if the request was successful
            return jsonify({"error": "Failed to fetch data from Google", "details": places_res.text}), 500
        body = places_res.json()  # ==>> parse the response as json
        raw_places = body.get("results", [])
        next_page_token = body.get("next_page_token")

    else:
         location = data.get("location")
         cocktail = data.get("cocktail")
         print(">>> [by-location] STEP 2: location, cocktail =", location, cocktail)    

         if not all([location, cocktail]):  # ==>> check if all the values are present in the request
          print(">>> [by-location] Missing location or cocktail")       
          return jsonify({"error": "Missing data"}), 400  # ==>> return a 400 error if any of the values are missing
           
         geo_url = "https://maps.googleapis.com/maps/api/geocode/json"   # ==>> Call Geocoding API
         geo_params = {
            "address": location,
            "key": GOOGLE_API_KEY
        }
         geo_res = requests.get(geo_url, params=geo_params)
         print(">>> [by-location] STEP 3b: geocode status =", geo_res.status_code)
         print(">>> [by-location] geocode body snippet:", geo_res.text[:200], "…")

         if geo_res.status_code != 200:  # ==>> check if the request was successful       
            return jsonify({"error": "Failed to fetch data from Google Geocoding API"}), 500  # ==>> return a 500 error if the request failed
         geo_data = geo_res.json()  # ==>> # parse JSON into a dict     
         results = geo_data.get("results", []) # ==>> get the results from the response
         if not results:        
            return jsonify({"error": "No results found"}), 404      # ==>> return a 404 error if there are no results
        
         location_data = results[0]["geometry"]["location"] # ==>> get the location data from the first result     
         lat, lng = location_data["lat"], location_data["lng"] # ==>> extract latitude and longitude
         print(f">>> [by-location] STEP 4: resolved '{location_data}' → lat={lat}, lng={lng}")     
    
         places_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"  # Build Nearby Search request
         places_params = {
            "location":  f"{lat},{lng}",
            "radius":    5000,
            "type":      "bar",
            "keyword":   cocktail,
            "key":        GOOGLE_API_KEY 
        }
        
         if data.get("opennow"):  # ==>> check if the opennow parameter is present in the request
            places_params["opennow"] = "true"  # ==>> add the opennow parameter to the request
         print(">>> [by-location] STEP 5: places params =", places_params)
        
         places_res = requests.get(places_url, params=places_params)
         print(">>> [by-location] STEP 5b: places status =", places_res.status_code)
         print(">>> [by-location] places body snippet:", places_res.text[:200], "…")
         if places_res.status_code != 200:
             return jsonify({"error": "Failed to fetch data from Google Places API", "details": places_res.text}), 500   
         body            = places_res.json()
         raw_places      = body.get("results", [])
         next_page_token = body.get("next_page_token")
         print(">>> [by-location] STEP 6: received", len(raw_places), "raw places")
         
    for place in raw_places:
      if place.get("business_status") != "OPERATIONAL":
        continue      
      ref = place.get("photos", [{}])[0].get("photo_reference")   # ==>> ↓↓↓get the photo reference of the place.↓↓↓ This accesses the "photos" key in the place dictionary, which is a list of dictionaries. ↓↓↓It tries to get the first dictionary in that list (or an empty dictionary if the list is empty) and then accesses the "photo_reference" key.
      if ref:                                                     # ==>> check if the photo reference is not empty   ##  ↑↑↑one representative image per place,↑↑↑ and the first one is usually the best (it’s what Google thinks is most relevant)↑↑↑
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
    print(f">>> [by-location] STEP 7: filtered down to {len(filtered_places)} bars")
    return jsonify({
        "places":            filtered_places,
        "next_page_token":   next_page_token
    }), 200


@api.route('/places/details', methods=['POST'])  # ==>> Endpoint for the Place Details API within the Google Maps Platform. It allows you to request detailed information about a specific place, such as a business or point of interest.
def get_place_details():
 GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY") # ==>> get the google api key from the environment variables
 if not GOOGLE_API_KEY: # ==>> check if the google api key is present
        return jsonify({"error": "Google API key not found"}), 500 # ==>> return a 500 error if the google api key is missing
 data = request.get_json() # ==>> get the data from the request
 place_id = data.get("place_id") # ==>> get the place id from the request

 if not place_id: # ==>> check if the place id is present in the request
     return jsonify({"error": "Missing place_id"}), 400 # ==>> return a 400 error if the place id is missing
 
 url = "https://maps.googleapis.com/maps/api/place/details/json" # ==>> url for the google api
 params = {
     "place_id": place_id,
     "fields":"name,formatted_phone_number,opening_hours,website,reviews,photos,formatted_address", # ==>> fields to be returned in the response
     "key": GOOGLE_API_KEY 
 }
 res = requests.get(url, params=params) # ==>> make a request to the google api with the parameters
 if res.status_code != 200: # ==>> check if the request was successful
     return jsonify({"error": "Failed to fetch data from Google", "details": res.text}), 500 # ==>> return a 500 error if the request failed
 
 body = res.json() # ==>> parse the response as json
 details = body.get("result", {}) # Grab the “result” object from the Google response (or an empty dict if it’s missing)
 if not details: # ==>> check if the details are present in the response
    return jsonify({"error": "No details found"}), 404 # ==>> return a 404 error if the details are missing
 
 photo_urls = [] # ==>> initialize an empty list for the photo urls
 for i in details.get("photos", []): # ==>> iterate over the photos in the details
    ref = i.get("photo_reference") # ==>> get the photo reference from the photo
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
 "photos": photo_urls, # ==>> return the photo urls as a list
}), 200



