from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# **Database Configuration**
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "supersecretkey"

db = SQLAlchemy(app)

# **User Model (SQLAlchemy)**


class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    phone: Mapped[str] = mapped_column(String(20), unique=True, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
        }


# **MongoDB Setup for Favorites**
client = MongoClient("mongodb://localhost:27017")
mongo_db = client.cocktailDB
favorites_collection = mongo_db.favorites

# **Create Database Tables**
with app.app_context():
    db.create_all()

# **User Registration**


@app.route("/signup", methods=["POST"])
def register():
    data = request.json
    hashed_password = bcrypt.generate_password_hash(
        data["password"]).decode("utf-8")
    user = User(name=data["name"], email=data["email"],
                password=hashed_password, phone=data["phone"], is_active=True)
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 201

# **User Login**


@app.route("/login", methods=["POST"])
def login():
    data = request.json
    user = User.query.filter_by(email=data["email"]).first()
    if not user or not bcrypt.check_password_hash(user.password, data["password"]):
        return jsonify({"message": "Invalid credentials"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token}), 200

# **Get User Info**


@app.route("/user", methods=["GET"])
@jwt_required()
def get_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    return jsonify(user.serialize()), 200

# **Add Favorite**


@app.route("/favorites", methods=["POST"])
@jwt_required()
def add_favorite():
    user_id = get_jwt_identity()
    data = request.json
    favorite = {"userId": user_id, "drinkId": data["drinkId"],
                "drinkName": data["drinkName"], "drinkImage": data["drinkImage"]}
    favorites_collection.insert_one(favorite)
    return jsonify({"message": "Favorite added"}), 201

# **Get Favorites**


@app.route("/favorites", methods=["GET"])
@jwt_required()
def get_favorites():
    user_id = get_jwt_identity()
    favorites = list(favorites_collection.find(
        {"userId": user_id}, {"_id": 0}))
    return jsonify(favorites), 200

# **Delete Favorite**


@app.route("/favorites/<drink_id>", methods=["DELETE"])
@jwt_required()
def delete_favorite(drink_id):
    user_id = get_jwt_identity()
    favorites_collection.delete_one({"userId": user_id, "drinkId": drink_id})
    return jsonify({"message": "Favorite removed"}), 200


if __name__ == "__main__":
    app.run(debug=True)
