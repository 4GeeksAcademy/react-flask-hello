"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Friend, Todo, GroupTodo
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import and_

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


# CRUD USERS-------------------------------------------------------------------------------------------------------------||

#----------------GET ALL USERS----------------------------------#
@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200


#----------------GET SPECIFIC USER----------------------------------#

@api.route('/user/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "please use a correct user id, no user founded with the gived one "})
    return jsonify(user.serialize())


# ------------------------------CREATE USER-----------------------#

@api.route('/user', methods=['POST'])
def create_user():

    recieved = request.get_json()
    user_name = recieved.get("user_name")
    email = recieved.get("email")
    password = recieved.get("password")

    if not user_name or not email:
        return jsonify({"message": "user_name and email are obligatory"}), 400
    if not password:
        return jsonify({"message": "password are obligatory"}), 400

    user = User(user_name=user_name, email=email, password=password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": f"{user_name} user created"}), 200

# --------------------------DELETE USER----------------------------#


@api.route('/user/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "please send a correct id user to delete"})
    user_name = user.user_name
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": f"{user_name} user deleted successfully"})


# --------------------------EDIT USER------------------------------#
@api.route('/user/<int:id>', methods=['PATCH'])
def edit_user(id):

    user = User.query.get(id)

    data = request.get_json()
    if not data:
        return {"error": "please send information to update "}


    for key,value in data.items():

        user_founded = User.query.filter(getattr(User, key) == value).first()

        if user_founded and user_founded.id != id:
            return jsonify({"error": "user_name o email already exist, try using another one"}),400

        if hasattr(user, key):
            setattr(user,key,value)
    
    db.session.commit()



    return jsonify(user.serialize()), 200




#------------------------------------------------------FIN CRUD USERS----------------------------------------------------------------------------#

#------------------------------------------------------FRIEND CRUD--------------------------------------------------------------------------------#

#-----------------------GET USER FRIENDSHIPS---------------------------#
@api.route('user/friendships/', methods=['GET'])
def get_frienship():
    
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "please send a body with the user_id information"}),400
    
    user_id = data["user_id"]

    if not user_id:
        return jsonify({"error": "please send a user_id information on the body"}),400
    
    friendships = Friend.query.filter((Friend.user_from_id ==user_id)  | (Friend.user_to_id ==user_id)).all()

    if not friendships:
        return jsonify({"error": "none friendships founded for the given user_id"}),400
    
    return jsonify({"friendships": [friendship.serialize() for friendship in friendships]}), 200


#-------------------------GET USER FRIENDSHIP -----------------------------#
@api.route('user/friendship', methods=['GET'])
def get_friendship():

    data = request.get_json()

    if not data:
        return jsonify({"error": "please send a body with the user_to_id and user_from_id information"}), 400
    
    user_to_id = data['user_to_id']
    user_from_id = data['user_from_id']

    if not user_to_id or not user_from_id:
        return jsonify({"error": "please send the user_to_id and user_from_id to find the friendship correctly"}),400
    
    friendship = Friend.query.filter(and_(Friend.user_from_id== user_from_id, Friend.user_to_id == user_to_id)).first()

    if not friendship:
        return jsonify({"error": "none friendship has been founded with both provided id's"}),400

    user_from = User.query.get(user_from_id)

    if not user_from:
        return jsonify({"error": "none user has been founded with the provided user_from_id"}),400
    
    user_to = User.query.get(user_to_id)

    if not user_to:
        return jsonify({"error": "none user has been founded with the provided user_to_id"}),400
    

    return jsonify({"friendship_members": [user_from.user_name, user_to.user_name], "friendship_id": friendship.id}),200


#--------------------------CREATE USER FRIENDSHIP--------------------------------------#
@api.route('user/friendship', methods=['POST'])
def create_friendship():
    
    data = request.get_json()

    if not data:
        return jsonify({"error": "send a body with info to create a friendship"}),400
    
    user_from_id = data["user_from_id"]
    user_to_id = data["user_to_id"]

    if not user_from_id or not user_to_id:
        return jsonify({"error": "please send the user_to_id and user_from_id to find the friendship correctly"}),400
    
    user_from = User.query.get(user_from_id)

    if not user_from:
        return jsonify({"error": "none user has been founded with the provided user_from_id"}),400
    
    user_to = User.query.get(user_to_id)

    if not user_to:
        return jsonify({"error": "none user has been founded with the provided user_to_id"}),400
    

    existing_friendship = Friend.query.filter(and_(Friend.user_from_id == user_from_id, Friend.user_to_id == user_to_id)).first()
    
    if existing_friendship:
        return jsonify({"error": "this friendship relation already exists"}), 400
    

    friendship = Friend(user_from_id=user_from_id, user_to_id=user_to_id)

    db.session.add(friendship)
    db.session.commit()

    return jsonify({"message": f"friendship between {user_from.user_name} and {user_to.user_name} successfully created"}), 200


    
#---------------------------DELETE USER FRIENDSHIP --------------------------------------#
@api.route('/user/friendship', methods=['DELETE'])
def delete_friendship():
    
    data = request.get_json()

    if not data:
        return jsonify({"error": "send a body with info to create a friendship"}),400
    
    user_from_id = data["user_from_id"]
    user_to_id = data["user_to_id"]

    if not user_from_id or not user_to_id:
        return jsonify({"error": "please send the user_to_id and user_from_id to delete the friendship correctly"}),400
    
    friendship = Friend.query.filter(and_(Friend.user_from_id == user_from_id, Friend.user_to_id == user_to_id)).first()

    if not friendship:
        return jsonify({"error": "friendship not founded"}), 400

    db.session.delete(friendship)
    db.session.commit()

    return jsonify({"message": "friendship deleted successfully"}),200



#-------------------------------------------FIN CRUD FRIEND --------------------------------------------------------------------------------------------#


#------------------------------------------- Todo'S CRUD  --------------------------------------------------------------------------------------------#
    
 #-----------------GET ALL USER Todos------------------#
@api.route('/user/todos', methods=['GET'])
def get_user_todos():

    data = request.get_json()

    if not data:
        return jsonify({"error": "send a body with info to create a friendship"}),400

    user_id = data["user_id"]

    if not user_id:
        return jsonify({"error": "missing user_id field on the body"}),400
    
    todos = Todo.query.filter_by(user_id=user_id).all()

    if not todos:
        return jsonify({"error": "there is no todos for this user_id"}), 400
    
    return jsonify([todo.serialize() for todo in todos]),200



 #-----------------GET UNIQUE USER Todo------------------#
@api.route('/user/todo', methods=['GET'])
def get_user_todo():
    
    data = request.get_json()

    if not data:
        return jsonify({"error": "send a body with info to get an user todo"}),400
    
    user_id = data["user_id"]
    todo_id = data["todo_id"]
    
    
    if not user_id and not todo_id:
        return jsonify({"error": "missing user_id and todo_id field on the body"}),400
    
    todo = Todo.query.filter_by(user_id=user_id, id=todo_id).first()

    if not todo:
        return jsonify({"error": "none todo has been founded with the user_id or todo_id"}), 400
    
    return jsonify(todo.serialize())
    

 #-----------------CREATE UNIQUE USER Todo------------------# 
@api.route('/user/todo', methods=['POST'])
def create_user_todo():
    
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "send a body with info to create an user todo"}),400
    


    title = data.get("title")
    description = data.get("description")
    user_id = data.get("user_id")

    if not title and not user_id:

        return jsonify({"error": "please provide an user_id and a title"}),400
    
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "there is not user with this user_id"}), 400

    todo = Todo(title=title, user_id=user_id)

    if description:
        todo.description = description

    db.session.add(todo)
    db.session.commit()

    return jsonify(todo.serialize())

 #-----------------DELETE UNIQUE USER Todo------------------# 

