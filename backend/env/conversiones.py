import pandas as pd 
import json as json


def ProgramasNoOfrecidos():
    # Consume la información del archivo csv de Detalles Programas No Ofrecidos  
    datosTendencia = pd.read_csv('./CSV/DetalleProgramasNoOfrecidos .csv',encoding='utf8')      
    # Convierte la información recolectada a un JSON 
    datosTendencia.to_json("json/DetalleProgramasNoOfrecidos.json",orient = 'records',force_ascii=False)

def ProgramasOfrecidos():
    # Consume la información del archivo csv de Detalles Programas Ofrecidos  
    datosTendencia = pd.read_csv('./CSV/DetalleProgramasOfrecidos .csv',encoding='utf8')      
    # Convierte la información recolectada a un JSON 
    datosTendencia.to_json("json/DetalleProgramasOfrecidos.json",orient = 'records',force_ascii=False)

def MatriculadoSegunColegio():
    # Consume la información del archivo csv de Matriculados Segun Colegio  
    datosTendencia = pd.read_csv('./CSV/MatriculadoSegunColegio.csv',encoding='utf8')      
    # Convierte la información recolectada a un JSON 
    datosTendencia.to_json("json/MatriculadoSegunColegio.json",orient = 'records',force_ascii=False)

def MatriculadoSegunEdad():
    # Consume la información del archivo csv de Matriculados Segun Edad  
    datosTendencia = pd.read_csv('./CSV/MatriculadoSegunEdad.csv',encoding='utf8')      
    # Convierte la información recolectada a un JSON 
    datosTendencia.to_json("json/MatriculadoSegunEdad.json",orient = 'records',force_ascii=False)

def MatriculadoSegunEstrato():
    # Consume la información del archivo csv de Matriculados Segun Estrato  
    datosTendencia = pd.read_csv('./CSV/MatriculadoSegunEstrato.csv',encoding='utf8')      
    # Convierte la información recolectada a un JSON 
    datosTendencia.to_json("json/MatriculadoSegunEstrato.json",orient = 'records',force_ascii=False)

def MatriculadoSegunSexo():
    # Consume la información del archivo csv de Matriculados Segun Sexo  
    datosTendencia = pd.read_csv('./CSV/MatriculadoSegunSexo.csv',encoding='utf8')      
    # Convierte la información recolectada a un JSON 
    datosTendencia.to_json("json/MatriculadoSegunSexo.json",orient = 'records',force_ascii=False)

def PersonalDocentePorDependencia():
    # Consume la información del archivo csv de Personal Docente por Dependencia  
    datosTendencia = pd.read_csv('./CSV/PersonalDocentes-PorDependencia.csv',encoding='utf8')      
    # Convierte la información recolectada a un JSON 
    datosTendencia.to_json("json/PersonalDocentePorDependencia.json",orient = 'records',force_ascii=False)

def PersonalDocentePorNivelDeFormacion():
    # Consume la información del archivo csv de Personal Docente por Nivel de formación  
    datosTendencia = pd.read_csv('./CSV/PersonalDocentes-PorNivelDeFormacion.csv',encoding='utf8')      
    # Convierte la información recolectada a un JSON 
    datosTendencia.to_json("json/PersonalDocentePorNivelDeFormacion.json",orient = 'records',force_ascii=False)

def PersonalDocentePorSexo():
    # Consume la información del archivo csv de Personal Docente por Sexo  
    datosTendencia = pd.read_csv('./CSV/PersonalDocentes-PorSexo.csv',encoding='utf8')      
    # Convierte la información recolectada a un JSON 
    datosTendencia.to_json("json/PersonalDocentePorSexo.json",orient = 'records',force_ascii=False)

def PoblacionEstudiantilPorProgramaAcademico():
    # Consume la información del archivo csv de Poblacion Estudiantil Por Programa Academico
    datosTendencia = pd.read_csv('./CSV/PoblaciónEstudiantilPorProgramaAcademico.csv',encoding='utf8')      
    # Convierte la información recolectada a un JSON 
    datosTendencia.to_json("json/PoblacionEstudiantilPorProgramaAcademico.json",orient = 'records',force_ascii=False)

def PoblacionEstudiantilPorSexo():
    # Consume la información del archivo csv de Poblacion Estudiantil Por Sexo  
    datosTendencia = pd.read_csv('./CSV/PoblacionEstudiantilPorSexo.csv',encoding='utf8')      
    # Convierte la información recolectada a un JSON 
    datosTendencia.to_json("json/PoblacionEstudiantilPorSexo.json",orient = 'records',force_ascii=False)

def ProgramasAcademicos():
    # Consume la información del archivo csv de Programas Academicos  
    datosTendencia = pd.read_csv('./CSV/ProgramasAcademicos.csv',encoding='utf8')      
    # Convierte la información recolectada a un JSON 
    datosTendencia.to_json("json/ProgramasAcademicos.json",orient = 'records',force_ascii=False)

def ProgramasAcademicosAcreditables():
    # Consume la información del archivo csv de Programas Academicos Acreditables
    datosTendencia = pd.read_csv('./CSV/ProgramasAcademicosAcreditables.csv',encoding='utf8')      
    # Convierte la información recolectada a un JSON 
    datosTendencia.to_json("json/ProgramasAcademicosAcreditables.json",orient = 'records',force_ascii=False)

def ProgramasAcademicosAcreditados():
    # Consume la información del archivo csv de Programas Academicos Acreditados
    datosTendencia = pd.read_csv('./CSV/ProgramasAcademicosAcreditados.csv',encoding='utf8')      
    # Convierte la información recolectada a un JSON 
    datosTendencia.to_json("json/ProgramasAcademicosAcreditados.json",orient = 'records',force_ascii=False)

def Tendencias():
    # Consume la información del archivo csv de Tendencias  
    datosTendencia = pd.read_csv('./CSV/Tendencias.csv',encoding='utf8')      
    # Convierte la información recolectada a un JSON 
    datosTendencia.to_json("json/Tendencias.json",orient = 'records',force_ascii=False)

if __name__ == "__main__":
    ProgramasNoOfrecidos()
    ProgramasOfrecidos()
    MatriculadoSegunColegio()
    MatriculadoSegunEdad()
    MatriculadoSegunEstrato()
    MatriculadoSegunSexo()
    PersonalDocentePorDependencia()
    PersonalDocentePorNivelDeFormacion()
    PersonalDocentePorSexo()
    PoblacionEstudiantilPorSexo()
    PoblacionEstudiantilPorProgramaAcademico()
    ProgramasAcademicosAcreditables()
    ProgramasAcademicosAcreditados()
    ProgramasAcademicos()
    Tendencias()
