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

# DESERCION INTERANUAL ESTADOS 
from ..serializers.tendencia import DesercionInterAnualEstadosSerializer
from ..models.tendencia import DESERCION_INTERANUAL_ESTADOS_FIELDS
from ..models.tendencia import DesercionInterAnualEstados

# DESERCION SEMESTRAL
from ..serializers.tendencia import DesercionInterSemestralSerializer
from ..models.tendencia import DESERCION_INTERSEMESTRAL_FIELDS
from ..models.tendencia import DesercionInterSemestral

# DESERCION SEMESTRAL ESTADOS 
from ..serializers.tendencia import DesercionInterSemestralEstadosSerializer
from ..models.tendencia import DESERCION_INTERSEMESTRAL_ESTADOS_FIELDS
from ..models.tendencia import DesercionInterSemestralEstados

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

class DesercionInterAnualCountView(APIView):
    def get(self,request):
        if not request.GET:
            desercion = DesercionInterAnual.objects.all()
            if not desercion:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND)   
            return Response({
                'data': desercion.aggregate(Sum('CANTIDAD'))
            },status=status.HTTP_200_OK)
        else:
            query = {**request.GET.dict()}

            for key,value in request.GET.items():
                if key not in DESERCION_INTERANUAL_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
                if value == 'None':
                    query[key] = None               
            if query.get('COD_PERIODO'):
                if len(query.get('COD_PERIODO').split('-')) == 1:        
                    year = query.pop('COD_PERIODO')
                    query['COD_PERIODO__in'] = [f'{year}-1',f'{year}-2']
                
            desercion = DesercionInterAnual.objects.filter(**query)
            if not desercion:  
                return Response({
                    'data': 'No se encontraron los registros',
                    'body':query 
                },status=status.HTTP_404_NOT_FOUND) 
            return Response({
                'data': desercion.aggregate(Sum('CANTIDAD'))
            },status=status.HTTP_200_OK)

class DesercionInterAnualCountYearView(APIView):
    def get(self,request):
        if not request.GET:
            desercion = DesercionInterAnual.objects.all()
            years = [periodo['COD_PERIODO'] for periodo in DesercionInterAnual.objects.order_by().values('COD_PERIODO').distinct()]
            if not desercion:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND) 
            data = []
            for year in years:
                data.append({
                    'year':year,
                    'count':DesercionInterAnual.objects.filter(COD_PERIODO = year).aggregate(Sum('CANTIDAD'))['CANTIDAD__sum']
                })
            return Response({
                'data': data
            },status=status.HTTP_200_OK)
        else:
            query = {**request.GET.dict()}
            # Filtros
            fields_list = [*DESERCION_INTERANUAL_FIELDS]
            fields_list.remove('COD_PERIODO')
            for key,value in request.GET.items():
                if key not in fields_list:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
                if value == 'None':
                    query[key] = None               
            desercion = DesercionInterAnual.objects.filter(**query)
            if not desercion:  
                return Response({
                    'data': 'No se encontraron los registros',
                    'body':query 
                },status=status.HTTP_404_NOT_FOUND) 
            years = [periodo['COD_PERIODO'] for periodo in desercion.values('COD_PERIODO').distinct()]
            data = []
            for year in years:
                query['COD_PERIODO'] = year
                data.append({
                    'year':year,
                    'count':desercion.filter(COD_PERIODO = year).aggregate(Sum('CANTIDAD'))['CANTIDAD__sum']
                })
            return Response({
                'data': data
            },status=status.HTTP_200_OK)  

