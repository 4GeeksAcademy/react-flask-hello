from flask import Blueprint, request, jsonify
from models import db, Favorite, Cocktail
from Auth import token_required

# Blueprint for favorites
favorites_bp = Blueprint('favorites_bp', __name__)

# Fetch all favorite cocktails of the current user
@favorites_bp.route('/favorites', methods=['GET'])
@token_required
def get_favorites(current_user):
    """
    Retrieve all favorite cocktails for the currently logged-in user.
    """
    favorites = Favorite.query.filter_by(user_id=current_user.id).all()
    favorite_list = [
        {
            'id': fav.cocktail.id,
            'name': fav.cocktail.name,
            'instructions': fav.cocktail.instructions,
            'glass_type': fav.cocktail.glass_type,
            'alcoholic': fav.cocktail.alcoholic,
            'image_url': fav.cocktail.image_url,
        }
        for fav in favorites
    ]
    return jsonify(favorite_list), 200

# Add a cocktail to the favorites list
@favorites_bp.route('/favorites', methods=['POST'])
@token_required
def add_favorite(current_user):
    """
    Add a cocktail to the user's favorites list.
    """
    data = request.get_json()
    cocktail_id = data.get('cocktail_id')

    if not cocktail_id:
        return jsonify({'message': 'Cocktail ID is required'}), 400

    cocktail = Cocktail.query.get(cocktail_id)
    if not cocktail:
        return jsonify({'message': 'Cocktail not found'}), 404

    # Check if the cocktail is already in favorites
    existing_favorite = Favorite.query.filter_by(user_id=current_user.id, cocktail_id=cocktail_id).first()
    if existing_favorite:
        return jsonify({'message': 'Cocktail is already in favorites'}), 409

    new_favorite = Favorite(user_id=current_user.id, cocktail_id=cocktail_id)
    db.session.add(new_favorite)
    db.session.commit()

    return jsonify({'message': 'Favorite added successfully'}), 201

# Remove a cocktail from the favorites list
@favorites_bp.route('/favorites/<int:cocktail_id>', methods=['DELETE'])
@token_required
def remove_favorite(current_user, cocktail_id):
    """
    Remove a cocktail from the user's favorites list.
    """
    favorite = Favorite.query.filter_by(user_id=current_user.id, cocktail_id=cocktail_id).first()

    if not favorite:
        return jsonify({'message': 'Favorite not found'}), 404

    db.session.delete(favorite)
    db.session.commit()

    return jsonify({'message': 'Favorite removed successfully'}), 200
