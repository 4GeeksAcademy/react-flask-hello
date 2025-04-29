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

api = Blueprint('api', __name__) # ==>>a collection of routes, error handlers, etc., that you group together in one file (here, api/routes.py).

# Allow CORS requests to this API
CORS(api) # ==>> you can talk to your flask endpoins whithout the browser blocking the request.


@api.route('/places', methods=['POST']) #==>> this is the endpoint that will be called from the front end
def get_places_of_drinks():
    data = request.get_json()    #==>>Looks at the body of the incoming HTTP request and it parses the JSON text and returns a Python dict (or list) representing that JSON.
    print(">> DEBUG data:", data, " type:", type(data)) #==>> print the data received in the request and its type
    if not isinstance(data, dict): #==>> check if the data is a dictionary
        return jsonify({"error": "Payload must be a JSON object"}), 400 #==>> if the data is not a dictionary, return a 400 error
    
    latitude = data.get("latitude")
    longitude = data.get("longitude")
    cocktail = data.get("cocktail")

    if not all([latitude,longitude,cocktail]): #==>> check if all the values are present in the request
        return jsonify({"errror": "Missing data"}), 400 #==>> return a 400 error if any of the values are missing
    
    try:
        latitude = float(latitude)
        longitude = float(longitude)
    except (ValueError, TypeError): #==>> check if the values are numbers
       
        return jsonify({"error":  "Latitude and longitude must be numbers"}), 500  #==>> if not, return a 500 error    
    
    GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY") #==>> get the google api key from the environment variables
    if not GOOGLE_API_KEY:
       return jsonify ({"error": "Google API key not found"}), 500  #==>> if the key is not found, return a 500 error 
     
    return jsonify({"received": data}), 200   #==>> return the data received in the request with a 200 status code


