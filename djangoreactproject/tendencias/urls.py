from django.urls import path
from .views.tendencia import TendenciaView
from .views.tendencia import ProgramasNoOfrecidosView
from .views.tendencia import ProgramasOfrecidosView
from .views.tendencia import MatriculadoSegunColegioView
from .views.tendencia import MatriculadoSegunEdadView
from .views.tendencia import MatriculadoSegunSexoView
from .views.tendencia import DocentesPorDependenciaView
from .views.tendencia import DocentesPorFormacionView
from .views.tendencia import DocentesPorSexoView


urlpatterns = [
    path('tendencia',TendenciaView.as_view()),
    path('programasnoofrecidos',ProgramasNoOfrecidosView.as_view()),
    path('programasofrecidos',ProgramasOfrecidosView.as_view()),
    path('matriculadoseguncolegio', MatriculadoSegunColegioView.as_view()),
    path('matriculadosegunedad', MatriculadoSegunEdadView.as_view()),
    path('matriculadosegunsexo', MatriculadoSegunSexoView.as_view()),
    path('docentespordependencia', DocentesPorDependenciaView.as_view()),
    path('docentesporformacion', DocentesPorFormacionView.as_view()),
    path('docentesporsexo', DocentesPorSexoView.as_view()),



]
