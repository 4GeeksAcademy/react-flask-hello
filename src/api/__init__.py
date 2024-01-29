from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    is_promoter = db.Column(db.Boolean, default=False)

db.create_all()

# Registration endpoint
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    password = data.get('password')
    is_promoter = data.get('is_promoter', False)

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email is already registered'}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = User(first_name=first_name, last_name=last_name, email=email,
                    password=hashed_password, is_promoter=is_promoter)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

# Login endpoint
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id, expires_delta=False)
        return jsonify({'access_token': access_token, 'is_promoter': user.is_promoter}), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401

# Protected endpoint for promoters
@app.route('/api/create_event', methods=['POST'])
@jwt_required()
def create_event():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if current_user and current_user.is_promoter:
        return jsonify({'message': 'Event created successfully'}), 201
    else:
        return jsonify({'message': 'Permission denied'}), 403

# Protected endpoint for regular users
@app.route('/api/view_events', methods=['GET'])
@jwt_required()
def view_events():
    return jsonify({'message': 'Viewing events'}), 200

# Connection to the contact form
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///contact_form.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Table for contact form submissions
class ContactSubmission(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.Text, nullable=False)

db.create_all()

# Render the contact form page
@app.route('/contact', methods=['GET'])
def contact_form_page():
    return render_template('contact_form.html')

# Contact form submission endpoint
@app.route('/api/contact', methods=['POST'])
def contact_form():
    data = request.json
    email = data.get('email')
    message = data.get('message')

    new_submission = ContactSubmission(email=email, message=message)
    db.session.add(new_submission)
    db.session.commit()

    return jsonify({'message': 'Contact form submitted successfully'}), 201

if __name__ == '__main__':
    app.run(debug=True)
