from ..models.tendencia import Tendencia

import pandas as pd 
import json as json 

def run():
    datosTendencia = pd.read_csv('../../CSV/Tendencias.csv',encoding='utf8')      
    datosTendencia.to_json(orient = 'records',force_ascii=False)
    print(type(datosTendencia))

