
APP_PORT=${PORT:-8000}

echo "Waiting for postgres..."
sleep 5
echo "PostgreSQL started"

echo "Migrating database..."
/opt/venv/bin/python manage.py makemigrations --noinput
/opt/venv/bin/python manage.py migrate --noinput
echo "Database migrated"

echo "Starting server..."

exec /opt/venv/bin/gunicorn config.wsgi:application --bind "0.0.0.0:${APP_PORT}" --workers 4