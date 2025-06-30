
import os
from flask_admin import Admin
from .models import db, User, Project, Task, Comment, Role, Project_Member, Tags
from flask_admin.contrib.sqla import ModelView


class UserModelView(ModelView):
    column_auto_select_related = True
    column_list = ['id', 'full_name', 'email', 'password', 'phone', 'country', 'created_at', 'profile_picture_url',
                   'random_profile_color', 'time_zone', 'is_active', 'admin_of', 'member_of', 'author_of_task', 'roles', 'author_of_comment']


class ProjectModelView(ModelView):
    column_auto_select_related = True
    column_list = ['id', 'title', 'description', 'created_at', 'project_picture_url',
                   'due_date', 'status', 'admin_of', 'admin', 'members', 'tasks', 'roles']


class ProjectMemberModelView(ModelView):
    column_auto_select_related = True
    column_list = ['id', 'member_id', 'project_id', 'member', 'project']


class TaskModelView(ModelView):
    column_auto_select_related = True
    column_list = ['id', 'title', 'description', 'created_at', 'status',
                   'author_id', 'task_author', 'project_id', 'project', 'comments', 'tags']


class CommentModelView(ModelView):
    column_auto_select_related = True
    column_list = ['id', 'title', 'description', 'created_at',
                   'task_id', 'task', 'author_id', 'comment_author',]


class RoleModelView(ModelView):
    column_auto_select_related = True
    column_list = ['id', 'status', 'user_id', 'user', 'project_id', 'project']


class TagsModelView(ModelView):
    column_auto_select_related = True
    column_list = ['id', 'tag', 'task_id', 'task']


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(UserModelView(User, db.session))
    admin.add_view(ProjectModelView(Project, db.session))
    admin.add_view(TaskModelView(Task, db.session))
    admin.add_view(CommentModelView(Comment, db.session))
    admin.add_view(RoleModelView(Role, db.session))
    admin.add_view(ProjectMemberModelView(Project_Member, db.session))
    admin.add_view(TagsModelView(Tags, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))
