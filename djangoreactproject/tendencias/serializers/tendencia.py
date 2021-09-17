from rest_framework import serializers

from ..models.tendencia import Tendencia
from ..models.tendencia import MatriculadoSegunColegio
from ..models.tendencia import MatriculadoSegunEdad
from ..models.tendencia import MatriculadoSegunSexo
from ..models.tendencia import DocentesPorDependencia
from ..models.tendencia import DocentesPorFormacion
from ..models.tendencia import DocentesPorSexo
from ..models.tendencia import PoblacionPorPrograma
from ..models.tendencia import PoblacionPorSexo



class TendenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tendencia
        exclude = ['id']

class MatriculadoSegunColegioSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatriculadoSegunColegio
        exclude = ['id']

class MatriculadoSegunEdadSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatriculadoSegunEdad
        exclude = ['id']

class MatriculadoSegunSexoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatriculadoSegunSexo
        exclude = ['id']

class DocentesPorDependenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocentesPorDependencia
        exclude = ['id']

class DocentesPorFormacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocentesPorFormacion
        exclude = ['id']

class DocentesPorSexoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocentesPorSexo
        exclude = ['id']

class PoblacionPorProgramaSerializer(serializers.ModelSerializer): 
    class Meta:
        model = PoblacionPorPrograma
        exclude = ['id']

class PoblacionPorSexoSerializer(serializers.ModelSerializer): 
    class Meta:
        model = PoblacionPorSexo
        exclude = ['id']
