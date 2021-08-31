from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from cerberus import Validator

# Tendencias imports 
from ..serializers.tendencia import TendenciaSerializer
from ..models.tendencia import DocentesPorFormacion, Tendencia
from ..models.tendencia import TENDENCIA_FIELDS
# Programas No Ofrecidos imports 
from ..serializers.tendencia import ProgramasNoOfrecidosSerializer
from ..models.tendencia import ProgramasNoOfrecidos
from ..models.tendencia import PROGRAMASNOOFRECIDOS_FIELDS
# Programas Ofrecidos imports 
from ..serializers.tendencia import ProgramasOfrecidosSerializer
from ..models.tendencia import ProgramasOfrecidos
from ..models.tendencia import PROGRAMASOFRECIDOS_FIELDS
# Matriculado Segun Colegio imports 
from ..serializers.tendencia import MatriculadoSegunColegioSerializer
from ..models.tendencia import MatriculadoSegunColegio
from ..models.tendencia import MATRICULADOSEGUNCOLEGIO_FIELDS
# Matriculado Segun Edad imports 
from ..serializers.tendencia import MatriculadoSegunEdadSerializer
from ..models.tendencia import MatriculadoSegunEdad
from ..models.tendencia import MATRICULADOSEGUNEDAD_FIELDS
# Matriculado Segun Sexo imports 
from ..serializers.tendencia import MatriculadoSegunSexoSerializer
from ..models.tendencia import MatriculadoSegunSexo
from ..models.tendencia import MATRICULADOSEGUNSEXO_FIELDS
# Docentes por Dependencia imports 
from ..serializers.tendencia import DocentesPorDependenciaSerializer
from ..models.tendencia import DocentesPorDependencia
from ..models.tendencia import DOCENTESPORDEPENDENCIA_FIELDS
# Docentes por Formación imports 
from ..serializers.tendencia import DocentesPorFormacionSerializer
from ..models.tendencia import DocentesPorFormacion
from ..models.tendencia import DOCENTESPORFORMACION_FIELDS
# Docentes por Sexo imports 
from ..serializers.tendencia import DocentesPorSexoSerializer
from ..models.tendencia import DocentesPorSexo
from ..models.tendencia import DOCENTESPORSEXO_FIELDS

class TendenciaView(APIView):
    def get(self,request):
        if not request.GET:
            tendencias = Tendencia.objects.all()
            if not tendencias:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND)   
            return Response({
                'data': TendenciaSerializer(tendencias,many=True).data
            },status=status.HTTP_200_OK)
        else:
            for key,value in request.GET.items():
                if key not in TENDENCIA_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
            tendencias = Tendencia.objects.filter(**request.GET.dict())
            if not tendencias:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND) 
            return Response({
                'data': TendenciaSerializer(tendencias,many=True).data
            },status=status.HTTP_200_OK)

class ProgramasNoOfrecidosView(APIView):
    def get(self,request):
        if not request.GET:
            programas = ProgramasNoOfrecidos.objects.all()
            if not programas:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND)   
            return Response({
                'data': ProgramasNoOfrecidosSerializer(programas,many=True).data
            },status=status.HTTP_200_OK)
        else:
            for key,value in request.GET.items():
                if key not in PROGRAMASNOOFRECIDOS_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
            programas = ProgramasNoOfrecidos.objects.filter(**request.GET.dict())
            if not programas:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND) 
            return Response({
                'data': ProgramasNoOfrecidosSerializer(programas,many=True).data
            },status=status.HTTP_200_OK)

class ProgramasOfrecidosView(APIView):
    def get(self,request):
        if not request.GET:
            programas = ProgramasOfrecidos.objects.all()
            if not programas:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND)   
            return Response({
                'data': ProgramasOfrecidosSerializer(programas,many=True).data
            },status=status.HTTP_200_OK)
        else:
            for key,value in request.GET.items():
                if key not in PROGRAMASOFRECIDOS_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
            programas = ProgramasOfrecidos.objects.filter(**request.GET.dict())
            if not programas:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND) 
            return Response({
                'data': ProgramasOfrecidosSerializer(programas,many=True).data
            },status=status.HTTP_200_OK)

