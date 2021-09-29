from django.urls import path

# Tendencia Poblacional
from .views.tendencia import TendenciaView



urlpatterns = [
    # MATRICULADOS 
    path('tendencia', TendenciaView.as_view()),
]
