"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Lead
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy.exc import IntegrityError

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/leads', methods=['GET'])
def get_leads():
    all_leads = Lead.query.all()
    serialized_leads = [lead.serialize() for lead in all_leads]

    return jsonify(serialized_leads), 200


def validate_lead_data(data):
    errors = {}

    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    company = data.get("company")
    message = data.get("message")

    if not name or not name.strip():
        errors["name"] = "Name field is required."

    if not email or not email.strip():
        errors["email"] = "Email field is required."
    elif "@" not in email or "." not in email or len(email) < 5:
        errors["email"] = "Invalid email format."

    if not phone or not phone.strip():
        errors["phone"] = "Phone field is required"
    elif len(phone) < 9:
        errors["phone"] = "Phone number must have at least nine digits"

    return errors, {
        "name": name.strip() if name else None,
        "email": email.strip() if email else None,
        "phone": phone.strip() if phone else None,
        "company": company.strip() if company else None,
        "message": message.strip() if message else None
    }


@api.route('/contact', methods=['POST'])
def add_lead():
    lead_data = request.get_json()

    if not lead_data:
        return jsonify({"message": "Invalid JSON or empty request body"}), 400

    validation_errors, clean_data = validate_lead_data(lead_data)

    if validation_errors:
        return jsonify({
            "status": "error",
            "message": "Validation failed",
            "errors": validation_errors
        }), 400

    try:
        new_lead = Lead(
            name=clean_data["name"],
            email=clean_data["email"],
            phone=clean_data["phone"],
            company=clean_data["company"],
            message=clean_data["message"]
        )

        db.session.add(new_lead)
        db.session.commit()

        return jsonify({
            "message": "Lead received successfully!",
            "lead_id": new_lead.id,
            "lead": new_lead.serialize()
        }), 201

    except IntegrityError as e:
        db.session.rollback()
        print(f"Registration error (Duplicate): {e}")
        if "lead_email_key" in str(e):
            return jsonify({
                "status": "error",
                "message": "Validation failed",
                "errors": {"email": "This email is already registered"}
            }), 409
        else:
            return jsonify({"message": "An integrity error ocurred"}), 400

    except Exception as e:
        db.session.rollback()
        print(f"Registration error (General): {e}")
        return jsonify({"message": "Unable to process your request at this time"}), 500
