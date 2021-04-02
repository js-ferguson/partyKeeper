
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import datetime

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    ...

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['iat'] = datetime.datetime.now()
        # token['user'] = user.username
        token['date'] = str(datetime.date.today())

        return token