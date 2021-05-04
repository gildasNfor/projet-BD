from django.urls import path
from .views import invite_member,send_message,accept_request,send_request,get_tontine_info,get_join_requests,get_member_info,accept_invite,MessageList
app_name = 'tontine'

urlpatterns = [
    path('invite-member/', invite_member, name = 'invite'),
    path('accept-request/', accept_request, name = 'accept_request'),
    path('send-request/<tontine>/', send_request, name = 'send_request'),
    path('get-tontine-info/<tontine>/', get_tontine_info, name = 'get_info'),
    path('get-join-requests/<tontine>/', get_join_requests, name = 'get_join_request'),
    path('get-member-info/<tontine>/', get_member_info, name='get_member_reqeust'),
    path('accept-invite/<int:request_pk>/', accept_invite, name='get_member_reqeust'),
    path('send-message/', send_message , name='send-message'),
    path('get-messages/', MessageList.as_view(), name='get-messages')
]