@api.route('/user/todo', methods=['DELETE'])
def delete_user_todo():
        
        data = request.get_json()

        if not data:
            return jsonify({"error": "send a body with info to delete an user todo"}),400

        user_id = data.get("user_id")
        todo_id = data.get("todo_id")

        if not user_id or not todo_id:
            return jsonify({"error": "user_id and todo_id fields are missing"}), 400
        
        user = User.query.get(user_id)

        if not user:
            return jsonify({"error": "no user was founded with the provided user_id"}),400
        
        todo = Todo.query.filter_by(user_id=user_id, id=todo_id).first()

        if not todo:
            return jsonify({"error": "no todo was founded with the provided todo_id"}),400
        
        db.session.delete(todo)
        db.session.commit()

        return jsonify({"message": f"the todo with the id {todo_id} associated with the user {user_id} was successfully deleted"}), 200
 

 #-----------------EDIT UNIQUE USER Todo------------------# 
@api.route('/user/todo', methods=['PATCH'])
def edit_user_todo():
    
    data = request.get_json()

    if not data:
         return jsonify({"error": "send a body with info to modify an user todo"}),400

    user_id = data.get("user_id")
    todo_id = data.get("todo_id")

    if not user_id or not todo_id:
            return jsonify({"error": "user_id and todo_id fields are missing"}), 400
    
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "no user was founded with the provided user_id"}),400
    

    todo = Todo.query.filter_by(user_id=user_id, id=todo_id).first()

    if not todo:
        return jsonify({"error": "there was not todo founded with the provided user_id and todo_id"}),400
    
    title = data.get("title")
    description = data.get("description")
    
    if not title and not description:
        return jsonify({"error":"no fields to update, please provide a title or a description"}),400

    if title:
        todo.title = title
    if description:
        todo.description = description


    db.session.commit()

    return jsonify(todo.serialize()), 200
    

#-------------------------------------------FIN CRUD Todo --------------------------------------------------------------------------------------------#

#-------------------------------------------GROUPTODO CRUD --------------------------------------------------------------------------------------------#

#-----------------GET ALL FRIEND Todos------------------#
@api.route('/friendship/todos', methods=['GET'])
def get_friendship_todos():
    pass

   
 #-----------------GET UNIQUE FRIEND Todo------------------#
@api.route('/friendship/todo', methods=['GET'])
def get_friendship_todo():
    pass   

 #-----------------CREATE UNIQUE FRIEND Todo------------------# 
@api.route('/friendship/todo', methods=['GET'])
def create_friendship_todo():
    pass    

 #-----------------DELETE UNIQUE FRIEND Todo------------------# 

@api.route('/friendship/todo', methods=['GET'])
def delete_friendship_todo():
    pass

 #-----------------EDIT UNIQUE FRIEND Todo------------------# 
@api.route('/friendship/todo', methods=['GET'])
def edit_friendship_todo():
    pass



