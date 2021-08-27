from django.db import models

# Create your models here.
class Tendencia(models.Model):
    semestre = models.CharField(max_length=255)
    inscrito = models.IntegerField()
    primerCurso = models.IntegerField()
    matriculado = models.IntegerField()
    graduado = models.IntegerField()
    programaAcademico = models.CharField(max_length=255)