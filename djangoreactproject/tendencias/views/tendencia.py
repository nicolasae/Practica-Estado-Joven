from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from cerberus import Validator

# --------------------------------------------------------------------------------
# Tendencia Poblacional imports
# #####################################################################################################################
# MATRICULADOS 
from ..serializers.tendencia import MatriculadosNivelFormacionSerializer
from ..serializers.tendencia import MatriculadosCategoriaInscripcionSerializer
from ..serializers.tendencia import MatriculadosSexoSerializer
from ..serializers.tendencia import MatriculadosEstratoSerializer
from ..models.tendencia import MatriculadosNivelFormacion
from ..models.tendencia import MatriculadosCategoriaInscripcion
from ..models.tendencia import MatriculadosEstrato
from ..models.tendencia import MatriculadosSexo
from ..models.tendencia import MATRICULADOS_NIVEL_FORMACION_FIELDS
from ..models.tendencia import MATRICULADOS_CATEGORIA_INSCRIPCION_FIELDS
from ..models.tendencia import MATRICULADOS_ESTRATO_FIELDS
from ..models.tendencia import MATRICULADOS_SEXO_FIELDS
# MATRICULADOS PREGRADO
from ..serializers.tendencia import MatriculadosPregradoSexoSerializer
from ..serializers.tendencia import MatriculadosPregradoEdadSerializer
from ..serializers.tendencia import MatriculadosPregradoEstratoSerializer
from ..serializers.tendencia import MatriculadosPregradoColegioSerializer
from ..models.tendencia import MatriculadosPregradoSexo
from ..models.tendencia import MatriculadosPregradoEdad
from ..models.tendencia import MatriculadosPregradoEstrato
from ..models.tendencia import MatriculadosPregradoColegio
from ..models.tendencia import MATRICULADOS_PREGRADO_SEXO_FIELDS
from ..models.tendencia import MATRICULADOS_PREGRADO_ESTRATO_FIELDS
from ..models.tendencia import MATRICULADOS_PREGRADO_EDAD_FIELDS
from ..models.tendencia import MATRICULADOS_PREGRADO_COLEGIO_FIELDS
# MATRICULADOS PREGRADO
from ..serializers.tendencia import MatriculadosPosgradoSexoSerializer
from ..serializers.tendencia import MatriculadosPosgradoEdadSerializer
from ..serializers.tendencia import MatriculadosPosgradoEstratoSerializer
from ..models.tendencia import MatriculadosPosgradoSexo
from ..models.tendencia import MatriculadosPosgradoEdad
from ..models.tendencia import MatriculadosPosgradoEstrato
from ..models.tendencia import MATRICULADOS_POSGRADO_SEXO_FIELDS
from ..models.tendencia import MATRICULADOS_POSGRADO_ESTRATO_FIELDS
from ..models.tendencia import MATRICULADOS_POSGRADO_EDAD_FIELDS
# ################################################################################################################################


# --------------------------------------------------------------------------------
# MATRICULADOS 
class MatriculadosNivelFormacionView(APIView):
    def get(self,request):
        if not request.GET:
            matriculados = MatriculadosNivelFormacion.objects.all()
            if not matriculados:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND)   
            return Response({
                'data': MatriculadosNivelFormacionSerializer(matriculados,many=True).data
            },status=status.HTTP_200_OK)
        else:
            for key,value in request.GET.items():
                if key not in MATRICULADOS_NIVEL_FORMACION_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
            matriculados = MatriculadosNivelFormacion.objects.filter(**request.GET.dict())
            if not matriculados:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND) 
            return Response({
                'data': MatriculadosNivelFormacionSerializer(matriculados,many=True).data
            },status=status.HTTP_200_OK)

class MatriculadosCategoriaInscripcionView(APIView):
    def get(self,request):
        if not request.GET:
            matriculados = MatriculadosCategoriaInscripcion.objects.all()
            if not matriculados:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND)   
            return Response({
                'data': MatriculadosCategoriaInscripcionSerializer(matriculados,many=True).data
            },status=status.HTTP_200_OK)
        else:
            for key,value in request.GET.items():
                if key not in MATRICULADOS_CATEGORIA_INSCRIPCION_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
            matriculados = MatriculadosCategoriaInscripcion.objects.filter(**request.GET.dict())
            if not matriculados:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND) 
            return Response({
                'data': MatriculadosCategoriaInscripcionSerializer(matriculados,many=True).data
            },status=status.HTTP_200_OK)

class MatriculadosSexoView(APIView):
    def get(self,request):
        if not request.GET:
            matriculados = MatriculadosSexo.objects.all()
            if not matriculados:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND)   
            return Response({
                'data': MatriculadosSexoSerializer(matriculados,many=True).data
            },status=status.HTTP_200_OK)
        else:
            for key,value in request.GET.items():
                if key not in MATRICULADOS_SEXO_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
            matriculados = MatriculadosSexo.objects.filter(**request.GET.dict())
            if not matriculados:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND) 
            return Response({
                'data': MatriculadosSexoSerializer(matriculados,many=True).data
            },status=status.HTTP_200_OK)

class MatriculadosEstratoView(APIView):
    def get(self,request):
        if not request.GET:
            matriculados = MatriculadosEstrato.objects.all()
            if not matriculados:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND)   
            return Response({
                'data': MatriculadosEstratoSerializer(matriculados,many=True).data
            },status=status.HTTP_200_OK)
        else:
            for key,value in request.GET.items():
                if key not in MATRICULADOS_ESTRATO_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
            matriculados = MatriculadosEstrato.objects.filter(**request.GET.dict())
            if not matriculados:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND) 
            return Response({
                'data': MatriculadosEstratoSerializer(matriculados,many=True).data
            },status=status.HTTP_200_OK)

