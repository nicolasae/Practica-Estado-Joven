from rest_framework import serializers

from ..models.tendencia import Tendencia

class TendenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tendencia
        exclude = ['id']
        
