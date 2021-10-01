from django.db.models.base import Model
from rest_framework import serializers

# IMPORT MODELS 
from ..models.tendencia import Tendencia
from ..models.tendencia import DesercionInterAnual
from ..models.tendencia import DesercionInterSemestral
from ..models.tendencia import AnalisisCohorte


class TendenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tendencia
        exclude = ['id']

class DesercionInterAnualSerializer(serializers.ModelSerializer):
    class Meta:
        model = DesercionInterAnual
        exclude = ['id']

class DesercionInterSemestralSerializer(serializers.ModelSerializer):
    class Meta:
        model = DesercionInterSemestral
        exclude = ['id']

class AnalisisCohorteSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalisisCohorte
        exclude = ['id']


