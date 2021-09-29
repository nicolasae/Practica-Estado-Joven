from django.db import models

# -----------------------------------------------------------------------------------------------
# TENDENCIA POBLACIONAL FIELDS
# ***********************************************************************************
TENDENCIA_FIELDS = [
    'COD_PERIODO',
    'COD_UTP',
    'ESTUDIANTES',
    'ESTRATO',
    'SEXO',
    'TIPO_INSCRIPCION',
    'TIPO_COLEGIO',
    'VAR',
]



# -----------------------------------------------------------------------------------------------
# MODELO TENDENCIA POBLACIONAL
# ********************************************************************************************************************************
class Tendencia(models.Model):
    COD_PERIODO = models.CharField('Semestre',max_length=255,null=True)
    COD_UTP = models.CharField('Código UTP',max_length=255,null=True)
    ESTUDIANTES = models.IntegerField('Estudiantes',null=True)
    ESTRATO = models.CharField('Estrato',max_length=255,null=True)
    SEXO = models.CharField('Sexo',max_length=255,null=True)
    TIPO_INSCRIPCION = models.CharField('Tipo de Inscripción',max_length=255,null=True)
    TIPO_COLEGIO = models.CharField('Tipo de Colegio',max_length=255,null=True)
    VAR = models.CharField('Nivel de Formación',max_length=255,null=True) 

    def __str__(self):
        return f'Semestre: {self.COD_PERIODO}-Codigo: {self.COD_UTP}- Estudiantes: {self.ESTUDIANTES}'

