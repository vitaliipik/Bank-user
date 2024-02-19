from django.urls import re_path, path

from . import views

urlpatterns = [
    re_path(r"^users/$", views.get_all_users, name="users"),
    path("users/new/<int:amount>/", views.create_user, name="new_user"),
    path("users/<int:user_id>/", views.delete_user, name="delete_user"),
    path("users/<int:pk>/edit/", views.edit_user, name="edit_user"),
    path(
        r"users/append/<int:user_pk>/<int:bank_pk>/",
        views.add_bank_to_user,
        name="bank_to_user",
    ),
    path(r"users/child/<int:user_pk>/", views.get_user_banks, name="user_bank"),
    path(
        r"users/delete/<int:user_pk>/<int:bank_pk>/",
        views.remove_bank_from_user,
        name="remove_bank",
    ),
    re_path(r"^banks/$", views.get_all_bank, name="banks"),
    path("banks/new/<int:amount>/", views.create_bank, name="new_bank"),
    path("banks/<int:pk>/", views.delete_bank, name="delete_bank"),
    path("banks/<int:pk>/edit/", views.edit_bank, name="edit_bank"),
    path(
        r"banks/append/<int:bank_pk>/<int:user_pk>/",
        views.add_user_to_bank,
        name="bank_to_user",
    ),
    path(r"banks/child/<int:bank_pk>/", views.get_bank_users, name="user_bank"),
    path(
        r"banks/delete/<int:bank_pk>/<int:user_pk>/",
        views.remove_user_from_bank,
        name="remove_bank",
    ),
]
