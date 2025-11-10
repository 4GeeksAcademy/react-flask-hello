
import os
from flask_admin import Admin
from .models import db, User, MentorProfile, StudentProfile, MentorTopic, Mentoring, Review, Comments
from flask_admin.contrib.sqla import ModelView


class StudentProfileView(ModelView):
    form_choices = {
        'experience_level': [
            ('beginner', 'Beginner'),
            ('intermediate', 'Intermediate'),
            ('advanced', 'Advanced')
        ]
    }


class MentorTopicView(ModelView):
    form_choices = {
        'difficulty_level': [
            ('beginner', 'Beginner'),
            ('intermediate', 'Intermediate'),
            ('advanced', 'Advanced')
        ]
    }


class MentoringView(ModelView):
    form_choices = {
        'status': [
            ('pending', 'Pending'),
            ('confirmed', 'Confirmed'),
            ('completed', 'Completed'),
            ('CANCELED', 'Canceled'),
            ('SCHEDULED', 'Scheduled')


        ],
        'payment_status': [
            ('pending', 'Pending'),
            ('paid', 'Paid'),
            ('failed', 'Failed'),
            ('refunded', 'Refunded')
        ]
    }


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(MentorProfile, db.session))
    admin.add_view(ModelView(Review, db.session))
    admin.add_view(ModelView(Comments, db.session))

    admin.add_view(StudentProfileView(StudentProfile, db.session))
    admin.add_view(MentorTopicView(MentorTopic, db.session))
    admin.add_view(MentoringView(Mentoring, db.session))

    # Add your models here, for example this is how we add a the User model to the admin
    # admin.add_view(ModelView(User, db.session))
    # admin.add_view(ModelView(MentorProfile, db.session))
    # admin.add_view(ModelView(StudentProfile, db.session))
    # admin.add_view(ModelView(MentorTopic, db.session))
    # admin.add_view(ModelView(Mentoring, db.session))
    # admin.add_view(ModelView(Review, db.session))
    # admin.add_view(ModelView(Comments, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))
