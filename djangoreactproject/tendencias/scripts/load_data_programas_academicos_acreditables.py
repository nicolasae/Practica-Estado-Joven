from ..models.tendencia import ProgramasAcademicosAcreditables
from django.conf import settings

import pandas as pd 
import json as json 


def run():
    print(str(settings.BASE_DIR))
    datos = pd.read_csv(str(settings.BASE_DIR) + "/CSV/ProgramasAcademicosAcreditables.csv",encoding='utf8')      
    datos = datos.to_json(orient = 'records',force_ascii=False)
    # Se transforma de json a dict de python 
    datos = json.loads(datos)
    ProgramasAcademicosAcreditables.objects.all().delete()

    for i in datos:
        ProgramasAcademicosAcreditables.objects.create(**i)
        

