from celery.result import AsyncResult
from mosguito import app

# TODO: This is a cronned job to check on the status of celery tasks

#res = AsyncResult('432890aa-4f02-437d-aaca-1999b70efe8d',app=app)