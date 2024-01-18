from celery import Celery
import subprocess
import json
import logging

celery_app = Celery('tasks', broker='pyamqp://guest@localhost//', backend='rpc://')

# Configure logging
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
formatter = logging.Formatter('[%(asctime)s] %(levelname)s in %(module)s: %(message)s')
stream_handler = logging.StreamHandler()
stream_handler.setFormatter(formatter)
logger.addHandler(stream_handler)


@celery_app.task
def run_mosca_task(config):
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
        logger.exception('An error occurred in run_mosca_task:')
        return {'error': str(e)}
