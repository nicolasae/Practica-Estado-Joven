# Generated by Django 3.2.6 on 2021-09-29 19:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tendencias', '0022_rename_pregrado_matriculadossexo_femenino'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tendencia',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('COD_PERIODO', models.CharField(max_length=255, null=True, verbose_name='Semestre')),
                ('COD_UTP', models.CharField(max_length=255, null=True, verbose_name='Código UTP')),
                ('ESTUDIANTES', models.IntegerField(null=True, verbose_name='Estudiantes')),
                ('ESTRATO', models.CharField(max_length=255, null=True, verbose_name='Estrato')),
                ('SEXO', models.CharField(max_length=255, null=True, verbose_name='Sexo')),
                ('TIPO_INSCRIPCION', models.CharField(max_length=255, null=True, verbose_name='Tipo de Inscripción')),
                ('TIPO_COLEGIO', models.CharField(max_length=255, null=True, verbose_name='Tipo de Colegio')),
                ('VAR', models.CharField(max_length=255, null=True, verbose_name='Nivel de Formación')),
            ],
        ),
        migrations.DeleteModel(
            name='MatriculadosCategoriaInscripcion',
        ),
        migrations.DeleteModel(
            name='MatriculadosEstrato',
        ),
        migrations.DeleteModel(
            name='MatriculadosNivelFormacion',
        ),
        migrations.DeleteModel(
            name='MatriculadosPosgradoEdad',
        ),
        migrations.DeleteModel(
            name='MatriculadosPosgradoEstrato',
        ),
        migrations.DeleteModel(
            name='MatriculadosPosgradoSexo',
        ),
        migrations.DeleteModel(
            name='MatriculadosPregradoColegio',
        ),
        migrations.DeleteModel(
            name='MatriculadosPregradoEdad',
        ),
        migrations.DeleteModel(
            name='MatriculadosPregradoEstrato',
        ),
        migrations.DeleteModel(
            name='MatriculadosPregradoSexo',
        ),
        migrations.DeleteModel(
            name='MatriculadosSexo',
        ),
    ]
