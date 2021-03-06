from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _

from .managers import CustomUserManager


class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(('email address'), unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    first_name = models.CharField(blank=True, max_length=100)
    last_name = models.CharField(blank=True, max_length=100)
    screen_name = models.CharField(blank=True, max_length=30)
    party = models.CharField(blank=True, max_length=100)
    # date_of_birth = models.DateField(blank=True, null=True)
    

    def __str__(self):
        return self.email