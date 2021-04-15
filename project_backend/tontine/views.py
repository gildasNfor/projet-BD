import json
from django.core.mail import send_mail
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .models import Tontine,TontineMember,Requests,CustomUser
from .serializers import RequestsSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse

# Create your views here.
User = settings.AUTH_USER_MODEL

@csrf_exempt
@api_view(['POST'])
def invite_member(request):
    tontine_name = request.data['tontine_name']
    subject = f'invitation to join tontine {tontine_name}'
    user = CustomUser.objects.get(pk=request.data['user_pk'])
    email_to = user.email
    try:
        Requests.objects.get(tontine = Tontine.objects.get(name=tontine_name),
                            sent_from = user)
    except ObjectDoesNotExist:
        request_obj = Requests.objects.create(tontine = Tontine.objects.get(name=tontine_name),
                            sent_from = user)
        message = f'{request.data["message"]} click the link to join http://192.168.8.101:8000/tontine-app/accept-invite/{request_obj.pk}'
        email_from = settings.EMAIL_HOST_USER
        print(email_to)
        print(message)
        send_mail( subject, message, email_from, [email_to,],fail_silently=False )
        return Response({'status':'sent', 'email':email_to, 'message':message})
    
    return Response('this user has already sent a request to join')
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def send_request(request, tontine):
    tontine_obj = Tontine.objects.get(name=tontine)
    if Requests.objects.filter(tontine = tontine_obj, sent_from = request.user ):
        return Response('you already sent a reqeust')
    else:
        serializer = RequestsSerializer(data={"tontine":tontine_obj.id, "sent_from":request.user.pk})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
   
@csrf_exempt
@api_view(['POST'])
def accept_request(request):
    user = CustomUser.objects.get(id = request.data['user_pk'])
    tontine_obj = Tontine.objects.get(name = request.data['tontine_name'])
    tontine_request = Requests.objects.get(sent_from = user, tontine = tontine_obj)
    tontine_request.status = True
    tontine_request.save()
    try:
        tontine_obj.tontinemember_set.get(user = user)
    except ObjectDoesNotExist:
        TontineMember.objects.create(user= user, tontine=tontine_request.tontine)
        sender = tontine_request.sent_from
        sender_email = sender.email
        message = f'your request to join {tontine_request.tontine.name} has been accepted. You are now a member'
        subject = 'Join request accepted'
        send_mail( subject, message, settings.EMAIL_HOST_USER, [sender_email,],fail_silently=False )
        return Response({'status':'accept_successful'})
    
    return Response('You are already a member of this tontine')


def get_tontine_info(reqeust, tontine):
    tontine_obj = Tontine.objects.get(name=tontine)
    number_of_members = TontineMember.objects.filter(tontine=tontine_obj).count()
    president = TontineMember.objects.get(tontine=tontine_obj, status = 'PR').user.get_username()
    return JsonResponse({'number_of_members':number_of_members, 'president':president})

@api_view(['GET'])
def get_join_requests(request, tontine):
    tontine_obj = Tontine.objects.get(name=tontine)
    requests = Requests.objects.filter(tontine=tontine_obj, status = False)
    serializer = RequestsSerializer(requests, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_member_info(reqeust, tontine):
    member = TontineMember.objects.get(user=reqeust.user, tontine = Tontine.objects.get(name=tontine))
    return JsonResponse({'status':member.status, 'shares':member.number_of_shares})

def accept_invite(request, request_pk):
    request_obj = Requests.objects.get(pk=request_pk)
    request_obj.status = True
    request_obj.save()
    TontineMember.objects.create(user = request_obj.sent_from, tontine = request_obj.tontine)
    html = f'<h1> You are now a member of {request_obj.tontine.name} </h1> <br> <p> click the link below to login </p> <br> <a href="http://localhost:3000"> www.tontineapp.com </a>'
    return HttpResponse(html)