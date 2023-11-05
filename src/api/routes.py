from sqlalchemy.exc import IntegrityError
from flask import Flask, request, jsonify, Blueprint, jsonify, redirect, url_for
from api.models import db, User, Business_user, Offers, Trip, Review, Likes, Favorites
from api.utils import APIException
from flask_bcrypt import bcrypt, Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager, unset_jwt_cookies
from flask_cors import CORS  # Import CORS from flask_cors
from sqlalchemy import and_


api = Blueprint('api', __name__)
# Enable CORS for the 'api' Blueprint
CORS(api)

# Your existing code for JWTManager initialization and other configurations
jwt = JWTManager()


def initialize_jwt(api):
    jwt.init_app(api)


@api.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    serialized_users = [user.serialize() for user in users]
    return jsonify(serialized_users), 200


@api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'}), 200


@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify(message='User not found'), 404
    return jsonify(user.serialize())


@api.route('/business_users', methods=['GET'])
def get_all_business_users():
    try:
        business_users = Business_user.query.all()
        serialized_business_users = [
            business_user.serialize() for business_user in business_users]
        return jsonify(serialized_business_users), 200

    except Exception as e:
        return jsonify({'error': 'Error retrieving business users: ' + str(e)}), 500

# Décorez la route pour obtenir un business_user par son ID


@api.route('/business_users/<int:business_user_id>', methods=['GET'])
def get_business_user(business_user_id):
    business_user = Business_user.query.get(business_user_id)
    if not business_user:
        return jsonify(message='Business user not found'), 404
    return jsonify(business_user.serialize())


