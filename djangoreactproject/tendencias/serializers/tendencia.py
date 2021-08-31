from rest_framework import serializers

from ..models.tendencia import Tendencia
from ..models.tendencia import ProgramasNoOfrecidos
from ..models.tendencia import ProgramasOfrecidos


class TendenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tendencia
        exclude = ['id']
        
class ProgramasNoOfrecidosSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramasNoOfrecidos
        exclude = ['id']
      
class ProgramasOfrecidosSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramasOfrecidos
        exclude = ['id']