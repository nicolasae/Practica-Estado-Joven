# Generated by Django 3.2.6 on 2021-09-29 21:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tendencias', '0024_analisiscohorte_desercioninteranual_desercionintersemestral'),
    ]

    operations = [
        migrations.AlterField(
            model_name='analisiscohorte',
            name='ESTADO',
            field=models.CharField(max_length=255, null=True, verbose_name='Estado'),
        ),
        migrations.AlterField(
            model_name='desercionintersemestral',
            name='ESTADO',
            field=models.CharField(max_length=255, null=True, verbose_name='Estado'),
        ),
    ]
