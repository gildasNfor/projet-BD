from django.shortcuts import render
from rest_framework import generics
from .serializers import VoteSerializer
from .models import VotingCard
from rest_framework.permissions import IsAuthenticated
from .permissions import CanVote

# Create your views here.
class VoteListCreate(generics.UpdateAPIView):
    queryset = VotingCard.objects.all()
    serializer_class = VoteSerializer
    permission_classes = [IsAuthenticated, CanVote]
    
    def perform_update(self, serializer):
       serializer.validated_data['validity'] = False
       serializer.save()