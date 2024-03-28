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

    # Define relationship with Books (reviews)
    reviews = db.relationship('Books', backref='reviewer', lazy=True)
    favorites = db.relationship('Favorites', backref='user', lazy=True)

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

class Books(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), unique=True, nullable=False)
    author_name = db.Column(db.String(50), nullable=False)
    reviews = db.Column(db.String(450), nullable=True)
    first_publish_year = db.Column(db.Integer, nullable=True)
    languages = db.Column(db.String(25), nullable=False)
    publishers = db.Column(db.Integer, nullable=True)
    publisher_places = db.Column(db.Integer, nullable=True)
    typeOfBook = db.Column(db.String(15))
    
    # Add column for user_id
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    favorites = db.relationship('Favorites', backref='book', lazy=True)

    def __repr__(self):
        return f"<Books(title='{self.title}', author='{self.author_name}', publish year='{self.first_publish_year}')>"
    
    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "author_name": self.author_name,
            "user_id":self.user_id
        }

class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(15), unique=True, nullable=True)
    num_likes = db.Column(db.Integer, nullable=False)
    num_dislikes = db.Column(db.Integer, nullable=False)
    
    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "num_likes": self.num_likes,
            "num_dislikes": self.num_dislikes
        }

class Favorites(db.Model):
    __tablename__ = "favorites"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False)
    
    def __repr__(self):
        return f"<Favorites(user_id='{self.user_id}', book_id='{self.book_id}')>"