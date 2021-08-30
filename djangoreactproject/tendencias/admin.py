from django.contrib import admin
# Import para admin django
from .models.tendencia import Tendencia


# Register your models here.
admin.site.register(Tendencia)