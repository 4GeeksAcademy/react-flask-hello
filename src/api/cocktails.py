from flask import Blueprint, request, jsonify
from models import db, Cocktail, Ingredient, CocktailIngredient
from Auth import token_required  # Ensure the file is named auth.py
from flask_restx import Namespace, Resource # install needed!!!

# Blueprint for cocktails
cocktail_bp = Blueprint('cocktail_bp', __name__)

# Namespace for RESTx documentation
cocktail_ns = Namespace('cocktails', description='Cocktail operations')

@cocktail_ns.route('/')
class CocktailList(Resource):
    def get(self):
        """Fetch all cocktails (Paginated)"""
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        cocktails = Cocktail.query.paginate(page=page, per_page=per_page, error_out=False)
        return {
            'total': cocktails.total,
            'page': cocktails.page,
            'pages': cocktails.pages,
            'cocktails': [
                {'id': c.id, 'name': c.name, 'instructions': c.instructions, 'alcoholic': c.alcoholic}
                for c in cocktails.items
            ]
        }, 200

    @token_required
    def post(self, current_user):
        """Add a new cocktail"""
        data = request.get_json()
        if not data or 'name' not in data or 'instructions' not in data:
            return jsonify({'message': 'Invalid data'}), 400

        new_cocktail = Cocktail(
            name=data['name'],
            instructions=data['instructions'],
            alcoholic=data.get('alcoholic', True),
            image_url=data.get('image_url'),
            glass_type=data.get('glass_type')
        )
        db.session.add(new_cocktail)
        db.session.commit()
        return jsonify({'message': 'Cocktail added!', 'id': new_cocktail.id}), 201

@cocktail_ns.route('/search')
class CocktailSearch(Resource):
    def get(self):
        """Find cocktails by ingredient"""
        ingredient_name = request.args.get('ingredient')
        if not ingredient_name:
            return jsonify({'message': 'Ingredient name is required'}), 400

        ingredient = Ingredient.query.filter_by(name=ingredient_name).first()
        if not ingredient:
            return jsonify({'message': 'Ingredient not found'}), 404

        cocktails = Cocktail.query.join(CocktailIngredient).filter(CocktailIngredient.ingredient_id == ingredient.id).all()
        return [{'id': c.id, 'name': c.name} for c in cocktails], 200

@cocktail_ns.route('/random')
class RandomCocktail(Resource):
    def get(self):
        """Get a random cocktail"""
        cocktail = Cocktail.query.order_by(db.func.random()).first()
        if not cocktail:
            return jsonify({'message': 'No cocktails found'}), 404

        return {
            'id': cocktail.id,
            'name': cocktail.name,
            'instructions': cocktail.instructions,
            'image_url': cocktail.image_url
        }, 200

# Attach Namespace for documentation
def register_cocktail_routes(api, app):
    """
    Registers the RESTx namespace and Flask blueprint with the app.
    """
    api.add_namespace(cocktail_ns, path='/cocktails')  # Add the namespace to Api
    app.register_blueprint(cocktail_bp, url_prefix='/cocktails')
