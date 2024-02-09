from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f"<User {self.email}>"

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            # do not serialize the password, it's a security breach
        }
    
class Itinerary(db.Model):
    __tablename__= 'itinerary'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    itinerary_name = db.Column(db.String(50))
    user = db.relationship(User)
    data = db.Column(db.JSON)

    def __repr__(self):
        return f"<Itinerary {self.id}>"

    def serialize(self):
        return {
            "id": self.id,
            "data": self.data,
            "itinerary_name": self.itinerary_name,
            # do not serialize the password, it's a security breach
        }