from django.urls import path
from .views.tendencia import TendenciaView
from .views.tendencia import ProgramasNoOfrecidosView
from .views.tendencia import ProgramasOfrecidosView


urlpatterns = [
    path('tendencia',TendenciaView.as_view()),
    path('programasnoofrecidos',ProgramasOfrecidosView.as_view()),
    path('programasofrecidos',ProgramasOfrecidosView.as_view()),

]
