from django.shortcuts import render
from rest_framework import generics,status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TontineSerializer, TontineMemberSerializer, TontineRuleSerializer
from tontine.models import Tontine, TontineMember, Rules

class TontineMemberList(generics.ListCreateAPIView):
    queryset = TontineMember.objects.all()
    serializer_class = TontineMemberSerializer


class TontineMemberDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = TontineMember.objects.all()
    serializer_class = TontineMemberSerializer
    

@api_view(['GET', 'POST'])
def snippet_list(request, format=None):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        members = TontineMember.objects.all()
        serializer = TontineMemberSerializer(members, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TontineMemberSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    