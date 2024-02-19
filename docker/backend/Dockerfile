FROM python:3.9


WORKDIR /Bank-user/bank_user

COPY ./Bank-user/bank_user .

RUN python3 -m venv /opt/venv && \
    /opt/venv/bin/pip install --upgrade pip && \
    /opt/venv/bin/pip install -r requirements.txt && \
    chmod +x /Bank-user/bank_user/entrypoint.sh

CMD [ "/Bank-user/bank_user/entrypoint.sh" ]