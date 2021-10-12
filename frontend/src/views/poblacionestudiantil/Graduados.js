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

const Graduados = () =>{
    // constantes
    const actualYear = new Date().getFullYear()
    const [yearsData,setYearsData] = React.useState([])
    // Constantes para graduados general
    const [yearSelected, setYearSelected] = React.useState(new Date().getFullYear())
    const [graduadosPrimer, setGraduadosPrimer] = React.useState([])
    const [collapseTablaGraduadosPrimer, setCollapseTablaGraduadosPrimer] = useState(false)
    const fieldsGraduados = ['COD_PERIODO','ESTUDIANTES','ESTRATO','SEXO','TIPO_INSCRIPCION','TIPO_COLEGIO']
    const [graduadosSegundo, setGraduadosSegundo] = React.useState([])
    const [collapseTablaGraduadosSegundo, setCollapseTablaGraduadosSegundo] = useState(false)
    // Constantes Graduados sexo
    const [yearSelectedSexo, setYearSelectedSexo] = React.useState(new Date().getFullYear())
    const [graduadosSexoPrimerSemestre, setGraduadosSexoPrimerSemestre] = React.useState({masculino:0,femenino:0})
    const [graduadosSexoSegundoSemestre, setGraduadosSexoSegundoSemestre] = React.useState({masculino:0,femenino:0})
    const [collapsePieChartGraduadosSexoPrimer, setCollapsePieChartGraduadosSexoPrimer] = useState(false)
    const [collapsePieChartGraduadosSexoSegundo, setCollapsePieChartGraduadosSexoSegundo] = useState(false)

    // Funciones 
    const getYears = async() => { 
        for (var i=actualYear;i>= 2010; i--){
            yearsData.push(i)
        }
        setYearsData(yearsData)
    }

    const getDataGraduadosPrimerSemestre = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/tendencia?VAR=Primer curso&COD_PERIODO='+ yearSelected +'-1',
        headers: { 
            'Content-Type': 'application/json'
        },
        };
        const graduadosquery = await axios(config)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        await setGraduadosPrimer(graduadosquery)
        console.log(graduadosPrimer)

    }

    const getDataGraduadosSegundoSemestre = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/tendencia?VAR=Graduado&COD_PERIODO='+ yearSelected +'-2',
        headers: { 
            'Content-Type': 'application/json'
        },
        };
        const graduadosquery = await axios(config)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        await setGraduadosSegundo(graduadosquery) 
    }

    const getDataGraduadosSexoPrimerSemestre = async () => {
        console.log(yearSelectedSexo)
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/tendencia_count?VAR=Graduado&SEXO=Masculino&COD_PERIODO='+ yearSelectedSexo +'-1',
        headers: { 
            'Content-Type': 'application/json'
        },
        };
        var config1 = {
            method:'get',
            url:'http://localhost:8000/api/tendencia_count?VAR=Graduado&SEXO=Femenino&COD_PERIODO='+ yearSelectedSexo +'-1',
            headers: { 
                'Content-Type': 'application/json'
            },
        }
        var graduadosquery = await axios(config)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        var graduadosquery1 = await axios(config1)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        await setGraduadosSexoPrimerSemestre({masculino:graduadosquery.ESTUDIANTES__sum,femenino:graduadosquery1.ESTUDIANTES__sum})
        
    }

    const getDataGraduadosSexoSegundoSemestre = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/tendencia_count?VAR=Graduado&SEXO=Masculino&COD_PERIODO='+ yearSelectedSexo +'-2',
        headers: { 
            'Content-Type': 'application/json'
        },
        };
        var config1 = {
            method:'get',
            url:'http://localhost:8000/api/tendencia_count?VAR=Graduado&SEXO=Femenino&COD_PERIODO='+ yearSelectedSexo +'-2',
            headers: { 
                'Content-Type': 'application/json'
            },
        }
        var graduadosquery = await axios(config)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        var graduadosquery1 = await axios(config1)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        await setGraduadosSexoSegundoSemestre({masculino:graduadosquery.ESTUDIANTES__sum,femenino:graduadosquery1.ESTUDIANTES__sum})
    }

    React.useEffect(async () => { await getDataGraduadosPrimerSemestre()}, [yearSelected])
    React.useEffect(async () => { await getDataGraduadosSegundoSemestre()}, [yearSelected])

    React.useEffect(async () => { await getDataGraduadosSexoPrimerSemestre()},[yearSelectedSexo])
    React.useEffect(async () => { await getDataGraduadosSexoSegundoSemestre()},[yearSelectedSexo])


    const toggleTablaGraduadosPrimer = (e)=>{
        setCollapseTablaGraduadosPrimer(!collapseTablaGraduadosPrimer);
        setCollapseTablaGraduadosSegundo(false);
        e.preventDefault();
    }
    const toggleTablaGraduadosSegundo = (e)=>{
        setCollapseTablaGraduadosPrimer(false);
        setCollapseTablaGraduadosSegundo(!collapseTablaGraduadosSegundo);
        e.preventDefault();
    }
    const togglePieChartGraduadosSexoPrimer = (e)=>{
        setCollapsePieChartGraduadosSexoPrimer(!collapsePieChartGraduadosSexoPrimer);
        e.preventDefault();
    }
    const togglePieChartGraduadosSexoSegundo = (e)=>{
        setCollapsePieChartGraduadosSexoSegundo(!collapsePieChartGraduadosSexoSegundo);
        e.preventDefault();
    }

    const handleChangeYear = async (event) =>  {
        setYearSelected(event.target.value);
    }
    const handleChangeYearPieChartSexo = async (event) =>  {
        setYearSelectedSexo(event.target.value);
        setGraduadosSexoPrimerSemestre([])
        setGraduadosSexoSegundoSemestre([])
    }
    // despues de definir las constantes 
    useSingleton(async () => {
        await getYears();    
        await getDataGraduadosPrimerSemestre()
        await getDataGraduadosSegundoSemestre()
        await getDataGraduadosSexoPrimerSemestre()
        await getDataGraduadosSexoSegundoSemestre()
    });

    return(
        <>
        <h1 style={{textAlign: 'center', fontWeight:'bold'}}>Graduados</h1>  
        <CCard>
            <CCardBody>
                <p className="text-muted">
                Para tener en cuenta:
                </p>
                <p className="muted">
                    Un <b>graduado</b> es cualquier persona natural que, previa culminación del programa académico y cumpliendo de los requisitos de ley y los
                    exigidos por la institución de educación superior, recibe el título académico.
                    En los siguientes gráficos se muestra la información de los graduados agrupados por periodo académico, por nivel (Pregrado y Posgrado),
                    subnivel de formación, por facultad, programa académico, área de conocimiento, sexo biológico. El reporte es interactivo seleccionado una
                    facultad las gráficas cambian en función a la facultad seleccionada. .
                </p>                
                
            </CCardBody>
        </CCard>
        <CRow>
            <CCol xs="12" lg="12">
                <CCard>
                    <h1 style={{textAlign: 'center', fontWeight:'bold'}}>
                        Tabla de Estudiantes Graduados General:
                    </h1>
                    <CCollapse show={collapseTablaGraduadosPrimer}>  
                        <CCardBody>
                            <CDataTable
                                items={graduadosPrimer}
                                fields={fieldsGraduados}
                                itemsPerPage={5}
                                pagination
                                columnFilter
                            />
                        </CCardBody>
                    </CCollapse>
                    <CCollapse show={collapseTablaGraduadosSegundo}>  
                        <CCardBody>
                            <CDataTable
                                items={graduadosSegundo}
                                fields={fieldsGraduados}
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
                                    onClick={toggleTablaGraduadosPrimer} 
                                    className={'mb-1'}
                                >{yearSelected + '-1'}
                                </CButton>
                                <CButton
                                    color="outline-primary"
                                    onClick={toggleTablaGraduadosSegundo} 
                                    className={'mb-1'}
                                >{yearSelected + '-2'}
                                </CButton>
                            </CCol>
                        </CFormGroup>
                    </CCardFooter>
                </CCard>
            </CCol>
            <CCol xs="12" lg="12">
                <CCard>
                    <h1 style={{textAlign: 'center', fontWeight:'bold'}}>
                        Graduados según sexo:
                    </h1>
                    <CCardHeader>
                        <CLabel >Año:</CLabel>
                        <CFormGroup row>
                            <CCol md="3">
                                <CSelect value={yearSelectedSexo} onChange={handleChangeYearPieChartSexo}>
                                    {yearsData.map(item => {
                                        return (<option key={item} value={item}>{item}</option>);
                                    })}
                                </CSelect>
                            </CCol>
                            <CCol md="3">
                                <CButton
                                    color="outline-primary"
                                    onClick={togglePieChartGraduadosSexoPrimer}
                                    className={'mb-1'}
                                >{yearSelectedSexo + '-1'}
                                </CButton>
                                <CButton
                                    color="outline-primary"
                                    onClick={togglePieChartGraduadosSexoSegundo} 
                                    className={'mb-1'}
                                >{yearSelectedSexo + '-2'}
                                </CButton>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol xs={6}>
                            <CCollapse show={collapsePieChartGraduadosSexoPrimer}>  
                                <CCard className="mt-3">
                                <CCardBody>
                                    <h2 style={{textAlign: 'center'}}>{yearSelectedSexo + '-1'}</h2>
                                    <CChartPie
                                    datasets={[
                                    {
                                        backgroundColor: [
                                        '#E46651',
                                        '#00D8FF',
                                        ],
                                        data: [graduadosSexoPrimerSemestre.masculino,graduadosSexoPrimerSemestre.femenino]
                                    }
                                    ]}
                                    labels={['Masculino', 'Femenino']}
                                    options={{
                                    tooltips: {
                                        enabled: true
                                    }
                                    }}
                                    />

                                </CCardBody>
                                </CCard>
                            </CCollapse>
                        </CCol>
                        <CCol xs={6}>
                            <CCollapse show={collapsePieChartGraduadosSexoSegundo}>  
                                <CCard className="mt-3">
                                    <CCardBody>
                                        <h2 style={{textAlign: 'center'}}>{yearSelectedSexo + '-2'}</h2>
                                        <CChartPie
                                        datasets={[
                                        {
                                            backgroundColor: [
                                            '#E46651',
                                            '#00D8FF',
                                            ],
                                            data: [graduadosSexoSegundoSemestre.masculino,graduadosSexoSegundoSemestre.femenino]
                                        }
                                        ]}
                                        labels={['Masculino', 'Femenino']}
                                        options={{
                                        tooltips: {
                                            enabled: true
                                        }
                                        }}
                                        />
                                    </CCardBody>
                                </CCard>
                            </CCollapse>
                        </CCol>
                        </CFormGroup>
                    </CCardHeader>
                </CCard>
            </CCol>
        </CRow>
        


       
        </>
    )
}

export default Graduados