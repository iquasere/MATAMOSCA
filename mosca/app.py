from flask import Flask, jsonify, request
from logging.config import dictConfig
import json
import subprocess

app = Flask(__name__)

dictConfig(
    {
        "version": 1,
        "formatters": {
            "default": {
                "format": "[%(asctime)s] %(levelname)s in %(module)s: %(message)s",
            }
        },
        "handlers": {
            "file": {
                "class": "logging.FileHandler",
                "filename": "flask.log",
                "formatter": "default",
            },
            "console": {
                "class": "logging.StreamHandler",
                "stream": "ext://sys.stdout",
                "formatter": "default",
            },
        },
        "root": {"level": "DEBUG", "handlers": ["console", "file"]},
    }
)


@app.route('/run_mosca', methods=['POST'])
def run_mosca():
    try:
        # Get JSON data from the request
        data = request.get_json()

        # Check if 'config' key exists in the JSON data
        if 'config' not in data:
            return jsonify({'error': 'Missing "config" key in the request'}), 400

        # Run the task synchronously (removed Celery)
        result = _run_mosca_task(data['config'])

        return jsonify({'output': result['output'], 'error': result['error']}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/notify_rule_completion', methods=['POST'])
def notify_rule_completion():
    data = request.get_json()
    rule_name = data.get('rule_name')
    status = data.get('status')
    print(f"Received notification: Rule '{rule_name}' {status}")
    # You can process the notification data as needed
    return jsonify({'message': 'Notification received successfully'})


def _run_mosca_task(config):
    try:
        # Create a temporary config file
        temp_config_file = 'temp_config.json'
        with open(temp_config_file, 'w') as temp_file:
            json.dump(config, temp_file)

        # Run the mosca command with the temporary config file
        command = ['mosca', '-c', temp_config_file]
        result = subprocess.run(command, capture_output=True, text=True)

        # Remove the temporary config file
        subprocess.run(['rm', temp_config_file])

        return {'output': result.stdout, 'error': result.stderr}

    except Exception as e:
        return {'error': e}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=1640, debug=True)
