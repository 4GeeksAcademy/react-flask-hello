from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(300), unique=True, nullable=False)
    relese_date = db.Column(db.String(80), unique=False, nullable=False)
    poster = db.Column(db.String(3000), unique=False, nullable=False)
    description= db.Column(db.String(3000), unique=False, nullable=False)
    funny = db.Column(db.Integer, unique=False, nullable=False)
    happy = db.Column(db.Integer, unique=False, nullable=False)
    sunday = db.Column(db.Integer, unique=False, nullable=False)
    family = db.Column(db.Integer, unique=False, nullable=False)
    couple = db.Column(db.Integer, unique=False, nullable=False)
    epic = db.Column(db.Integer, unique=False, nullable=False)
    etc = db.Column(db.Integer, unique=False, nullable=False)
    
    

    def __repr__(self):
        return f'<Movie {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "relese_date": self.relese_date,
            "poster": self.poster,
            "funny": self.funny,
            "happy": self.happy,
            "sunday": self.sunday,
            "family": self.family,
            "couple": self.couple,
            "epic": self.epic,
            "etc": self.etc,

            

            # do not serialize the password, its a security breach
        }
    

class Movie_2(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(300), unique=True, nullable=False)
    relese_date = db.Column(db.String(80), unique=False, nullable=False)
    poster = db.Column(db.String(3000), unique=False, nullable=False)
    description= db.Column(db.String(3000), unique=False, nullable=False)
    funny= db.Column(db.Boolean, nullable=False)
    sad= db.Column(db.Boolean, nullable=False)
    couple= db.Column(db.Boolean, nullable=False)
    party= db.Column(db.Boolean, nullable=False)
    action= db.Column(db.Boolean, nullable=False)
    drama= db.Column(db.Boolean, nullable=False)
    family= db.Column(db.Boolean, nullable=False)
    kids= db.Column(db.Boolean, nullable=False)
    animation= db.Column(db.Boolean, nullable=False)
    violence= db.Column(db.Boolean, nullable=False)
    historical= db.Column(db.Boolean, nullable=False)
    epic= db.Column(db.Boolean, nullable=False)
    happy= db.Column(db.Boolean, nullable=False)
    hard_to_watch= db.Column(db.Boolean, nullable=False)
    motivating= db.Column(db.Boolean, nullable=False)
    blockbuster= db.Column(db.Boolean, nullable=False)
    very_famous= db.Column(db.Boolean, nullable=False)
    independent= db.Column(db.Boolean, nullable=False)
    sunday_movie= db.Column(db.Boolean, nullable=False)
    terror= db.Column(db.Boolean, nullable=False)
    christmas= db.Column(db.Boolean, nullable=False)
    halloween= db.Column(db.Boolean, nullable=False)
    white_noise= db.Column(db.Boolean, nullable=False)



    
    
    

    def __repr__(self):
        return f'<Movie_2 {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "relese_date": self.relese_date,
            "poster": self.poster,
            "funny": self.funny,
            "sad": self.sad,
            "couple": self.couple,
            "party": self.party,
            "action": self.action,
            "drama": self.drama,
            "family": self.family,
            "kids": self.kids,
            "animation": self.animation,
            "violence": self.violence,
            "historical": self.historical,
            "epic": self.epic,
            "happy": self.happy,
            "hard_to_watch": self.hard_to_watch,
            "motivating": self.motivating,
            "blockbuster": self.blockbuster,
            "very_famous": self.very_famous,
            "independent": self.independent,
            "sunday_movie": self.sunday_movie,
            "terror": self.terror,
            "christmas": self.christmas,
            "halloween": self.halloween,
            "white_noise": self.white_noise,


            

            # do not serialize the password, its a security breach
        }