from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    username = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username
        }

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


class Favorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    coin_id = db.Column(db.String(10))
    name = db.Column(db.String(20))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    symbol = db.Column(db.String(20))
    user = db.relationship(User)

    def __repr__(self):
        return f'<Favorites {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "coin_id": self.coin_id,
            "name": self.name,
            "user_id": self.user_id,
            "symbol": self.symbol
        }


class Wallet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    coin_id = db.Column(db.String(10))
    name = db.Column(db.String(100))  # Corrected type from Integer to String for the name
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    symbol = db.Column(db.String(20))
    purchase_price = db.Column(db.String(20))
    purchase_quantity = db.Column(db.String(20))
    user = db.relationship(User)

    def __repr__(self):
        return f'<Wallet {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "coin_id": self.coin_id,
            "name": self.name,
            "user_id": self.user_id,
            "symbol": self.symbol,
            "purchase_price": self.purchase_price,
            "purchase_quantity": self.purchase_quantity
        }
