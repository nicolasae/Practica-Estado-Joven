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

const Cancelados = () =>{
    // constantes
    const actualYear = new Date().getFullYear()
    const [yearsData,setYearsData] = React.useState([])
    // Constantes para cancelados general
    const [yearSelected, setYearSelected] = React.useState(new Date().getFullYear())
    const [canceladosPrimer, setCanceladosPrimer] = React.useState([])
    const [collapseTablaCanceladosPrimer, setCollapseTablaCanceladosPrimer] = useState(false)
    const fieldsCancelados = ['COD_PERIODO','ESTUDIANTES','ESTRATO','SEXO','TIPO_INSCRIPCION','TIPO_COLEGIO']
    const [canceladosSegundo, setCanceladosSegundo] = React.useState([])
    const [collapseTablaCanceladosSegundo, setCollapseTablaCanceladosSegundo] = useState(false)
    

    // Funciones 
    const getYears = async() => { 
        for (var i=actualYear;i>= 2010; i--){
            yearsData.push(i)
        }
        setYearsData(yearsData)
    }

    const getDataCanceladosPrimerSemestre = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/tendencia?VAR=Primer curso&COD_PERIODO='+ yearSelected +'-1',
        headers: { 
            'Content-Type': 'application/json'
        },
        };
        const canceladosquery = await axios(config)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        await setCanceladosPrimer(canceladosquery)
        console.log(canceladosPrimer)

    }

    const getDataCanceladosSegundoSemestre = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/tendencia?VAR=Primer curso&COD_PERIODO='+ yearSelected +'-2',
        headers: { 
            'Content-Type': 'application/json'
        },
        };
        const canceladosquery = await axios(config)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        await setCanceladosSegundo(canceladosquery)
        

    }

    React.useEffect(async () => { await getDataCanceladosPrimerSemestre()}, [yearSelected])
    React.useEffect(async () => { await getDataCanceladosSegundoSemestre()}, [yearSelected])



    const toggleTablaCanceladosPrimer = (e)=>{
        setCollapseTablaCanceladosPrimer(!collapseTablaCanceladosPrimer);
        setCollapseTablaCanceladosSegundo(false);
        e.preventDefault();
    }
    const toggleTablaCanceladosSegundo = (e)=>{
        setCollapseTablaCanceladosPrimer(false);
        setCollapseTablaCanceladosSegundo(!collapseTablaCanceladosSegundo);
        e.preventDefault();
    }

    const handleChangeYear = async (event) =>  {
        setYearSelected(event.target.value);
        console.log(yearSelected)

    }
    // despues de definir las constantes 
    useSingleton(async () => {
        await getYears();    
        await getDataCanceladosPrimerSemestre()
        await getDataCanceladosSegundoSemestre()

    });

    return(
        <>
        <h1 style={{textAlign: 'center', fontWeight:'bold'}}>Cancelados</h1>  
        <CCard>
            <CCardBody>
                <p className="text-muted">
                Para tener en cuenta:
                </p>
                <p className="muted">
                    Los estudiantes de <b>cancelados</b> son .
                </p>                
                
            </CCardBody>
        </CCard>
        <CRow>
            <CCol xs="12" lg="12">
                <CCard>
                    <h1 style={{textAlign: 'center', fontWeight:'bold'}}>
                        Tabla de Estudiantes Cancelados General:
                    </h1>
                    <CCollapse show={collapseTablaCanceladosPrimer}>  
                        <CCardBody>
                            <CDataTable
                                items={canceladosPrimer}
                                fields={fieldsCancelados}
                                itemsPerPage={5}
                                pagination
                                columnFilter
                            />
                        </CCardBody>
                    </CCollapse>
                    <CCollapse show={collapseTablaCanceladosSegundo}>  
                        <CCardBody>
                            <CDataTable
                                items={canceladosSegundo}
                                fields={fieldsCancelados}
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
                                    onClick={toggleTablaCanceladosPrimer} 
                                    className={'mb-1'}
                                >{yearSelected + '-1'}
                                </CButton>
                                <CButton
                                    color="outline-primary"
                                    onClick={toggleTablaCanceladosSegundo} 
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

export default Cancelados