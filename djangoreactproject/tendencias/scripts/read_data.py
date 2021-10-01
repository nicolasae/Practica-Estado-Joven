from django.conf import settings

import pandas as pd 
import json as json 
from ..models.tendencia import Tendencia
from ..models.tendencia import DesercionInterAnual
from ..models.tendencia import DesercionInterSemestral
from ..models.tendencia import AnalisisCohorte


def run():
    
    # TENDENCIA
    dataTendencia = pd.read_csv(str(settings.BASE_DIR) + "/CSV/Tendencias_Ingenieria.csv",encoding='utf8')      
    # Eliminar columnas innecesarias
    dataTendencia.drop('FACULTAD',inplace=True, axis=1)
    dataTendencia.drop('FECHA_ACTUALIZACION',inplace=True, axis=1)
    dataTendencia.drop('COD_UTP',inplace=True, axis=1)

    dataTendencia = dataTendencia.to_json(orient = 'records',force_ascii=False)
    # Se transforma de json a dict de python 
    dataTendencia = json.loads(dataTendencia)

    Tendencia.objects.all().delete()
    for i in dataTendencia:
        Tendencia.objects.create(**i)

    # DESERCION INTERANUAL
    dataDIA = pd.read_csv(str(settings.BASE_DIR) + "/CSV/DIA_Ingenieria.csv",encoding='utf8')      
    # Eliminar columnas innecesarias
    dataDIA.drop('FACULTAD',inplace=True, axis=1)
    dataDIA = dataDIA.to_json(orient = 'records',force_ascii=False)
    # Se transforma de json a dict de python 
    dataDIA = json.loads(dataDIA)

    DesercionInterAnual.objects.all().delete()
    for i in dataDIA:
        DesercionInterAnual.objects.create(**i)

    # DESERCION INTERSEMESTRAL
    dataDIS = pd.read_csv(str(settings.BASE_DIR) + "/CSV/DIS_Ingenieria.csv",encoding='utf8')      
    # Eliminar columnas innecesarias
    dataDIS.drop('FACULTAD',inplace=True, axis=1)
    dataDIS = dataDIS.to_json(orient = 'records',force_ascii=False)
    # Se transforma de json a dict de python 
    dataDIS = json.loads(dataDIS)

    DesercionInterSemestral.objects.all().delete()
    for i in dataDIS:
        DesercionInterSemestral.objects.create(**i)

    
    # ANALISIS COHORTE
    dataCohorte = pd.read_csv(str(settings.BASE_DIR) + "/CSV/ANALISIS_COHORTE_Ingenieria.csv",encoding='utf8')      
    # Eliminar columnas innecesarias
    dataCohorte.drop('FACULTAD',inplace=True, axis=1)
    dataCohorte = dataCohorte.to_json(orient = 'records',force_ascii=False)
    # Se transforma de json a dict de python 
    dataCohorte = json.loads(dataCohorte)

    AnalisisCohorte.objects.all().delete()
    for i in dataCohorte:
        AnalisisCohorte.objects.create(**i)