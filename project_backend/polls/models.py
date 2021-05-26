from django.db import models
from django.conf import settings
from tontine.models import Tontine, TontineMember

User = settings.AUTH_USER_MODEL
# Create your models here.
class Election(models.Model):
    tontine = models.ForeignKey(Tontine, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(TontineMember, on_delete=models.SET_NULL, null=True)
    note = models.TextField()
    
    def __str__(self):
        return self.tontine.name + ' election ' + 'created by ' + self.created_by.user.username
    
    
class VotingCard(models.Model):
    owner = models.ForeignKey(TontineMember, on_delete=models.CASCADE)
    validity = models.BooleanField(default = True)
    created = models.DateTimeField(auto_now_add=True, null = True, blank = True)
    election = models.ForeignKey(Election, on_delete=models.CASCADE, null = True, blank = True)    
    president = models.ForeignKey(TontineMember, on_delete = models.CASCADE,null = True, blank = True, related_name='voted_president')
    treasurer = models.ForeignKey(TontineMember, on_delete = models.CASCADE,null = True, blank = True, related_name='voted_treasurer')
    secretary = models.ForeignKey(TontineMember, on_delete = models.CASCADE,null = True, blank = True, related_name='voted_secretary')
    asistant_secretary = models.ForeignKey(TontineMember, on_delete = models.CASCADE,null = True, blank = True, related_name='voted_ass_ecretery')
    auditor = models.ForeignKey(TontineMember, on_delete = models.CASCADE,null = True, blank = True, related_name='voted_auditor')
    asistant_auditor = models.ForeignKey(TontineMember, on_delete = models.CASCADE,null = True, blank = True, related_name='voted_ass_auditor')
    
    def __str__(self):
        return self.election.tontine.name + ' voting card ' + 'for ' + self.owner.user.username