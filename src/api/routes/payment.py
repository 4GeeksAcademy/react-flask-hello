import os
from flask import Flask, redirect, request, jsonify, Blueprint
from api.models.Games import Games
import stripe
from api.database.db import db
from flask_cors import CORS

# Blueprint para las rutas de pago
payment_api = Blueprint("api/payment", __name__)

# Configuración de Stripe
stripe.api_key = os.getenv('SECRET_KEY_STRIPE')
YOUR_DOMAIN = os.getenv('VITE_FRONT_URL')

@payment_api.route("/create-checkout-session", methods=['POST'])
def create_checkout_session():
    try:
        # Obtener los datos del carrito desde el frontend
        data = request.get_json()
        cart_items = data.get('cart_items', [])
        
        if not cart_items:
            return jsonify({"error": "El carrito está vacío"}), 400
        
        # Crear line_items para Stripe
        line_items = []
        
        for item in cart_items:
            # Verificar que el juego existe en la base de datos
            game = Games.query.get(item['id'])
            if not game:
                return jsonify({"error": f"Juego con ID {item['id']} no encontrado"}), 400
            
            line_item = {
                'price_data': {
                    'currency': 'eur',  # Cambié a euros ya que veo precios en €
                    'product_data': {
                        'name': game.name,
                        'description': f"Plataforma: {game.platform}",
                        'images': [game.img] if game.img else [],
                    },
                    'unit_amount': int(game.price * 100),  # Stripe usa centavos
                },
                'quantity': item.get('quantity', 1),
            }
            line_items.append(line_item)
        
        # Crear la sesión de checkout
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=line_items,
            mode='payment',
            success_url=YOUR_DOMAIN + 'success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url=YOUR_DOMAIN + 'cancel',
            automatic_tax={'enabled': True},  # Para manejar IVA automáticamente
            # Opcional: agregar metadata del usuario
            metadata={
                'user_id': data.get('user_id', ''),
                'total_items': len(cart_items)
            }
        )
        
        return jsonify({
            'checkout_url': checkout_session.url,
            'session_id': checkout_session.id
        }), 200
        
    except stripe.error.StripeError as e:
        return jsonify({"error": f"Error de Stripe: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": f"Error interno: {str(e)}"}), 500

@payment_api.route("/verify-session/<session_id>", methods=['GET'])
def verify_session(session_id):
    """Verificar el estado de una sesión de pago"""
    try:
        session = stripe.checkout.Session.retrieve(session_id)
        return jsonify({
            'payment_status': session.payment_status,
            'amount_total': session.amount_total,
            'currency': session.currency
        }), 200
    except stripe.error.StripeError as e:
        return jsonify({"error": f"Error de Stripe: {str(e)}"}), 400

# Webhook para manejar eventos de Stripe (opcional pero recomendado)
@payment_api.route("/webhook", methods=['POST'])
def stripe_webhook():
    payload = request.get_data(as_text=True)
    sig_header = request.headers.get('Stripe-Signature')
    endpoint_secret = os.getenv('STRIPE_WEBHOOK_SECRET')
    
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError:
        return "Invalid payload", 400
    except stripe.error.SignatureVerificationError:
        return "Invalid signature", 400
    
    # Manejar el evento
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        # Aquí puedes guardar la compra en tu base de datos
        print(f"Pago completado para sesión: {session['id']}")
    
    return jsonify(success=True), 200