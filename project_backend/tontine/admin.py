from django.contrib import admin
from .models import Tontine,TontineMember,Rules
# Register your models here.

admin.site.register(Tontine)
admin.site.register(TontineMember)
admin.site.register(Rules)