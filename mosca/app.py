from flask import Flask, request, send_file, json
from flask_restx import Api, Resource, fields
import os
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

app = Flask(__name__)
api = Api(
    app,
    version="1.0",
    title="MOSCA",
    description="MOSCA Flask Interface",
)

mosca_input = api.model(
   "MOSCA_input",
   { "configutation":fields.String(default="")}
)

@api.route("/mosca/", methods=["POST"])
class MOSCARunner(Resource):
    
    def runmosca(self,conf):
        print("Running MOSCA")
        with open("conf.json", "w") as f:
            f.write(conf)
        os.system("python -m mosca.py conf.json")

    
    @api.expect(mosca_input)
    def post(self):
        conf = api.payload.get("configuration")
        try:
            self.runmosca(conf)
            return str("OK")
        except Exception as e:
            return str(e)        
        
        
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)