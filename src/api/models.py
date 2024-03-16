from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(50),nullable=False)
    location = db.Column(db.String(100),nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "phone": self.phone,
            "location": self.location
        }
# class Books(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.String(50), unique=True, nullable=False)
#     author_name = db.Column(db.String(50), unique=True, nullable=False)
#     reviews = db.Column(db.String(450), nullable=True)
#     first_publish_year = db.Column(db.Integer, unique=True, nullable=True)
#     languages = db.Column(db.String(25), nullable=False)
#     publishers = db.Column(db.Integer, nullable=True)
#     publisher_places = db.Column(db.Integer, nullable=True)
#     typeOfBook = db.Column(db.String(15))
    
#     def _repr_(self):
#         return f"<Books(title='{self.title}',author='{self.author_name}', publish year='{self.first_publish_year})>"
    
#     def serialize(self):
#         return {
#             "id": self.id,
#             "title": self.title,
#             "author_name": self.author_name,
#         }

# class Comments(db.Model):
#     id=db.Column(db.Integer,primary_key=True)
#     date=db.Column(db.String(15),unique=True,nullable=True)
#     num_likes=db.Column(db.Integer,nullable=False)
#     num_dislikes=db.Column(db.Integer,nullable=False)
    
#     def serialize(self):
#         return {
#             "id": self.id,
#             "date": self.date,
#             "num_likes": self.num_likes
#         }
    