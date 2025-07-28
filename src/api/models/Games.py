from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from api.database.db import db

class Games(db.Model):
    id:Mapped[int] = mapped_column(primary_key=True)
    img:Mapped[str] = mapped_column(String(500),nullable=False)
    name: Mapped[str]= mapped_column(String(50),nullable=False)
    platform:Mapped[str] = mapped_column(String(30),nullable=False)
    description: Mapped[str]= mapped_column(String(600),nullable=False)
    price: Mapped[float]=mapped_column(nullable=False)
    is_stock: Mapped[bool] = mapped_column(Boolean(),nullable= False)


    def serialize(self):
        return{
            "id":self.id,
            "img":self.img,
            "name":self.name,
            "platform": self.platform,
            "descriptio": self.description,
            "price":self.price,
            "is_stock":self.is_stock

        }

    
    

