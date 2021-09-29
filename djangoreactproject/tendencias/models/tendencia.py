from django.db import models

# -----------------------------------------------------------------------------------------------
# TENDENCIA POBLACIONAL FIELDS

# ***********************************************************************************
# MATRICULADOS
MATRICULADOS_NIVEL_FORMACION_FIELDS=[
    'Semestre',
    'Posgrado',
    'Pregrado',
    'Total',
]
MATRICULADOS_CATEGORIA_INSCRIPCION_FIELDS=[
    'Semestre',
    'General',
    'RestoRisaralda',
    'RegimenEspecial',
    'Total',
]
MATRICULADOS_SEXO_FIELDS=[
    'Semestre',
    'Masculino',
    'Femenino',
    'Total',
]
MATRICULADOS_ESTRATO_FIELDS=[
    'Semestre',
    'Estrato0',
    'EstratoI',
    'EstratoII',
    'EstratoIII',
    'EstratoIV',
    'EstratoV',
    'EstratoVI',
    'Total',
]
# MATRICULADOS PREGRADO
MATRICULADOS_PREGRADO_SEXO_FIELDS=[
    'Programa',
    'Semestre',
    'Masculino',
    'Femenino',
    'Total',
]
MATRICULADOS_PREGRADO_COLEGIO_FIELDS=[
    'Programa',
    'Semestre',
    'Oficial',
    'Privado',
    'Na',
    'Total',
]
MATRICULADOS_PREGRADO_ESTRATO_FIELDS=[
    'Programa',
    'Semestre',
    'Estrato0',
    'EstratoI',
    'EstratoII',
    'EstratoIII',
    'EstratoIV',
    'EstratoV',
    'EstratoVI',
    'Total',
]
MATRICULADOS_PREGRADO_EDAD_FIELDS = [
    'Programa',
    'Semestre',
    'MenorA17',
    'MayorA17MenorA22',
    'Edad22',
    'Edad23',
    'Edad24',
    'Edad25',
    'MayorA26MenorA31',
    'MayorA31',
    'Total',
]

# MATRICULADOS POSGRADO
MATRICULADOS_POSGRADO_SEXO_FIELDS=[
    'Programa',
    'Semestre',
    'Masculino',
    'Femenino',
    'Total',
]
MATRICULADOS_POSGRADO_ESTRATO_FIELDS=[
    'Programa',
    'Semestre',
    'Estrato0',
    'EstratoI',
    'EstratoII',
    'EstratoIII',
    'EstratoIV',
    'EstratoV',
    'EstratoVI',
    'Total',
]
MATRICULADOS_POSGRADO_EDAD_FIELDS = [
    'Programa',
    'Semestre',
    'MenorA17',
    'MayorA17MenorA22',
    'Edad22',
    'Edad23',
    'Edad24',
    'Edad25',
    'MayorA26MenorA31',
    'MayorA31',
    'Total',
]

# ----------------------------------------------------------------------------------------------


# -----------------------------------------------------------------------------------------------
# MODELO TENDENCIA POBLACIONAL
# ********************************************************************************************************************************
# MATRICULADOS
class MatriculadosNivelFormacion(models.Model):
    Semestre = models.CharField('Semestre',max_length=255,null=True)
    Posgrado = models.IntegerField('Posgrado',null=True)
    Pregrado = models.IntegerField('Pregrado',null=True)
    Total = models.IntegerField('Total',null=True)

    def __str__(self):
        return f'{self.Semestre}- {self.Total}'

class MatriculadosCategoriaInscripcion(models.Model):
    Semestre = models.CharField('Semestre',max_length=255,null=True)
    General = models.IntegerField('General',null=True)
    RestoRisaralda = models.IntegerField('Resto de Risaralda',null=True)
    RegimenEspecial = models.IntegerField('Regimen Especial',null=True)
    Total = models.IntegerField('Total',null=True)

    def __str__(self):
        return f'{self.Semestre}- {self.Total}'

class MatriculadosSexo(models.Model):
    Semestre = models.CharField('Semestre',max_length=255,null=True)
    Femenino = models.IntegerField('Femenino',null=True)
    Masculino = models.IntegerField('Masculino',null=True)
    Total = models.IntegerField('Total',null=True)

    def __str__(self):
        return f'{self.Semestre}- {self.Total}'

class MatriculadosEstrato(models.Model):
    Semestre = models.CharField('Semestre',max_length=255,null=True)
    Estrato0 = models.IntegerField('Estrato0',null=True)
    EstratoI = models.IntegerField('EstratoI',null=True)
    EstratoII = models.IntegerField('EstratoII',null=True)
    EstratoIII = models.IntegerField('EstratoIII',null=True)
    EstratoIV = models.IntegerField('EstratoIV',null=True)
    EstratoV = models.IntegerField('EstratoV',null=True)
    EstratoVI = models.IntegerField('EstratoVI',null=True)
    Total = models.IntegerField('Total',null=True)

    def __str__(self):
        return f'{self.Semestre}- {self.Total}'

