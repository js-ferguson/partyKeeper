"""partyKeeper URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.middleware import csrf
from django.http import JsonResponse
from django.urls import include, path, re_path
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token
from django.conf.urls import url
from allauth.account.views import confirm_email


def get_csrf_token(request):
    token = csrf.get_token(request)
    return JsonResponse({'token': token})

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^auth/obtain_token/', obtain_jwt_token),
    re_path(r'^auth/refresh_token/', refresh_jwt_token),
    re_path(r'^get-csrf-token/$', get_csrf_token),

    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^account/', include('allauth.urls')),
    url(r'^accounts-rest/registration/account-confirm-email/(?P<key>.+)/$', confirm_email, name='account_confirm_email'),
    path('', include('character.urls')),
]
