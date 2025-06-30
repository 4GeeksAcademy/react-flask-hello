from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from datetime import datetime
import enum

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    address = db.Column(db.Text, nullable=True)
    city = db.Column(db.String(50), nullable=True)
    postal_code = db.Column(db.String(10), nullable=True)
    is_active = db.Column(db.Boolean(), nullable=False, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relaciones
    cart_items = db.relationship('CartItem', backref='user', lazy=True, cascade='all, delete-orphan')
    orders = db.relationship('Order', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "phone": self.phone,
            "address": self.address,
            "city": self.city,
            "postal_code": self.postal_code,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

class CategoryEnum(enum.Enum):
    ELECTRONICS = "electronics"
    CLOTHING = "clothing"
    HOME = "home"
    BOOKS = "books"
    SPORTS = "sports"
    BEAUTY = "beauty"
    TOYS = "toys"
    OTHER = "other"

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    stock = db.Column(db.Integer, nullable=False, default=0)
    category = db.Column(db.Enum(CategoryEnum), nullable=False)
    image_url = db.Column(db.String(500), nullable=True)
    is_active = db.Column(db.Boolean(), nullable=False, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relaciones
    cart_items = db.relationship('CartItem', backref='product', lazy=True)
    order_items = db.relationship('OrderItem', backref='product', lazy=True)

    def __repr__(self):
        return f'<Product {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": float(self.price),
            "stock": self.stock,
            "category": self.category.value if self.category else None,
            "image_url": self.image_url,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }

class CartItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<CartItem {self.user_id}-{self.product_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "product_id": self.product_id,
            "product": self.product.serialize() if self.product else None,
            "quantity": self.quantity,
            "subtotal": float(self.product.price * self.quantity) if self.product else 0,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }

class OrderStatusEnum(enum.Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    total_amount = db.Column(db.Numeric(10, 2), nullable=False)
    status = db.Column(db.Enum(OrderStatusEnum), nullable=False, default=OrderStatusEnum.PENDING)
    stripe_payment_intent_id = db.Column(db.String(200), nullable=True)
    shipping_address = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relaciones
    order_items = db.relationship('OrderItem', backref='order', lazy=True, cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Order {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "total_amount": float(self.total_amount),
            "status": self.status.value if self.status else None,
            "stripe_payment_intent_id": self.stripe_payment_intent_id,
            "shipping_address": self.shipping_address,
            "order_items": [item.serialize() for item in self.order_items],
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }

class OrderItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)  

    def __repr__(self):
        return f'<OrderItem {self.order_id}-{self.product_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "order_id": self.order_id,
            "product_id": self.product_id,
            "product": self.product.serialize() if self.product else None,
            "quantity": self.quantity,
            "price": float(self.price),
            "subtotal": float(self.price * self.quantity)
        }