import React,{ useState } from "react";
import axios from 'axios';

import {
  CCard,
  CCardBody,
  CCardHeader,
  CLink,
  CCol,
  CRow,
  CTooltip,
  CDataTable,
  CCollapse,
  CCardFooter,
  CButton,
  CButtonGroup,
  CFormGroup,
  CLabel,
  CSelect,
} from "@coreui/react";

import {
    CChartBar,
    CChartLine,
    CChartDoughnut,
    CChartRadar,
    CChartPie,
    CChartPolarArea
  } from '@coreui/react-chartjs'
import '../../scss/_custom.scss'
  // hook personalizado
const useSingleton = (callBack = () => { }) => { const hasBeenCalled = React.useRef(false);     if (hasBeenCalled.current) return;     callBack();     hasBeenCalled.current = true; }

const MatriculadosPregrado = () =>{
    // constantes
    const actualYear = new Date().getFullYear()
    const [yearsData,setYearsData] = React.useState([])
    // Constantes para matriculados general
    const [yearSelected, setYearSelected] = React.useState(new Date().getFullYear())
    const [matriculadosPrimer, setMatriculadosPrimer] = React.useState([])
    const [collapseTablaMatriculadosPrimer, setCollapseTablaMatriculadosPrimer] = useState(false)
    const fieldsMatriculados = ['COD_PERIODO','ESTUDIANTES','ESTRATO','SEXO','TIPO_INSCRIPCION','TIPO_COLEGIO']
    const [matriculadosSegundo, setMatriculadosSegundo] = React.useState([])
    const [collapseTablaMatriculadosSegundo, setCollapseTablaMatriculadosSegundo] = useState(false)
    

    // Funciones 
    const getYears = async() => { 
        for (var i=actualYear;i>= 2010; i--){
            yearsData.push(i)
        }
        setYearsData(yearsData)
    }

    const getDataMatriculadosPrimerSemestre = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/tendencia?VAR=Matriculado&COD_PERIODO='+ yearSelected +'-1',
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
        await setMatriculadosPrimer(matriculadosquery)
        console.log(matriculadosPrimer)

    }

    const getDataMatriculadosSegundoSemestre = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/tendencia?VAR=Matriculado&COD_PERIODO='+ yearSelected +'-2',
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
        await setMatriculadosSegundo(matriculadosquery)
        

    }

    React.useEffect(async () => { await getDataMatriculadosPrimerSemestre()}, [yearSelected])
    React.useEffect(async () => { await getDataMatriculadosSegundoSemestre()}, [yearSelected])



    const toggleTablaMatriculadosPrimer = (e)=>{
        setCollapseTablaMatriculadosPrimer(!collapseTablaMatriculadosPrimer);
        setCollapseTablaMatriculadosSegundo(false);
        e.preventDefault();
    }
    const toggleTablaMatriculadosSegundo = (e)=>{
        setCollapseTablaMatriculadosPrimer(false);
        setCollapseTablaMatriculadosSegundo(!collapseTablaMatriculadosSegundo);
        e.preventDefault();
    }

    const handleChangeYear = async (event) =>  {
        setYearSelected(event.target.value);
        console.log(yearSelected)

    }
    // despues de definir las constantes 
    useSingleton(async () => {
        await getYears();    
        await getDataMatriculadosPrimerSemestre()
        await getDataMatriculadosSegundoSemestre()

    });

    return(
        <>
        <h1 style={{textAlign: 'center', fontWeight:'bold'}}>Matriculados</h1>  
        <CCard>
            <CCardBody>
                <p className="text-muted">
                Para tener en cuenta:
                </p>
                <p className="muted">
                    La <b>matrícula</b> es el acto que formaliza la vinculación del estudiante al servicio educativo, el cual se renueva cada periodo académico.
                </p>                
                <p className="muted">
                El <b>régimen especial</b> hace referencia a las minorías desplazados, comunidad indígena, negritudes y deportistas de alto rendimiento
                </p>
            </CCardBody>
        </CCard>
        <CRow>
            <CCol xs="12" lg="12">
                <CCard>
                    <h1 style={{textAlign: 'center', fontWeight:'bold'}}>
                        Tabla de Estudiantes Matriculados General
                    </h1>
                    <CCollapse show={collapseTablaMatriculadosPrimer}>  
                        <CCardBody>
                            <CDataTable
                                items={matriculadosPrimer}
                                fields={fieldsMatriculados}
                                itemsPerPage={5}
                                pagination
                                columnFilter
                            />
                        </CCardBody>
                    </CCollapse>
                    <CCollapse show={collapseTablaMatriculadosSegundo}>  
                        <CCardBody>
                            <CDataTable
                                items={matriculadosSegundo}
                                fields={fieldsMatriculados}
                                itemsPerPage={5}
                                pagination
                                columnFilter
                            />
                        </CCardBody>
                    </CCollapse>
                    <CCardFooter>
                        <CLabel >Año:</CLabel>
                        <CFormGroup row>
                            <CCol md="3">
                                <CSelect value={yearSelected} onChange={handleChangeYear}>
                                    {yearsData.map(item => {
                                        return (<option key={item} value={item}>{item}</option>);
                                    })}
                                </CSelect>
                            </CCol>
                            <CCol md="2">
                                <CButton
                                    color="outline-primary"
                                    onClick={toggleTablaMatriculadosPrimer} 
                                    className={'mb-1'}
                                >{yearSelected + '-1'}
                                </CButton>
                                <CButton
                                    color="outline-primary"
                                    onClick={toggleTablaMatriculadosSegundo} 
                                    className={'mb-1'}
                                >{yearSelected + '-2'}
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

export default MatriculadosPregrado