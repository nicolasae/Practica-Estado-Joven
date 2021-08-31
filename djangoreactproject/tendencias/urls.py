from django.urls import path
from .views.tendencia import TendenciaView

urlpatterns = [
    path('tendencia',TendenciaView.as_view()),
]
