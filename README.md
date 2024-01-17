# MATAMOSCA
Mosguito as an Application To easily Access MOSCA

## Configuration

MATAMOSCA is configured to run on a single machine. It can, however, be deployed in multiple nodes, that is, run MOSCA in one node, have the web interface running in an other node, and data folders in differente locations. 

## Running MATAMOSCA

Start by running docker-compose. You may refer to [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/) for additional information on how to install docker-compose.

```console
docker-compose up -d --build
```

MATAMOSCA is available throw your local browser using the URL [http://localhost:8000/](http://localhost:8000/).
The Flower dashboard, that allow to monitor and manage MOSCA's tasks can be accessed using [http://localhost:5555/](http://localhost:5555/). 