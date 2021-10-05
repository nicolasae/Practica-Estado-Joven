from django.conf import settings

import pandas as pd 
import json as json 
from ..models.tendencia import Tendencia

def run():
    tendencia = Tendencia.objects.filter(entry__COD_PERIODO__contains='2020')
    print(tendencia)