from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, ForeignKey, Integer, Float, Boolean, Column, Table
from sqlalchemy.orm import Mapped, mapped_column, relationship, declarative_base
from typing import List
import enum

db = SQLAlchemy()
Base = declarative_base()

product_category = Table(
    'product_category',
    db.Model.metadata,
    Column('product_id', ForeignKey('product.id'), primary_key=True),
    Column('category_id', ForeignKey('category.id'), primary_key=True)
)

class Status(enum.Enum):
    CART = 'cart'
    PENDING = 'pending'
    COMPLETED = 'completed'
    CANCELLED = 'cancelled'
    

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120),nullable=True) 
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped [bool] = mapped_column(Boolean(), nullable=False)

    order: Mapped [List["Order"]] = relationship(
        back_populates= "user", cascade= "all, delete-orphan"
    )


    def serialize(self):
        return {
            "id": self.id,
            "name":self.name,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
class Order(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    status: Mapped[Status] = mapped_column(default= Status.CART)
    
    
    user: Mapped ["User"] = relationship(
        back_populates= "order" 
    )
    order_item: Mapped [List["OrderItem"]] = relationship(
        back_populates= "order", cascade= "all, delete-orphan"
    )


    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.id,
            
            # do not serialize the password, its a security breach
        }
    
class Category(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    description: Mapped[str] = mapped_column(String(), nullable=False)

    products: Mapped[list["Product"]] = relationship(
        secondary=product_category,
        back_populates="categories"
    )


    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description
        } 
    def serialize_category_bis(self):
        return {
        "id": self.id,
        "name": self.name
    }
    
class PetType(db.Model):
    id: Mapped[int] = mapped_column(primary_key= True) 
    name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    products: Mapped[List["Product"]] = relationship(
        back_populates = "pet_type", cascade = "all, delete-orphan"
    )

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }
    
    def serialize_pet_type(self):
        return {
        "id": self.id,
        "name": self.name
    }
    
    

class Product(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    description: Mapped[str] = mapped_column(String(), nullable=False)
    photo: Mapped[str] = mapped_column(String(), nullable=False) 
    coste: Mapped[float] = mapped_column(Float(), nullable=False)
    price: Mapped[float] = mapped_column(Float(), nullable=False)
    pet_type_id: Mapped[int] = mapped_column(ForeignKey("pet_type.id"))
    stock: Mapped[int] = mapped_column(Integer(), nullable=True)
    

    pet_type: Mapped["PetType"] = relationship(
        back_populates="products")
    
    order_items: Mapped[List["OrderItem"]] = relationship(
        back_populates= "product", cascade= "all, delete-orphan"
    )
   
    categories: Mapped[list["Category"]] = relationship(
        secondary=product_category,
        back_populates="products"
    )

    def serialize(self):
        categories = []  # Por defecto lista vacía
        pet_type = None  # Por defecto None
    
        if self.categories:
            categories = [category.serialize_category_bis() for category in self.categories]
        if self.pet_type:
            pet_type = self.pet_type.serialize_pet_type()
        
        return {
        "id": self.id,
        "name": self.name,
        "description": self.description,
        "photo": self.photo,
        "coste": self.coste,
        "pet_type": pet_type,
        "price": self.price,
        "categories": categories,
        "stock": self.stock
    }

    
    def serialize_category_bis(self):
        return {
        "id": self.id,
        "name": self.name
    }
    


class OrderItem(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    order_id: Mapped[int] = mapped_column(ForeignKey("order.id")) 
    product_id: Mapped[int] = mapped_column(ForeignKey("product.id"))
    cant: Mapped[int] = mapped_column(Integer(), nullable=False)
    order: Mapped ["Order"] = relationship(
        back_populates= "order_item"
    )
    
    product: Mapped["Product"]= relationship(
        back_populates= "order_items"
    )

    def serialize(self):
        return {
            "id": self.id,
            "order_id": self.order_id,
            "product_id": self.product_id,
            "cant": self.cant
            }