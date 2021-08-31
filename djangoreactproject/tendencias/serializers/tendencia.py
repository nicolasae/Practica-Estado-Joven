from rest_framework import serializers

from ..models.tendencia import Tendencia
from ..models.tendencia import ProgramasNoOfrecidos
from ..models.tendencia import ProgramasOfrecidos
from ..models.tendencia import MatriculadoSegunColegio
from ..models.tendencia import MatriculadoSegunEdad

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

class MatriculadoSegunColegioSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatriculadoSegunColegio
        exclude = ['id']

class MatriculadoSegunEdadSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatriculadoSegunEdad
        exclude = ['id']