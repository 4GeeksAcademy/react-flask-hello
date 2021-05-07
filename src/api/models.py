from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fullName = db.Column(db.String(255), unique=False, nullable=False)
    username = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_Admin = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }


class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=False, nullable=False)
    fullName = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return '<Client %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "fullName": self.fullName,
            "email": self.email,
            # do not serialize the password, its a security breach
        }


class Seller(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=False, nullable=False)
    fullName = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return '<Seller %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "fullName": self.fullName,
            "email": self.email,
            # do not serialize the password, its a security breach
        }


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fk_id = db.Column(db.Integer, db.ForeignKey('seller.id'), unique=True, nullable=False)
    productName = db.Column(db.String(255),  nullable=False)
    price = db.Column(db.Integer, nullable=False)
    image = db.Column(db.Integer, unique=False, nullable=False)

    def __repr__(self):
        return '<Product %r>' % self.productName

    def serialize(self):
        return {
            "id": self.id,
            "productName": self.productName,
            "price": self.price,
            "price": self.image
            # do not serialize the password, its a security breach
        }
