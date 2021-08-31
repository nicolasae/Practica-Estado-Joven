from django.urls import path
from .views.tendencia import TendenciaView
from .views.tendencia import ProgramasNoOfrecidosView
from .views.tendencia import ProgramasOfrecidosView
from .views.tendencia import MatriculadoSegunColegioView
from .views.tendencia import MatriculadoSegunEdadView


urlpatterns = [
    path('tendencia',TendenciaView.as_view()),
    path('programasnoofrecidos',ProgramasNoOfrecidosView.as_view()),
    path('programasofrecidos',ProgramasOfrecidosView.as_view()),
    path('matriculadoseguncolegio', MatriculadoSegunColegioView.as_view()),
    path('matriculadosegunedad', MatriculadoSegunEdadView.as_view()),


]
