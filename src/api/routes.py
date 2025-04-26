"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__) # ==>>a collection of routes, error handlers, etc., that you group together in one file (here, api/routes.py).

# Allow CORS requests to this API
CORS(api) # ==>> you can talk to your flask endpoins whithout the browser blocking the request.


@api.route('/places', methods=['POST'])
def get_places_of_drinks():
    data = request.get_json()    #==>>Looks at the body of the incoming HTTP request and it parses the JSON text and returns a Python dict (or list) representing that JSON.
    latitude = data.get("latitude")
    longitude = data.get("longitude")
    cocktail = data.get("cocktail")

    if not all[latitude,longitude,cocktail]: #==>> check if all the values are present in the request

      

    return jsonify({"received": data}), 200
