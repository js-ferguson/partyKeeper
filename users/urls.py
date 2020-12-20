from django.urls import path

from .views import store_user

urlpatterns = [
    path('user/storeUser', store_user, name='store_user'),
]
