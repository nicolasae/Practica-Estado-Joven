from django.contrib import admin
# Import para admin django

from .models.tendencia import Tendencia
from .models.tendencia import DesercionInterAnual
from .models.tendencia import DesercionInterSemestral
from .models.tendencia import AnalisisCohorte

# Register your models here.
admin.site.register(Tendencia)
admin.site.register(DesercionInterSemestral)
admin.site.register(DesercionInterAnual)
admin.site.register(AnalisisCohorte)
