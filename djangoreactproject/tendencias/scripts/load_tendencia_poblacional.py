# Import Models 
# MATRICULADOS
from ..models.tendencia import MatriculadosNivelFormacion
from ..models.tendencia import MatriculadosCategoriaInscripcion
from ..models.tendencia import MatriculadosEstrato
from ..models.tendencia import MatriculadosSexo
from ..models.tendencia import MatriculadosPregradoSexo
from ..models.tendencia import MatriculadosPregradoEdad
from ..models.tendencia import MatriculadosPregradoEstrato
from ..models.tendencia import MatriculadosPregradoColegio
from ..models.tendencia import MatriculadosPosgradoSexo
from ..models.tendencia import MatriculadosPosgradoEdad
from ..models.tendencia import MatriculadosPosgradoEstrato

from django.conf import settings

import pandas as pd 
import json as json 

def run():
# ---------------------------------------------------------------------------------
# MATRICULADOS 
    datosMatriculadosNivelFormacion = pd.read_csv(str(settings.BASE_DIR) + "/CSV/Tendencia Poblacional/Matriculados General - Segun Nivel de Formacion.csv",encoding='utf8')      
    datosMatriculadosNivelFormacion = datosMatriculadosNivelFormacion.to_json(orient = 'records',force_ascii=False)
    # Se transforma de json a dict de python 
    datosMatriculadosNivelFormacion = json.loads(datosMatriculadosNivelFormacion)
    MatriculadosNivelFormacion.objects.all().delete()
    for i in datosMatriculadosNivelFormacion:
        MatriculadosNivelFormacion.objects.create(**i)
    
    datosMatriculadosCategoriaInscripcion = pd.read_csv(str(settings.BASE_DIR) + "/CSV/Tendencia Poblacional/Matriculados General - Segun Categoria de Inscripcion.csv",encoding='utf8')      
    datosMatriculadosCategoriaInscripcion = datosMatriculadosCategoriaInscripcion.to_json(orient = 'records',force_ascii=False)
    # Se transforma de json a dict de python 
    datosMatriculadosCategoriaInscripcion = json.loads(datosMatriculadosCategoriaInscripcion)
    MatriculadosCategoriaInscripcion.objects.all().delete()
    for i in datosMatriculadosCategoriaInscripcion:
        MatriculadosCategoriaInscripcion.objects.create(**i)
    
    datosMatriculadosSexo = pd.read_csv(str(settings.BASE_DIR) + "/CSV/Tendencia Poblacional/Matriculados General - Segun Sexo.csv",encoding='utf8')      
    datosMatriculadosSexo = datosMatriculadosSexo.to_json(orient = 'records',force_ascii=False)
    # Se transforma de json a dict de python 
    datosMatriculadosSexo = json.loads(datosMatriculadosSexo)
    MatriculadosSexo.objects.all().delete()
    for i in datosMatriculadosSexo:
        MatriculadosSexo.objects.create(**i)

    datosMatriculadosEstrato = pd.read_csv(str(settings.BASE_DIR) + "/CSV/Tendencia Poblacional/Matriculados General - Segun Estrato.csv",encoding='utf8')      
    datosMatriculadosEstrato = datosMatriculadosEstrato.to_json(orient = 'records',force_ascii=False)
    # Se transforma de json a dict de python 
    datosMatriculadosEstrato = json.loads(datosMatriculadosEstrato)
    MatriculadosEstrato.objects.all().delete()
    for i in datosMatriculadosEstrato:
        MatriculadosEstrato.objects.create(**i)

