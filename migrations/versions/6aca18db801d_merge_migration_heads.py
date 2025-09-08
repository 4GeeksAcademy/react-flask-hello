"""Merge migration heads

Revision ID: 6aca18db801d
Revises: 680756b48538, d2bc3496aee6
Create Date: 2025-05-03 01:30:43.501317

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6aca18db801d'
down_revision = ('680756b48538', 'd2bc3496aee6')
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
