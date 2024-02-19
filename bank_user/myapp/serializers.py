from rest_framework.serializers import ModelSerializer
from .models import User, Bank


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class BankSerializer(ModelSerializer):
    class Meta:
        model = Bank
        fields = "__all__"
