"""Merge conflicting heads

Revision ID: 4573e36e3f5b
Revises: 68834b4047a6, d76f4dd8bc62
Create Date: 2025-10-19 20:42:43.055112

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4573e36e3f5b'
down_revision = ('68834b4047a6', 'd76f4dd8bc62')
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
