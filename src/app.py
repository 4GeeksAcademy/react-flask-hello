import os
from flask import Flask, redirect, url_for, jsonify, request
from flask_cors import CORS
from authlib.integrations.flask_client import OAuth

app = Flask(__name__)
app.secret_key = os.getenv("FLASK_APP_KEY", "dev")

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")
BACKEND_URL  = os.getenv("BACKEND_URL", "http://localhost:3001")

# CORS: habilita el front para hacer fetch al back
CORS(app, origins=[FRONTEND_URL], supports_credentials=True)

# --- OAuth (Google) ---
oauth = OAuth(app)
google = oauth.register(
    name="google",
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    access_token_url="https://oauth2.googleapis.com/token",
    authorize_url="https://accounts.google.com/o/oauth2/v2/auth",
    api_base_url="https://www.googleapis.com/oauth2/v2/",
    client_kwargs={
        "scope": "openid email profile",
        "prompt": "consent",
    },
)

@app.route("/auth/google/login")
def google_login():
    redirect_uri = f"{BACKEND_URL}/auth/google/callback"
    return oauth.google.authorize_redirect(redirect_uri)

@app.route("/auth/google/callback")
def google_callback():
    # Si usas OpenID: parsea el ID Token
    token = oauth.google.authorize_access_token()
    # user_info = oauth.google.parse_id_token(token)  # si has pedido 'openid'
    # o:
    user_info = oauth.google.get("userinfo").json()

    # TODO: buscar/crear usuario en tu DB y emitir tu token (JWT o session)
    # Ejemplo (mock): devolver datos para que el front termine login
    return jsonify({
        "ok": True,
        "provider": "google",
        "profile": user_info,
    })