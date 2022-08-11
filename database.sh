creating_migration () 
{
  pipenv run init
  pipenv run migrate
  pipenv run upgrade
}

migrate_upgrade () 
{
  pipenv run migrate
  pipenv run upgrade
}


if [ ! -d /workspace/react-flask-hello/migrations ]
then
echo 'creating migration'
creating_migration
else
migrate_upgrade
fi
