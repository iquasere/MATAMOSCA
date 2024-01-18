sudo ufw status           # check status of firewall
sudo ufw enable           # enable firewall
sudo ufw allow 5555       # allow port 5555
pip install -r requirements.txt
sudo apt-get install rabbitmq-server
celery --app tasks worker &
celery --app tasks flower --port=5555 &
python MATAMOSCA/mosca/app.py &

