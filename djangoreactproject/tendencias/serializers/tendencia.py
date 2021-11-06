from django.db.models.base import Model
from rest_framework import serializers

# IMPORT MODELS 
from ..models.tendencia import Tendencia
from ..models.tendencia import DesercionInterAnual
from ..models.tendencia import DesercionInterSemestral
from ..models.tendencia import AnalisisCohorte
from ..models.tendencia import DesercionInterAnualEstados 

COHORTE_LIST = {
    'DV':{
        'NIVEL':'Posgrado',
        'NOMBRE':'Doctorado en Ingeniería'
    },
    'AT':{
        'NIVEL':'Posgrado',
        'NOMBRE':'Especialización en Electrónica Digital'
    },
    'AZ':{
        'NIVEL':'Posgrado',
        'NOMBRE':'Especialización en Redes de Datos'
    },
    'AY':{
        'NIVEL':'Posgrado',
        'NOMBRE':'Maestría en Ingeniería de Sistemas y Computación'
    },
    '47':{
        'NIVEL':'Posgrado',
        'NOMBRE':'Maestría en Ingeniería Eléctrica'
    },
    '28':{
        'NIVEL':'Pregrado',
        'NOMBRE':'Ingeniería de Sistemas y Computación'
    },
    'FV28':{
        'NIVEL':'Pregrado',
        'NOMBRE':'Ingeniería de Sistemas y Computación (Básicos ingeniería)'
    },
    '28C':{
        'NIVEL':'Pregrado',
        'NOMBRE':'Ingeniería de Sistemas y Computación (Convenio Cuba)'
    },
    '37':{
        'NIVEL':'Pregrado',
        'NOMBRE':'Ingeniería de Sistemas y Computación (Nocturno)'
    },
    '12':{
        'NIVEL':'Pregrado',
        'NOMBRE':'Ingeniería Eléctrica'
    },
    'FV12':{
        'NIVEL':'Pregrado',
        'NOMBRE':'Ingeniería Eléctrica (Básicos ingeniería))'
    },
    'FI':{
        'NIVEL':'Pregrado',
        'NOMBRE':'Ingeniería Electrónica (Diurna)'
    },
    '36':{
        'NIVEL':'Pregrado',
        'NOMBRE':'Ingeniería Electrónica (Nocturno)'
    },
    '34':{
        'NIVEL':'Pregrado',
        'NOMBRE':'Ingeniería Física'
    },
    'FV34':{
        'NIVEL':'Pregrado',
        'NOMBRE':'Ingeniería Física (Básicos ingenieria)'
    },
    'TS':{
        'NIVEL':'Pregrado',
        'NOMBRE':'Tecnología en Desarrollo de Software'
    },
}

class TendenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tendencia
        exclude = ['id']

class DesercionInterAnualSerializer(serializers.ModelSerializer):
    class Meta:
        model = DesercionInterAnual
        exclude = ['id']

class DesercionInterSemestralSerializer(serializers.ModelSerializer):
    class Meta:
        model = DesercionInterSemestral
        exclude = ['id']

class AnalisisCohorteSerializer(serializers.ModelSerializer):
    NOMBRE = serializers.SerializerMethodField('get_type_name')
    NIVEL = serializers.SerializerMethodField('get_type_level')

    class Meta:
        model = AnalisisCohorte
        exclude = ['id']
    
    def get_type_name(self,obj):
        return COHORTE_LIST.get(obj.COD_UTP, {}).get('NOMBRE')
    
    def get_type_level(self,obj):
        return COHORTE_LIST.get(obj.COD_UTP, {}).get('NIVEL')        
        
class DesercionInterAnualEstadosSerializer(serializers.ModelSerializer):
    PERIODOS = serializers.SerializerMethodField('get_type_periodos')
    COD_PERIODO = serializers.SerializerMethodField('get_type_cod_periodo')
    # COD_UTP
    # NOMBRE
    # NIVEL

    class Meta:
        model = DesercionInterAnualEstados
        exclude = ['id']

    def get_type_cod_periodo(self,obj):
        data = DesercionInterAnual.all()
        return print(data)

    def get_type_periodos(self,obj):
        pass


# class AnalisisCohorteSerializer(serializers.ModelSerializer):
#     NOMBRE = serializers.SerializerMethodField('get_type_name')
#     NIVEL = serializers.SerializerMethodField('get_type_level')

#     class Meta:
#         model = AnalisisCohorte
#         exclude = ['id']
    
#     def get_type_name(self,obj):
        
#         return COHORTE_LIST.get(obj.COD_UTP, {}).get('NOMBRE')
    
#     def get_type_level(self,obj):
#         return COHORTE_LIST.get(obj.COD_UTP, {}).get('NIVEL')

#     def sumar_dos_columnas(self, obj):
#     return obj.col_1 + obj.con_2
        


