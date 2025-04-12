#👇 ❇️ Riki for the group success 11 Abril 👊

# routes/quote_routes.py (COMPLETO)
from flask import Blueprint, jsonify, request, render_template, send_file
from api.models.models import db, Quote, User, Field
from sqlalchemy.orm import joinedload
from datetime import datetime, timedelta
from services.pricing_service import calculate_quote
from weasyprint import HTML
import tempfile
import os

print("✅ quote_routes CARGADO")

quote = Blueprint('quote_routes', __name__)

# POST /presupuesto (Crear nuevo presupuesto)
@quote.route('/presupuesto', methods=['POST'])
def create_quote():
    print("📥 Recibida petición en /presupuesto")
    try:
        data = request.get_json()
        print("DEBUG POST DATA:", data)
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
        print("❌ ERROR EN POST /presupuesto:", str(e))
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# GET /presupuesto/<id> (Obtener presupuesto específico)
@quote.route('/presupuesto/<int:id>', methods=['GET'])
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

@quote.route('/test-crear-presupuesto', methods=['GET'])
def crear_presupuesto_para_prueba():
    try:
        user = User.query.get(1)
        field = Field.query.get(1)
        if not user or not field:
            return jsonify({"error": "Usuario o parcela no existen"}), 400

        total = 123.45
        new_quote = Quote(
            cost=total,
            description="olivo | mensual | Servicios: fotogrametria",
            field_id=field.id,
            user_id=user.id,
            created_at=datetime.utcnow()
        )
        db.session.add(new_quote)
        db.session.commit()

        return jsonify({
            "id": new_quote.id,
            "mensaje": "Presupuesto de prueba creado correctamente"
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# GET /presupuesto/<id>/pdf (Generar y devolver el PDF)
@quote.route('/presupuesto/<int:id>/pdf', methods=['GET'])
def generate_pdf(id):
    try:
        quote = Quote.query.options(joinedload(Quote.user), joinedload(Quote.field)).get(id)
        if not quote:
            return jsonify({"error": "Presupuesto no encontrado"}), 404

        # Simulación de desglose a partir de description
        data = {
            "user": f"{quote.user.name} {quote.user.lastname}",
            "field": quote.field.name,
            "cropType": quote.description.split(" | ")[0],
            "frequency": quote.description.split(" | ")[1],
            "services": quote.description.split(" | ")[2].replace("Servicios: ", ""),
            "hectares": quote.field.area,  # Ajusta según tu modelo
            "price_per_hectare": round(quote.cost / quote.field.area, 2),
            "total": quote.cost,
            "valid_until": (quote.created_at + timedelta(days=30)).strftime("%Y-%m-%d")
        }

        html = render_template("presupuesto.html", **data)

        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as f:
            HTML(string=html).write_pdf(f.name)
            return send_file(f.name, as_attachment=True, download_name="presupuesto_dronfarm.pdf")

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@quote.route('/usuario/<int:user_id>/presupuestos', methods=['GET'])
def get_user_quotes(user_id):
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404

        quotes = Quote.query.filter_by(user_id=user_id).order_by(Quote.created_at.desc()).all()

        result = []
        for quote in quotes:
            result.append({
                "id": quote.id,
                "cost": quote.cost,
                "description": quote.description,
                "created_at": quote.created_at.strftime("%Y-%m-%d %H:%M"),
                "field": quote.field.name if quote.field else None
            })

        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@quote.route("/presupuestos/<int:quote_id>/pdf", methods=["GET"])
def get_quote_pdf(quote_id):
    try:
        quote = Quote.query.get(quote_id)
        if not quote:
            return jsonify({"error": "Presupuesto no encontrado"}), 404

        # Ruta donde guardas tus PDFs
        pdf_folder = os.path.join(os.getcwd(), "pdfs")
        pdf_path = os.path.join(pdf_folder, f"presupuesto_{quote_id}.pdf")

        # Si el archivo no existe, genera uno falso para probar (luego se reemplaza con generación real)
        if not os.path.exists(pdf_path):
            with open(pdf_path, "w") as f:
                f.write(f"Presupuesto #{quote_id} - Simulación de PDF")

        return send_file(pdf_path, as_attachment=True)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
