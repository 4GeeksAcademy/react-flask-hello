from flask import Flask
from flask_cors import CORS
CORS(app)

app = Flask(__name__)

from api.routes.games import api as games_api
from api.routes.user import api as users_api  

app.register_blueprint(games_api, url_prefix="/api/games")
app.register_blueprint(users_api, url_prefix="/api/users") 

