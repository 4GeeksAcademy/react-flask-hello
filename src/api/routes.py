"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, abort
from api.models import User, AuthAccount, PlanTemplate, TemplateItem, SubscriptionPlan,Subscription, Payment, Event, EventSignup, SupportTicket
from api.utils import  APIException
from flask_cors import CORS
from extensions import db


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
