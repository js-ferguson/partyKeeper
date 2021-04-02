from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Party(models.Model):
    name = models.CharField(max_length=30)
    dm = models.ForeignKey(User, on_delete=models.CASCADE, related_name='dm')
    players = models.ForeignKey(User, on_delete=models.CASCADE, related_name='players')

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name