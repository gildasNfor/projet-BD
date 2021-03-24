from tontine.models import Tontine, TontineMember, Rules
from rest_framework import serializers
from django.contrib.auth.models import User

class TontineSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tontine
        fields = ['url', 'name', 'created_on', 'slogan']
        
class TontineMemberSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TontineMember
        fields = ['url','user','address', 'phone', 'status', 'tontine']
        
class TontineRuleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Rules
        fields = ['url','tontine','rules']
        
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url','username']