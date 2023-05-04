rm -R -f ./migrations &&
pipenv run init &&
psql -h localhost -U gitpod postgres -c 'DROP DATABASE example;' || true &&
psql -h localhost -U gitpod postgres -c 'CREATE DATABASE example;' &&
psql -h localhost -U gitpod example -c 'CREATE EXTENSION unaccent;' -d example &&
pipenv run migrate &&
pipenv run upgrade
