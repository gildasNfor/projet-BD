from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import TontineListCreate, TontineDetail

app_name = 'tontine_api'
# API endpoints
urlpatterns = format_suffix_patterns([
   
    path('tontines/',
        TontineListCreate.as_view(),
        name='tontine-list'),
    path('tontines/<int:pk>/',
        TontineDetail.as_view(),
        name='tontine-detail'),
    
   
])