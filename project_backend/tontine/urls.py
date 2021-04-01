from django.urls import path
from .views import invite_member,accept_request,send_request,get_info,get_join_requests
app_name = 'tontine'

urlpatterns = [
    path('invite-member/', invite_member, name = 'invite'),
    path('accept-request/', accept_request, name = 'accept_request'),
    path('send-request/<tontine>/', send_request, name = 'send_request'),
    path('get-info/<tontine>/', get_info, name = 'get_info'),
    path('get-join-requests/<tontine>/', get_join_requests, name = 'get_join_request')
]