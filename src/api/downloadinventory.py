from flask import send_file, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import pandas as pd
import io
from api.models import Productos  
from . import upload  

@upload.route('/download-inventory', methods=['GET'])
@jwt_required()
def download_inventory():
    try:
        # Obtener el ID del usuario autenticado
        user_id = get_jwt_identity()

        # Filtrar productos que pertenecen a este usuario
        productos = Productos.query.filter_by(user_id=user_id).all()

        if not productos:
            return jsonify({"error": "No hay productos para exportar."}), 404

        # Convertir los productos a una lista de diccionarios
        data = [{
            'nombre_del_producto': p.product_name,
            'precio_por_unidad': p.price_per_unit,
            'descripción': p.description,
            'unidades': p.quantity
        } for p in productos]

        # Crear un DataFrame a partir de los datos
        df = pd.DataFrame(data)

        # Crear un archivo Excel en memoria
        output = io.BytesIO()
        with pd.ExcelWriter(output, engine='xlsxwriter') as writer:
            df.to_excel(writer, index=False, sheet_name='Inventario')

        # Regresar el puntero al inicio del archivo
        output.seek(0)

        # Enviar el archivo como respuesta
        return send_file(
            output,
            mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            as_attachment=True,
            download_name='inventario.xlsx'
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500
