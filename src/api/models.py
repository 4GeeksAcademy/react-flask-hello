from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__='user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(120), unique=False, nullable=False)
    age = db.Column(db.Integer, unique=False, nullable=False)
    profile_picture = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_admin = db.Column(db.Boolean(), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

#informacion cuando se hace print en el admin
    def __repr__(self):
        return 'User ID: {} - Username: {}'.format(self.id, self.username)

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "name": self.name,
            "age": self.age,
            "profile_picture": self.profile_picture,
            "email": self.email
            # do not serialize the password, its a security breach
        }
    
class Movie_Review(db.Model):
    __tablename__ = "movie_review"
    id = db.Column(db.Integer, primary_key=True)
    movie_id = db.Column(db.String(120), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    user_relationship = db.relationship(User)
    review = db.Column(db.String(300), nullable=False)
    rating = db.Column(db.Float())

    # informacion cuando se hace print en el admin
    def __repr__(self):
        return "Movie ID: {} - User ID: {}".format(self.movie_id, self.user_id)

    def serialize(self):
        return {
            "id": self.id,
            "movie_id": self.movie_id,
            "user_id": self.user_id,
            "rating": round(float(self.rating), 2) if self.rating else None,
            "review": self.review
            # do not serialize the password, its a security breach
        }

class View_State(db.Model):
    __tablename__='view_state'
    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(
        db.Enum("Visto", "Por Ver", name="State"), unique=True, nullable=False
    )


#informacion cuando se hace print en el admin
    def __repr__(self):
        return 'Estado de Visualización: {}'.format(self.value)

    def serialize(self):
        return {
            "id": self.id,
            "value": self.value
        }
    
class Personal_List(db.Model):
    __tablename__='personal_list'
    id = db.Column(db.Integer, primary_key=True)
    movie_id = db.Column(db.String(120),unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user_relationship = db.relationship(User)
    view_state_id = db.Column(db.Integer, db.ForeignKey('view_state.id'), nullable=False)
    view_state_relationship = db.relationship(View_State)

#informacion cuando se hace print en el admin
    def __repr__(self):
        return 'Usuario ID: {} - Movie ID: {} - Estado ID: {}'.format(self.user_id, self.movie_id, self.view_state_id)

    def serialize(self):
        return {
            "id": self.id,
            "movie_id": self.movie_id,
            "user_id": self.user_id,
            "view_state_id": self.view_state_id
        }
        
class Follower(db.Model):
    __tablename__='follower'
    id = db.Column(db.Integer, primary_key=True)
    user_from_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user_to_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user_from_id_relationship = db.relationship(User, foreign_keys = [user_from_id])
    user_to_id_relationship = db.relationship(User, foreign_keys = [user_to_id])

#informacion cuando se hace print en el admin
    def __repr__(self):
        return 'Usuario ID: {} - Usuario ID: {}'.format(self.user_from_id, self.user_to_id)

    def serialize(self):
        return {
            "id": self.id,
            "user_from_id": self.user_from_id,
            "user_to_id": self.user_to_id
        }
