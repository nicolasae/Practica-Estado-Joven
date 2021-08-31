from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from cerberus import Validator

# Tendencias imports 
from ..serializers.tendencia import TendenciaSerializer
from ..models.tendencia import Tendencia
from ..models.tendencia import TENDENCIA_FIELDS
# Programas No Ofrecidos imports 
from ..serializers.tendencia import ProgramasNoOfrecidosSerializer
from ..models.tendencia import ProgramasNoOfrecidos
from ..models.tendencia import PROGRAMASNOOFRECIDOS_FIELDS
# Programas Ofrecidos imports 
from ..serializers.tendencia import ProgramasOfrecidosSerializer
from ..models.tendencia import ProgramasOfrecidos
from ..models.tendencia import PROGRAMASOFRECIDOS_FIELDS



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

