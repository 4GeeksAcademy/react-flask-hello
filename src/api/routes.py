"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask import Flask, request, jsonify
from api.models import db, User, Student, Teacher
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


