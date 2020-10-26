"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, UserImage
from api.utils import generate_sitemap, APIException
import cloudinary

#from models import Person

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

@api.route('/upload', methods=['POST', 'GET'])
def handle_upload():

    if 'image' not in request.files:
        raise APIException("No image to upload")

    my_image = UserImage()

    result = cloudinary.uploader.upload(
        request.files['image'],
        public_id=f'sample_folder/profile/my-image-name',
        crop='limit',
        width=450,
        height=450,
        eager=[{
            'width': 200, 'height': 200,
            'crop': 'thumb', 'gravity': 'face',
            'radius': 100
        },
        ],
        tags=['profile_picture']
    )

    my_image.url = result['secure_url']
    my_image.save()

    return jsonify(my_image.serialize()), 200