from flask import Blueprint, request, jsonify
from ..models import db, Payments, Clients
from flask_jwt_extended import jwt_required

payments_routes = Blueprint('payments_routes', __name__)

@payments_routes.route('/payments', methods=['GET'])
@jwt_required()
def get_payments():
    payments = Payments.query.all()
    if not payments:
        return jsonify({"msg": "No payments found"}), 404

    serialized_payments = [payment.serialize_payment() for payment in payments]
    return jsonify(serialized_payments), 200

@payments_routes.route('/payments/<int:client_id>', methods=['GET'])
@jwt_required()
def get_payment(client_id):
    payments = Payments.query.filter_by(client_id=client_id).all()
    if not payments:
        return jsonify({"error": "Payment not found"}), 404

    payments_made = [payment.serialize_payment() for payment in payments]
    return jsonify(payments_made), 200

@payments_routes.route('/payments', methods=['POST'])
@jwt_required()
def add_payment():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Data not found"}), 404

    required_fields = [
        "client_email",
        "payment_method",
        "estimated_total",
        "payments_made",
        "payment_date",
        "status"
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"the field {field} is required"}), 400

    try:
        client = Clients.query.filter_by(
            email=data["client_email"]).first()
        if not client:
            return jsonify({"error": "Client not found"}), 404

        new_payment = Payments(
            client_id=client.id,
            payment_method=data["payment_method"],
            estimated_total=data["estimated_total"],
            payments_made=data["payments_made"],
            payment_date=data["payment_date"],
            status=data["status"]
        )

        db.session.add(new_payment)
        db.session.commit()

        return jsonify({
            "msg": "Payment registered successfully",
            "payment": new_payment.serialize_payment()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500