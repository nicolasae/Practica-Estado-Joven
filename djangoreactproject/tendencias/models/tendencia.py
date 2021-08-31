from django.db import models

TENDENCIA_FIELDS = [
    'Semestre',
    'Inscrito',
    'PrimerCurso',
    'Matriculado',
    'Graduado',
    'Programa',
]

PROGRAMASNOOFRECIDOS_FIELDS = [
    'NombreProgramaAcademico',
    'CodigoSNIES',
    'DuracionEnSemestres',
    'ResolucionRegistroCalificado',
    'FechaInicioRC',
    'DuracionRCAños',
    'FechaFinalizacionRC',
    'Acreditable',
    'AcreditadoAltaCalidad',
    'ResolucionAC',
    'DuracionACAños',
    'AcreditacionInternacionalAI',
    'FechaInicioAI',
    'DuracionAIAños',
    'Año',
]

PROGRAMASOFRECIDOS_FIELDS = [
    'NombreProgramaAcademico',
    'CodigoSNIES',
    'DuracionEnSemestres',
    'ResolucionRegistroCalificado',
    'FechaInicioRC',
    'DuracionRCAños',
    'FechaFinalizacionRC',
    'Acreditable',
    'AcreditadoAltaCalidad',
    'ResolucionAC',
    'DuracionACAños',
    'AcreditacionInternacionalAI',
    'FechaInicioAI',
    'DuracionAIAños',
    'Año',
]

MATRICULADOSEGUNCOLEGIO_FIELDS = [
    'Programa',
    'Oficial',
    'Privado',
    'SinInformacion',
    'Semestre',
]

MATRICULADOSEGUNEDAD_FIELDS = [
    'Programa',
    'Menor17',
    'Mayor17Menor22',
    'Edad22',
    'Edad23',
    'Edad24',
    'Edad25',
    'Entre26Y30',
    'Mayor31',
    'Año',
]

MATRICULADOSEGUNSEXO_FIELDS = [
    'Programa',
    'Femenino',
    'Masculino',
    'Año'
]

DOCENTESPORDEPENDENCIA_FIELDS =[
    'Programa',
    'CantidadDocentes',
    'Semestre',
]

DOCENTESPORFORMACION_FIELDS =[
    'TipoDeVinculacion',
    'Semestre',
    'NivelDeFormacion',
    'CantidadDeDocentes',
]

DOCENTESPORSEXO_FIELDS =[
    'TipoDeVinculacion',
    'Sexo',
    'CantidadDeDocentes',
    'Semestre',
]


# Create your models here.

# Modelo Tendencia
class Tendencia(models.Model):
    Semestre = models.CharField('Semestre',max_length=255,null=True)
    Inscrito = models.IntegerField('Inscrito',null=True)
    PrimerCurso = models.IntegerField('Primer Curso',null=True)
    Matriculado = models.IntegerField('Matriculado',null=True)
    Graduado = models.IntegerField('Graduado',null=True)
    Programa = models.CharField('Programa Academico',max_length=255,null=True)
    
    def __str__(self):
        return f'{self.Semestre}- {self.Programa}'

# Modelo Detalle Programas No Ofrecidos
class ProgramasNoOfrecidos(models.Model):
     NombreProgramaAcademico = models.CharField('Nombre del Programa Academico',max_length=255,null=True)
     CodigoSNIES = models.CharField('Código SNIES',max_length=255,null=True)
     DuracionEnSemestres = models.IntegerField('Duración en Semestres',null=True)
     ResolucionRegistroCalificado = models.CharField('Resolución Registro Calificado',max_length=255,null=True)
     FechaInicioRC = models.CharField('Fecha de Inicio (RC)',max_length=255,null=True)
     DuracionRCAños = models.FloatField('Duración (RC) Años',null=True)
     FechaFinalizacionRC = models.CharField('Fechas Finalización (RC)',max_length=255,null=True)
     Acreditable = models.CharField('Acreditable',max_length=255,null=True)
     AcreditadoAltaCalidad = models.CharField('Acreditado Alta Calidad',max_length=255,null=True)
     ResolucionAC = models.CharField('Resolución (AC)',max_length=255,null=True)
     DuracionACAños = models.FloatField('Duración (AC) Años',null=True)
     AcreditacionInternacionalAI = models.CharField('Acreditación Internacional (AI)',max_length=255,null=True)
     FechaInicioAI = models.CharField('Fechas de Inicio (AI)',max_length=255,null=True)
     DuracionAIAños = models.IntegerField('Duración (AI) Años',null=True)
     Año = models.CharField('Año',max_length=255,null=True)

     def __str__(self):
        return f'{self.NombreProgramaAcademico}- {self.CodigoSNIES} - {self.Año}'


