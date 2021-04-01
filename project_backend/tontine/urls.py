from django.urls import path
from .views import invite_member,accept_request,send_request
app_name = 'tontine'

urlpatterns = [
    path('invite-member/', invite_member, name = 'invite'),
    path('accept_request/', accept_request, name = 'accept_request'),
    path('send_request/', send_request, name = 'send_request'),
]