from ..models.tendencia import ProgramasOfrecidos
from django.conf import settings

import pandas as pd 
import json as json 


def run():
    print(str(settings.BASE_DIR))
    datosProgramas = pd.read_csv(str(settings.BASE_DIR) + "/CSV/DetalleProgramasOfrecidos.csv",encoding='utf8')      
    datosProgramas = datosProgramas.to_json(orient = 'records',force_ascii=False)
    # Se transforma de json a dict de python 
    datosProgramas = json.loads(datosProgramas)
    ProgramasOfrecidos.objects.all().delete()

    for i in datosProgramas:
        ProgramasOfrecidos.objects.create(**i)
        

