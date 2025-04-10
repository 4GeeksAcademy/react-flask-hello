#👇 ❇️ Riki for the group success 10 Abril 👊


# routes/quote_routes.py (COMPLETO)
from flask import Blueprint, jsonify, request
from models import db, Quote, User, Field
from sqlalchemy.orm import joinedload
from datetime import datetime
from services.pricing_service import calculate_quote


quote_routes = Blueprint('quote_routes', __name__)

# POST /presupuesto (Crear nuevo presupuesto)
@quote_routes.route('/presupuesto', methods=['POST'])
def create_quote():
    try:
        data = request.get_json()
        required_fields = ['hectares', 'cropType', 'services', 'frequency', 'field_id', 'user_id']
        
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Campos faltantes"}), 400

        # Calcular presupuesto con servicio separado
        quote_data = calculate_quote(
            hectareas=data['hectares'],
            tipo_cultivo=data['cropType'],
            servicio="fotogrametria",  # TODO: adaptar si hay varios servicios
            periodicidad=data['frequency']
        )

        # Guardar en base de datos
        new_quote = Quote(
            cost=quote_data["total"],
            description=f"{data['cropType']} | {data['frequency']} | Servicios: {', '.join(data['services'])}",
            field_id=data['field_id'],
            user_id=data['user_id'],
            created_at=datetime.utcnow()
        )
        
        db.session.add(new_quote)
        db.session.commit()

        return jsonify({
            "id": new_quote.id,
            "total": quote_data["total"],
            "precio_unitario": quote_data["precio_por_hectarea"],
            "valido_hasta": quote_data["valido_hasta"],
            "details": new_quote.description
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# GET /presupuesto/<id> (Obtener presupuesto específico)
@quote_routes.route('/presupuesto/<int:id>', methods=['GET'])
def get_quote(id):
    try:
        quote = Quote.query.options(joinedload(Quote.user), joinedload(Quote.field)).get(id)
        if not quote:
            return jsonify({"error": "Presupuesto no encontrado"}), 404
            
        return jsonify({
            "id": quote.id,
            "cost": quote.cost,
            "user": f"{quote.user.name} {quote.user.lastname}",
            "field": quote.field.name,
            "created_at": quote.created_at.isoformat(),
            "description": quote.description
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500