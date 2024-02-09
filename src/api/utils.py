import bcrypt
from flask import jsonify, url_for
import hashlib
from flask_bcrypt import Bcrypt
from openai import OpenAI
import os
import json

client = OpenAI(api_key=os.environ.get("OPENAPI_KEY", ""))


class APIException(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv["message"] = self.message
        return rv


def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)


def generate_sitemap(app):
    links = ["/admin/"]
    for rule in app.url_map.iter_rules():
        # Filter out rules we can't navigate to in a browser
        # and rules that require parameters
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            if "/admin/" not in url:
                links.append(url)

    links_html = "".join(["<li><a href='" + y + "'>" + y + "</a></li>" for y in links])
    return (
        """
        <div style="text-align: center;">
        <img style="max-height: 80px" src='https://i.pinimg.com/originals/94/b6/84/94b6843382aad570a497bb5884b216ca.jpg' />
        <h1>Welcome to the DioDio Travel Assistant!</h1>
        <p>API HOST: <script>document.write('<input style="padding: 5px; width: 300px" type="text" value="'+window.location.href+'" />');</script></p>
        <p>Start working on your project by following the <a href="https://start.4geeksacademy.com/starters/full-stack" target="_blank">Quick Start</a></p>
        <p>Remember to specify a real endpoint path like: </p>
        <ul style="text-align: left;">"""
        + links_html
        + "</ul></div>"
    )


def get_openai_response(user_input):
    user_messages = [
        {
            "role": "system",
            "content": """
            you are a helpful assistant, you are able to provide all the information useful for a traveler who is planning a trip. You know all the restaurants in the world, all the roads in the world, all the public transports in the world, all the activities in the world. Based on eight inputs provided by the user you are able to tailor and provide a very detailed itinerary based on the number of days at disposal, the number of travellers in the group, the age of the travellers, the dietary requirements, the activities suggested and so on. I would like for you to suggest specific hotels based on the budget, specific restaurants based on the dietary requirements and what transport methods to use to move from one place to the other. Remember to adjust the itinerary based on the group size and level of fitness and make sure to provide an itinerary day by day. You will return a JSON string.

            Example of input:

            Location: Iceland
            Group size: 2
            Time at disposal: 7 days
            Time of the year: February
            Interests: Museums
            Level of fitness: Good
            Dietary requirement: Vegan
            Budget: 100£ per day

            This is the expected output format and the info:
            [
            {
            // each object is considered a new day
            "accomodation":"Bob's hotel 4 stars",
            "lunch":"MCDonnalds at president's shopping mall",
            "activities":[
                "Museum of classic Rome History",
                "Museum of Big Bang"
            ],
            "transportation":"Public transportation: Bus or Metro",  // Verify if public transportation of the given location is good otherwise choose alternatives
            "dinner":"Seafood at sea's restaurant, av. lib. 25" // choose a different food style from lunch that matches the user's particularities
            },
            {
            "accomodation": "Junior AirBnB at street 25",
            "lunch": "Italian Republic at Principal street",
            "activities": ["Walk at the lake's shore", "Go to the giant monument of Leo"],
            "transportation": "Taxi or Uber",
            "dinner": "Fruit salad at Geoge fuits on street 2nd of march",
            }
            ]            

            Please note that the comments are not valid as an output in a JSON format. Just use them for guidance.

            """,
        },
        {
            "role": "user",
            "content": user_input,
        },
    ]
    print(user_input)
    response = client.chat.completions.create(
        model="gpt-3.5-turbo-1106",
        messages=user_messages,
        max_tokens=1024,
        response_format={"type": "json_object"},
    )
    assistant_reply = response.choices[0].message.content
    return assistant_reply


def format_user_input(user_input):
    formatted_input = "\n".join(
        [f"{key}: {value}" for key, value in user_input.items()]
    )
    return formatted_input


def validate_user_input(user_input):
    required_keys = [
        "Location",
        "Group size",
        "Time at disposal",
        "Time of the year",
        "Interests",
        "Level of fitness",
        "Dietary requirement",
        "Budget",
    ]

    missing_keys = [key for key in required_keys if key not in user_input]
    if missing_keys:
        return {
            "valid": False,
            "error": f"Missing required keys: {', '.join(missing_keys)}",
        }

    return {"valid": True, "error": None}


def get_hash(string):
    return hashlib.sha256(bytes(string, "utf-8")).hexdigest()



