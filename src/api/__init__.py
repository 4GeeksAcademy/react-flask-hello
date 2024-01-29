from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
 
 #conection to the contact form 
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///contact_form.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

#here is the table that allows the us
class ContactSubmission(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.Text, nullable=False)

db.create_all()

# Render the contact form page
#change the name of variable to
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
