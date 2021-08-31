from ..models.tendencia import Tendencia
from django.conf import settings

import pandas as pd 
import json as json 


def run():
    print(str(settings.BASE_DIR))
    datosTendencia = pd.read_csv(str(settings.BASE_DIR) + "/CSV/Tendencias.csv",encoding='utf8')      
    datosTendencia = datosTendencia.to_json(orient = 'records',force_ascii=False)
    # Se transforma de json a dict de python 
    datosTendencia = json.loads(datosTendencia)
    Tendencia.objects.all().delete()

    for i in datosTendencia:
        Tendencia.objects.create(**i)
        

