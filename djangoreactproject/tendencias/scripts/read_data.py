from django.conf import settings

import pandas as pd 
import json as json 
from ..models.tendencia import Tendencia
def run():
    dataTendencia = pd.read_csv(str(settings.BASE_DIR) + "/CSV/Tendencias_Ingenieria.csv",encoding='utf8')      
    # Eliminar columnas innecesarias
    dataTendencia.drop('FACULTAD',inplace=True, axis=1)
    dataTendencia.drop('FECHA_ACTUALIZACION',inplace=True, axis=1)
    dataTendencia = dataTendencia.to_json(orient = 'records',force_ascii=False)
    # Se transforma de json a dict de python 
    dataTendencia = json.loads(dataTendencia)

    Tendencia.objects.all().delete()
    for i in dataTendencia:
        Tendencia.objects.create(**i)