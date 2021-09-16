import React,{useState} from 'react'
import {
  CBreadcrumb,
  CBreadcrumbItem,
  CBreadcrumbRouter,
  CCard,
  CCardBody,
  CCardHeader,
  CLink,
  CCol,
  CRow,
  CTooltip,
  CCollapse,
  CDataTable,
  CCardFooter,
  CButton,
  CLabel,
  CFormGroup,
  CSelect,
} from '@coreui/react'

// hook personalizado
const useSingleton = (callBack = () => { }) => {     const hasBeenCalled = React.useRef(false);     if (hasBeenCalled.current) return;     callBack();     hasBeenCalled.current = true; }


const MatriculadosPosgrado = () => {    
    // Constantes
    const [matriculadoSegunSexo, setmatriculadoSegunSexo] = React.useState([])
    const [matriculadoSegunPrograma, setmatriculadoSegunPrograma] = React.useState([])
    const fields = ['Programa','Femenino', 'Masculino', 'Año']
    const [programa, setPrograma] = React.useState('Ingeniería de Sistemas y Computación')
    const [collapseTablaGeneral, setCollapseTablaGeneral] = useState(false)
    const [collapsePrograma, setCollapsePrograma] = React.useState(false);



    // Funciones 
    const getData = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/v1/matriculadosegunsexo',
        headers: { 
            'Content-Type': 'application/json'
        },
        };
        const matriculadosquery = await axios(config)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        await setmatriculadoSegunSexo(matriculadosquery)
        console.log(matriculadoSegunSexo);
        // console.log(this.state.matriculadoSegunSexo.data['Programa']);
    }

    const getDataPrograma = async () =>{
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/v1/matriculadosegunsexo?Programa='+ programa,
        headers: { 
            'Content-Type': 'application/json'
        },
        };
        const matriculadosProgramaQuery =  await axios(config)
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        await setmatriculadoSegunPrograma(matriculadosProgramaQuery)
        // console.log(this.state.matriculadoSegunSexoPrograma[0]['Programa'])
    }

    const handleChange = async (event) =>  {

        await setPrograma(event.target.value);
        console.log(programa)
    }

    React.useEffect(async () => { await getDataPrograma()}, [programa])

    const toggleTablaGeneral = (e)=>{
        setCollapseTablaGeneral(!collapseTablaGeneral);
        e.preventDefault();
    }

    const toggleTablaPrograma = (e)=>{
        setCollapsePrograma(!collapsePrograma);
        e.preventDefault();
      }

    

    // despues de definir las constantes 
    useSingleton(async () => {
        await getData()
        await getDataPrograma()
    });

    return(
        <>
            <CCard>
                <CCardHeader>
                    Matriculados
                </CCardHeader>
                <CCardBody>
                    <p className="text-muted">
                    Para tener en cuenta:
                    </p>
                    <p className="muted">
                        La matrícula es el acto que formaliza la vinculación del estudiante al servicio educativo, el cual se renueva cada periodo académico.
                    </p> 
                    <p className="muted">
                        El posgrado hace referencia al nivel educativo que forma parte del tipo superior o de tercer ciclo; es la última fase de la educación formal, tiene como antecedente obligatorio la licenciatura o pregrado y comprende los subniveles de estudios de especialización, maestría o magíster y doctorado.
                    </p>
                </CCardBody>
            </CCard>

            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>
                            Tabla Matriculados Segun Sexo
                        </CCardHeader>
                        <CCollapse show={collapseTablaGeneral}>  
                            <CCardBody>
                                <CDataTable
                                    items={matriculadoSegunSexo}
                                    fields={fields}
                                    itemsPerPage={7}
                                    pagination
                                    columnFilter
                                />
                            </CCardBody>
                        </CCollapse>
                        <CCardFooter>
                            <CButton
                            color="primary"
                            onClick={toggleTablaGeneral}
                            className={'mb-1'}
                            >Mostrar Tabla</CButton>
                        </CCardFooter>
                    </CCard>
                </CCol>
                </CRow>

                <CRow>
                    <CCol xs="12" lg="12">
                        <CCard>
                            <CCardHeader>
                                Tabla Matriculados Segun Programa
                            </CCardHeader>
                            <CCollapse show={collapsePrograma}> 
                                <CCardBody>
                                    <CDataTable
                                        items={matriculadoSegunPrograma}
                                        fields={fields}
                                        itemsPerPage={5}
                                        pagination
                                    />
                                </CCardBody>
                            </CCollapse>
                            <CCardFooter>
                                <CLabel htmlFor="ccmonth">Programa Académico</CLabel>
                                    <CFormGroup row>    
                                        <CCol md="4">
                                            <CSelect custom name="ccmonth" id="ccmonth" value={programa} onChange={handleChange}>
                                                <option value="Ingeniería Electrónica (Nocturno)" >Ingeniería Electrónica (Nocturno)</option>
                                                <option value="Ingeniería Eléctrica">Ingeniería Eléctrica</option>
                                                <option value="Ingeniería Física">Ingeniería Física</option>
                                                <option value="Ingeniería de Sistemas y Computación">Ingeniería de Sistemas y Computación</option>
                                                <option value="Ingeniería de Sistemas y Computación (Nocturno)">Ingeniería de Sistemas y Computación (Nocturno)</option>
                                            </CSelect>
                                        </CCol>
                                        <CCol md="4">
                                        <CButton
                                            color="primary"
                                            onClick={toggleTablaPrograma}
                                            className={'mb-1'}
                                        >Mostrar Tabla
                                        </CButton>
                                        </CCol>
                                    </CFormGroup>
                            </CCardFooter>
                        </CCard>
                    </CCol>
                </CRow>
        </>
    )
}


export default MatriculadosPosgrado 
