"""empty message

Revision ID: d2ecbf4f09c4
Revises: 
Create Date: 2024-08-23 16:46:39.322904

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd2ecbf4f09c4'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=120), nullable=True),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('avatar_path', sa.String(length=255), nullable=True),
    sa.Column('is_admin', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('baby',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('avatar_path', sa.String(length=255), nullable=True),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('gender', sa.String(length=120), nullable=False),
    sa.Column('age', sa.Integer(), nullable=True),
    sa.Column('height', sa.Float(), nullable=True),
    sa.Column('weight', sa.Float(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('blog_news',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('author', sa.Integer(), nullable=True),
    sa.Column('title', sa.String(length=120), nullable=True),
    sa.Column('img_header', sa.String(length=500), nullable=True),
    sa.Column('text', sa.String(length=120), nullable=True),
    sa.Column('img_final', sa.String(length=500), nullable=True),
    sa.Column('source', sa.String(length=120), nullable=True),
    sa.ForeignKeyConstraint(['author'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('blog_recipe',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('author', sa.Integer(), nullable=True),
    sa.Column('title', sa.String(length=120), nullable=True),
    sa.Column('img_header', sa.String(length=500), nullable=True),
    sa.Column('text_intro', sa.String(length=500), nullable=True),
    sa.Column('text_ingredients', sa.String(length=120), nullable=True),
    sa.Column('text_steps', sa.String(length=120), nullable=True),
    sa.Column('img_final', sa.String(length=120), nullable=True),
    sa.Column('source', sa.String(length=120), nullable=True),
    sa.ForeignKeyConstraint(['author'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('report',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('bedtime', sa.Integer(), nullable=True),
    sa.Column('meals', sa.Integer(), nullable=True),
    sa.Column('diapers', sa.Integer(), nullable=True),
    sa.Column('walks', sa.Integer(), nullable=True),
    sa.Column('water', sa.Integer(), nullable=True),
    sa.Column('meds', sa.Boolean(), nullable=True),
    sa.Column('kindergarden', sa.Boolean(), nullable=True),
    sa.Column('extra', sa.String(length=120), nullable=True),
    sa.Column('baby_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['baby_id'], ['baby.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('report')
    op.drop_table('blog_recipe')
    op.drop_table('blog_news')
    op.drop_table('baby')
    op.drop_table('user')
    # ### end Alembic commands ###