class MatriculadoSegunColegioView(APIView):
    def get(self,request):
        if not request.GET:
            matriculados = MatriculadoSegunColegio.objects.all()
            if not matriculados:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND)   
            return Response({
                'data': MatriculadoSegunColegioSerializer(matriculados,many=True).data
            },status=status.HTTP_200_OK)
        else:
            for key,value in request.GET.items():
                if key not in MATRICULADOSEGUNCOLEGIO_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
            matriculados = MatriculadoSegunColegio.objects.filter(**request.GET.dict())
            if not matriculados:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND) 
            return Response({
                'data': MatriculadoSegunColegioSerializer(matriculados,many=True).data
            },status=status.HTTP_200_OK)

class MatriculadoSegunEdadView(APIView):
    def get(self,request):
        if not request.GET:
            matriculados = MatriculadoSegunEdad.objects.all()
            if not matriculados:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND)   
            return Response({
                'data': MatriculadoSegunEdadSerializer(matriculados,many=True).data
            },status=status.HTTP_200_OK)
        else:
            for key,value in request.GET.items():
                if key not in MATRICULADOSEGUNEDAD_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
            matriculados = MatriculadoSegunEdad.objects.filter(**request.GET.dict())
            if not matriculados:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND) 
            return Response({
                'data': MatriculadoSegunEdadSerializer(matriculados,many=True).data
            },status=status.HTTP_200_OK)

class MatriculadoSegunSexoView(APIView):
    def get(self,request):
        if not request.GET:
            matriculados = MatriculadoSegunSexo.objects.all()
            if not matriculados:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND)   
            return Response({
                'data': MatriculadoSegunSexoSerializer(matriculados,many=True).data
            },status=status.HTTP_200_OK)
        else:
            for key,value in request.GET.items():
                if key not in MATRICULADOSEGUNSEXO_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
            matriculados = MatriculadoSegunSexo.objects.filter(**request.GET.dict())
            if not matriculados:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND) 
            return Response({
                'data': MatriculadoSegunSexoSerializer(matriculados,many=True).data
            },status=status.HTTP_200_OK)

class DocentesPorDependenciaView(APIView):
    def get(self,request):
        if not request.GET:
            docentes = DocentesPorDependencia.objects.all()
            if not docentes:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND)   
            return Response({
                'data': DocentesPorDependenciaSerializer(docentes,many=True).data
            },status=status.HTTP_200_OK)
        else:
            for key,value in request.GET.items():
                if key not in DOCENTESPORDEPENDENCIA_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
            docentes = DocentesPorDependencia.objects.filter(**request.GET.dict())
            if not docentes:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND) 
            return Response({
                'data': DocentesPorDependenciaSerializer(docentes,many=True).data
            },status=status.HTTP_200_OK)

class DocentesPorFormacionView(APIView):
    def get(self,request):
        if not request.GET:
            docentes = DocentesPorFormacion.objects.all()
            if not docentes:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND)   
            return Response({
                'data': DocentesPorFormacionSerializer(docentes,many=True).data
            },status=status.HTTP_200_OK)
        else:
            for key,value in request.GET.items():
                if key not in DOCENTESPORFORMACION_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
            docentes = DocentesPorFormacion.objects.filter(**request.GET.dict())
            if not docentes:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND) 
            return Response({
                'data': DocentesPorFormacionSerializer(docentes,many=True).data
            },status=status.HTTP_200_OK)

class DocentesPorSexoView(APIView):
    def get(self,request):
        if not request.GET:
            docentes = DocentesPorSexo.objects.all()
            if not docentes:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND)   
            return Response({
                'data': DocentesPorSexoSerializer(docentes,many=True).data
            },status=status.HTTP_200_OK)
        else:
            for key,value in request.GET.items():
                if key not in DOCENTESPORSEXO_FIELDS:
                    return Response({
                        'data': f'El filtro {key} no está disponible'
                    },status=status.HTTP_409_CONFLICT)
            docentes = DocentesPorSexo.objects.filter(**request.GET.dict())
            if not docentes:  
                return Response({
                    'data': 'No se encontraron los registros'
                },status=status.HTTP_404_NOT_FOUND) 
            return Response({
                'data': DocentesPorSexoSerializer(docentes,many=True).data
            },status=status.HTTP_200_OK)




