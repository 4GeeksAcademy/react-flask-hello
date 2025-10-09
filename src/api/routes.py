"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Friend, Todo, GroupTodo
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import and_, or_
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

#--------------------------------------------CRUD TOKEN-------------------------------------------------#

#-----------------------------TOKEN CREATION--------------------------#
@api.route('/auth/login', methods=['POST'])
def login():
    
    identificator = request.json.get("identificator", None)

    
    if not identificator:
        return jsonify({"error": "none email or user_name has been provided"}),400

    password = request.json.get("password", None)

    if not password:
        return jsonify({"error": "none password has been provided"}), 400

    user = User.query.filter(or_(User.email == identificator , User.user_name == identificator), User.password==password).first()

    if not user:
        return jsonify({"error": "bad login information"}),400
    

    access_token = create_access_token(identity=str(user.id))

    return jsonify({"token": access_token, "user_id": user.id}), 200
    
#-----------------------------TOKEN VERIFICATION--------------------------#

@api.route('/auth/protected', methods=['GET'])
@jwt_required()
def protected_access():

    current_user_id = get_jwt_identity()
    
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"error": "user not found"}),404
    
    if not user.is_active:
        return jsonify({"error": "user is inactive"}),403

    return jsonify({"id": user.id, "user_name": user.user_name}),200





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
    
    data = request.get_json()

    if not data:
        return jsonify({"error": "send a body with info to see all friendship todos"}),400
    
    friendship_id = data.get("friendship_id")

    if not friendship_id:
        return jsonify({"error": "none friendship_id provided"}),400
    
    group_todos = GroupTodo.query.filter_by(friend_id=friendship_id).all()

    if not group_todos:
        return jsonify({"error": "none group todos has been founded with the provided friendship_id"}),400
    
    return jsonify([group_todo.serialize() for group_todo in group_todos]),200



   
 #-----------------GET UNIQUE FRIEND Todo------------------#
@api.route('/friendship/todo', methods=['GET'])
def get_friendship_todo():
    
    data = request.get_json()

    if not data:
        return jsonify({"error": "none body information has been provided"}),400
    
    friendship_id = data.get("friendship_id")
    group_todo_id = data.get("group_todo_id")

    if not friendship_id or not group_todo_id:
        return jsonify({"error": "you have not provided a friendship_id or group_todo_id"}),400
    
    group_todo = GroupTodo.query.filter_by(friend_id=friendship_id, id=group_todo_id).first()

    if not group_todo_id:
        return jsonify({"error": "none group todo has been founded with the provided friendship_id or group_todo_id"}),400
    
    return jsonify(group_todo.serialize()),200
    



 #-----------------CREATE UNIQUE FRIEND Todo------------------# 
@api.route('/friendship/todo', methods=['POST'])
def create_friendship_todo():


    data = request.get_json()

    if not data:
        return jsonify({"error": "none body information has been provided"}),400
    
    title = data.get("title")
    description = data.get("description")
    friendship_id = data.get("friendship_id")

    if not title and not friendship_id:

        return jsonify({"error": "please provide a friendship_id and a title"}),400
    
    friendship = Friend.query.get(friendship_id)

    if not friendship:
        return jsonify({"error": "there is not friendship with this friendship_id"}), 400
    
    group_todo = GroupTodo(friend_id=friendship_id, title=title)

    if description:
        group_todo.description = description

    db.session.add(group_todo)
    db.session.commit()

    return jsonify(group_todo.serialize()),200




 #-----------------DELETE UNIQUE FRIEND Todo------------------# 

@api.route('/friendship/todo', methods=['DELETE'])
def delete_friendship_todo():
    
    data = request.get_json()

    if not data:
        return jsonify({"error": "none body information has been provided"}),400


    friendship_id = data.get("friendship_id")
    group_todo_id = data.get("group_todo_id")

    if not friendship_id or not group_todo_id:
        return jsonify({"error": "none friendship_id or group_todo_id has been provided"}),400
    
    if not isinstance(friendship_id, int) or not isinstance(group_todo_id,int):
        return jsonify({"error": "friendship_id and group_todo_id must be integer numbers"}),400
    
    friendship = Friend.query.get(friendship_id)

    if not friendship:
        return jsonify({"error":"none friendship has been founded with the provided friendship_id"}),400
    
    group_todo = GroupTodo.query.filter_by(friend_id=friendship_id, id=group_todo_id).first()

    if not group_todo:
        return jsonify({"error": "none group_todo has been founded with the provided friendship_id and group_todo_id"}),400
    
    db.session.delete(group_todo)
    db.session.commit()

    return jsonify({"message": "group_todo successfully deleted"}),200


 #-----------------EDIT UNIQUE FRIEND Todo------------------# 
@api.route('/friendship/todo', methods=['PATCH'])
def edit_friendship_todo():
    
    data = request.get_json()

    if not data:
        return jsonify({"error": "none body information has been provided"}),400

    friendship_id = data.get("friendship_id")
    group_todo_id = data.get("group_todo_id")

    if not friendship_id or not group_todo_id:
        return jsonify({"error": "none friendship_id or group_todo_id has been provided"}),400
    
    if not isinstance(friendship_id, int) or not isinstance(group_todo_id,int):
        return jsonify({"error": "friendship_id and group_todo_id must be integer numbers"}),400
    
    friendship = Friend.query.get(friendship_id)

    if not friendship:
        return jsonify({"error":"none friendship has been founded with the provided friendship_id"}),400
    
    group_todo = GroupTodo.query.filter_by(friend_id=friendship_id, id=group_todo_id).first()

    if not group_todo:
        return jsonify({"error": "none group_todo has been founded with the provided friendship_id and group_todo_id"}),400
    
    title = data.get("title")
    description = data.get("description")

    if not title and not description:
        return jsonify({"error": "please provide a title or a description data to modify the actual group_todo"}),400

    if title:

        old_title = group_todo.title.replace(" ", "").lower()
        new_title = title.replace(" ", "").lower()

        if old_title == new_title:
            return jsonify({"error": "new title can not be the same as the older one"}),400

        group_todo.title = title

    if description:

        old_description = group_todo.description.replace(" ", "").lower()
        new_description = description.replace(" ", "").lower()

        if old_description == new_description:
            return jsonify({"error": "new description can not be the same as the older one"}),400

        group_todo.description = description

    db.session.commit()

    return jsonify(group_todo.serialize()), 200
    
