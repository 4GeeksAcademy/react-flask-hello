from flask import Blueprint, request, jsonify
from api.models import db, User
import requests
import os
import base64

payment_api = Blueprint('payment_api', __name__)

BASE_URL = "https://api-m.sandbox.paypal.com"

# Función para generar un token de acceso OAuth 2.0


def generate_access_token(data):
    CLIENT_ID = data["CLIENT_ID"]
    APP_SECRET = data["APP_SECRET"]
    auth = f"{CLIENT_ID}:{APP_SECRET}"
    auth_base64 = base64.b64encode(auth.encode("utf-8")).decode("utf-8")
    response = requests.post(
        f"{BASE_URL}/v1/oauth2/token",
        data="grant_type=client_credentials",
        headers={"Authorization": f"Basic {auth_base64}"}
    )
    response_json = response.json()
    return response_json.get("access_token")

# Función para manejar respuestas HTTP


def handle_response(response):
    if response.status_code == 200 or response.status_code == 201:
        return response.json(), response.status_code
    error_message = response.text
    return {"error": error_message}, response.status_code

# Función para crear una orden


@payment_api.route("/create-paypal-order/<int:user_id>", methods=["POST"])
def create_paypal_order(user_id):
    user = User.query.get(user_id)
    cost = request.json.get('cost')

    data = {
        'CLIENT_ID': user.cliente_ID_paypal,
        'APP_SECRET': user.secret_key_paypal
    }

    access_token = generate_access_token(data)
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {access_token}"
    }
    data = {
        # El contenido de esta propiedad = propiedad intent en layout.js/initialOption
        "intent": "CAPTURE",
        "purchase_units": [
            {
                "amount": {
                    "currency_code": "USD",
                    "value": cost
                }
            }
        ]
    }
    response = requests.post(
        f"{BASE_URL}/v2/checkout/orders",
        headers=headers,
        json=data
    )
    return handle_response(response)

# Función para capturar un pago de una orden


@payment_api.route("/capture-paypal-order/<int:user_id>", methods=["POST"])
def capture_paypal_order(user_id):

    user = User.query.get(user_id)
    data = {
        'CLIENT_ID': user.cliente_ID_paypal,
        'APP_SECRET': user.secret_key_paypal
    }
    access_token = generate_access_token(data)
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {access_token}"
    }
    order_id = request.json.get("orderID")
    response = requests.post(
        f"{BASE_URL}/v2/checkout/orders/{order_id}/capture",
        headers=headers
    )
    return handle_response(response)
