from sqlalchemy import String, Boolean,Integer
from sqlalchemy.orm import Mapped, mapped_column
from api.database.db import db

class Games(db.Model):
    id:Mapped[int] = mapped_column(primary_key=True)
    img:Mapped[str] = mapped_column(String(500),nullable=False)

    name: Mapped[str]= mapped_column(String(50),nullable=False)
    platform:Mapped[str] = mapped_column(String(30),nullable=False)
    description: Mapped[str]= mapped_column(String(600),nullable=False)
    price: Mapped[float]=mapped_column(nullable=False)
    genero: Mapped[str] = mapped_column(String(20),nullable=False)
    distribuidora: Mapped[str]= mapped_column(String(20), nullable=False)
    online:Mapped[int] = mapped_column(nullable=False)
    offline: Mapped[int]= mapped_column(nullable=False)
    gamemode: Mapped[str] = mapped_column(String(30),nullable=False)


  
    


    def serialize(self):
        return{
            "id":self.id,
            "img":self.img,
            "name":self.name,
            "platform": self.platform,
            "description": self.description,
            "price":self.price,
            "genero":self.genero,
            "distribuidora": self.distribuidora,
            "online": self.online,
            "offline":self.offline,
            "gamemode":self.gamemode
        
        }

    
    

