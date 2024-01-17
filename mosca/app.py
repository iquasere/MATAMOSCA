import os
from celery import Celery, Task, shared_task
from celery.contrib.abortable import AbortableTask
from flask import Flask, request

dev_mode = True

CELERY_BROKER_URL = os.environ.get('CELERY_BROKER_URL', 'redis://localhost:6379'),
CELERY_RESULT_BACKEND = os.environ.get('CELERY_RESULT_BACKEND', 'redis://localhost:6379')

def celery_init_app(app: Flask) -> Celery:
    class FlaskTask(Task):
        def __call__(self, *args: object, **kwargs: object) -> object:
            with app.app_context():
                return self.run(*args, **kwargs)

    celery_app = Celery(app.name, task_cls=FlaskTask)
    celery_app.config_from_object(app.config["CELERY"])
    celery_app.set_default()
    app.extensions["celery"] = celery_app
    return celery_app

app = Flask(__name__)
app.config.from_mapping(
    CELERY=dict(
        broker_url=CELERY_BROKER_URL,
        result_backend=CELERY_RESULT_BACKEND,
        task_ignore_result=True,
    ),
)
celery_app = celery_init_app(app)

# Celery tasks
@shared_task(bind=True, base=AbortableTask)
def run_mosca(self, conf):
    with open("conf.json","w") as f:
        f.write(conf)
    os.system("python -m mosca.py conf.json")
    
# API
@app.post("/mosca/")
def mosca(self):
        conf = request.data
        run_mosca.delay(conf)
        return
        

   
if __name__ == "__main__":
    os.system("nohup celery -A app worker --loglevel INFO")   
    app.run(host="0.0.0.0", port=5000)
