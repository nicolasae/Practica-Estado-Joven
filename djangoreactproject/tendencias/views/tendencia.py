from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from cerberus import Validator

from ..serializers.tendencia import TendenciaSerializer
from ..models.tendencia import Tendencia
from ..models.tendencia import TENDENCIA_FIELDS

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


