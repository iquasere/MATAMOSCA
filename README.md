# MATAMOSCA
Mosguito as an Application To easily Access MOSCA

## Configuration

MATAMOSCA is configured to run on a single machine. It can, however, be deployed in multiple nodes, that is, run MOSCA in one node, have the web interface running in an other node, and data folders in differente locations. 

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

## Running MATAMOSCA

Start by running docker-compose. You may refer to [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/) for additional information on how to install docker-compose.

```console
docker-compose up -d --build
```

MATAMOSCA is available through your local browser using the URL [http://127.0.0.1:8080/](http://127.0.0.1:8080/).
The Flower dashboard, that allow to monitor and manage MOSCA's tasks can be accessed using [http://127.0.0.1:5555/](http://127.0.0.1:5555/). 