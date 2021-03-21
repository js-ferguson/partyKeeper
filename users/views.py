# from django.shortcuts import render
from django.contrib.auth import get_user_model
from users.serializers import UserSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions, status
from rest_framework.permissions import IsAuthenticated 

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


class GetUser(APIView):

    permission_classes = (IsAuthenticated, )

    def get(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CurrentUserView(APIView):
    # permission_classes = (IsAuthenticated, )
    def get(self, request):
        query = User.objects.filter(email=request.user)
        print(query)
        user = request.user
        print(request.user)
        serializer = UserSerializer(query, many=True)
        return Response(serializer.data)

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