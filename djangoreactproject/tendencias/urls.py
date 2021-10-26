from django.urls import path

from .views.tendencia import TendenciaView
from .views.tendencia import TendenciaCountView
from .views.tendencia import TendenciaCountYearView
from .views.tendencia import DesercionInterAnualView
from .views.tendencia import DesercionInterAnualCountView
from .views.tendencia import DesercionInterAnualCountYearView
from .views.tendencia import DesercionInterSemestralView
from .views.tendencia import AnalisisCohorteView

urlpatterns = [
    # MATRICULADOS 
    path('tendencia', TendenciaView.as_view()),
    path('tendencia_count', TendenciaCountView.as_view()),
    path('tendencia_count_year',TendenciaCountYearView.as_view()),
    path('desercionDIA', DesercionInterAnualView.as_view()),
    path('desercionDIA_count', DesercionInterAnualCountView.as_view()),
    path('desercionDIA_count_year', DesercionInterAnualCountYearView.as_view()),
    path('desercionDIS', DesercionInterSemestralView.as_view()),
    path('analisiscohorte', AnalisisCohorteView.as_view()),

]
