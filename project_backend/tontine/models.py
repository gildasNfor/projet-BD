from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
# Create your models here.
Status_Choices = [
    ('PR', 'President'),
    ('TR', 'Treasurer'),
    ('SE', 'Secretary'),
    ('ASE', 'Asistant Secretary'),
    ('AU', 'Auditor'),
    ('AAU', 'Asistant Auditor'),
    ('MEM', 'Member')
]

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=50, default='0000')
    birth_date = models.DateField(default = '2021-04-07')
    address = models.CharField(max_length=100, default='yaounde')
    profession = models.CharField(max_length=100, default='Teacher')
    
    def __str__(self):
        return self.user.username + ' ' + 'Profile'
 
 

    
class Tontine(models.Model):
    name = models.CharField(max_length=100)
    created_on = models.DateTimeField(auto_now_add=True)
    slogan = models.TextField()
    
    def __str__(self):
        return self.name

    
class TontineMember(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    number_of_shares = models.IntegerField()
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