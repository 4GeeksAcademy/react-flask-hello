# 👇 ❇️ Riki for the group success  10 Abril 👊

from flask import Blueprint, request, jsonify
from src.services.pricing_service import calculate_quote  # Importar servicio nuevo

quote_bp = Blueprint('quote', __name__)

@quote_bp.route('/presupuesto', methods=['POST'])
def generate_quote():
    data = request.get_json()
    required_fields = ['hectareas', 'tipo_cultivo', 'servicio', 'periodicidad']
        
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Faltan campos obligatorios"}), 400

        # 2. Calcular presupuesto
        resultado = calculate_quote(
            hectareas=data['hectareas'],
            tipo_cultivo=data['tipo_cultivo'],
            servicio=data['servicio'],
            periodicidad=data['periodicidad']
        )

        # 3. Retornar respuesta estructurada
        return jsonify({
            "status": "success",
            "presupuesto": {
                "precio_por_hectarea": resultado['precio_por_hectarea'],
                "hectareas": data['hectareas'],
                "periodicidad": data['periodicidad'],
                "total": resultado['total'],
                "moneda": "EUR",
                "valido_hasta": resultado['valido_hasta']  # Fecha +30 días
            }
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    # ... (resto del código que te envié antes)

# POST /presupuesto
# GET /presupuesto/{id}
