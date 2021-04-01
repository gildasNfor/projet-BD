from .models import Requests
from rest_framework import serializers
from django.contrib.auth.models import User

class RequestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requests
        fields = '__all__'