from django.contrib import admin
from .models import Election, VotingCard
# Register your models here.

admin.site.register(Election)
admin.site.register(VotingCard)
