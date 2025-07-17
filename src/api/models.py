from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean,ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List


db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)


    def serialize(self):
        return {
            "id": self.id,
            "name":self.name,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
class Category(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    description: Mapped[str] = mapped_column(nullable=False)


    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            # do not serialize the password, its a security breach
        } 
    
class PetType(db.Model):
    id: Mapped[bool] = mapped_column(primary_key= True, nullable=True) 
    name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    products: Mapped[List["Product"]] = relationship(
        back_populates = "product", cascade = "all, delete-orphan"
    )

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }

class Product(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    description: Mapped[str] = mapped_column(nullable=False)
    photo: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    coste: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    price: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    
    pet_type_id: Mapped[int] = mapped_column(ForeignKey("pet_type.id"))

    pet_type: Mapped["PetType"] = relationship(back_populates="product")
    stock: Mapped[int] = mapped_column(primary_key=True)


    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "photo": self.photo,
            "coste": self.coste,
            "price": self.price,
            "stock": self.stock,
            # do not serialize the password, its a security breach
        }
    
class ProductCategory(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)

    category_id: Mapped[int] = mapped_column(ForeignKey("category.id"))

    product: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    produc_id: Mapped[int] = mapped_column(primary_key=True)

    def serialize(self):
        return {
            "id": self.id,
        
            # do not serialize the password, its a security breach
        }
class Order(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)


    def serialize(self):
        return {
            "id": self.id,
            
            # do not serialize the password, its a security breach
        }
class Order_product(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    order_id: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    product_id: Mapped[str] = mapped_column(nullable=False)
    cant: Mapped[bool] = mapped_column(Boolean(), nullable=False)


    def serialize(self):
        return {
            "id": self.id,
            "cant": self.cant,
            # do not serialize the password, its a security breach
        }
