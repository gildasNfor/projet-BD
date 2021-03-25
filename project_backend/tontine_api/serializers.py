from tontine.models import Tontine, TontineMember, Rules
from rest_framework import serializers
from django.contrib.auth.models import User

class TontineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tontine
        fields = ['url', 'name', 'created_on', 'slogan']
        
class TontineMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TontineMember
        fields = ['url','user', 'status', 'tontine']
        
class TontineRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rules
        fields = ['url','tontine','rules']
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['url','username']