class DesercionInterAnualEstadosView(APIView):
    def get(self,request):
        if not request.GET:
            desercion = DesercionInterAnualEstados.objects.all()
            if not desercion:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND)   
            return Response({
                'data': DesercionInterAnualEstadosSerializer(desercion,many=True).data
            },status=status.HTTP_200_OK)
        else:
            query = {**request.GET.dict()}
            for key,value in request.GET.items():
                if key not in DESERCION_INTERANUAL_ESTADOS_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
                if value == 'None':
                    query[key] = None
            if query.get('COD_PERIODO'):
                if len(query.get('COD_PERIODO').split('-')) == 1:        
                    year = query.pop('COD_PERIODO')
                    query['COD_PERIODO__in'] = [f'{year}-1',f'{year}-2']

            desercion = DesercionInterAnualEstados.objects.filter(**query)
            if not desercion:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND) 
            return Response({
                'data': DesercionInterAnualEstadosSerializer(desercion,many=True).data
            },status=status.HTTP_200_OK)

class DesercionInterAnualEstadosCountView(APIView):
    def get(self,request):
        if not request.GET:
            desercion = DesercionInterAnualEstados.objects.all()
            if not desercion:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND)   
            return Response({
                'data': desercion.aggregate(Sum('TOTAL'))
            },status=status.HTTP_200_OK)
        else:
            query = {**request.GET.dict()}
            for key,value in request.GET.items():
                if key not in DESERCION_INTERANUAL_ESTADOS_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
                if value == 'None':
                    query[key] = None               
            if query.get('COD_PERIODO'):
                if len(query.get('COD_PERIODO').split('-')) == 1:        
                    year = query.pop('COD_PERIODO')
                    query['COD_PERIODO__in'] = [f'{year}-1',f'{year}-2']                
            desercion = DesercionInterAnualEstados.objects.filter(**query)
            if not desercion:  
                return Response({
                    'data': 'No se encontraron los registros',
                    'body':query 
                },status=status.HTTP_404_NOT_FOUND) 
            return Response({
                'data': desercion.aggregate(Sum('TOTAL'))
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

class DesercionInterSemestralCountView(APIView):
    def get(self,request):
        if not request.GET:
            desercion = DesercionInterSemestral.objects.all()
            if not desercion:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND)   
            return Response({
                'data': desercion.aggregate(Sum('CANTIDAD'))
            },status=status.HTTP_200_OK)
        else:
            query = {**request.GET.dict()}

            for key,value in request.GET.items():
                if key not in DESERCION_INTERSEMESTRAL_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
                if value == 'None':
                    query[key] = None               
            if query.get('COD_PERIODO'):
                if len(query.get('COD_PERIODO').split('-')) == 1:        
                    year = query.pop('COD_PERIODO')
                    query['COD_PERIODO__in'] = [f'{year}-1',f'{year}-2']
                
            desercion = DesercionInterSemestral.objects.filter(**query)
            if not desercion:  
                return Response({
                    'data': 'No se encontraron los registros',
                    'body':query 
                },status=status.HTTP_404_NOT_FOUND) 
            return Response({
                'data': desercion.aggregate(Sum('CANTIDAD'))
            },status=status.HTTP_200_OK)

class DesercionInterSemestralCountYearView(APIView):
    def get(self,request):
        if not request.GET:
            desercion = DesercionInterSemestral.objects.all()
            years = [periodo['COD_PERIODO'] for periodo in DesercionInterSemestral.objects.order_by().values('COD_PERIODO').distinct()]
            if not desercion:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND) 
            data = []
            for year in years:
                data.append({
                    'year':year,
                    'count':DesercionInterSemestral.objects.filter(COD_PERIODO = year).aggregate(Sum('CANTIDAD'))['CANTIDAD__sum']
                })
            return Response({
                'data': data
            },status=status.HTTP_200_OK)
        else:
            query = {**request.GET.dict()}
            # Filtros
            fields_list = [*DESERCION_INTERSEMESTRAL_FIELDS]
            fields_list.remove('COD_PERIODO')
            for key,value in request.GET.items():
                if key not in fields_list:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
                if value == 'None':
                    query[key] = None               
            desercion = DesercionInterSemestral.objects.filter(**query)
            if not desercion:  
                return Response({
                    'data': 'No se encontraron los registros',
                    'body':query 
                },status=status.HTTP_404_NOT_FOUND) 
            years = [periodo['COD_PERIODO'] for periodo in desercion.values('COD_PERIODO').distinct()]
            data = []
            for year in years:
                query['COD_PERIODO'] = year
                data.append({
                    'year':year,
                    'count':desercion.filter(COD_PERIODO = year).aggregate(Sum('CANTIDAD'))['CANTIDAD__sum']
                })
            return Response({
                'data': data
            },status=status.HTTP_200_OK)