@api.route('/business_user/<int:business_user_id>', methods=['DELETE'])
def delete_business_user(business_user_id):
    user = Business_user.query.get(business_user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200


bcrypt = Bcrypt()

# Fonction d'initialisation de l'extension JWTManager avec l'application Flask


def initialize_jwt(api):
    jwt.init_app(api)


@api.route('/signup/user', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        print(data)
        email = data.get('email')
        print(email)
        password = data.get('password')
        username = data.get('username')
        firstname = data.get('firstname')
        lastname = data.get('lastname')
        passport = data.get('passport')
        phone_prefix = data.get('phone_prefix')
        phone_number = data.get('phone_number')
        address = data.get('address')
        payment_method = data.get('payment_method')
        cliente_ID_paypal = data.get('cliente_ID_paypal')
        secret_key_paypal = data.get('secret_key_paypal')

        # Vérifier si l'email et le mot de passe sont fournis
        if not email or not password:
            return jsonify({'error': 'Email and password are required.'}), 400

        # Vérifier si l'utilisateur existe déjà
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({'error': 'Email already exists.'}), 409

        # Hacher le mot de passe et créer l'utilisateur
        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(
            email=email,
            password=password_hash,
            username=username,
            firstname=firstname,
            lastname=lastname,
            phone_prefix=phone_prefix,
            phone_number=phone_number,
            passport=passport,
            address=address,
            payment_method=payment_method,
            cliente_ID_paypal=cliente_ID_paypal,
            secret_key_paypal=secret_key_paypal,
            is_admin=False  # Vous pouvez définir la valeur par défaut pour is_admin ici
        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": 'User created successfully', "user": new_user.serialize()}), 201

    except IntegrityError as e:
        db.session.rollback()  # Annuler l'opération en cas de violation de contrainte unique
        return jsonify({'error': 'Error in user creation: ' + str(e)}), 409

    except Exception as e:
        db.session.rollback()  # Annuler l'opération en cas d'autres erreurs
        return jsonify({'error': 'Error in user creation: ' + str(e)}), 500


@api.route('/signup/business_user', methods=['POST'])
def create_business_user():
    try:
        data = request.get_json()
        print(data)
        email = data.get('email')
        password = data.get('password')
        business_name = data.get('business_name')
        nif = data.get('nif')
        phone_prefix = data.get('phone_prefix')
        phone_number = data.get('phone_number')
        address = data.get('address')
        payment_method = data.get('payment_method')

        # Vérifier si l'email et le mot de passe sont fournis
        if not email or not password:
            return jsonify({'error': 'Email and password are required.'}), 400

        # Vérifier si l'email existe déjà pour une entreprise
        existing_business = Business_user.query.filter_by(email=email).first()

        if existing_business:
            return jsonify({'error': 'Email already exists.'}), 409

        # Hacher le mot de passe et créer l'entreprise
        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        new_business = Business_user(business_name=business_name, email=email, password=password_hash,
                                     phone_prefix=phone_prefix, phone_number=phone_number, nif=nif, address=address, payment_method=payment_method)

        db.session.add(new_business)
        db.session.commit()

        return jsonify({'message': 'Business_user created successfully', 'business': new_business.serialize()}), 201

    except Exception as e:
        return jsonify({'error': 'Error in business_user creation: ' + str(e)}), 500


@api.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()

        if not data.get("email") or not data.get("password"):
            return jsonify({'error': 'Email and password are required.'}), 400

        user_or_business = None

        # Vérifier si c'est un utilisateur
        user = User.query.filter_by(email=data['email']).first()
        if user:
            password_hash = user.password
            if bcrypt.check_password_hash(password_hash, data["password"]):
                user_or_business = user
                access_token = create_access_token(
                    identity=user_or_business.email)
                return jsonify(
                    {'access_token': access_token, 'user_or_business': user_or_business.serialize(), "type": "user"}), 200

        # Vérifier si c'est une entreprise
        business = Business_user.query.filter_by(email=data['email']).first()
        if business:
            password_hash = business.password
            if bcrypt.check_password_hash(password_hash, data["password"]):
                user_or_business = business
                access_token = create_access_token(
                    identity=user_or_business.email)
                return jsonify({'access_token': access_token, 'user_or_business': user_or_business.serialize(), "type": "business"}), 200

        if not user_or_business:
            return jsonify({'error': 'User or Business not found or Incorrect password'}), 401

        access_token = create_access_token(identity=user_or_business.email)
        return jsonify({'access_token': access_token, 'user_or_business': user_or_business.serialize()}), 200

    except Exception as e:
        return jsonify({'error': 'Error in login: ' + str(e)}), 500


@api.route('/logout', methods=['POST'])
@jwt_required()  # Requires authentication with a valid JWT token
def logout():
    unset_jwt_cookies()  # Remove JWT token from the client

    return redirect(url_for('/signup'))


@api.route('/private', methods=['GET'])
@jwt_required()
def private():

    current_user = get_jwt_identity()
    print(current_user)
    user = User.query.filter_by(email=current_user).first()
    print(current_user)
    print(user)

    if user:
        return jsonify({'message': 'Welcome to the private area!', 'user': user.serialize()})
    else:
        business = Business_user.query.filter_by(email=current_user).first()
        if business:
            return jsonify({'message': 'Welcome to the private area!', 'business': business.serialize()})
        else:
            return jsonify({'error': 'Unauthorized'}), 401


@api.route('/user/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user_profile(user_id):
    user = User.query.get(user_id)
    print(user)
    if not user:
        return jsonify({"message": "User not found"}), 404

    data = request.get_json()
    try:
        user.email = data['email']
        user.username = data['username']
        user.firstname = data['firstname']
        user.lastname = data['lastname']
        user.phone_prefix = data['phone_prefix']
        user.phone_number = data['phone_number']
        user.address = data['address']
        user.passport = data['passport']
        user.payment_method = data['payment_method']

        db.session.commit()
        return jsonify({'message': 'User profile updated successfully', 'user': user.serialize()}), 200
    except KeyError:
        return jsonify({"message": "Invalid data provided"}), 400
    except Exception as e:
        return jsonify({'error': 'Error in updating user profile: ' + str(e)}), 500


@api.route('/business_user/<int:business__id>', methods=['PUT'])
@jwt_required()
def update_business_profile(business_id):
    try:
        business_user = Business_user.query.get(business_id)

        if not business_user:
            return jsonify({'error': 'Business not found'}), 404

        data = request.get_json()

        # Update business profile data
        business_user.business_name = data.get(
            'name_business', business_user.business_name)
        business_user.email = data.get('email', business_user.email)
        business_user.phone_prefix = data.get(
            "phone_prefix", business_user.phone_prefix)
        business_user.phone_number = data.get(
            "phone_number", business_user.phone_number)
        business_user.nif = data.get('nif', business_user.nif)
        business_user.address = data.get('address', business_user.address)
        business_user.payment_method = data.get(
            'payment_method', business_user.payment_method)

        db.session.commit()

        return jsonify({'message': 'Business user profile updated successfully', 'business': business_user.serialize()}), 200

    except Exception as e:
        return jsonify({'error': 'Error in updating business user profile: ' + str(e)}), 500


@api.route('/token', methods=['POST'])
def get_token():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'error': 'Email and password are required.'}), 400

        user_or_business = None

        # Vérifier si c'est un utilisateur
        user = User.query.filter_by(email=email).first()
        if user:
            password_db = user.password
            if bcrypt.check_password_hash(password_db, password):
                user_or_business = user

        # Vérifier si c'est une entreprise
        business = Business_user.query.filter_by(email=email).first()
        if business:
            password_db = business.password
            if bcrypt.check_password_hash(password_db, password):
                user_or_business = business

        if not user_or_business:
            return jsonify({'error': 'User or Business not found or Incorrect password'}), 401

        access_token = create_access_token(identity=user_or_business.id)
        return jsonify({'access_token': access_token, 'user_or_business': user_or_business.serialize()}), 200

    except Exception as e:
        return jsonify({'error': 'Error in token generation: ' + str(e)}), 500


# offers routes

@api.route('/offers', methods=['GET'])
def get_all_offers():
    offers = Offers.query.all()
    serialized_offers = [offer.serialize() for offer in offers]
    return jsonify(offers=serialized_offers), 200


@api.route('/offer/<int:offer_id>', methods=['GET'])
def get_offer(offer_id):
    offer = Offers.query.filter_by(id=offer_id).first()
    if not offer:
        return jsonify({"message": "Offer not found"}), 404
    return jsonify(offer=offer.serialize()), 200


@api.route('/offers', methods=['POST'])
@jwt_required()
def create_offer():
    data = request.get_json()
    current_user = get_jwt_identity()
    business_user = Business_user.query.filter_by(email=current_user).first()
    print(current_user)
    print(data)
    try:
        offer = Offers(
            # trip_id=data['trip_id'],
            business_id=business_user.id,
            offer_title=data['offer_title'],
            offer_little_description=data['offer_little_description'],
            offer_description=data['offer_description'],
            country=data['country'],
            city=data['city'],
            normal_user_price=data['normal_user_price'],
            # medium_user_price=data['medium_user_price'],
            # high_user_price=data['high_user_price'],
            premium_user_price=data['premium_user_price'],
            offer_image=data['offer_image']
        )

        db.session.add(offer)
        db.session.commit()
        return jsonify(offer.serialize()), 201
    except KeyError:
        return jsonify({"message": "Invalid data provided"}), 400


@api.route('/offer/<int:offer_id>', methods=['PUT'])
@jwt_required()
def update_offer(offer_id):
    offer = Offers.query.get(offer_id)
    if not offer:
        return jsonify({"message": "Offer not found"}), 404

    data = request.get_json()
    try:
        offer.trip_id = data['trip_id'],
        offer.business_id = data['business_id'],
        offer.offer_title = data['offer_title'],
        offer.offer_little_description = data['offer_little_description'],
        offer.offer_description = data['offer_description'],
        offer.country = data['country'],
        offer.city = data['city'],
        offer.normal_user_price = data['normal_user_price']
        # offer.medium_user_price = data['medium_user_price']
        # offer.high_user_price = data['high_user_price']
        offer.premium_user_price = data['premium_user_price']
        offer.offer_image = data['offer_image']

        db.session.commit()
        return jsonify(offer.serialize()), 200
    except KeyError:
        return jsonify({"message": "Invalid data provided"}), 400


@api.route('/offer/<int:offer_id>', methods=['DELETE'])
@jwt_required()
def delete_offer(offer_id):
    offer = Offers.query.get(offer_id)
    if not offer:
        return jsonify({"message": "Offer not found"}), 404

    db.session.delete(offer)
    db.session.commit()
    return jsonify({"message": "Offer deleted successfully"}), 200


# Trip routes

@api.route('/trips', methods=['GET'])
def get_all_trips():
    trips = Trip.query.all()
    serialized_trips = [trip.serialize() for trip in trips]
    return jsonify(serialized_trips)


@api.route('/trip/<int:trip_id>', methods=['GET'])
def get_trip(trip_id):
    trip = Trip.query.get(trip_id)
    if not trip:
        return jsonify({"message": "Trip not found"}), 404
    return jsonify(trip.serialize())


@api.route('/trips', methods=['POST'])
@jwt_required()
def create_trip():
    data = request.get_json()
    try:
        trip_exist = Trip.query.filter(and_(
            Trip.country == data["country"], Trip.city == data["city"], Trip.activity == data["activity"])).first()
        if trip_exist:
            raise APIException(
                f"The trip with the country {data['country']} and the city {data['city']} and the {data['activity']} already exist.", status_code=403)
        trip = Trip(
            country=data['country'],
            city=data['city'],
            activity=data['actitvity']
        )
        db.session.add(trip)
        db.session.commit()
        return jsonify(trip.serialize()), 201
    except KeyError:
        return jsonify({"message": "Invalid data provided"}), 400


@api.route('/trip/<int:trip_id>', methods=['PUT'])
@jwt_required()
def update_trip(trip_id):
    trip = Trip.query.get(trip_id)
    if not trip:
        return jsonify({"message": "Trip not found"}), 404

    data = request.get_json()
    try:
        trip.country = data['country']
        trip.city = data['city']
        trip.city2 = data['city']
        trip.city3 = data['city']
        trip.city4 = data['city']

        db.session.commit()
        return jsonify(trip.serialize()), 200
    except KeyError:
        return jsonify({"message": "Invalid data provided"}), 400


@api.route('/trip/<int:trip_id>', methods=['DELETE'])
@jwt_required()
def delete_trip(trip_id):
    trip = Trip.query.get(trip_id)
    if not trip:
        return jsonify({"message": "Trip not found"}), 404

    db.session.delete(trip)
    db.session.commit()
    return jsonify({"message": "Trip deleted successfully"}), 200


# Routes for review


@api.route('/review', methods=['GET'])
def get_all_reviews():
    reviews = Review.query.all()
    serialized_reviews = [review.serialize() for review in reviews]
    return jsonify(serialized_reviews), 200


@api.route('/review/<int:review_id>', methods=['GET'])
def get_review(review_id):
    review = Review.query.filter_by(id=review_id).first()
    if not review:
        return jsonify({"message": "Review not found"}), 404
    return jsonify(review=review.serialize()), 200


@api.route('/offer/<int:offer_id>/reviews/', methods=['GET'])
def get_offer_reviews(offer_id):
    reviews = Review.query.filter_by(offer_id=offer_id).all()
    if len(reviews) < 1:
        return jsonify({"message": "No reviews for this offer"}), 404
    serialized_reviews = [review.serialize() for review in reviews]
    return jsonify(serialized_reviews), 200


@api.route('/review', methods=['POST'])
@jwt_required()
def create_review():
    data = request.get_json()
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    print(current_user)
    print(data)
    try:
        review = Review(
            user_id=user.id,
            offer_id=data['offer_id'],
            title=data['title'],
            comment_text=data['comment_text'],
            review_image=data['review_image'],
            country=data['country'],
            city=data['city'],
        )
        db.session.add(review)
        db.session.commit()
        return jsonify(review.serialize()), 201
    except KeyError:
        return jsonify({"message": "Invalid data provided"}), 400


@api.route('/review/<int:review_id>', methods=['PUT'])
@jwt_required()
def update_review(review_id):
    review = Review.query.get(review_id)
    if not review:
        return jsonify({"message": "Review not found"}), 404

    data = request.get_json()
    try:
        review.user_id = data['user_id']
        review.title = data['title']
        review.comment_text = data['comment_text']
        review.review_image = data['review_image']
        review.country = data['country']
        review.city = data['city']

        db.session.commit()
        return jsonify(review.serialize()), 200
    except KeyError:
        return jsonify({"message": "Invalid data provided"}), 400


@api.route('/review/<int:review_id>', methods=['DELETE'])
@jwt_required()
def delete_review(review_id):
    review = Review.query.get(review_id)
    if not review:
        return jsonify({"message": "Review not found"}), 404

    db.session.delete(review)
    db.session.commit()
    return jsonify({"message": "Review deleted successfully"}), 200


@api.route('/reviews/<int:review_id>/likes', methods=['GET'])
def get_likes_for_review(review_id):
    review = Review.query.get(review_id)
    if review is None:
        return jsonify({"error": "Review not found"}), 404

    likes = Likes.query.filter_by(review_id=review_id).all()
    print(len(likes))
    likes_len = int(len(likes))
    serialized_likes = [like.serialize() for like in likes]
    return jsonify({'user_data': serialized_likes, 'likes_len': likes_len})


@api.route('/reviews/<int:review_id>/likes', methods=['POST'])
@jwt_required()
def like_review(review_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()

    review = Review.query.get(review_id)
    if review is None:
        return jsonify(error='Review not found'), 404

    existing_like = Likes.query.filter_by(
        user_id=user.id, review_id=review_id).first()
    if existing_like:
        return jsonify(error='User has already liked this review'), 400

    like = Likes(user_id=user.id, review_id=review_id)
    db.session.add(like)
    db.session.commit()

    return jsonify(message='Review liked successfully'), 200

# Review favorites routes


@api.route('/reviews/favorites', methods=['GET'])
@jwt_required()
def get_favorites_for_user():
    current_user_id = get_jwt_identity()

    user = User.query.filter_by(email=current_user_id).first()
    if user is None:
        return jsonify({"error": "User not found"}), 404
    user_favorites = Favorites.query.filter_by(user_id=user.id).all()
    user_favorites = [favorite.serialize() for favorite in user_favorites]
    return jsonify(user_favorites), 200


@api.route('/reviews/favorites/<int:review_id>', methods=['POST'])
@jwt_required()
def add_favorite_for_review(review_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()

    review = Review.query.get(review_id)
    if review is None:
        return jsonify(error="Review not found"), 404

    existing_favorite = Favorites.query.filter_by(
        user_id=user.id, review_id=review_id).first()
    if existing_favorite:
        return jsonify(error="User has already added this review to favorites"), 400

    favorite = Favorites(user_id=user.id, review_id=review.id)
    db.session.add(favorite)
    db.session.commit()

    return jsonify(message="Review added to favorites successfully"), 200


@api.route('/reviews/favorites/<int:review_id>', methods=['DELETE'])
@jwt_required()
def remove_favorite_for_review(review_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()

    review = Review.query.get(review_id)
    if review is None:
        return jsonify(error="Review not found"), 404

    favorite = Favorites.query.filter_by(
        user_id=user.id, review_id=review_id).first()
    if favorite is None:
        return jsonify(error="Favorite not found"), 404

    db.session.delete(favorite)
    db.session.commit()

    return jsonify(message="Favorite removed successfully"), 200


# Offers favorites routes


@api.route('/offers/favorites', methods=['GET'])
@jwt_required()
def get_offerfavorites_for_user():
    current_user_id = get_jwt_identity()

    user = User.query.filter_by(email=current_user_id).first()
    if user is None:
        return jsonify({"error": "User not found"}), 404
    user_favorites = Favorites.query.filter_by(user_id=user.id).all()
    user_favorites = [favorite.serialize() for favorite in user_favorites]
    return jsonify(user_favorites), 200


@api.route('/offers/favorites/<int:offer_id>', methods=['POST'])
@jwt_required()
def add_favorite_for_offer(offer_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()

    offer = Offers.query.get(offer_id)
    if offer is None:
        return jsonify(error="Offer not found"), 404

    existing_favorite = Favorites.query.filter_by(
        user_id=user.id, offer_id=offer_id).first()
    if existing_favorite:
        return jsonify(error="User has already added this review to favorites"), 400

    favorite = Favorites(user_id=user.id, offer_id=offer.id)
    db.session.add(favorite)
    db.session.commit()

    return jsonify(message="Offer added to favorites successfully"), 200


@api.route('/offers/favorites/<int:offer_id>', methods=['DELETE'])
@jwt_required()
def remove_favorite_for_offer(offer_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()

    offer = Offers.query.get(offer_id)
    if offer is None:
        return jsonify(error="Offer not found"), 404

    favorite = Favorites.query.filter_by(
        user_id=user.id, offer_id=offer_id).first()
    if favorite is None:
        return jsonify(error="Favorite not found"), 404

    db.session.delete(favorite)
    db.session.commit()

    return jsonify(message="Favorite removed successfully"), 200
