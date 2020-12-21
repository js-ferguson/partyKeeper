from django.urls import path

from .views import StoreUser

urlpatterns = [
     # path('storeUser/', store_user, name='store_user'),
    path('storeUser/', StoreUser.as_view(), name='store_user'),
]
