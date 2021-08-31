from django.db import models

TENDENCIA_FIELDS = [
    'Semestre',
    'Inscrito',
    'PrimerCurso',
    'Matriculado',
    'Graduado',
    'Programa',
]

# Create your models here.
class Tendencia(models.Model):
    Semestre = models.CharField('Semestre',max_length=255,null=True)
    Inscrito = models.IntegerField('Inscrito',null=True)
    PrimerCurso = models.IntegerField('Primer Curso',null=True)
    Matriculado = models.IntegerField('Matriculado',null=True)
    Graduado = models.IntegerField('Graduado',null=True)
    Programa = models.CharField('Programa Academico',max_length=255,null=True)
    
    def __str__(self):
        return f'{self.Semestre}- {self.Programa}'