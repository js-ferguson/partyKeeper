from django.urls import path

from .views import StoreUser
from .api import RegisterApi
from users import views

urlpatterns = [
     # path('storeUser/', store_user, name='store_user'),
    path('storeUser/', StoreUser.as_view(), name='store_user'),
    path('get_user/<int:id>/', views.CurrentUserView.as_view()),
    path('register/', RegisterApi.as_view())
]
