from django.db.models.base import Model
from rest_framework import serializers

# MATRICULADOS
from ..models.tendencia import MatriculadosNivelFormacion
from ..models.tendencia import MatriculadosCategoriaInscripcion
from ..models.tendencia import MatriculadosSexo
from ..models.tendencia import MatriculadosEstrato
from ..models.tendencia import MatriculadosPregradoSexo
from ..models.tendencia import MatriculadosPregradoEdad
from ..models.tendencia import MatriculadosPregradoEstrato
from ..models.tendencia import MatriculadosPregradoColegio
from ..models.tendencia import MatriculadosPosgradoSexo
from ..models.tendencia import MatriculadosPosgradoEdad
from ..models.tendencia import MatriculadosPosgradoEstrato

# MATRICULADOS
class MatriculadosNivelFormacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatriculadosNivelFormacion
        exclude = ['id']

class MatriculadosCategoriaInscripcionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatriculadosCategoriaInscripcion
        exclude = ['id']

class MatriculadosSexoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatriculadosSexo
        exclude = ['id']

class MatriculadosEstratoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatriculadosEstrato
        exclude = ['id']

# MATRICULADOS PREGRADO
class MatriculadosPregradoSexoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatriculadosPregradoSexo
        exclude = ['id']

class MatriculadosPregradoEdadSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatriculadosPregradoEdad
        exclude = ['id']

class MatriculadosPregradoEstratoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatriculadosPregradoEstrato
        exclude = ['id']        

class MatriculadosPregradoColegioSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatriculadosPregradoColegio
        exclude = ['id']

# MATRICULADOS POSGRADO
class MatriculadosPosgradoSexoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatriculadosPosgradoSexo
        exclude = ['id']

class MatriculadosPosgradoEdadSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatriculadosPosgradoEdad
        exclude = ['id']

class MatriculadosPosgradoEstratoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatriculadosPosgradoEstrato
        exclude = ['id']  