# Modelo Detalle Programas Ofrecidos
class ProgramasOfrecidos(models.Model):
     NombreProgramaAcademico = models.CharField('Nombre del Programa Académico',max_length=255,null=True)
     CodigoSNIES = models.CharField('Código SNIES',max_length=255,null=True)
     DuracionEnSemestres = models.IntegerField('Duración en Semestres',null=True)
     ResolucionRegistroCalificado = models.CharField('Resolución Registro Calificado',max_length=255,null=True)
     FechaInicioRC = models.CharField('Fecha de Inicio (RC)',max_length=255,null=True)
     DuracionRCAños = models.FloatField('Duración (RC) Años',null=True)
     FechaFinalizacionRC = models.CharField('Fechas Finalización (RC)',max_length=255,null=True)
     Acreditable = models.CharField('Acreditable',max_length=255,null=True)
     AcreditadoAltaCalidad = models.CharField('Acreditado Alta Calidad',max_length=255,null=True)
     ResolucionAC = models.CharField('Resolución (AC)',max_length=255,null=True)
     DuracionACAños = models.FloatField('Duración (AC) Años',null=True)
     AcreditacionInternacionalAI = models.CharField('Acreditación Internacional (AI)',max_length=255,null=True)
     FechaInicioAI = models.CharField('Fechas de Inicio (AI)',max_length=255,null=True)
     DuracionAIAños = models.IntegerField('Duración (AI) Años',null=True)
     Año = models.CharField('Año',max_length=255,null=True)

     def __str__(self):
        return f'{self.NombreProgramaAcademico}- {self.CodigoSNIES} - {self.Año}'

# Modelo Matriculado Segun Colegio
class MatriculadoSegunColegio(models.Model):
    Programa = models.CharField('Programa Académico',max_length=255,null=True)
    Oficial = models.IntegerField('Oficial',null=True)
    Privado = models.IntegerField('Privado',null=True)
    SinInformacion = models.IntegerField('Sin Información',null=True)
    Semestre = models.CharField('Semestre',max_length=255,null=True)
    
    def __str__(self):
        return f'{self.Programa}-  - {self.Semestre}'

# Modelo Matriculado Segun Edad
class MatriculadoSegunEdad(models.Model):
    Programa = models.CharField('Programa Académico',max_length=255,null=True)
    Menor17 = models.IntegerField('Menor a 17 años',null=True)
    Mayor17Menor22 = models.IntegerField('Mayor a 17 años y Menor a 22 años',null=True)
    Edad22 = models.IntegerField('Edad 22 años',null=True)
    Edad23 = models.IntegerField('Edad 23 años',null=True)
    Edad24 = models.IntegerField('Edad 24 años',null=True)
    Edad25 = models.IntegerField('Edad 25 años',null=True)
    Entre26Y30 = models.IntegerField('Entre 26 y 30 años',null=True)
    Mayor31 = models.IntegerField('Mayor a 31 años',null=True)
    Año = models.CharField('Año',max_length=255,null=True)

    def __str__(self):
        return f'{self.Programa}-  - {self.Año}'

# Modelo Matriculado Segun Sexo
class MatriculadoSegunSexo(models.Model):
    Programa = models.CharField('Programa Académico',max_length=255,null=True)
    Femenino = models.IntegerField('Femenino',null=True)
    Masculino = models.IntegerField('Masculino',null=True)
    Año = models.CharField('Año',max_length=255,null=True)

    def __str__(self):
        return f'{self.Programa}-  - {self.Año}'

# Modelo Personal Docente por Dependencia
class DocentesPorDependencia(models.Model):
    Programa = models.CharField('Programa Académico',max_length=255,null=True)
    CantidadDeDocentes = models.IntegerField('Cantidad de Docentes',null=True)
    Semestre = models.CharField('Semestre',max_length=255,null=True)

    def __str__(self):
        return f'{self.Programa}-  - {self.Semestre}'

# Modelo Personal Docente por Nivel de Formación 
class DocentesPorFormacion(models.Model):
    TipoDeVinculacion = models.CharField('Tipo De Vinculación',max_length=255,null=True)
    Semestre = models.CharField('Semestre',max_length=255,null=True)
    NivelDeFormacion = models.CharField('Nivel De Formación',max_length=255,null=True)
    CantidadDeDocentes = models.IntegerField('Cantidad de Docentes',null=True)
    
    def __str__(self):
        return f'{self.TipoDeVinculacion}- {self.Semestre}'

# Modelo Personal Docente por Sexo 
class DocentesPorSexo(models.Model):
    TipoDeVinculacion = models.CharField('Tipo De Vinculación',max_length=255,null=True)
    Sexo = models.CharField('Sexo',max_length=255,null=True)
    CantidadDeDocentes = models.IntegerField('Cantidad de Docentes',null=True)
    Semestre = models.CharField('Semestre',max_length=255,null=True)

    def __str__(self):
        return f'{self.TipoDeVinculacion}- {self.Semestre}'

