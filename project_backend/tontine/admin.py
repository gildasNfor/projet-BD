from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser
from .models import Tontine,TontineMember,Rules,Requests

class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ['username', 'email', 'is_staff']
    fieldsets = (
        *UserAdmin.fieldsets,
        (
            'Profile',
            {
                'fields':(
                    'phone_number',
                    'birth_date',
                    'address',
                    'profession'
                )
            }
        )
    )

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Tontine)
admin.site.register(TontineMember)
admin.site.register(Rules)
admin.site.register(Requests)