from django.shortcuts import render
from django.core.mail import send_mail
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from django.contrib.auth.decorators import login_required
from .models import Tontine,TontineMember,Requests
from .serializers import RequestsSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
# Create your views here.
@csrf_exempt
def invite_member(request):
    if request.method == 'POST':
        data=json.loads(request.body)
        subject = 'invitation to join tontine' 
        message = data['message']
        email_to = data['email']
        email_from = settings.EMAIL_HOST_USER
        send_mail( subject, message, email_from, [email_to,],fail_silently=False )
        return JsonResponse({'status':'sent', 'email':email_to, 'message':message})
    return JsonResponse({'status':'get'})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_request(request, tontine):
    tontine_obj = Tontine.objects.get(name=tontine)
    serializer = RequestsSerializer(data={"tontine":tontine_obj.id, "sent_from":request.user.pk})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
   
@csrf_exempt
def accept_request(request):
    if request.method == 'POST':
        data=json.loads(request.body)
        reqeust_id = data['pk']
        request = Requests.objects.get(pk=reqeust_id)
        request.status = True
        TontineMember.objects.create(user=request.user, tontine=request.tontine)
        return JsonResponse({'status':'accept_successful'})
    return JsonResponse({'status':'get'})

def get_info(reqeust, tontine):
    tontine_obj = Tontine.objects.get(name=tontine)
    number_of_members = TontineMember.objects.filter(tontine=tontine_obj).count()
    president = TontineMember.objects.get(tontine=tontine_obj, status = 'PR').user.get_username()
    return JsonResponse({'number_of_members':number_of_members, 'president':president})

@api_view(['GET'])
def get_join_requests(request, tontine):
    tontine_obj = Tontine.objects.get(name=tontine)
    requests = Requests.objects.filter(tontine=tontine_obj)
    serializer = RequestsSerializer(requests, many=True)
    return Response(serializer.data)

    