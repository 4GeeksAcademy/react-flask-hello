# About the boilerplate

This boilerplate contains a Front-end React application and a Backend Python/Flask application.

# About the Front-end Application

We are using a very similar structure to the [basic react boilerplate](https://github.com/4GeeksAcademy/react-hello) that we used previously at the academy.

# About the Backend Application

## Coding a typical CRUD operation

As an example we are going to create a small API to manage a Person

### Adding an Model

For each `model` you will have to declare a class with the model properties and a method `serialize` that returns a dictionary representation of the class

```py
class Person(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    # tell python how to print the class object on the console
    def __repr__(self):
        return '<Person %r>' % self.username

    # tell python how convert the class object into a dictionary ready to jsonify
    def serialize(self):
        return {
            "username": self.username,
            "email": self.email
        }

```

### Adding an endpoint

For each endpoint you will need to have:
1. One `@APP` decorator that specifies the path for the expoint.
    - You can have parameters in the url like this `<int:person_id>`
    - You can specify what methods can be called on that endpoint like this `methods=['PUT', 'GET']`
2. The method what will execute when that endpoint is called (in this case `get_sinde_person`), the name of the method does not matter.
3. Inside the method you can speficy what logic to execute of each type of request using `if request.method == 'PUT'`
4. You have to return always a json and a status code (200,400,404, etc.)

```py
@APP.route('/person/<int:person_id>', methods=['PUT', 'GET'])
def get_single_person(person_id):
    """
    Single person
    """
    body = request.get_json() #{ 'username': 'new_username'}
    if request.method == 'PUT':
        user1 = Person.query.get(person_id)
        user1.username = body.username
        db.session.commit()
        return jsonify(user1.serialize()), 200
    if request.method == 'GET':
        user1 = Person.query.get(person_id)
        return jsonify(user1.serialize()), 200

    return "Invalid Method", 404
```
