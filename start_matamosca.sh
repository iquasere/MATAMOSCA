sudo apt update && sudo apt upgrade -y
sudo ufw status           # check status of firewall
sudo ufw enable           # enable firewall
sudo ufw allow 5555       # allow port 5555
pip install -r MATAMOSCA/requirements.txt
docker run -d -p 6379:6379 redis
cd MATAMOSCA/mosca
celery --app tasks worker &
celery --app tasks flower --port=5555 &
python MATAMOSCA/mosca/app.py &
