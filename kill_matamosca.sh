ps                                    # check processes running
pkill -f 'celery --app tasks worker'  # kill celery worker
sudo service rabbitmq-server restart  # restart rabbitmq-server