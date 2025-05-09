from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# **Database Configuration**
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"  
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "supersecretkey"

db = SQLAlchemy(app)

# **User Model**
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(20), unique=True, nullable=False)
    is_active = db.Column(db.Boolean, default=True)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
        }

# **Favorites Model**
class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    drink_id = db.Column(db.String(50), nullable=False)
    drink_name = db.Column(db.String(120), nullable=False)
    drink_image = db.Column(db.String(255), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "drink_id": self.drink_id,
            "drink_name": self.drink_name,
            "drink_image": self.drink_image,
        }

# **Create Database Tables**
with app.app_context():
    db.create_all()

# **User Registration**
@app.route("/signup", methods=["POST"])
def register():
    data = request.json
    hashed_password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    user = User(name=data["name"], email=data["email"], password=hashed_password, phone=data["phone"])
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
    favorite = Favorite(user_id=user_id, drink_id=data["drinkId"], drink_name=data["drinkName"], drink_image=data["drinkImage"])
    db.session.add(favorite)
    db.session.commit()
    return jsonify({"message": "Favorite added"}), 201

# **Get Favorites**
@app.route("/favorites", methods=["GET"])
@jwt_required()
def get_favorites():
    user_id = get_jwt_identity()
    favorites = Favorite.query.filter_by(user_id=user_id).all()
    return jsonify([fav.serialize() for fav in favorites]), 200

# **Delete Favorite**
@app.route("/favorites/<drink_id>", methods=["DELETE"])
@jwt_required()
def delete_favorite(drink_id):
    user_id = get_jwt_identity()
    favorite = Favorite.query.filter_by(user_id=user_id, drink_id=drink_id).first()
    if favorite:
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({"message": "Favorite removed"}), 200
    return jsonify({"message": "Favorite not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
