from django.db import models

# Create your models here.
class Tendencia(models.Model):
    semestre = models.CharField('semestre',max_length=255)
    inscrito = models.IntegerField('inscrito')
    primerCurso = models.IntegerField('primerCurso')
    matriculado = models.IntegerField('matriculado')
    graduado = models.IntegerField('graduado')
    programaAcademico = models.CharField('programaAcademico',max_length=255)
    
    def __str__(self):
        return f'ID:{self.id}- {self.semestre}- {self.programaAcademico}'