# MATRICULADOS PREGRADO
class MatriculadosPregradoSexoView(APIView):
    def get(self,request):
        if not request.GET:
            matriculados = MatriculadosPregradoSexo.objects.all()
            if not matriculados:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND)   
            return Response({
                'data': MatriculadosPregradoSexoSerializer(matriculados,many=True).data
            },status=status.HTTP_200_OK)
        else:
            for key,value in request.GET.items():
                if key not in MATRICULADOS_PREGRADO_SEXO_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
            matriculados = MatriculadosPregradoSexo.objects.filter(**request.GET.dict())
            if not matriculados:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND) 
            return Response({
                'data': MatriculadosPregradoSexoSerializer(matriculados,many=True).data
            },status=status.HTTP_200_OK)

class MatriculadosPregradoEdadView(APIView):
    def get(self,request):
        if not request.GET:
            matriculados = MatriculadosPregradoEdad.objects.all()
            if not matriculados:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND)   
            return Response({
                'data': MatriculadosPregradoEdadSerializer(matriculados,many=True).data
            },status=status.HTTP_200_OK)
        else:
            for key,value in request.GET.items():
                if key not in MATRICULADOS_PREGRADO_EDAD_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
            matriculados = MatriculadosPregradoEdad.objects.filter(**request.GET.dict())
            if not matriculados:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND) 
            return Response({
                'data': MatriculadosPregradoEdadSerializer(matriculados,many=True).data
            },status=status.HTTP_200_OK)

class MatriculadosPregradoEstratoView(APIView):
    def get(self,request):
        if not request.GET:
            matriculados = MatriculadosPregradoEstrato.objects.all()
            if not matriculados:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND)   
            return Response({
                'data': MatriculadosPregradoEstratoSerializer(matriculados,many=True).data
            },status=status.HTTP_200_OK)
        else:
            for key,value in request.GET.items():
                if key not in MATRICULADOS_PREGRADO_ESTRATO_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
            matriculados = MatriculadosPregradoEstrato.objects.filter(**request.GET.dict())
            if not matriculados:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND) 
            return Response({
                'data': MatriculadosPregradoEstratoSerializer(matriculados,many=True).data
            },status=status.HTTP_200_OK)

class MatriculadosPregradoColegioView(APIView):
    def get(self,request):
        if not request.GET:
            matriculados = MatriculadosPregradoColegio.objects.all()
            if not matriculados:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND)   
            return Response({
                'data': MatriculadosPregradoColegioSerializer(matriculados,many=True).data
            },status=status.HTTP_200_OK)
        else:
            for key,value in request.GET.items():
                if key not in MATRICULADOS_PREGRADO_COLEGIO_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
            matriculados = MatriculadosPregradoColegio.objects.filter(**request.GET.dict())
            if not matriculados:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND) 
            return Response({
                'data': MatriculadosPregradoColegioSerializer(matriculados,many=True).data
            },status=status.HTTP_200_OK)
# ------------------------------------------------------------------------------
# MATRICULADOS POSGRADO
class MatriculadosPosgradoSexoView(APIView):
    def get(self,request):
        if not request.GET:
            matriculados = MatriculadosPosgradoSexo.objects.all()
            if not matriculados:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND)   
            return Response({
                'data': MatriculadosPosgradoSexoSerializer(matriculados,many=True).data
            },status=status.HTTP_200_OK)
        else:
            for key,value in request.GET.items():
                if key not in MATRICULADOS_POSGRADO_SEXO_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
            matriculados = MatriculadosPosgradoSexo.objects.filter(**request.GET.dict())
            if not matriculados:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND) 
            return Response({
                'data': MatriculadosPosgradoSexoSerializer(matriculados,many=True).data
            },status=status.HTTP_200_OK)

class MatriculadosPosgradoEdadView(APIView):
    def get(self,request):
        if not request.GET:
            matriculados = MatriculadosPosgradoEdad.objects.all()
            if not matriculados:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND)   
            return Response({
                'data': MatriculadosPosgradoEdadSerializer(matriculados,many=True).data
            },status=status.HTTP_200_OK)
        else:
            for key,value in request.GET.items():
                if key not in MATRICULADOS_POSGRADO_EDAD_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
            matriculados = MatriculadosPosgradoEdad.objects.filter(**request.GET.dict())
            if not matriculados:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND) 
            return Response({
                'data': MatriculadosPosgradoEdadSerializer(matriculados,many=True).data
            },status=status.HTTP_200_OK)

class MatriculadosPosgradoEstratoView(APIView):
    def get(self,request):
        if not request.GET:
            matriculados = MatriculadosPosgradoEstrato.objects.all()
            if not matriculados:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND)   
            return Response({
                'data': MatriculadosPosgradoEstratoSerializer(matriculados,many=True).data
            },status=status.HTTP_200_OK)
        else:
            for key,value in request.GET.items():
                if key not in MATRICULADOS_POSGRADO_ESTRATO_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
            matriculados = MatriculadosPosgradoEstrato.objects.filter(**request.GET.dict())
            if not matriculados:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND) 
            return Response({
                'data': MatriculadosPosgradoEstratoSerializer(matriculados,many=True).data
            },status=status.HTTP_200_OK)