import json
import requests

with open('request_config_mgmp.json') as api_config_file:
    api_config = json.load(api_config_file)

with open(api_config["config_file_path"], 'r') as config_file:
    config_data = json.load(config_file)

# Wrap the config_data inside a 'config' key
payload = {"config": config_data}

headers = {"Content-Type": "application/json"}
response = requests.post(api_config["api_url"], json=payload, headers=headers)

print(response.status_code)
print(response.json())
