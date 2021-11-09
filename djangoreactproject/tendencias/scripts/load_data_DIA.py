from django.conf import settings

import pandas as pd 

from django.db.models import Q

from ..models.tendencia import DesercionInterAnual
from ..models.tendencia import DesercionInterAnualEstados


def run():
    DesercionInterAnualEstados.objects.all().delete()
    desercion = DesercionInterAnual.objects.all()
    carreras = list(set(desercion.values_list('NOMBRE', flat=True).distinct()))
    periodos = list(set(desercion.values_list('COD_PERIODO', flat=True).distinct()))
    for carrera in carreras:
        for periodo in periodos:
            desercion_carrera = desercion.filter(NOMBRE=carrera, COD_PERIODO=periodo)
            ejemplo = desercion_carrera.first()
            if ejemplo:
                No_matriculado = (desercion_carrera.filter(ESTADO='No matriculado').first().CANTIDAD if desercion_carrera.filter(ESTADO='No matriculado').first() else 0)
                Permanece_programa = (desercion_carrera.filter(ESTADO='Permanece programa').first().CANTIDAD if desercion_carrera.filter(ESTADO='Permanece programa').first() else 0)
                Cambio_de_programa = (desercion_carrera.filter(ESTADO='Cambio de programa').first().CANTIDAD if desercion_carrera.filter(ESTADO='Cambio de programa').first() else 0)
                Graduado = (desercion_carrera.filter(ESTADO='Graduado').first().CANTIDAD if desercion_carrera.filter(ESTADO='Graduado').first() else 0)
                Total = No_matriculado + Permanece_programa + Cambio_de_programa + Graduado
                DesercionInterAnualEstados.objects.create(
                    COD_PERIODO = periodo,
                    COD_UTP = (ejemplo.COD_UTP if ejemplo else None),
                    NOMBRE = carrera,
                    NIVEL = (ejemplo.NIVEL if ejemplo else None),
                    NO_MATRICULADO = No_matriculado,
                    PERMANECE_PROGRAMA = Permanece_programa,
                    CAMBIO_DE_PROGRAMA = Cambio_de_programa,
                    GRADUADO = Graduado,
                    PORCENTAJE_NO_MATRICULADO = No_matriculado/Total,
                    PORCENTAJE_PERMANECE_PROGRAMA = Permanece_programa/Total,
                    PORCENTAJE_CAMBIO_DE_PROGRAMA = Cambio_de_programa/Total,
                    PORCENTAJE_GRADUADO = Graduado/Total,
                    TOTAL = Total,
                )

