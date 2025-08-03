from flask import Blueprint, request, jsonify
from api.models import db, CartItem


cart_bp = Blueprint('cart', __name__, url_prefix='/api')

@cart_bp.route('/cart', methods=['POST'])
def add_to_cart():
        data = request.get_json()
        item = CartItem(
            user_id=data['user_id'],
            event_id=data['event_id'],
            quantity=data.get('quantity', 1)
        )
        db.session.add(item)
        db.session.commit()
        return jsonify(item.serialize()), 201

@cart_bp.route('/cart/<int:user_id>', methods=['GET'])
def get_cart(user_id):
        items = CartItem.query.filter_by(user_id=user_id).all()
        return jsonify([item.serialize() for item in items]), 200

@cart_bp.route('/cart/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
        item = CartItem.query.get(item_id)
        if not item:
            return jsonify({"msg": "Item no encontrado"}), 404
        db.session.delete(item)
        db.session.commit()
        return jsonify({"msg": "Item eliminado"}), 200