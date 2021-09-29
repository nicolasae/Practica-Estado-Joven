from django.db.models.base import Model
from rest_framework import serializers

# IMPORT MODELS 
from ..models.tendencia import Tendencia

class TendenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tendencia
        exclude = ['id']

