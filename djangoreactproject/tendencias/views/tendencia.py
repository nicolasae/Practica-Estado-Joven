from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from cerberus import Validator


# #####################################################################################################################
# TENDENCIA POBLACIONAL
from ..serializers.tendencia import TendenciaSerializer
from ..models.tendencia import TENDENCIA_FIELDS
from ..models.tendencia import Tendencia 
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
                'data': TendenciaSerializer(tendencia,many=True).data
            },status=status.HTTP_200_OK)
