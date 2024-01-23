from celery import Celery, Task, shared_task
from celery.contrib.abortable import AbortableTask
from flask import Flask, request
import os

dev_mode = True

USE_CELERY = os.environ.get("USE_CELERY", "FALSE")
if USE_CELERY == "TRUE":
    USE_CELERY = True
else:
    USE_CELERY = False

CELERY_BROKER_URL = os.environ.get("CELERY_BROKER_URL", "redis://localhost:6379")
CELERY_RESULT_BACKEND = os.environ.get("CELERY_RESULT_BACKEND", "redis://localhost:6379")


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
if USE_CELERY:
    app.config.from_mapping(
        CELERY=dict(
            broker_url=CELERY_BROKER_URL,
            result_backend=CELERY_RESULT_BACKEND,
            task_ignore_result=True,
        ),
    )
    celery_app = celery_init_app(app)


def run_mosca(conf):
    print("Running MOSCA")
    with open("conf.json", "w") as f:
        f.write(conf)
    os.system("python -m mosca.py conf.json")


# Celery tasks
@shared_task(bind=True, base=AbortableTask)
def run_mosca_celery(conf):
    run_mosca(conf)


# API
@app.post("/mosca/")
def mosca(self):
    conf = request.data
    if USE_CELERY:
        run_mosca_celery.delay(conf)
    else:
        run_mosca(conf)


if __name__ == "__main__":
    if USE_CELERY:
        os.system("nohup celery -A app worker --loglevel INFO")
    print(f"Using celery {USE_CELERY}")
    app.run(host="0.0.0.0", port=5000)
