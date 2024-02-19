from django.db import models
from django.db.models.signals import pre_delete
from django.dispatch import receiver


class User(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    username = models.CharField(max_length=60)
    email = models.EmailField(max_length=254)
    password = models.CharField(max_length=50)
    banks = models.ManyToManyField("Bank", related_name="users", blank=True)


class Bank(models.Model):
    id = models.AutoField(primary_key=True)
    bank_name = models.CharField(max_length=100)
    routing_number = models.CharField(max_length=100)
    swift_bic = models.CharField(max_length=100)


@receiver(pre_delete, sender=Bank)
def prevent_user_deletion(sender, instance, **kwargs):
    if instance.users.exists():
        # User is associated with one or more banks, prevent deletion
        raise Exception(
            "Cannot delete bank because it is associated with one or more users"
        )
