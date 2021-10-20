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
            query = {**request.GET.dict()}
            for key,value in query.items():
                if key not in TENDENCIA_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
                if value == 'None':
                    query[key] = None          
            tendencia = Tendencia.objects.filter(**query)
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
            query = {**request.GET.dict()}

            for key,value in request.GET.items():
                if key not in TENDENCIA_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
                if value == 'None':
                    query[key] = None               
            if query.get('COD_PERIODO'):
                if len(query.get('COD_PERIODO').split('-')) == 1:        
                    year = query.pop('COD_PERIODO')
                    query['COD_PERIODO__in'] = [f'{year}-1',f'{year}-2']
                
            tendencia = Tendencia.objects.filter(**query)
            if not tendencia:  
                return Response({
                    'data': 'No se encontraron los registros',
                    'body':query 
                },status=status.HTTP_404_NOT_FOUND) 
            return Response({
                'data': tendencia.aggregate(Sum('ESTUDIANTES'))
            },status=status.HTTP_200_OK)

class TendenciaCountYearView(APIView):
    def get(self,request):
        if not request.GET:
            tendencia = Tendencia.objects.all()
            years = [periodo['COD_PERIODO'] for periodo in Tendencia.objects.order_by().values('COD_PERIODO').distinct()]
            if not tendencia:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND) 
            data = []
            for year in years:
                data.append({
                    'year':year,
                    'count':Tendencia.objects.filter(COD_PERIODO = year).aggregate(Sum('ESTUDIANTES'))['ESTUDIANTES__sum']
                })
            return Response({
                'data': data
            },status=status.HTTP_200_OK)
        else:
            query = {**request.GET.dict()}
            # Filtros
            fields_list = [*TENDENCIA_FIELDS]
            fields_list.remove('COD_PERIODO')
            for key,value in request.GET.items():
                if key not in fields_list:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
                if value == 'None':
                    query[key] = None               
            tendencia = Tendencia.objects.filter(**query)
            if not tendencia:  
                return Response({
                    'data': 'No se encontraron los registros',
                    'body':query 
                },status=status.HTTP_404_NOT_FOUND) 
            years = [periodo['COD_PERIODO'] for periodo in tendencia.values('COD_PERIODO').distinct()]
            data = []
            for year in years:
                query['COD_PERIODO'] = year
                data.append({
                    'year':year,
                    'count':tendencia.filter(COD_PERIODO = year).aggregate(Sum('ESTUDIANTES'))['ESTUDIANTES__sum']
                })
            return Response({
                'data': data
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

