from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import TontineListCreate, TontineDetail,get_user_tontine_list, UserList

app_name = 'tontine_api'
# API endpoints
urlpatterns = format_suffix_patterns([
   
    path('tontines/',
        TontineListCreate.as_view(),
        name='tontine-list'),
    path('tontines/<int:pk>/',
        TontineDetail.as_view(),
        name='tontine-detail'),
     path('users/',
        UserList.as_view(),
        name='user-list'),
    path('user-tontine-list/',
        get_user_tontine_list,
        name='user-tontine-list'),
    
   
])