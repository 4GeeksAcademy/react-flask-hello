import os
import jwt
import datetime
from flask import jsonify, url_for

# JWT Creation
def create_token(user_id):
    payload = {
        "user_id": user_id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }
    token = jwt.encode(payload, os.getenv("JWT_SECRET_KEY", "super-secret"), algorithm="HS256")
    return token

# JWT Decoding
def decode_token(token):
    try:
        payload = jwt.decode(token, os.getenv("JWT_SECRET_KEY", "super-secret"), algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

# APIException class for error handling
class APIException(Exception):
    def __init__(self, message, status_code=400):
        super().__init__(message)
        self.message = message
        self.status_code = status_code

    def to_dict(self):
        return {"message": self.message}

# Sitemap generation for development
def generate_sitemap(app):
    output = []
    for rule in app.url_map.iter_rules():
        if "GET" in rule.methods and len(rule.arguments) == 0:
            url = url_for(rule.endpoint, _external=True)
            output.append(url)
    return jsonify(sitemap=output)



