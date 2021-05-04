from .models import Requests, Messages
from rest_framework import serializers
from django.contrib.auth.models import User

class RequestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requests
        fields = '__all__'
        
class MessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Messages
        fields = '__all__'