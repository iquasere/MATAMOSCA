from flask import Flask, jsonify, request
from logging.config import dictConfig
from tasks import run_mosca_task, celery_app
from celery.result import AsyncResult

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
        print('got data', data)
        # Check if 'config' key exists in the JSON data
        if 'config' not in data:
            return jsonify({'error': 'Missing "config" key in the request'}), 400

        # Run the task synchronously using Celery
        result = run_mosca_task.apply_async(args=[data['config']], countdown=1)

        return jsonify({'output': result['output'], 'error': result['error']}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/check_task/<task_id>', methods=['GET'])
def check_task(task_id):
    task_result = AsyncResult(task_id, app=celery_app)
    if task_result.ready():
        return jsonify({'output': task_result.result, 'error': task_result.result.get('error')}), 200
    else:
        return jsonify({'status': 'Task still running'}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=1640, debug=True)