# -------------------------------------------------------------------------------------
    # MATRICULADOS PREGRADO
    datosMatriculadosPregradoSexo = pd.read_csv(str(settings.BASE_DIR) + "/CSV/Tendencia Poblacional/Matriculados Pregrado - Segun Sexo.csv",encoding='utf8')      
    datosMatriculadosPregradoSexo = datosMatriculadosPregradoSexo.to_json(orient = 'records',force_ascii=False)
    # Se transforma de json a dict de python 
    datosMatriculadosPregradoSexo = json.loads(datosMatriculadosPregradoSexo)
    MatriculadosPregradoSexo.objects.all().delete()
    for i in datosMatriculadosPregradoSexo:
        MatriculadosPregradoSexo.objects.create(**i)

    datosMatriculadosPregradoEstrato = pd.read_csv(str(settings.BASE_DIR) + "/CSV/Tendencia Poblacional/Matriculados Pregrado - Segun Estrato.csv",encoding='utf8')      
    datosMatriculadosPregradoEstrato = datosMatriculadosPregradoEstrato.to_json(orient = 'records',force_ascii=False)
    datosMatriculadosPregradoEstrato = json.loads(datosMatriculadosPregradoEstrato)
    MatriculadosPregradoEstrato.objects.all().delete()
    for i in datosMatriculadosPregradoEstrato:
        MatriculadosPregradoEstrato.objects.create(**i)
    
    datosMatriculadosPregradoEdad = pd.read_csv(str(settings.BASE_DIR) + "/CSV/Tendencia Poblacional/Matriculados Pregrado - Segun Edad.csv",encoding='utf8')      
    datosMatriculadosPregradoEdad = datosMatriculadosPregradoEdad.to_json(orient = 'records',force_ascii=False)
    datosMatriculadosPregradoEdad = json.loads(datosMatriculadosPregradoEdad)
    MatriculadosPregradoEdad.objects.all().delete()
    for i in datosMatriculadosPregradoEdad:
        MatriculadosPregradoEdad.objects.create(**i)

    datosMatriculadosPregradoColegio = pd.read_csv(str(settings.BASE_DIR) + "/CSV/Tendencia Poblacional/Matriculados Pregrado - Segun Colegio.csv",encoding='utf8')      
    datosMatriculadosPregradoColegio = datosMatriculadosPregradoColegio.to_json(orient = 'records',force_ascii=False)
    datosMatriculadosPregradoColegio = json.loads(datosMatriculadosPregradoColegio)
    MatriculadosPregradoColegio.objects.all().delete()
    for i in datosMatriculadosPregradoColegio:
        MatriculadosPregradoColegio.objects.create(**i)
# -------------------------------------------------------------------------------------------------------------
    # MATRICULADOS POSGRADO
    datosMatriculadosPosgradoSexo = pd.read_csv(str(settings.BASE_DIR) + "/CSV/Tendencia Poblacional/Matriculados Posgrado - Segun Sexo.csv",encoding='utf8')      
    datosMatriculadosPosgradoSexo = datosMatriculadosPosgradoSexo.to_json(orient = 'records',force_ascii=False)
    datosMatriculadosPosgradoSexo = json.loads(datosMatriculadosPosgradoSexo)
    MatriculadosPosgradoSexo.objects.all().delete()
    for i in datosMatriculadosPosgradoSexo:
        MatriculadosPosgradoSexo.objects.create(**i)

    datosMatriculadosPosgradoEstrato = pd.read_csv(str(settings.BASE_DIR) + "/CSV/Tendencia Poblacional/Matriculados Posgrado - Segun Estrato.csv",encoding='utf8')      
    datosMatriculadosPosgradoEstrato = datosMatriculadosPosgradoEstrato.to_json(orient = 'records',force_ascii=False)
    datosMatriculadosPosgradoEstrato = json.loads(datosMatriculadosPosgradoEstrato)
    MatriculadosPosgradoEstrato.objects.all().delete()
    for i in datosMatriculadosPosgradoEstrato:
        MatriculadosPosgradoEstrato.objects.create(**i)
    
    datosMatriculadosPosgradoEdad = pd.read_csv(str(settings.BASE_DIR) + "/CSV/Tendencia Poblacional/Matriculados Posgrado - Segun Edad.csv",encoding='utf8')      
    datosMatriculadosPosgradoEdad = datosMatriculadosPosgradoEdad.to_json(orient = 'records',force_ascii=False)
    datosMatriculadosPosgradoEdad = json.loads(datosMatriculadosPosgradoEdad)
    MatriculadosPosgradoEdad.objects.all().delete()
    for i in datosMatriculadosPosgradoEdad:
        MatriculadosPosgradoEdad.objects.create(**i)