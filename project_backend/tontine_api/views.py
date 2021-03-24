from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TontineSerializer, TontineMemberSerializer, TontineRuleSerializer, UserSerializer
from tontine.models import Tontine, TontineMember, Rules
from django.contrib.auth.models import User
# Create your views here.

class TontineViewSet(viewsets.ModelViewSet):
    queryset = Tontine.objects.all()
    serializer_class = TontineSerializer
    
class TontineMemberViewSet(viewsets.ModelViewSet):
    queryset = TontineMember.objects.all()
    serializer_class = TontineMemberSerializer
    
class TontineRuleViewSet(viewsets.ModelViewSet):
    queryset = Rules.objects.all()
    serializer_class = TontineRuleSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    