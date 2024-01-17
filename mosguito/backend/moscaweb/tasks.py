from time import sleep
from celery import shared_task
import requests

@shared_task
def run_mosca_task(url, data):
    sleep(120)
    requests.post(url, data)