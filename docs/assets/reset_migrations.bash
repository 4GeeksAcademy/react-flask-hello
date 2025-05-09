rm -R -f ./migrations &&
pipenv run init &&
dropdb -h localhost -U gitpod example || true &&
createdb -h localhost -U gitpod example || true &&
psql -h localhost example -U gitpod -c 'CREATE EXTENSION unaccent;' || true &&
pipenv run migrate &&
pipenv run upgrade
!/bin/bash

Stop on first error
set -e

echo "Removing old migrations folder..."
rm -rf ./migrations

echo "Terminating existing database connections..."
psql -h localhost -U gitpod postgres -c "
SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'example'
AND pid <> pg_backend_pid();" || true

echo "Dropping database..."
dropdb -h localhost -U gitpod example --if-exists

echo "Creating fresh database..."
createdb -h localhost -U gitpod example

echo "Creating unaccent extension..."
psql -h localhost example -U gitpod -c 'CREATE EXTENSION IF NOT EXISTS unaccent;'

echo "Initializing fresh migrations..."
flask db init

echo "Removing any existing migration versions..."
rm -rf ./migrations/versions/*

echo "Generating initial migration..."
flask db migrate -m "Initial migration"

echo "Applying migration..."
flask db upgrade

echo "Database reset complete!"