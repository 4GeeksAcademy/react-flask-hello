"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Programs
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)



@api.route('/programs', methods=['GET'])
def get_all_programs():
    programs_list = Programs.query.all()
    programs_serialized = [program.serialize() for program in programs_list] 
    return jsonify(programs_serialized), 200


@api.route("/updateProgram", methods=['PUT'])
def update_program():
    data = request.get_json()
    updated_programs = []

    for item in data:
        
        existing_program = Programs.query.filter_by(id=item.get("id")).first()

        if existing_program:
            existing_program.name = item.get("name",existing_program.name)
            existing_program.program_number = item.get("program_number",existing_program.program_number)
            existing_program.description = item.get("description",existing_program.description)
            existing_program.monday_start = item.get("monday_start",existing_program.monday_start)
            existing_program.monday_end = item.get("monday_end",existing_program.monday_end)
            existing_program.tuesday_start = item.get("tuesday_start",existing_program.tuesday_start)
            existing_program.tuesday_end = item.get("tuesday_end",existing_program.tuesday_end)
            existing_program.wednesday_start = item.get("wednesday_start",existing_program.wednesday_start)
            existing_program.wednesday_end = item.get("wednesday_end",existing_program.wednesday_end)
            existing_program.thursday_start = item.get("thursday_start",existing_program.thursday_start)
            existing_program.thursday_end = item.get("thursday_end",existing_program.thursday_end)
            existing_program.friday_start = item.get("friday_start",existing_program.friday_start)
            existing_program.friday_end = item.get("friday_end",existing_program.friday_end)
            existing_program.saturday_start = item.get("saturday_start",existing_program.saturday_start)
            existing_program.saturday_end = item.get("saturday_end",existing_program.saturday_end)
            existing_program.sunday_start = item.get("sunday_start",existing_program.sunday_start)
            existing_program.sunday_end = item.get("sunday_end",existing_program.sunday_end)

            db.session.commit()  
            updated_programs.append(existing_program)
        else:
          
            new_program = Programs(
            name = item["name"],
            description = item["description"],
            monday_start = item["monday_start"]
            , monday_end = item["monday_end"]
            ,tuesday_start = item["tuesday_start"]
            , tuesday_end = item["tuesday_end"]
            ,wednesday_start = item["wednesday_start"]
            , wednesday_end = item["wednesday_end"]
            ,thursday_start = item["thursday_start"]
            , thursday_end = item["thursday_end"]
            ,friday_start = item["friday_start"]
            ,friday_end = item["friday_end"]
            ,saturday_start = item["saturday_start"]
            , saturday_end = item["saturday_end"]
            ,sunday_start = item["sunday_start"]
            ,sunday_end = item["sunday_end"]
            )
            db.session.add(new_program)
            db.session.commit()
            updated_programs.append(new_program)

    return jsonify([program.serialize() for program in updated_programs])