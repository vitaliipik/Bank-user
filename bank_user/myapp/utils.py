import requests
from rest_framework import status
from rest_framework.response import Response


def fetch_data(field, number=1):
    url = (
        lambda resource, size: f"https://random-data-api.com/api/v2/{resource}?size={size}"
    )
    response = requests.get(url(field, number))
    if response.status_code == 200:
        data = response.json()
        return Response(data, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
