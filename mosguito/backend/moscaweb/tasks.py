from celery import shared_task
import json
import requests

import requests

def getURL(url, params=None, **kwargs):
    return requests.get(url, params, **kwargs)


def postURL(url, data=None, json=None, **kwargs):
    response = requests.post(url, data, json, **kwargs)
    if response.status_code!=200:
        raise Exception(response.text)
    return response

@shared_task
def run_mosca_task(url, conf):
    cnf = json.dumps(conf)
    to_json = {"configuration":cnf}
    print("sending request to ",url)
    print(to_json)
    response  = postURL(url,json=to_json)
    responseString = response.json()
    return responseString