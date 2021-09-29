from django.contrib import admin
# Import para admin django

from .models.tendencia import MatriculadosNivelFormacion
from .models.tendencia import MatriculadosCategoriaInscripcion
from .models.tendencia import MatriculadosEstrato
from .models.tendencia import MatriculadosSexo
from .models.tendencia import MatriculadosPregradoSexo
from .models.tendencia import MatriculadosPregradoEdad
from .models.tendencia import MatriculadosPregradoEstrato
from .models.tendencia import MatriculadosPregradoColegio
from .models.tendencia import MatriculadosPosgradoSexo
from .models.tendencia import MatriculadosPosgradoEdad
from .models.tendencia import MatriculadosPosgradoEstrato


# Register your models here.
admin.site.register(MatriculadosNivelFormacion)
admin.site.register(MatriculadosCategoriaInscripcion)
admin.site.register(MatriculadosEstrato)
admin.site.register(MatriculadosSexo)
admin.site.register(MatriculadosPregradoSexo)
admin.site.register(MatriculadosPregradoEdad)
admin.site.register(MatriculadosPregradoEstrato)
admin.site.register(MatriculadosPregradoColegio)
admin.site.register(MatriculadosPosgradoSexo)
admin.site.register(MatriculadosPosgradoEdad)
admin.site.register(MatriculadosPosgradoEstrato)