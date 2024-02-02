FROM matamosca/mosca:2.3.0-1

# Flask/Celery/Redis
RUN pip install Flask==2.3.2 gunicorn==20.1.0 \
&& pip install flask-restx \
&& pip install celery==5.2.7 redis==4.4.0

WORKDIR /app

COPY app.py /app/app.py
EXPOSE 5000
CMD ["gunicorn","--bind", "0.0.0.0:5000", "--workers", "4","--timeout","0","app:app"]