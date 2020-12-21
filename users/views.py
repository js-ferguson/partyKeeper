from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions

User = get_user_model()

# Create your views here.
# def store_user(request):
#     if request.method == 'POST':
#         print("getting something here")
#         print(request)

#         try:
#             user = User.objects.get(email=request.user.email)
#         except User.DoesNotExist:
#             raise Http404("This user does not exist")


class StoreUser(APIView):
    """
    View to list all users in the system.

    * Requires token authentication.
    * Only admin users are able to access this view.
    """
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAdminUser]

    def get(self, request, format=None):
        """
        Return a list of all users.
        """
        usernames = [user.email for user in User.objects.all()]
        return Response(usernames)