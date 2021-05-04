from django.shortcuts import render
from rest_framework import generics,status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import TontineSerializer, TontineMemberSerializer, CustomUserDetailsSerializer
from tontine.models import Tontine, TontineMember, Rules, CustomUser
from .permissions import IsUserOrReadOnly
import json

class TontineListCreate(generics.ListCreateAPIView):
    queryset = Tontine.objects.all()
    serializer_class = TontineSerializer
    permission_classes = [IsAuthenticated]

class TontineDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tontine.objects.all()
    serializer_class = TontineSerializer
    permission_classes = [IsAuthenticated]
    
class UserList(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserDetailsSerializer
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_tontine_list(request):
    tontine_members = TontineMember.objects.filter(user=request.user)
    tontines = [tontine_member.tontine for tontine_member in tontine_members]
    serializer = TontineSerializer(tontines, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_tontine_member_list(request, tontine):
    tontine_obj = Tontine.objects.get(name = tontine)
    members = tontine_obj.tontinemember_set.all()
    member_users = [member.user for member in members]
    serializer = CustomUserDetailsSerializer(member_users, many = True)
    return Response(serializer.data)