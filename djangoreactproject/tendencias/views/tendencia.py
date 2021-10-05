from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from cerberus import Validator
from django.db.models import Sum


# #####################################################################################################################
# TENDENCIA POBLACIONAL
from ..serializers.tendencia import TendenciaSerializer
from ..models.tendencia import TENDENCIA_FIELDS
from ..models.tendencia import Tendencia 
# DESERCION INTERANUAL
from ..serializers.tendencia import DesercionInterAnualSerializer
from ..models.tendencia import DESERCION_INTERANUAL_FIELDS
from ..models.tendencia import DesercionInterAnual
# DESERCION SEMESTRAL
from ..serializers.tendencia import DesercionInterSemestralSerializer
from ..models.tendencia import DESERCION_INTERSEMESTRAL_FIELDS
from ..models.tendencia import DesercionInterSemestral
# ANALISIS DE COHORTE
from ..serializers.tendencia import AnalisisCohorteSerializer
from ..models.tendencia import ANALISIS_COHORTE_FIELDS
from ..models.tendencia import AnalisisCohorte



# ################################################################################################################################


# --------------------------------------------------------------------------------
# TENDENCIA
class TendenciaView(APIView):
    def get(self,request):
        if not request.GET:
            tendencia = Tendencia.objects.all()
            if not tendencia:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND)   
            return Response({
                'count': tendencia.count(),
                'data': TendenciaSerializer(tendencia,many=True).data
            },status=status.HTTP_200_OK)
        else:
            for key,value in request.GET.items():
                if key not in TENDENCIA_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
            tendencia = Tendencia.objects.filter(**request.GET.dict())
            if not tendencia:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND) 
            return Response({
                'count': tendencia.count(),
                'data': TendenciaSerializer(tendencia,many=True).data
            },status=status.HTTP_200_OK)

# INDICADORES DE TENDENCIA
class TendenciaCountView(APIView):
    def get(self,request):
        if not request.GET:
            tendencia = Tendencia.objects.all()
            if not tendencia:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND)   
            return Response({
                'data': tendencia.aggregate(Sum('ESTUDIANTES'))
            },status=status.HTTP_200_OK)
        else:
            for key,value in request.GET.items():
                if key not in TENDENCIA_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
            tendencia = Tendencia.objects.filter(**request.GET.dict())
            if not tendencia:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND) 
            return Response({
                'data': tendencia.aggregate(Sum('ESTUDIANTES'))
            },status=status.HTTP_200_OK)

class TendenciaCountTotalView(APIView):
    def get(self,request):
        if not request.GET:
            tendencia = Tendencia.objects.all()
            if not tendencia:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND)   
            return Response({
                'data': tendencia.aggregate(Sum('ESTUDIANTES'))
            },status=status.HTTP_200_OK)
        else:
            for key,value in request.GET.items():
                if key not in TENDENCIA_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
            tendencia = Tendencia.objects.filter(**request.GET.dict())
            if not tendencia:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND) 
            return Response({
                'data': tendencia.aggregate(Sum('ESTUDIANTES'))
            },status=status.HTTP_200_OK)

# DESERCION INTERANUAL
class DesercionInterAnualView(APIView):
    def get(self,request):
        if not request.GET:
            desercion = DesercionInterAnual.objects.all()
            if not desercion:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND)   
            return Response({
                'data': DesercionInterAnualSerializer(desercion,many=True).data
            },status=status.HTTP_200_OK)
        else:
            for key,value in request.GET.items():
                if key not in DESERCION_INTERANUAL_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
            desercion = DesercionInterAnual.objects.filter(**request.GET.dict())
            if not desercion:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND) 
            return Response({
                'data': DesercionInterAnualSerializer(desercion,many=True).data
            },status=status.HTTP_200_OK)

# DESERCION INTERSEMESTRAL
class DesercionInterSemestralView(APIView):
    def get(self,request):
        if not request.GET:
            desercion = DesercionInterSemestral.objects.all()
            if not desercion:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND)   
            return Response({
                'data': DesercionInterSemestralSerializer(desercion,many=True).data
            },status=status.HTTP_200_OK)
        else:
            for key,value in request.GET.items():
                if key not in DESERCION_INTERSEMESTRAL_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
            desercion = DesercionInterSemestral.objects.filter(**request.GET.dict())
            if not desercion:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND) 
            return Response({
                'data': DesercionInterSemestralSerializer(desercion,many=True).data
            },status=status.HTTP_200_OK)

# ANALISIS COHORTE
class AnalisisCohorteView(APIView):
    def get(self,request):
        if not request.GET:
            analisis = AnalisisCohorte.objects.all()
            if not analisis:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND)   
            return Response({
                'data': AnalisisCohorteSerializer(analisis,many=True).data
            },status=status.HTTP_200_OK)
        else:
            for key,value in request.GET.items():
                if key not in ANALISIS_COHORTE_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
            analisis = AnalisisCohorte.objects.filter(**request.GET.dict())
            if not analisis:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND) 
            return Response({
                'data': AnalisisCohorteSerializer(analisis,many=True).data
            },status=status.HTTP_200_OK)

