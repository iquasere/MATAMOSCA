#!/bin/bash

python manage.py migrate
python manage.py makemigrations

# Start the processes
(sleep 15; celery -A mosguito worker -l INFO) &
(sleep 15; celery -A mosguito flower) &
gunicorn --bind 0.0.0.0:8000 --workers 1 --timeout 300 mosguito.wsgi:application