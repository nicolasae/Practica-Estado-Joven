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

const PrimerCurso = () =>{
    // constantes
    const actualYear = new Date().getFullYear()
    const [yearsData,setYearsData] = React.useState([])
    // Constantes para primerCurso general
    const [yearSelected, setYearSelected] = React.useState(new Date().getFullYear())
    const [primerCursoPrimer, setPrimerCursoPrimer] = React.useState([])
    const [collapseTablaPrimerCursoPrimer, setCollapseTablaPrimerCursoPrimer] = useState(false)
    const fieldsPrimerCurso = ['COD_PERIODO','ESTUDIANTES','ESTRATO','SEXO','TIPO_INSCRIPCION','TIPO_COLEGIO']
    const [primerCursoSegundo, setPrimerCursoSegundo] = React.useState([])
    const [collapseTablaPrimerCursoSegundo, setCollapseTablaPrimerCursoSegundo] = useState(false)
    

    // Funciones 
    const getYears = async() => { 
        for (var i=actualYear;i>= 2010; i--){
            yearsData.push(i)
        }
        setYearsData(yearsData)
    }

    const getDataPrimerCursoPrimerSemestre = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/tendencia?VAR=Primer curso&COD_PERIODO='+ yearSelected +'-1',
        headers: { 
            'Content-Type': 'application/json'
        },
        };
        const primerCursoquery = await axios(config)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        await setPrimerCursoPrimer(primerCursoquery)
        console.log(primerCursoPrimer)

    }

    const getDataPrimerCursoSegundoSemestre = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/tendencia?VAR=Primer curso&COD_PERIODO='+ yearSelected +'-2',
        headers: { 
            'Content-Type': 'application/json'
        },
        };
        const primerCursoquery = await axios(config)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        await setPrimerCursoSegundo(primerCursoquery)
        

    }

    React.useEffect(async () => { await getDataPrimerCursoPrimerSemestre()}, [yearSelected])
    React.useEffect(async () => { await getDataPrimerCursoSegundoSemestre()}, [yearSelected])



    const toggleTablaPrimerCursoPrimer = (e)=>{
        setCollapseTablaPrimerCursoPrimer(!collapseTablaPrimerCursoPrimer);
        setCollapseTablaPrimerCursoSegundo(false);
        e.preventDefault();
    }
    const toggleTablaPrimerCursoSegundo = (e)=>{
        setCollapseTablaPrimerCursoPrimer(false);
        setCollapseTablaPrimerCursoSegundo(!collapseTablaPrimerCursoSegundo);
        e.preventDefault();
    }

    const handleChangeYear = async (event) =>  {
        setYearSelected(event.target.value);
        console.log(yearSelected)

    }
    // despues de definir las constantes 
    useSingleton(async () => {
        await getYears();    
        await getDataPrimerCursoPrimerSemestre()
        await getDataPrimerCursoSegundoSemestre()

    });

    return(
        <>
        <h1 style={{textAlign: 'center', fontWeight:'bold'}}>PrimerCurso</h1>  
        <CCard>
            <CCardBody>
                <p className="text-muted">
                Para tener en cuenta:
                </p>
                <p className="muted">
                    Los estudiantes de <b>primer curso</b> son .
                </p>                
                
            </CCardBody>
        </CCard>
        <CRow>
            <CCol xs="12" lg="12">
                <CCard>
                    <h1 style={{textAlign: 'center', fontWeight:'bold'}}>
                        Tabla de Estudiantes Primer Curso General:
                    </h1>
                    <CCollapse show={collapseTablaPrimerCursoPrimer}>  
                        <CCardBody>
                            <CDataTable
                                items={primerCursoPrimer}
                                fields={fieldsPrimerCurso}
                                itemsPerPage={5}
                                pagination
                                columnFilter
                            />
                        </CCardBody>
                    </CCollapse>
                    <CCollapse show={collapseTablaPrimerCursoSegundo}>  
                        <CCardBody>
                            <CDataTable
                                items={primerCursoSegundo}
                                fields={fieldsPrimerCurso}
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
                                    onClick={toggleTablaPrimerCursoPrimer} 
                                    className={'mb-1'}
                                >{yearSelected + '-1'}
                                </CButton>
                                <CButton
                                    color="outline-primary"
                                    onClick={toggleTablaPrimerCursoSegundo} 
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

export default PrimerCurso