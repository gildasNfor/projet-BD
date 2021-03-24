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
    email = models.EmailField(max_length=500, blank=True)
    phone = models.CharField(max_length=50)
    birth_date = models.DateField()
    address = models.CharField(max_length=100)
    profession = models.CharField(max_length=100)
 
    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()
    
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
        return self.user.get_username()

class Rules(models.Model):
    
    class Meta:
        verbose_name = 'Tontine Rule'
        verbose_name_plural = 'Tontine Rules'
        
    tontine = models.ForeignKey(Tontine, on_delete=models.CASCADE)
    rules = models.TextField()
    
    def __str__(self):
        return self.tontine.name