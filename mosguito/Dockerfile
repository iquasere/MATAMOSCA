FROM python:3.8

ENV PYTHONUNBUFFERED=1
WORKDIR /mosguito
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ADD backend /mosguito/

EXPOSE 8000
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "1", "--timeout", "300", "mosguito.wsgi:application"]
