from flask import Blueprint, request, jsonify
from api.models import Purchase, db
from flask_jwt_extended import jwt_required, get_jwt_identity

purchase_bp = Blueprint('purchase', __name__,)


@purchase_bp.route('/', methods=['POST'])
@jwt_required()  # Solo usuarios registrados pueden acceder
def purchase_ticket():
    data = request.get_json()
    current_user_id = get_jwt_identity()  # ID extraído del token JWT

    try:
        new_purchase = Purchase(
            user_id=current_user_id,
            event_id=data["event_id"],
            quantity=data["quantity"]
        )
        db.session.add(new_purchase)
        db.session.commit()
        return jsonify({"msg": "Compra realizada con éxito"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al procesar la compra", "error": str(e)}),
