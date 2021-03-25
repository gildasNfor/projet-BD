from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import TontineMemberList, TontineMemberDetail, snippet_list

app_name = 'tontine_api'
# API endpoints
urlpatterns = format_suffix_patterns([
   
    path('members/',
        TontineMemberList.as_view(),
        name='member-list'),
    path('members/<int:pk>/',
        TontineMemberDetail.as_view(),
        name='member-detail'),
    path('funcmembers/',
        snippet_list,
        name='funcmember-list'),
   
])