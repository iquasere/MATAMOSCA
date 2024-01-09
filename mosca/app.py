from flask import Flask
from celery import make_celery, Celery,  shared_task
from celery.contrib.abortable import AbortableTask
from flask_restx import Api, Resource, fields

from logging.config import dictConfig

dictConfig(
    {
        "version": 1,
        "formatters": {
            "default": {
                "format": "[%(asctime)s] %(levelname)s in %(module)s: %(message)s",
            }
        },
        "handlers": {
            "console": {
                "class": "logging.StreamHandler",
                "stream": "ext://sys.stdout",
                "formatter": "default",
            }
        },
        "root": {"level": "DEBUG", "handlers": ["console"]},
    }
)

def make_celery(app):
    celery = Celery(app.import_name)
    celery.conf.update(app.config["CELERY_CONFIG"])

    class ContextTask(celery.Task):
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)

    celery.Task = ContextTask
    return celery


def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "Oz8Z7Iu&DwoQK)g%*Wit2YpE#-46vy0n"
    app.config["CELERY_CONFIG"] = {"broker_url": "redis://redis", "result_backend": "redis://redis"}

    celery = make_celery(app)
    celery.set_default()
    
    api = Api(app,
              version="1.0",
              title="MOSCA",
              description="MOSCA API",)
    
    return app, celery, api

# Celery tasks
@shared_task(bind=True, base=AbortableTask)
def run_mosca(self, conf):
    
    return 'DONE!'


app, celery, api = create_app()

# data models
mosca_conf = api.model(
    "mosca_conf",
    {
    },
)

# API
@api.route("/mosca/", methods=["POST"])
class MOSCARunner(Resource):
    
    @api.expect(mosca_conf)
    def post(self):
        conf = api.payload
        run_mosca.delay(conf)
        

   
if __name__ == "__main__":    
    app.run(host="0.0.0.0", port=5000)
