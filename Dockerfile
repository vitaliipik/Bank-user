FROM ubuntu/postgres:latest
FROM python:3.9



ENV DATASOURCE_URL=jdbc:postgresql://localhost:5432/bank
ENV DATASOURCE_USER=postgres
ENV DATASOURCE_PASSWORD=admin



RUN pip install --no-cache-dir -r requirements.txt

RUN python manage.py migrate

EXPOSE 8000