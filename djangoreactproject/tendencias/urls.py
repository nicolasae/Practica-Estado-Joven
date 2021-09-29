from django.urls import path
# Tendencia Poblacional

# ************************************************************************************************
# MATRICULADOS 
from .views.tendencia import MatriculadosNivelFormacionView
from .views.tendencia import MatriculadosCategoriaInscripcionView
from .views.tendencia import MatriculadosEstratoView
from .views.tendencia import MatriculadosSexoView
from .views.tendencia import MatriculadosPregradoSexoView
from .views.tendencia import MatriculadosPregradoEstratoView
from .views.tendencia import MatriculadosPregradoEdadView
from .views.tendencia import MatriculadosPregradoColegioView
from .views.tendencia import MatriculadosPosgradoSexoView
from .views.tendencia import MatriculadosPosgradoEstratoView
from .views.tendencia import MatriculadosPosgradoEdadView



urlpatterns = [
    # MATRICULADOS 
    path('matriculadosnivelformacion', MatriculadosNivelFormacionView.as_view()),
    path('matriculadoscategoriainscripcion', MatriculadosCategoriaInscripcionView.as_view()),
    path('matriculadosestrato', MatriculadosEstratoView.as_view()),
    path('matriculadossexo', MatriculadosSexoView.as_view()),
    path('matriculadospregradosexo', MatriculadosPregradoSexoView.as_view()),
    path('matriculadospregradoedad', MatriculadosPregradoEdadView.as_view()),
    path('matriculadospregradoestrato', MatriculadosPregradoEstratoView.as_view()),
    path('matriculadospregradocolegio', MatriculadosPregradoColegioView.as_view()),
    path('matriculadosposgradosexo', MatriculadosPosgradoSexoView.as_view()),
    path('matriculadosposgradoedad', MatriculadosPosgradoEdadView.as_view()),
    path('matriculadosposgradoestrato', MatriculadosPosgradoEstratoView.as_view()),

]
