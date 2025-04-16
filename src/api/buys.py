from flask import Blueprint, request, jsonify, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Buy, User, Product
from utils import generateBill
import os

bp = Blueprint('buys', __name__)

@bp.route('/compra', methods=['POST'])
@jwt_required()
def registrar_compra():
    data = request.get_json()
    buyer_id = get_jwt_identity()

    items = data.get('items', [])
    if not items:
        return jsonify({"msg": "Carrito vacío"}), 400

    total = sum(item['cantidad'] * item['precio'] for item in items)
    producto = Product.query.get(items[0]['id'])
    vendedor = User.query.get(producto.user_id)
    comprador = User.query.get(buyer_id)

    nueva_compra = Buy(
        buyer_id=buyer_id,
        seller_id=vendedor.id,
        items=items,
        total=total
    )
    db.session.add(nueva_compra)
    db.session.flush()  # Genera compra.id sin hacer commit

    # Disminuye unidades de stock
    for item in items:
        producto = Product.query.get(item['id'])
        if producto.stock < item['cantidad']:
            return jsonify({"msg": f"Stock insuficiente para {producto.title}"}), 400
        producto.stock -= item['cantidad']

    # Crea factura de compra 
    pdf_path = generateBill(bill, comprador, vendedor, item)
    nueva_compra.factura_path = factura_path

    db.session.commit()

    return jsonify({"msg": "Compra registrada", "factura": f"/factura/{nueva_compra.id}"})

@bp.route('/factura/<int:id>', methods=['GET'])
def download_invoice(id):
    compra = Buy.query.get_or_404(id)
    if not compra.factura_path or not os.path.exists(compra.factura_path):
        return jsonify({'error': 'Factura no encontrada'}), 404
    return send_file(compra.factura_path, as_attachment=True)
