from django.urls import path
from .views import VoteListCreate
from rest_framework.urlpatterns import format_suffix_patterns

app_name = 'polls'

urlpatterns = format_suffix_patterns([
    path('vote/<int:pk>/',VoteListCreate.as_view() ,name = 'vote'),
    ])