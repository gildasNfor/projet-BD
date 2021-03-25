from tontine.models import Tontine, TontineMember, Rules, CustomUser
from rest_framework import serializers
from django.contrib.auth.models import User
from django.db import transaction
from dj_rest_auth.registration.serializers import RegisterSerializer

class TontineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tontine
        fields = ['url', 'name', 'created_on', 'slogan']
        
class TontineMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TontineMember
        fields = ['id','user', 'status', 'tontine']
        
class TontineRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rules
        fields = ['url','tontine','rules']
        
        
class CustomRegisterSerializer(RegisterSerializer):
    phone_number = serializers.CharField(max_length=30)
    birth_date = serializers.DateField()
    address = serializers.CharField(max_length=100)
    profession = serializers.CharField(max_length=100)
    firstname = serializers.CharField(max_length=100)
    lastname = serializers.CharField(max_length=100)

    # Define transaction.atomic to rollback the save operation in case of error
    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        user.phone_number = self.data.get('phone_number')
        user.birth_date = self.data.get('birth_date')
        user.address = self.data.get('address')
        user.profession = self.data.get('profession')
        user.first_name = self.data.get('firstname')
        user.last_name = self.data.get('lastname')
        user.save()
        return user
    
    
class CustomUserDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = (
            'pk',
            'username',
            'email',
            'phone_number',
            'address',
        )
        read_only_fields = ('pk', 'email')