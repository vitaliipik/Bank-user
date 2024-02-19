import json

from django.http import JsonResponse
from psycopg2 import IntegrityError
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import User, Bank
from .serializers import UserSerializer, BankSerializer
from .utils import fetch_data


@api_view(["POST"])
def create_user(request, amount):
    users = fetch_data("users", amount)
    if users.status_code == status.HTTP_200_OK:
        try:
            serializer = UserSerializer(data=users.data, many=True)
            if serializer.is_valid():

                serializer.save()
        except IntegrityError:
            return JsonResponse(
                {"message": "Failed to create user"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return JsonResponse(
            {"message": "Users have been created"}, status=status.HTTP_201_CREATED
        )

    return JsonResponse(
        {"message": "Failed to create user"},
        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
    )


@api_view(["POST"])
def create_bank(request, amount):
    banks = fetch_data("banks", amount)

    if banks.status_code == status.HTTP_200_OK:
        try:
            serializer = BankSerializer(data=banks.data, many=True)
            if serializer.is_valid():

                serializer.save()
        except IntegrityError:
            return JsonResponse(
                {"message": "Failed to create banks"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        return JsonResponse(
            {"message": "Banks have been created successfully"},
            status=status.HTTP_201_CREATED,
        )

    return JsonResponse(
        {"message": "Failed to create banks"},
        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
    )


@api_view(["GET"])
def get_all_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def get_all_bank(request):
    banks = Bank.objects.all()
    serializer = BankSerializer(banks, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["DELETE"])
def delete_user(request, user_id):
    try:
        user = User.objects.get(pk=user_id)
        user.delete()
        return JsonResponse(
            {"message": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT
        )
    except User.DoesNotExist:
        return JsonResponse(
            {"error": "User not found"}, status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return JsonResponse(
            {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(["DELETE"])
def delete_bank(request, pk):
    try:
        bank = Bank.objects.get(pk=pk)
        bank.delete()
        return JsonResponse(
            {"message": "Bank deleted successfully"}, status=status.HTTP_204_NO_CONTENT
        )
    except Bank.DoesNotExist:
        return JsonResponse(
            {"error": "Bank not found"}, status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return JsonResponse(
            {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(["PUT"])
def edit_user(request, pk):
    try:
        user = User.objects.get(pk=pk)
        serializer = UserSerializer(instance=user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        return JsonResponse(
            dict({"message": str(serializer.error_messages)}),
            status=status.HTTP_400_BAD_REQUEST,
        )
    except User.DoesNotExist:
        return JsonResponse(
            {"message": "User not found"}, status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return JsonResponse(
            {"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(["PUT"])
def edit_bank(request, pk):
    try:
        bank = Bank.objects.get(pk=pk)
        serializer = BankSerializer(instance=bank, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        return JsonResponse(
            dict({"message": str(serializer.error_messages)}),
            status=status.HTTP_400_BAD_REQUEST,
        )
    except User.DoesNotExist:
        return JsonResponse(
            {"message": "bank not found"}, status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return JsonResponse(
            {"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(["POST"])
def add_bank_to_user(request, user_pk, bank_pk):
    try:
        user = User.objects.get(pk=user_pk)
        bank = Bank.objects.get(pk=bank_pk)
    except User.DoesNotExist:
        return Response(
            {"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND
        )
    except Bank.DoesNotExist:
        return Response(
            {"error": "Bank does not exist"}, status=status.HTTP_404_NOT_FOUND
        )

    user.banks.add(bank)
    user.save()
    serializer = BankSerializer(bank)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def get_user_banks(request, user_pk):
    try:
        user = User.objects.get(pk=user_pk)
    except User.DoesNotExist:
        return Response(
            {"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND
        )

    banks = user.banks.all()
    serializer = BankSerializer(banks, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["DELETE"])
def remove_bank_from_user(request, user_pk, bank_pk):
    try:
        user = User.objects.get(pk=user_pk)
        bank = Bank.objects.get(pk=bank_pk)
    except User.DoesNotExist:
        return Response(
            {"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND
        )
    except Bank.DoesNotExist:
        return Response(
            {"error": "Bank does not exist"}, status=status.HTTP_404_NOT_FOUND
        )

    if bank in user.banks.all():
        user.banks.remove(bank)
        user.save()
        return Response(
            {"message": "Bank removed from user"}, status=status.HTTP_200_OK
        )
    else:
        return Response(
            {"error": "Bank is not associated with the user"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["POST"])
def add_user_to_bank(request, user_pk, bank_pk):
    try:
        user = User.objects.get(pk=user_pk)
        bank = Bank.objects.get(pk=bank_pk)
    except User.DoesNotExist:
        return Response(
            {"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND
        )
    except Bank.DoesNotExist:
        return Response(
            {"error": "Bank does not exist"}, status=status.HTTP_404_NOT_FOUND
        )

    bank.users.add(user)
    bank.save()
    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def get_bank_users(request, bank_pk):
    try:
        bank = Bank.objects.get(pk=bank_pk)
    except Bank.DoesNotExist:
        return Response(
            {"error": "Bank does not exist"}, status=status.HTTP_404_NOT_FOUND
        )

    users = bank.users.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["DELETE"])
def remove_user_from_bank(request, user_pk, bank_pk):
    try:
        user = User.objects.get(pk=user_pk)
        bank = Bank.objects.get(pk=bank_pk)
    except User.DoesNotExist:
        return Response(
            {"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND
        )
    except Bank.DoesNotExist:
        return Response(
            {"error": "Bank does not exist"}, status=status.HTTP_404_NOT_FOUND
        )

    if user in bank.users.all():
        bank.users.remove(user)
        bank.save()
        return Response(
            {"message": "Bank removed from bank"}, status=status.HTTP_200_OK
        )
    else:
        return Response(
            {"error": "Bank is not associated with the bank"},
            status=status.HTTP_400_BAD_REQUEST,
        )