class DesercionInterSemestralEstadosView(APIView):
    def get(self,request):
        if not request.GET:
            desercion = DesercionInterSemestralEstados.objects.all()
            if not desercion:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND)   
            return Response({
                'data': DesercionInterSemestralEstadosSerializer(desercion,many=True).data
            },status=status.HTTP_200_OK)
        else:
            query = {**request.GET.dict()}
            for key,value in request.GET.items():
                if key not in DESERCION_INTERSEMESTRAL_ESTADOS_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
                if value == 'None':
                    query[key] = None
            if query.get('COD_PERIODO'):
                if len(query.get('COD_PERIODO').split('-')) == 1:        
                    year = query.pop('COD_PERIODO')
                    query['COD_PERIODO__in'] = [f'{year}-1',f'{year}-2']

            desercion = DesercionInterSemestralEstados.objects.filter(**query)
            if not desercion:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND) 
            return Response({
                'data': DesercionInterSemestralEstadosSerializer(desercion,many=True).data
            },status=status.HTTP_200_OK)

class DesercionInterSemestralEstadosCountView(APIView):
    def get(self,request):
        if not request.GET:
            desercion = DesercionInterSemestralEstados.objects.all()
            if not desercion:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND)   
            return Response({
                'data': desercion.aggregate(Sum('TOTAL'))
            },status=status.HTTP_200_OK)
        else:
            query = {**request.GET.dict()}
            for key,value in request.GET.items():
                if key not in DESERCION_INTERSEMESTRAL_ESTADOS_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
                if value == 'None':
                    query[key] = None               
            if query.get('COD_PERIODO'):
                if len(query.get('COD_PERIODO').split('-')) == 1:        
                    year = query.pop('COD_PERIODO')
                    query['COD_PERIODO__in'] = [f'{year}-1',f'{year}-2']                
            desercion = DesercionInterSemestralEstados.objects.filter(**query)
            if not desercion:  
                return Response({
                    'data': 'No se encontraron los registros',
                    'body':query 
                },status=status.HTTP_404_NOT_FOUND) 
            return Response({
                'data': desercion.aggregate(Sum('TOTAL'))
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
            query = {**request.GET.dict()}
            extra_query = {}
            for key,value in query.items():
                if key not in ANALISIS_COHORTE_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
                if value == 'None':
                    query[key] = None                     
            if query.get('COD_PERIODO'):
                if len(query.get('COD_PERIODO').split('-')) == 1:        
                    year = query.pop('COD_PERIODO')
                    query['COD_PERIODO__in'] = [f'{year}-1',f'{year}-2']
            if query.get('NOMBRE'):
                extra_query['NOMBRE'] = query.pop('NOMBRE')
            if query.get('NIVEL'):
                extra_query['NIVEL'] = query.pop('NIVEL')        
            analisis = AnalisisCohorte.objects.filter(**query)
            if not analisis:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND) 
            data = AnalisisCohorteSerializer(analisis,many=True).data
            return Response({
                'data': [
                        value for value in data if 
                        (value["NOMBRE"] in extra_query['NOMBRE'] if extra_query.get('NOMBRE') else True) and 
                        (value["NIVEL"] in extra_query['NIVEL'] if extra_query.get('NIVEL') else True)
                        ]
            },status=status.HTTP_200_OK)

class AnalisisCohorteCountView(APIView):
    def get(self,request):
        if not request.GET:
            analisis = AnalisisCohorte.objects.all()
            if not analisis:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND)   
            return Response({
                'data': analisis.aggregate(Sum('CANTIDAD'))
            },status=status.HTTP_200_OK)
        else:
            query = {**request.GET.dict()}
            extra_query = {}
            for key,value in request.GET.items():
                if key not in DESERCION_INTERANUAL_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
                if value == 'None':
                    query[key] = None               
            if query.get('COD_PERIODO'):
                if len(query.get('COD_PERIODO').split('-')) == 1:        
                    year = query.pop('COD_PERIODO')
                    query['COD_PERIODO__in'] = [f'{year}-1',f'{year}-2']
            if query.get('NOMBRE'):
                extra_query['NOMBRE'] = query.pop('NOMBRE')
            if query.get('NIVEL'):
                extra_query['NIVEL'] = query.pop('NIVEL')                 
            analisis = AnalisisCohorte.objects.filter(**query)
            if not analisis:  
                return Response({
                    'data': 'No se encontraron los registros',
                    'body':query 
                },status=status.HTTP_404_NOT_FOUND)
            data = AnalisisCohorteSerializer(analisis,many=True).data 
            valor = [
                    value for value in data if 
                    (value["NOMBRE"] in extra_query['NOMBRE'] if extra_query.get('NOMBRE') else True) and 
                    (value["NIVEL"] in extra_query['NIVEL'] if extra_query.get('NIVEL') else True)
                    ]
            total = 0
            for value in valor:
                total += value["CANTIDAD"]
            return Response({
                'data': {"CANTIDAD__sum": total}
            },status=status.HTTP_200_OK)
        
