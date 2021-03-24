from django.db import models
from django.contrib.auth.models import User

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

class Tontine(models.Model):
    name = models.CharField(max_length=100)
    created_on = models.DateTimeField(auto_now_add=True)
    slogan = models.TextField()
    
    def __str__(self):
        return self.name
    
class TontineMember(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=50)
    birth_date = models.DateField()
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