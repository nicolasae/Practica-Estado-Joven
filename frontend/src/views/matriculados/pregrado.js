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
    // Constantes para matriculados segun sexo filtro
    const [yearSelected, setYearSelected] = React.useState(new Date().getFullYear())
    const [sexoPrimer, setSexoPrimer] = React.useState([])
    const [collapseTablaSexoPrimer, setCollapseTablaSexoPrimer] = useState(false)
    const [sexoSegundo, setSexoSegundo] = React.useState([])
    const [collapseTablaSexoSegundo, setCollapseTablaSexoSegundo] = useState(false)
    const fieldsSexo = ['Programa','Femenino', 'Masculino', 'Año']



    // Funciones 
    const getYears = async() => { 
        for (var i=actualYear;i>= 2010; i--){
            yearsData.push(i)
        }
        setYearsData(yearsData)
    }

    const getDataSexoPrimerSemestre = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/matriculadosegunsexo?Año='+ yearSelected +'-1',
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
        console.log(yearsData)
        await setSexoPrimer(matriculadosquery)
    }

    const getDataSexoSegundoSemestre = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/matriculadosegunsexo?Año='+ yearSelected +'-2',
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
        await setSexoSegundo(matriculadosquery)
    }



    const handleChangeYear = async (event) =>  {
        setYearSelected(event.target.value);
        console.log(yearSelected)
    }

    React.useEffect(async () => { await getDataSexoPrimerSemestre()}, [yearSelected])
    React.useEffect(async () => { await getDataSexoSegundoSemestre()}, [yearSelected])



    const toggleTablaSexoPrimer = (e)=>{
        setCollapseTablaSexoSegundo(false);
        setCollapseTablaSexoPrimer(!collapseTablaSexoPrimer);
        e.preventDefault();
    }

    const toggleTablaSexoSegundo = (e)=>{
        setCollapseTablaSexoPrimer(false);
        setCollapseTablaSexoSegundo(!collapseTablaSexoSegundo);
        e.preventDefault();
    }


    // despues de definir las constantes 
    useSingleton(async () => {
        await getYears();
        await getDataSexoPrimerSemestre()
        await getDataSexoSegundoSemestre()
        
    });

    return(
        <>
        <h1>Matriculados Pregrado</h1>  
        <CCard>
            <CCardBody>
                <p className="text-muted">
                Para tener en cuenta:
                </p>
                <p className="muted">
                    La <b>matrícula</b> es el acto que formaliza la vinculación del estudiante al servicio educativo, el cual se renueva cada periodo académico.
                </p>                
                <p className="muted">
                    El <b>pregrado</b> hace referencia a los programas académicos subsidiados por la nación y los programas de jornada especial, comprende los subniveles de estudio técnico profesional, tecnólogo y profesional.
                </p>
                <p className="muted">
                El <b>régimen especial</b> hace referencia a las minorías desplazados, comunidad indígena, negritudes y deportistas de alto rendimiento
                </p>
            </CCardBody>
        </CCard>

        <CRow>
            <CCol xs="12" lg="12">
                <CCard>
                    <CCardHeader>
                        Tabla de Matriculados en pregrado según programa académico y sexo
                    </CCardHeader>
                    <CCollapse show={collapseTablaSexoPrimer}>  
                        <CCardBody>
                            <CDataTable
                                items={sexoPrimer}
                                fields={fieldsSexo}
                                itemsPerPage={5}
                                pagination
                                columnFilter
                            />
                        </CCardBody>
                    </CCollapse>
                    <CCollapse show={collapseTablaSexoSegundo}>  
                        <CCardBody>
                            <CDataTable
                                items={sexoSegundo}
                                fields={fieldsSexo}
                                itemsPerPage={5}
                                pagination
                                columnFilter
                            />
                        </CCardBody>
                    </CCollapse>
                    <CCardFooter>
                        <CLabel>Año:</CLabel>
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
                                    onClick={toggleTablaSexoPrimer} 
                                    className={'mb-1'}
                                >{yearSelected + '-1'}
                                </CButton>
                                <CButton
                                    color="outline-primary"
                                    onClick={toggleTablaSexoSegundo} 
                                    className={'mb-1'}
                                >{yearSelected + '-2'}
                                </CButton>
                            </CCol>
                            <CCol md="2">      
                                <CButton
                                    color="primary"
                                    // onClick={toggleTablaSexoSegundo} 
                                    className={'mb-1'}
                                >Grafico de Líneas 
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
