from django.shortcuts import render
from rest_framework import generics,status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import TontineSerializer, TontineMemberSerializer
from tontine.models import Tontine, TontineMember, Rules
from .permissions import IsUserOrReadOnly

class TontineListCreate(generics.ListCreateAPIView):
    queryset = Tontine.objects.all()
    serializer_class = TontineSerializer
    permission_classes = [IsAuthenticated]

class TontineDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tontine.objects.all()
    serializer_class = TontineSerializer
    permission_classes = [IsAuthenticated]
    
@api_view(['GET'])
def get_my_tontine_list(request):
    tontines = Tontine.objects.filter(user=request.user)
    serializer = TontineSerializer(tontines, many=True)
    return Response(serializer.data)
    
    