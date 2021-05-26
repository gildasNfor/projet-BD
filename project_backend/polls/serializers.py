from rest_framework import serializers
from .models import VotingCard

class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = VotingCard
        fields = ['president', 'treasurer', 'secretary', 'asistant_secretary', 'auditor', 'asistant_auditor']