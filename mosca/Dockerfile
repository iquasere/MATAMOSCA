FROM continuumio/miniconda3

# MOSCA
RUN buildDeps='build-essential zlib1g-dev' \
&& apt-get update \
&& apt-get install -y $buildDeps --no-install-recommends \
&& rm -rf /var/lib/apt/lists/* \
&& git clone https://github.com/iquasere/MOSCA.git \
&& bash MOSCA/install.bash \
&& conda clean --all \
&& apt-get purge -y --auto-remove $buildDeps

# Flask/Celery/Redis
RUN pip install Flask==2.2.2 gunicorn==20.1.0
RUN pip install flask-restx
RUN pip install celery==5.2.7 redis==4.4.0

WORKDIR /app

COPY app.py /app/app.py
EXPOSE 5000
CMD ["gunicorn","--bind", "0.0.0.0:5000", "--workers", "4","--timeout","1000","app:app"]