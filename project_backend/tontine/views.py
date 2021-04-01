from django.shortcuts import render
from django.core.mail import send_mail
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from django.contrib.auth.decorators import login_required
from .models import Tontine,TontineMember,Requests
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


@csrf_exempt
@login_required
def send_request(request):
    if request.method == 'POST':
        user = request.user
        tontine_name = request.POST.get('tontine_name')
        tontine = Tontine.objects.get(name = tontine_name)
        Requests.objects.create(tontine=tontine,sent_from=user)
        return JsonResponse({'status':'send_succesful'})
    return JsonResponse({'status':'get'})

@csrf_exempt
def accept_request(request):
    if request.method == 'POST':
        data=json.loads(request.body)
        reqeust_id = data['pk']
        request = Request.objects.get(pk=reqeust_id)
        request.status = True
        TontineMember.objects.create(user=request.user, tontine=request.tontine)
        return JsonResponse({'status':'accept_successful'})
    return JsonResponse({'status':'get'})