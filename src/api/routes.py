"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint, render_template
from flask_jwt_extended import create_access_token
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import datetime

# Import use for .env
from dotenv import load_dotenv

# Import for SMTP
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from smtplib import SMTPException

load_dotenv()
api = Blueprint("api", __name__)


def generate_change_password_token(email):
    expire = datetime.timedelta(hours=1)
    token = create_access_token(identity=email, expires_delta=expire)
    return token


def handle_email_send(recipient, name):
    try:
        SMTP_SERVER = os.getenv("SMTP_SERVER")
        SMTP_PORT = os.getenv("SMTP_PORT")
        SMTP_USERNAME = os.getenv("SMTP_USERNAME")
        SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
        FRONTEND_URL = os.getenv("FRONTEND_URL")

        # SMTP server configuration
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USERNAME, SMTP_PASSWORD)

        # Create the message
        message = MIMEMultipart("alternative")
        message["Subject"] = "Email sent from 4Movies"
        message["From"] = SMTP_USERNAME
        message["To"] = recipient

        # Password reset link and token creation
        generated_token = generate_change_password_token(recipient)
        password_reset_url = f"{FRONTEND_URL}/passwordreset?token={generated_token}"

        # HTML Render
        html = render_template(
            "email_template.html", name=name, password_reset_url=password_reset_url
        )
        html_part = MIMEText(html, "html")

        # Add components to the message
        message.attach(html_part)

        # Send the message via the server.
        text = message.as_string()
        server.sendmail(SMTP_USERNAME, recipient, text)
        return "Email sent succesfully"
    except SMTPException as e:
        return f"Error: unable to send email - {e}"
    except Exception as e:
        return f"Unexpected error - {e}"
    finally:
        server.quit()


# Allow CORS requests to this API
CORS(api)


@api.route("/password-reset-request", methods=["POST"])
def password_reset_request():
    # data = request.json(silent=True)
    data = request.json
    if data is None:
        return jsonify({"error": "No JSON data provided"}), 400

    if "email" not in data:
        return jsonify({"error": "'email' field is missing"}), 400

    # Check if email exists
    existing_user = User.query.filter_by(email=data["email"]).first()

    if existing_user:
        handle_email_send(data["email"], existing_user.name)
        return (
            jsonify(
                {
                    "message": "Request received. If the email is registered, you will receive a link to reset your password"
                }
            ),
            200,
        )

    return (
        jsonify(
            {
                "message": "Request received. If the email is registered, you will receive a link to reset your password"
            }
        ),
        200,
    )