# MATRICULADOS PREGRADO
class MatriculadosPregradoSexo(models.Model):
    Programa = models.CharField('Programa Académico',max_length=255,null=True)
    Semestre = models.CharField('Semestre',max_length=255,null=True)
    Masculino = models.IntegerField('Masculino',null=True)
    Femenino = models.IntegerField('Femenino',null=True)
    Total = models.IntegerField('Total',null=True)
    
    def __str__(self):
        return f'{self.Semestre}- {self.Programa}'

class MatriculadosPregradoColegio(models.Model):
    Programa = models.CharField('Programa Académico',max_length=255,null=True)
    Semestre = models.CharField('Semestre',max_length=255,null=True)
    Oficial = models.IntegerField('Oficial',null=True)
    Privado = models.IntegerField('Privado',null=True)
    Na = models.IntegerField('Na',null=True)
    Total = models.IntegerField('Total',null=True)

    def __str__(self):
        return f'{self.Semestre}- {self.Programa}'

class MatriculadosPregradoEstrato(models.Model):
    Programa = models.CharField('Programa Académico',max_length=255,null=True)
    Semestre = models.CharField('Semestre',max_length=255,null=True)
    Estrato0 = models.IntegerField('Estrato0',null=True)
    EstratoI = models.IntegerField('EstratoI',null=True)
    EstratoII = models.IntegerField('EstratoII',null=True)
    EstratoIII = models.IntegerField('EstratoIII',null=True)
    EstratoIV = models.IntegerField('EstratoIV',null=True)
    EstratoV = models.IntegerField('EstratoV',null=True)
    EstratoVI = models.IntegerField('EstratoVI',null=True)
    Total = models.IntegerField('Total',null=True)

    def __str__(self):
        return f'{self.Semestre}- {self.Programa}'

class MatriculadosPregradoEdad(models.Model):
    Programa = models.CharField('Programa Académico',max_length=255,null=True)
    Semestre = models.CharField('Semestre',max_length=255,null=True)
    MenorA17 = models.IntegerField('MenorA17',null=True)
    MayorA17MenorA22 = models.IntegerField('MayorA17MenorA22',null=True)
    Edad22 = models.IntegerField('Edad22',null=True)
    Edad23 = models.IntegerField('Edad23',null=True)
    Edad24 = models.IntegerField('Edad24',null=True)
    Edad25 = models.IntegerField('Edad25',null=True)
    MayorA26MenorA31 = models.IntegerField('MayorA26MenorA31',null=True)
    MayorA31 = models.IntegerField('MayorA31',null=True)
    Total = models.IntegerField('Total',null=True)

    def __str__(self):
        return f'{self.Semestre}- {self.Programa}'

# MATRICULADOS Posgrado
class MatriculadosPosgradoSexo(models.Model):
    Programa = models.CharField('Programa Académico',max_length=255,null=True)
    Semestre = models.CharField('Semestre',max_length=255,null=True)
    Masculino = models.IntegerField('Masculino',null=True)
    Femenino = models.IntegerField('Femenino',null=True)
    Total = models.IntegerField('Total',null=True)
    
    def __str__(self):
        return f'{self.Semestre}- {self.Programa}'

class MatriculadosPosgradoEstrato(models.Model):
    Programa = models.CharField('Programa Académico',max_length=255,null=True)
    Semestre = models.CharField('Semestre',max_length=255,null=True)
    Estrato0 = models.IntegerField('Estrato0',null=True)
    EstratoI = models.IntegerField('EstratoI',null=True)
    EstratoII = models.IntegerField('EstratoII',null=True)
    EstratoIII = models.IntegerField('EstratoIII',null=True)
    EstratoIV = models.IntegerField('EstratoIV',null=True)
    EstratoV = models.IntegerField('EstratoV',null=True)
    EstratoVI = models.IntegerField('EstratoVI',null=True)
    Total = models.IntegerField('Total',null=True)

    def __str__(self):
        return f'{self.Semestre}- {self.Programa}'

class MatriculadosPosgradoEdad(models.Model):
    Programa = models.CharField('Programa Académico',max_length=255,null=True)
    Semestre = models.CharField('Semestre',max_length=255,null=True)
    MenorA17 = models.IntegerField('MenorA17',null=True)
    MayorA17MenorA22 = models.IntegerField('MayorA17MenorA22',null=True)
    Edad22 = models.IntegerField('Edad22',null=True)
    Edad23 = models.IntegerField('Edad23',null=True)
    Edad24 = models.IntegerField('Edad24',null=True)
    Edad25 = models.IntegerField('Edad25',null=True)
    MayorA26MenorA31 = models.IntegerField('MayorA26MenorA31',null=True)
    MayorA31 = models.IntegerField('MayorA31',null=True)
    Total = models.IntegerField('Total',null=True)

    def __str__(self):
        return f'{self.Semestre}- {self.Programa}'


# ----------------------------------------------------------------------------------------------


