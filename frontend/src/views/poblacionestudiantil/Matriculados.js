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
  CCardGroup,
} from "@coreui/react";

import {
    CChartBar,
    CChartLine,
    CChartDoughnut,
    CChartRadar,
    CChartPie,
    CChartPolarArea
  } from '@coreui/react-chartjs'

import { Chart } from "react-google-charts"
import '../../scss/_custom.scss'

// hook personalizado
const useSingleton = (callBack = () => { }) => { const hasBeenCalled = React.useRef(false);     if (hasBeenCalled.current) return;     callBack();     hasBeenCalled.current = true; }

const Matriculados = () =>{
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
    // Constantes Matriculados sexo
    const [yearSelectedSexo, setYearSelectedSexo] = React.useState(new Date().getFullYear())
    const [matriculadosSexoPrimerSemestre, setMatriculadosSexoPrimerSemestre] = React.useState({masculino:0,femenino:0})
    const [matriculadosSexoSegundoSemestre, setMatriculadosSexoSegundoSemestre] = React.useState({masculino:0,femenino:0})
    const [collapsePieChartMatriculadosSexoPrimer, setCollapsePieChartMatriculadosSexoPrimer] = useState(false)
    const [collapsePieChartMatriculadosSexoSegundo, setCollapsePieChartMatriculadosSexoSegundo] = useState(false)
    // Constantes Matriculados estratos 
    const fieldsEstrato = ['Estrato 0','Estrato I','Estrato II','Estrato III','Estrato IV','Estrato V','Estrato VI']
    const [yearSelectedEstrato, setYearSelectedEstrato] = React.useState(new Date().getFullYear())
    const [matriculadosEstratoPrimerSemestre, setMatriculadosEstratoPrimerSemestre] = React.useState({estrato0:0,estrato1:0,estrato2:0,estrato3:0,estrato4:0,estrato5:0,estrato6:0})
    const [matriculadosEstratoSegundoSemestre, setMatriculadosEstratoSegundoSemestre] = React.useState({estrato0:0,estrato1:0,estrato2:0,estrato3:0,estrato4:0,estrato5:0,estrato6:0})
    const [collapseBarChartMatriculadosEstratoPrimer, setCollapseBarChartMatriculadosEstratoPrimer] = useState(false)
    const [collapseBarChartMatriculadosEstratoSegundo, setCollapseBarChartMatriculadosEstratoSegundo] = useState(false)

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
    const getDataMatriculadosSexoPrimerSemestre = async () => {
        console.log(yearSelectedSexo)
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/tendencia_count?VAR=Matriculado&SEXO=Masculino&COD_PERIODO='+ yearSelectedSexo +'-1',
        headers: { 
            'Content-Type': 'application/json'
        },
        };
        var config1 = {
            method:'get',
            url:'http://localhost:8000/api/tendencia_count?VAR=Matriculado&SEXO=Femenino&COD_PERIODO='+ yearSelectedSexo +'-1',
            headers: { 
                'Content-Type': 'application/json'
            },
        }
        var matriculadosquery = await axios(config)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        var matriculadosquery1 = await axios(config1)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        await setMatriculadosSexoPrimerSemestre({masculino:matriculadosquery.ESTUDIANTES__sum,femenino:matriculadosquery1.ESTUDIANTES__sum})
        
    }

    const getDataMatriculadosSexoSegundoSemestre = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/tendencia_count?VAR=Matriculado&SEXO=Masculino&COD_PERIODO='+ yearSelectedSexo +'-2',
        headers: { 
            'Content-Type': 'application/json'
        },
        };
        var config1 = {
            method:'get',
            url:'http://localhost:8000/api/tendencia_count?VAR=Matriculado&SEXO=Femenino&COD_PERIODO='+ yearSelectedSexo +'-2',
            headers: { 
                'Content-Type': 'application/json'
            },
        }
        var matriculadosquery = await axios(config)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        var matriculadosquery1 = await axios(config1)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        await setMatriculadosSexoSegundoSemestre({masculino:matriculadosquery.ESTUDIANTES__sum,femenino:matriculadosquery1.ESTUDIANTES__sum})
    }
    const getDataMatriculadosEstratoPrimerSemestre = async() =>{ 
        var axios = require('axios');
        // var config = {
        // method: 'get',
        // url: 'http://localhost:8000/api/tendencia_count?VAR=Matriculado&ESTRATO=&COD_PERIODO='+ yearSelectedSexo +'-1',
        // headers: { 
        //     'Content-Type': 'application/json'
        // },
        // };
        var config1 = {
            method: 'get',
            url: 'http://localhost:8000/api/tendencia_count?VAR=Matriculado&ESTRATO=I&COD_PERIODO='+ yearSelectedEstrato +'-1',
            headers: { 
                'Content-Type': 'application/json'
            },
            };
        var config2 = {
            method: 'get',
            url: 'http://localhost:8000/api/tendencia_count?VAR=Matriculado&ESTRATO=II&COD_PERIODO='+ yearSelectedEstrato +'-1',
            headers: { 
                'Content-Type': 'application/json'
            },
            };
        var config3 = {
            method: 'get',
            url: 'http://localhost:8000/api/tendencia_count?VAR=Matriculado&ESTRATO=III&COD_PERIODO='+ yearSelectedEstrato +'-1',
            headers: { 
                'Content-Type': 'application/json'
            },
            };
        var config4 = {
            method: 'get',
            url: 'http://localhost:8000/api/tendencia_count?VAR=Matriculado&ESTRATO=IV&COD_PERIODO='+ yearSelectedEstrato +'-1',
            headers: { 
                'Content-Type': 'application/json'
            },
            };
        var config5 = {
            method: 'get',
            url: 'http://localhost:8000/api/tendencia_count?VAR=Matriculado&ESTRATO=V&COD_PERIODO='+ yearSelectedEstrato +'-1',
            headers: { 
                'Content-Type': 'application/json'
            },
            };
        var config6 = {
            method: 'get',
            url: 'http://localhost:8000/api/tendencia_count?VAR=Matriculado&ESTRATO=VI&COD_PERIODO='+ yearSelectedEstrato +'-1',
            headers: { 
                'Content-Type': 'application/json'
            },
            };
        var matriculadosquery1 = await axios(config1)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        var matriculadosquery2 = await axios(config2)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        var matriculadosquery3 = await axios(config3)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        var matriculadosquery4 = await axios(config4)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        var matriculadosquery5 = await axios(config5)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        var matriculadosquery6 = await axios(config6)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        await setMatriculadosEstratoPrimerSemestre(
            {
                estrato0:0,
                estrato1:matriculadosquery1.ESTUDIANTES__sum,
                estrato2:matriculadosquery2.ESTUDIANTES__sum,
                estrato3:matriculadosquery3.ESTUDIANTES__sum,
                estrato4:matriculadosquery4.ESTUDIANTES__sum,
                estrato5:matriculadosquery5.ESTUDIANTES__sum,
                estrato6:matriculadosquery6.ESTUDIANTES__sum,
            })
    }

    const getDataMatriculadosEstratoSegundoSemestre = async() =>{ 
        var axios = require('axios');
        // var config = {
        // method: 'get',
        // url: 'http://localhost:8000/api/tendencia_count?VAR=Matriculado&ESTRATO=&COD_PERIODO='+ yearSelectedSexo +'-2',
        // headers: { 
        //     'Content-Type': 'application/json'
        // },
        // };
        var config1 = {
            method: 'get',
            url: 'http://localhost:8000/api/tendencia_count?VAR=Matriculado&ESTRATO=I&COD_PERIODO='+ yearSelectedEstrato +'-2',
            headers: { 
                'Content-Type': 'application/json'
            },
            };
        var config2 = {
            method: 'get',
            url: 'http://localhost:8000/api/tendencia_count?VAR=Matriculado&ESTRATO=II&COD_PERIODO='+ yearSelectedEstrato +'-2',
            headers: { 
                'Content-Type': 'application/json'
            },
            };
        var config3 = {
            method: 'get',
            url: 'http://localhost:8000/api/tendencia_count?VAR=Matriculado&ESTRATO=III&COD_PERIODO='+ yearSelectedEstrato +'-2',
            headers: { 
                'Content-Type': 'application/json'
            },
            };
        var config4 = {
            method: 'get',
            url: 'http://localhost:8000/api/tendencia_count?VAR=Matriculado&ESTRATO=IV&COD_PERIODO='+ yearSelectedEstrato +'-2',
            headers: { 
                'Content-Type': 'application/json'
            },
            };
        var config5 = {
            method: 'get',
            url: 'http://localhost:8000/api/tendencia_count?VAR=Matriculado&ESTRATO=V&COD_PERIODO='+ yearSelectedEstrato +'-2',
            headers: { 
                'Content-Type': 'application/json'
            },
            };
        var config6 = {
            method: 'get',
            url: 'http://localhost:8000/api/tendencia_count?VAR=Matriculado&ESTRATO=VI&COD_PERIODO='+ yearSelectedEstrato +'-2',
            headers: { 
                'Content-Type': 'application/json'
            },
            };
        var matriculadosquery1 = await axios(config1)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        var matriculadosquery2 = await axios(config2)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        var matriculadosquery3 = await axios(config3)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        var matriculadosquery4 = await axios(config4)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        var matriculadosquery5 = await axios(config5)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        var matriculadosquery6 = await axios(config6)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        await setMatriculadosEstratoSegundoSemestre(
            {
                estrato0:0,
                estrato1:matriculadosquery1.ESTUDIANTES__sum,
                estrato2:matriculadosquery2.ESTUDIANTES__sum,
                estrato3:matriculadosquery3.ESTUDIANTES__sum,
                estrato4:matriculadosquery4.ESTUDIANTES__sum,
                estrato5:matriculadosquery5.ESTUDIANTES__sum,
                estrato6:matriculadosquery6.ESTUDIANTES__sum,
            })
    }

    React.useEffect(async () => { await getDataMatriculadosPrimerSemestre()}, [yearSelected])
    React.useEffect(async () => { await getDataMatriculadosSegundoSemestre()}, [yearSelected])

    React.useEffect(async () => { await getDataMatriculadosSexoPrimerSemestre()},[yearSelectedSexo])
    React.useEffect(async () => { await getDataMatriculadosSexoSegundoSemestre()},[yearSelectedSexo])

    React.useEffect(async () => { await getDataMatriculadosEstratoPrimerSemestre()},[yearSelectedEstrato])
    React.useEffect(async () => { await getDataMatriculadosEstratoSegundoSemestre()},[yearSelectedEstrato])


    
    const toggleTablaMatriculadosPrimer = (e)=>{
        setCollapseTablaMatriculadosPrimer(!collapseTablaMatriculadosPrimer);
        setCollapseTablaMatriculadosSegundo(false);
        e.preventDefault();
    }
    const toggleTablaMatriculadosSegundo = (e)=>{
        setCollapseTablaMatriculadosSegundo(!collapseTablaMatriculadosSegundo);
        setCollapseTablaMatriculadosPrimer(false);
        e.preventDefault();
    }
    const togglePieChartMatriculadosSexoPrimer = (e)=>{
        setCollapsePieChartMatriculadosSexoPrimer(!collapsePieChartMatriculadosSexoPrimer);
        e.preventDefault();
    }
    const togglePieChartMatriculadosSexoSegundo = (e)=>{
        setCollapsePieChartMatriculadosSexoSegundo(!collapsePieChartMatriculadosSexoSegundo);
        e.preventDefault();
    }
    const toggleBarChartMatriculadosEstratoPrimer = (e)=>{
        setCollapseBarChartMatriculadosEstratoPrimer(!collapseBarChartMatriculadosEstratoPrimer);
        setCollapseBarChartMatriculadosEstratoSegundo(false);
        e.preventDefault();
    }
    const toggleBarChartMatriculadosEstratoSegundo = (e)=>{
        setCollapseBarChartMatriculadosEstratoSegundo(!collapseBarChartMatriculadosEstratoSegundo);
        setCollapseBarChartMatriculadosEstratoPrimer(false);
        e.preventDefault();
    }


    const handleChangeYear = async (event) =>  {
        setYearSelected(event.target.value);

    }
    const handleChangeYearPieChartSexo = async (event) =>  {
        setYearSelectedSexo(event.target.value);
        setMatriculadosSexoPrimerSemestre([])
        setMatriculadosSexoSegundoSemestre([])
    }
    const handleChangeYearBarChartEstrato = async (event) =>  {
        setYearSelectedEstrato(event.target.value);
        setMatriculadosEstratoPrimerSemestre([])
        setMatriculadosEstratoSegundoSemestre([])
    }
    


    // despues de definir las constantes 
    useSingleton(async () => {
        await getYears();    
        await getDataMatriculadosPrimerSemestre()
        await getDataMatriculadosSegundoSemestre()
        await getDataMatriculadosSexoPrimerSemestre()
        await getDataMatriculadosSexoSegundoSemestre()
        await getDataMatriculadosEstratoPrimerSemestre()
        await getDataMatriculadosEstratoSegundoSemestre()


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
                        Tabla de Estudiantes Matriculados General:
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
                    <CCardHeader>
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
                    </CCardHeader>
                </CCard>
            </CCol>
            <CCol xs="12" lg="12">
                <CCard>
                    <h1 style={{textAlign: 'center', fontWeight:'bold'}}>
                        Matriculados según sexo:
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
                                    onClick={togglePieChartMatriculadosSexoPrimer}
                                    className={'mb-1'}
                                >{yearSelectedSexo + '-1'}
                                </CButton>
                                <CButton
                                    color="outline-primary"
                                    onClick={togglePieChartMatriculadosSexoSegundo} 
                                    className={'mb-1'}
                                >{yearSelectedSexo + '-2'}
                                </CButton>
                            </CCol>
                        </CFormGroup>
                    </CCardHeader>
                </CCard>
                    <CRow>
                        <CCol xs={6}>
                            <CCollapse show={collapsePieChartMatriculadosSexoPrimer}>  
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
                                        data: [matriculadosSexoPrimerSemestre.masculino,matriculadosSexoPrimerSemestre.femenino]
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
                            <CCollapse show={collapsePieChartMatriculadosSexoSegundo}>  
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
                                            data: [matriculadosSexoSegundoSemestre.masculino,matriculadosSexoSegundoSemestre.femenino]
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
                    </CRow>
                </CCol>
            </CRow>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <h1 style={{textAlign: 'center', fontWeight:'bold'}}>
                            Matriculados según estrato:
                        </h1>
                        <CCollapse show={collapseBarChartMatriculadosEstratoPrimer}>  
                            <CCardBody>
                                <CChartBar
                                    datasets={[
                                    {
                                        label: 'Estudiantes Matriculados por Estrato Socioeconomico',
                                        backgroundColor: '#f87979',
                                        data: [
                                            matriculadosEstratoPrimerSemestre.estrato0,
                                            matriculadosEstratoPrimerSemestre.estrato1,
                                            matriculadosEstratoPrimerSemestre.estrato2,
                                            matriculadosEstratoPrimerSemestre.estrato3,
                                            matriculadosEstratoPrimerSemestre.estrato4,
                                            matriculadosEstratoPrimerSemestre.estrato5,
                                            matriculadosEstratoPrimerSemestre.estrato6,
                                        ]
                                    }
                                    ]}
                                    labels= {fieldsEstrato}
                                    options={{
                                    tooltips: {
                                        enabled: true
                                    }
                                    }}
                                />
                            </CCardBody>
                        </CCollapse>
                        <CCollapse show={collapseBarChartMatriculadosEstratoSegundo}>  
                            <CCardBody>
                                <CChartBar
                                    datasets={[
                                    {
                                        label: 'Estudiantes Matriculados',
                                        backgroundColor: '#f87979',
                                        data: [
                                            matriculadosEstratoPrimerSemestre.estrato0,
                                            matriculadosEstratoPrimerSemestre.estrato1,
                                            matriculadosEstratoPrimerSemestre.estrato2,
                                            matriculadosEstratoPrimerSemestre.estrato3,
                                            matriculadosEstratoPrimerSemestre.estrato4,
                                            matriculadosEstratoPrimerSemestre.estrato5,
                                            matriculadosEstratoPrimerSemestre.estrato6,
                                        ]
                                    }
                                    ]}
                                    labels= {fieldsEstrato}
                                    options={{
                                    tooltips: {
                                        enabled: true
                                    }
                                    }}
                                />
                            </CCardBody>
                        </CCollapse>
                    <CCardFooter>
                        <CLabel >Año:</CLabel>
                        <CFormGroup row>
                            <CCol md="3">
                                <CSelect value={yearSelectedEstrato} onChange={handleChangeYearBarChartEstrato}>
                                    {yearsData.map(item => {
                                        return (<option key={item} value={item}>{item}</option>);
                                    })}
                                </CSelect>
                            </CCol>
                            <CCol md="2">
                                <CButton
                                    color="outline-primary"
                                    onClick={toggleBarChartMatriculadosEstratoPrimer} 
                                    className={'mb-1'}
                                >{yearSelectedEstrato + '-1'}
                                </CButton>
                                <CButton
                                    color="outline-primary"
                                    onClick={toggleBarChartMatriculadosEstratoSegundo} 
                                    className={'mb-1'}
                                >{yearSelectedEstrato + '-2'}
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

export default Matriculados