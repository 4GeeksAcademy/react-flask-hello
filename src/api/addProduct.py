from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.models import db, Productos
from api.buys import buys_bp


@buys_bp.route('/productos', methods=['POST'])
@jwt_required()  
def add_producto():
    data = request.get_json()

    user_id = get_jwt_identity()  # ID del usuario logueado

    nuevo_producto = Productos(
        product_name=data.get('product_name'),
        price_per_unit=data.get('price_per_unit'),
        description=data.get('description'),
        quantity=data.get('quantity'),
        image_url=data.get('image_url'),
        user_id=user_id  
    )

    db.session.add(nuevo_producto)
    db.session.commit()

    return jsonify({"msg": "Producto añadido correctamente"}), 201