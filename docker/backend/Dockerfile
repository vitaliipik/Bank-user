FROM python:3.9


WORKDIR /bank_user

COPY ./bank_user .

RUN python3 -m venv /opt/venv && \
    /opt/venv/bin/pip install --upgrade pip && \
    /opt/venv/bin/pip install -r requirements.txt && \
    chmod +x /bank_user/entrypoint.sh

COPY ./bank_user/entrypoint.sh .

ENTRYPOINT ["sh", "/bank_user/entrypoint.sh" ]