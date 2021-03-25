from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import AbstractUser
# Create your models here.
User = settings.AUTH_USER_MODEL
Status_Choices = [
    ('PR', 'President'),
    ('TR', 'Treasurer'),
    ('SE', 'Secretary'),
    ('ASE', 'Asistant Secretary'),
    ('AU', 'Auditor'),
    ('AAU', 'Asistant Auditor'),
    ('MEM', 'Member')
]
 
 
class CustomUser(AbstractUser):
    phone_number = models.CharField(max_length=30)
    birth_date = models.DateField(blank = True, null = True)
    address = models.CharField(max_length=100)
    profession = models.CharField(max_length=100)
    
    def __str__(self):
        return self.username 
    
class Tontine(models.Model):
    name = models.CharField(max_length=100)
    created_on = models.DateTimeField(auto_now_add=True)
    slogan = models.TextField()
    
    def __str__(self):
        return self.name

    
class TontineMember(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    number_of_shares = models.IntegerField(default = '0')
    status = models.CharField(max_length=5, default='MEM', choices = Status_Choices)
    tontine = models.ForeignKey(Tontine, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.user.username

class Rules(models.Model):
    
    class Meta:
        verbose_name = 'Tontine Rule'
        verbose_name_plural = 'Tontine Rules'
        
    tontine = models.ForeignKey(Tontine, on_delete=models.CASCADE)
    rules = models.TextField()
    
    def __str__(self):
        return self.tontine.name