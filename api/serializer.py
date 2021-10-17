from rest_framework import serializers
from api.models import Pelada

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['name'] = user.first_name,
        token['last_name'] = user.last_name,
        token['email'] = user.email,
        # ...

        return token


class PeladaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pelada
        fields = ['id', 'nome', 'local']
