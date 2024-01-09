# MOSGUITO React

## Build frontend

The urls of the backend and backend-simulation APIs are placed 
at <u>/frontend/src/js</u> as variables process.env.FRONTEND_DOMAIN and 
process.env.FRONTEND_DOMAIN, respectively.

```console
cd frontend
npm i
npm run build
```

## Start backend

The backend is fed from a MySQL or MariaDB database. A list of the 
changes made to the database can be found at 
<u>/backend/moscaweb/README.md</u>

For the authentication module to be fully functional you need to 
follow the instructions at <u>/backend/moscaweb/authentication/README.md</u>

```console
cd backend
python manage.py migrate
python manage.py createsuperuser --username=user --email=user@mosguito.com
python manage.py runserver
```

