"""merge migration branches

Revision ID: 986a803be618
Revises: 52538565713e, 9a9a7ff26129
Create Date: 2025-09-08 23:22:25.392149

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '986a803be618'
down_revision = ('52538565713e', '9a9a7ff26129')
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
