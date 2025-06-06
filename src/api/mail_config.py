from flask_mail import Mail
from itsdangerous import URLSafeTimedSerializer
import os

mail = Mail()
serializer = URLSafeTimedSerializer(os.getenv("SECRET_KEY"))
