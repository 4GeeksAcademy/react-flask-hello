from flask import Blueprint, request, jsonify, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.models import db, User, Facturas, Productos, Detalles_Facturas, Buy, BuyItem
from api.utils import generateBill


import os


buys_bp = Blueprint('buys_bp', __name__)

@buys_bp.route('/compra', methods=['POST'])
@jwt_required()
def registrar_compra():
    data = request.get_json()
    buyer_id = get_jwt_identity()

    items = data.get('items', [])
    if not items:
        return jsonify({"msg": "Carrito vacío"}), 400

    total = sum(item['cantidad'] * item['precio'] for item in items)
    producto = Productos.query.get(items[0]['id'])
    vendedor = User.query.get(producto.user_id)
    comprador = User.query.get(buyer_id)

# Crear BuyItems y actualizar stock
    buy_items = []
    for item in items:
        producto = Productos.query.get(item['id'])
        if not producto:
            return jsonify({"msg": f"Producto con ID {item['id']} no encontrado"}), 404
        if producto.quantity < item['cantidad']:
            return jsonify({"msg": f"Stock insuficiente para {producto.product_name}"}), 400
        producto.quantity -= item['cantidad']

        buy_items.append(BuyItem(
            producto_id=item['id'],
            cantidad=item['cantidad'],
            precio=item['precio']
        ))

        #Añade datos de nueva compra.
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
        producto = Productos.query.get(item['id'])
        if producto.stock < item['cantidad']:
            return jsonify({"msg": f"Stock insuficiente para {producto.title}"}), 400
        producto.stock -= item['cantidad']

    # Crea factura de compra 
    factura = Facturas(name="Factura de compra", cif_empresa=vendedor.shopname)
    db.session.add(factura)
    db.session.flush()
    pdf_path = generateBill(factura, comprador, vendedor, item)
    nueva_compra.factura_path = pdf_path

    db.session.commit()

    return jsonify({"msg": "Compra registrada", "factura": f"/factura/{nueva_compra.id}"})

@buys_bp.route('/factura/<int:id>', methods=['GET'])
def download_invoice(id):
    compra = Buy.query.get_or_404(id)
    if not compra.factura_path or not os.path.exists(compra.factura_path):
        return jsonify({'error': 'Factura no encontrada'}), 404
    return send_file(compra.factura_path, as_attachment=True)

@buys_bp.route('/productos', methods=['GET'])
def get_productos():
    productos = Productos.query.all()
    return jsonify([p.serialize() for p in productos]), 200
