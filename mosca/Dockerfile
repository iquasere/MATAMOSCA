FROM continuumio/miniconda3

VOLUME ["/named_volume"]

# MOSCA
RUN git clone https://github.com/iquasere/MOSCA.git -b development \
&& bash MOSCA/cicd/install.bash --mosca_env "$(conda info --base)" \
&& conda clean --all \
&& apt-get update \
&& apt-get install -y curl \
&& curl -fsSL https://get.docker.com -o get-docker.sh \
&& sh get-docker.sh

# Flask/Celery/Redis
RUN pip install Flask==2.3.2 gunicorn==20.1.0 \
&& pip install flask-restx \
&& pip install celery==5.2.7 redis==4.4.0

WORKDIR /app

COPY app.py /app/app.py
EXPOSE 5000
CMD ["gunicorn","--bind", "0.0.0.0:5000", "--workers", "4","--timeout","0","app:app"]