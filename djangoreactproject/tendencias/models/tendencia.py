from django.db import models


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

DESERCION_INTERANUAL_FIELDS = [
    'CANTIDAD',
    'ESTADO',
    'PERBASE',
    'COD_PERIODO',
    'COD_UTP',
    'NIVEL',
    'SUBNIVEL',
    'NOMBRE',
    'DURACION_SEMESTRES',
    'PERIODOS',
]

DESERCION_INTERSEMESTRAL_FIELDS = [
    'ESTADO',
    'PERBASE',
    'COD_PERIODO',
    'COD_UTP',
    'NIVEL',
    'SUBNIVEL',
    'NOMBRE',
    'DURACION_SEMESTRES',
    'PERIODOS',
    'CANTIDAD',
]

ANALISIS_COHORTE_FIELDS = [
    'CANTIDAD',
    'COD_PERIODO',
    'IDPER',
    'COD_UTP',
    'ESTADO',
    'NIVEL',
    'NOMBRE',
]




# ********************************************************************************************************************************
class Tendencia(models.Model):
    COD_PERIODO = models.CharField('Semestre',max_length=255,null=True)
    ESTUDIANTES = models.IntegerField('Estudiantes',null=True)
    ESTRATO = models.CharField('Estrato',max_length=255,null=True)
    SEXO = models.CharField('Sexo',max_length=255,null=True)
    TIPO_INSCRIPCION = models.CharField('Tipo de Inscripción',max_length=255,null=True)
    TIPO_COLEGIO = models.CharField('Tipo de Colegio',max_length=255,null=True)
    VAR = models.CharField('Nivel de Formación',max_length=255,null=True) 

    def __str__(self):
        return f'Semestre: {self.COD_PERIODO}- Estudiantes: {self.ESTUDIANTES}-Estrato:{self.ESTRATO}-Sexo:{self.SEXO}'

class DesercionInterAnual(models.Model):
    CANTIDAD = models.IntegerField('Cantidad',null=True)
    ESTADO = models.CharField('Estado',max_length=255,null=True)
    PERBASE = models.IntegerField('Periodo base',null=True)
    COD_PERIODO = models.CharField('Semestre',max_length=255,null=True)
    COD_UTP = models.CharField('Código UTP',max_length=255,null=True)
    NIVEL = models.CharField('Nivel',max_length=255,null=True)
    SUBNIVEL = models.CharField('Subnivel',max_length=255,null=True)
    NOMBRE = models.CharField('Programa Academico',max_length=255,null=True)
    DURACION_SEMESTRES = models.IntegerField('Duración en semestres',null=True)
    PERIODOS = models.CharField('Periodos',max_length=255,null=True)

    def __str__(self):
        return f'Semestre: {self.COD_PERIODO}-Codigo: {self.COD_UTP}- Estudiantes: {self.CANTIDAD}'

class DesercionInterSemestral(models.Model):
    ESTADO = models.CharField('Estado',max_length=255,null=True)
    PERBASE = models.IntegerField('Periodo base',null=True)
    COD_PERIODO = models.CharField('Semestre',max_length=255,null=True)
    COD_UTP = models.CharField('Código UTP',max_length=255,null=True)
    NIVEL = models.CharField('Nivel',max_length=255,null=True)
    SUBNIVEL = models.CharField('Subnivel',max_length=255,null=True)
    NOMBRE = models.CharField('Programa Academico',max_length=255,null=True)
    DURACION_SEMESTRES = models.IntegerField('Duración en semestres',null=True)
    PERIODOS = models.CharField('Periodos',max_length=255,null=True)
    CANTIDAD = models.IntegerField('Cantidad',null=True)

    def __str__(self):
        return f'Semestre: {self.COD_PERIODO}-Codigo: {self.COD_UTP}- Estudiantes: {self.CANTIDAD}'

class AnalisisCohorte(models.Model):
    CANTIDAD = models.IntegerField('Cantidad',null=True)
    COD_PERIODO = models.CharField('Semestre',max_length=255,null=True)
    IDPER = models.IntegerField('IDPER',null=True)
    COD_UTP = models.CharField('Código UTP',max_length=255,null=True)
    ESTADO = models.CharField('Estado',max_length=255,null=True)
    NIVEL = models.CharField('NIVEL',max_length=255,null=True)
    NOMBRE = models.CharField('NOMBRE',max_length=255,null=True)    

    def __str__(self):
        return f'Semestre: {self.COD_PERIODO}-Codigo: {self.COD_UTP}- Estudiantes: {self.CANTIDAD}'