class AnalisisCohorteCountYearView(APIView):
    def get(self,request):
        if not request.GET:
            analisisCohorte = AnalisisCohorte.objects.all()
            years = [periodo['COD_PERIODO'] for periodo in AnalisisCohorte.objects.order_by().values('COD_PERIODO').distinct()]
            if not analisisCohorte:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND) 
            data = []
            for year in years:
                data.append({
                    'year':year,
                    'count':AnalisisCohorte.objects.filter(COD_PERIODO = year).aggregate(Sum('CANTIDAD'))['CANTIDAD__sum']
                })
            return Response({
                'data': data
            },status=status.HTTP_200_OK)
        else:
            query = {**request.GET.dict()}
            extra_query = {}
            # Filtros
            fields_list = [*ANALISIS_COHORTE_FIELDS]
            fields_list.remove('COD_PERIODO')
            for key,value in request.GET.items():
                if key not in fields_list:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
                if value == 'None':
                    query[key] = None
            if query.get('NOMBRE'):
                extra_query['NOMBRE'] = query.pop('NOMBRE')
            if query.get('NIVEL'):
                extra_query['NIVEL'] = query.pop('NIVEL')               
            analisisCohorte = AnalisisCohorte.objects.filter(**query)
            if not analisisCohorte:  
                return Response({
                    'data': 'No se encontraron los registros',
                    'body':query 
                },status=status.HTTP_404_NOT_FOUND) 
            years = [periodo['COD_PERIODO'] for periodo in analisisCohorte.values('COD_PERIODO').distinct()]
            data = []
            for year in years:
                aux = AnalisisCohorteSerializer(analisisCohorte.filter(COD_PERIODO = year),many=True).data 
                valor = [
                        value for value in aux if 
                        (value["NOMBRE"] in extra_query['NOMBRE'] if extra_query.get('NOMBRE') else True) and 
                        (value["NIVEL"] in extra_query['NIVEL'] if extra_query.get('NIVEL') else True)
                        ]
                total = 0
                for value in valor:
                    total += value["CANTIDAD"]
                data.append(
                    {"year":year,
                     "CANTIDAD_Sum": total
                     })
            return Response({
                'data': data
            },status=status.HTTP_200_OK)

