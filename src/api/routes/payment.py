# #! /usr/bin/env python3.6

# """
# server.py
# Stripe Sample.
# Python 3.6 or newer required.
# """
# import os
# from flask import  Flask, redirect, request
# from api.models.Games import Games
# import stripe
# # This is your test secret API key.
# os.getenv('VITE_FRONT_URL')
# stripe.api_key = os.getenv('SECRET_KEY_STRIPE')

# app = Flask(__name__,
#             static_url_path='',
#             static_folder='public')


# YOUR_DOMAIN = os.getenv('VITE_FRONT_URL')

# @app.route('/api/payment', methods=['POST'])
# def create_checkout_session():
#     try:
#         checkout_session = stripe.checkout.Session.create(
#             line_items=[
#                 {
#                     # Provide the exact Price ID (for example, price_1234) of the product you want to sell
#                     'price': '{{PRICE_ID}}',
#                     'quantity': 1,
#                 },
#             ],
#             mode='payment',
#             success_url=YOUR_DOMAIN + '?success=true',
#             cancel_url=YOUR_DOMAIN + '?canceled=true',
#         )
#     except Exception as e:
#         return str(e)

#     return redirect(checkout_session.url, code=303)

# if __name__ == '__main__':
#     app.run(port=4242)