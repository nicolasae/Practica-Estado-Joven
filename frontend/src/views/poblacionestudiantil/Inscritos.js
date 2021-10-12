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

const Inscritos = () =>{
    // constantes
    const actualYear = new Date().getFullYear()
    const [yearsData,setYearsData] = React.useState([])
    // Constantes general
    const [yearSelected, setYearSelected] = React.useState(new Date().getFullYear())
    const [inscritosPrimer, setInscritosPrimer] = React.useState([])
    const [collapseTablaInscritosPrimer, setCollapseTablaInscritosPrimer] = useState(false)
    const fieldsInscritos = ['COD_PERIODO','ESTUDIANTES','ESTRATO','SEXO','TIPO_INSCRIPCION','TIPO_COLEGIO']
    const [inscritosSegundo, setInscritosSegundo] = React.useState([])
    const [collapseTablaInscritosSegundo, setCollapseTablaInscritosSegundo] = useState(false)
    // Constantes sexo
    const [yearSelectedSexo, setYearSelectedSexo] = React.useState(new Date().getFullYear())
    const [inscritosSexoPrimerSemestre, setInscritosSexoPrimerSemestre] = React.useState({masculino:0,femenino:0})
    const [inscritosSexoSegundoSemestre, setInscritosSexoSegundoSemestre] = React.useState({masculino:0,femenino:0})
    const [collapsePieChartInscritosSexoPrimer, setCollapsePieChartInscritosSexoPrimer] = useState(false)
    const [collapsePieChartInscritosSexoSegundo, setCollapsePieChartInscritosSexoSegundo] = useState(false)
    // Constantes segun estrato
    const [yearSelectedEstrato, setYearSelectedEstrato] = React.useState(new Date().getFullYear())
    const [collapseLineChartEstrato, setCollapseLineChartEstrato] = useState(false)
    const fieldsEstrato = ['Estrato 0','Estrato I','Estrato II','Estrato III','Estrato IV','Estrato V','Estrato VI']
    const [inscritosEstratoPrimerSemestre, setInscritosEstratoPrimerSemestre] = React.useState({estrato0:0,estrato1:0,estrato2:0,estrato3:0,estrato4:0,estrato5:0,estrato6:0})
    const [inscritosEstratoSegundoSemestre, setInscritosEstratoSegundoSemestre] = React.useState({estrato0:0,estrato1:0,estrato2:0,estrato3:0,estrato4:0,estrato5:0,estrato6:0})


    // Funciones 
    const getYears = async() => { 
        for (var i=actualYear;i>= 2010; i--){
            yearsData.push(i)
        }
        setYearsData(yearsData)
    }

    const getDataInscritosPrimerSemestre = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/tendencia?VAR=Primer curso&COD_PERIODO='+ yearSelected +'-1',
        headers: { 
            'Content-Type': 'application/json'
        },
        };
        const inscritosquery = await axios(config)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        await setInscritosPrimer(inscritosquery)
    }

    const getDataInscritosSegundoSemestre = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/tendencia?VAR=Primer curso&COD_PERIODO='+ yearSelected +'-2',
        headers: { 
            'Content-Type': 'application/json'
        },
        };
        const inscritosquery = await axios(config)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        await setInscritosSegundo(inscritosquery)
    }
    const getDataInscritosSexoPrimerSemestre = async () => {
        console.log(yearSelectedSexo)
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/tendencia_count?VAR=Inscrito&SEXO=Masculino&COD_PERIODO='+ yearSelectedSexo +'-1',
        headers: { 
            'Content-Type': 'application/json'
        },
        };
        var config1 = {
            method:'get',
            url:'http://localhost:8000/api/tendencia_count?VAR=Inscrito&SEXO=Femenino&COD_PERIODO='+ yearSelectedSexo +'-1',
            headers: { 
                'Content-Type': 'application/json'
            },
        }
        var inscritosquery = await axios(config)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        var inscritosquery1 = await axios(config1)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        await setInscritosSexoPrimerSemestre({masculino:inscritosquery.ESTUDIANTES__sum,femenino:inscritosquery1.ESTUDIANTES__sum})
        
    }
    const getDataInscritosSexoSegundoSemestre = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/tendencia_count?VAR=Inscrito&SEXO=Masculino&COD_PERIODO='+ yearSelectedSexo +'-2',
        headers: { 
            'Content-Type': 'application/json'
        },
        };
        var config1 = {
            method:'get',
            url:'http://localhost:8000/api/tendencia_count?VAR=Inscrito&SEXO=Femenino&COD_PERIODO='+ yearSelectedSexo +'-2',
            headers: { 
                'Content-Type': 'application/json'
            },
        }
        var inscritosquery = await axios(config)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        var inscritosquery1 = await axios(config1)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        await setInscritosSexoSegundoSemestre({masculino:inscritosquery.ESTUDIANTES__sum,femenino:inscritosquery1.ESTUDIANTES__sum})
    }
    const getDataInscritosEstratoPrimerSemestre = async() =>{ 
        var axios = require('axios');
        var config = {
            method: 'get',
            url: 'http://localhost:8000/api/tendencia_count?VAR=Inscrito&ESTRATO=None&COD_PERIODO='+ yearSelectedSexo +'-1',
            headers: { 
                'Content-Type': 'application/json'
            },
            };
        var config1 = {
            method: 'get',
            url: 'http://localhost:8000/api/tendencia_count?VAR=Inscrito&ESTRATO=I&COD_PERIODO='+ yearSelectedEstrato +'-1',
            headers: { 
                'Content-Type': 'application/json'
            },
            };
        var config2 = {
            method: 'get',
            url: 'http://localhost:8000/api/tendencia_count?VAR=Inscrito&ESTRATO=II&COD_PERIODO='+ yearSelectedEstrato +'-1',
            headers: { 
                'Content-Type': 'application/json'
            },
            };
        var config3 = {
            method: 'get',
            url: 'http://localhost:8000/api/tendencia_count?VAR=Inscrito&ESTRATO=III&COD_PERIODO='+ yearSelectedEstrato +'-1',
            headers: { 
                'Content-Type': 'application/json'
            },
            };
        var config4 = {
            method: 'get',
            url: 'http://localhost:8000/api/tendencia_count?VAR=Inscrito&ESTRATO=IV&COD_PERIODO='+ yearSelectedEstrato +'-1',
            headers: { 
                'Content-Type': 'application/json'
            },
            };
        var config5 = {
            method: 'get',
            url: 'http://localhost:8000/api/tendencia_count?VAR=Inscrito&ESTRATO=V&COD_PERIODO='+ yearSelectedEstrato +'-1',
            headers: { 
                'Content-Type': 'application/json'
            },
            };
        var config6 = {
            method: 'get',
            url: 'http://localhost:8000/api/tendencia_count?VAR=Inscrito&ESTRATO=VI&COD_PERIODO='+ yearSelectedEstrato +'-1',
            headers: { 
                'Content-Type': 'application/json'
            },
            };
        var inscritosquery = await axios(config) 
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        var inscritosquery1 = await axios(config1)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        var inscritosquery2 = await axios(config2)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        var inscritosquery3 = await axios(config3)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        var inscritosquery4 = await axios(config4)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        var inscritosquery5 = await axios(config5)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        var inscritosquery6 = await axios(config6)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        await setInscritosEstratoPrimerSemestre(
            {
                
                estrato0:0,
                estrato1:inscritosquery1.ESTUDIANTES__sum,
                estrato2:inscritosquery2.ESTUDIANTES__sum,
                estrato3:inscritosquery3.ESTUDIANTES__sum,
                estrato4:inscritosquery4.ESTUDIANTES__sum,
                estrato5:inscritosquery5.ESTUDIANTES__sum,
                estrato6:inscritosquery6.ESTUDIANTES__sum,
            })
        
    }

    const getDataInscritosEstratoSegundoSemestre = async() =>{ 
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/tendencia_count?VAR=Inscrito&ESTRATO=None&COD_PERIODO='+ yearSelectedSexo +'-2',
        headers: { 
            'Content-Type': 'application/json'
        },
        };
        var config1 = {
            method: 'get',
            url: 'http://localhost:8000/api/tendencia_count?VAR=Inscrito&ESTRATO=I&COD_PERIODO='+ yearSelectedEstrato +'-2',
            headers: { 
                'Content-Type': 'application/json'
            },
            };
        var config2 = {
            method: 'get',
            url: 'http://localhost:8000/api/tendencia_count?VAR=Inscrito&ESTRATO=II&COD_PERIODO='+ yearSelectedEstrato +'-2',
            headers: { 
                'Content-Type': 'application/json'
            },
            };
        var config3 = {
            method: 'get',
            url: 'http://localhost:8000/api/tendencia_count?VAR=Inscrito&ESTRATO=III&COD_PERIODO='+ yearSelectedEstrato +'-2',
            headers: { 
                'Content-Type': 'application/json'
            },
            };
        var config4 = {
            method: 'get',
            url: 'http://localhost:8000/api/tendencia_count?VAR=Inscrito&ESTRATO=IV&COD_PERIODO='+ yearSelectedEstrato +'-2',
            headers: { 
                'Content-Type': 'application/json'
            },
            };
        var config5 = {
            method: 'get',
            url: 'http://localhost:8000/api/tendencia_count?VAR=Inscrito&ESTRATO=V&COD_PERIODO='+ yearSelectedEstrato +'-2',
            headers: { 
                'Content-Type': 'application/json'
            },
            };
        var config6 = {
            method: 'get',
            url: 'http://localhost:8000/api/tendencia_count?VAR=Inscrito&ESTRATO=VI&COD_PERIODO='+ yearSelectedEstrato +'-2',
            headers: { 
                'Content-Type': 'application/json'
            },
            };
        var inscritosquery = await axios(config)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        var inscritosquery1 = await axios(config1)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        var inscritosquery2 = await axios(config2)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        var inscritosquery3 = await axios(config3)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        var inscritosquery4 = await axios(config4)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        var inscritosquery5 = await axios(config5)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        var inscritosquery6 = await axios(config6)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        await setInscritosEstratoSegundoSemestre(
            {
                estrato0:0,
                estrato1:inscritosquery1.ESTUDIANTES__sum,
                estrato2:inscritosquery2.ESTUDIANTES__sum,
                estrato3:inscritosquery3.ESTUDIANTES__sum,
                estrato4:inscritosquery4.ESTUDIANTES__sum,
                estrato5:inscritosquery5.ESTUDIANTES__sum,
                estrato6:inscritosquery6.ESTUDIANTES__sum,
            })
    }

    React.useEffect(async () => { await getDataInscritosPrimerSemestre()}, [yearSelected])
    React.useEffect(async () => { await getDataInscritosSegundoSemestre()}, [yearSelected])

    React.useEffect(async () => { await getDataInscritosSexoPrimerSemestre()},[yearSelectedSexo])
    React.useEffect(async () => { await getDataInscritosSexoSegundoSemestre()},[yearSelectedSexo])

    React.useEffect(async () => { await getDataInscritosEstratoPrimerSemestre()},[yearSelectedEstrato])
    React.useEffect(async () => { await getDataInscritosEstratoSegundoSemestre()},[yearSelectedEstrato])


    const toggleTablaInscritosPrimer = (e)=>{
        setCollapseTablaInscritosPrimer(!collapseTablaInscritosPrimer);
        setCollapseTablaInscritosSegundo(false);
        e.preventDefault();
    }
    const toggleTablaInscritosSegundo = (e)=>{
        setCollapseTablaInscritosPrimer(false);
        setCollapseTablaInscritosSegundo(!collapseTablaInscritosSegundo);
        e.preventDefault();
    }
    const togglePieChartInscritosSexoPrimer = (e)=>{
        setCollapsePieChartInscritosSexoPrimer(!collapsePieChartInscritosSexoPrimer);
        e.preventDefault();
    }
    const togglePieChartInscritosSexoSegundo = (e)=>{
        setCollapsePieChartInscritosSexoSegundo(!collapsePieChartInscritosSexoSegundo);
        e.preventDefault();
    }
    const toggleLineChartEstrato = (e)=>{
        setCollapseLineChartEstrato(!collapseLineChartEstrato);
        e.preventDefault();
    }

    const handleChangeYear = async (event) =>  {
        setYearSelected(event.target.value);
    }
    const handleChangeYearPieChartSexo = async (event) =>  {
        setYearSelectedSexo(event.target.value);
        setInscritosSexoPrimerSemestre([])
        setInscritosSexoSegundoSemestre([])
    }
    const handleChangeYearLineChartEstrato = async (event) =>  {
        setYearSelectedEstrato(event.target.value);
        setInscritosEstratoPrimerSemestre([])
        setInscritosEstratoSegundoSemestre([])
    }
    // despues de definir las constantes 
    useSingleton(async () => {
        await getYears();    
        await getDataInscritosPrimerSemestre()
        await getDataInscritosSegundoSemestre()
        await getDataInscritosSexoPrimerSemestre()
        await getDataInscritosSexoSegundoSemestre()
        await getDataInscritosEstratoPrimerSemestre()
        await getDataInscritosEstratoSegundoSemestre()
    });

    return(
        <>
        <h1 style={{textAlign: 'center', fontWeight:'bold'}}>Inscritos</h1>  
        <CCard>
            <CCardBody>
                <p className="text-muted">
                Para tener en cuenta:
                </p>
                <p className="muted">
                    Los estudiantes de <b>inscritos</b> son .
                </p>                
                
            </CCardBody>
        </CCard>
        <CRow>
            <CCol xs="12" lg="12">
                <CCard>
                    <h1 style={{textAlign: 'center', fontWeight:'bold'}}>
                        Tabla de Estudiantes Inscritos General:
                    </h1>
                    <CCollapse show={collapseTablaInscritosPrimer}>  
                        <CCardBody>
                            <CDataTable
                                items={inscritosPrimer}
                                fields={fieldsInscritos}
                                itemsPerPage={5}
                                pagination
                                columnFilter
                            />
                        </CCardBody>
                    </CCollapse>
                    <CCollapse show={collapseTablaInscritosSegundo}>  
                        <CCardBody>
                            <CDataTable
                                items={inscritosSegundo}
                                fields={fieldsInscritos}
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
                                    onClick={toggleTablaInscritosPrimer} 
                                    className={'mb-1'}
                                >{yearSelected + '-1'}
                                </CButton>
                                <CButton
                                    color="outline-primary"
                                    onClick={toggleTablaInscritosSegundo} 
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
                        Tendencia según sexo:
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
                                    onClick={togglePieChartInscritosSexoPrimer}
                                    className={'mb-1'}
                                >{yearSelectedSexo + '-1'}
                                </CButton>
                                <CButton
                                    color="outline-primary"
                                    onClick={togglePieChartInscritosSexoSegundo} 
                                    className={'mb-1'}
                                >{yearSelectedSexo + '-2'}
                                </CButton>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol xs={6}>
                            <CCollapse show={collapsePieChartInscritosSexoPrimer}>  
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
                                        data: [inscritosSexoPrimerSemestre.masculino,inscritosSexoPrimerSemestre.femenino]
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
                            <CCollapse show={collapsePieChartInscritosSexoSegundo}>  
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
                                            data: [inscritosSexoSegundoSemestre.masculino,inscritosSexoSegundoSemestre.femenino]
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
            <CCol xs="12" lg="12">
                <CCard>
                    <h1 style={{textAlign: 'center', fontWeight:'bold'}}>
                        Tendencia según estrato:
                    </h1>
                    <CCardHeader>
                        <CLabel >Año:</CLabel>
                        <CFormGroup row>
                            <CCol md="3">
                                <CSelect value={yearSelectedEstrato} onChange={handleChangeYearLineChartEstrato}>
                                    {yearsData.map(item => {
                                        return (<option key={item} value={item}>{item}</option>);
                                    })}
                                </CSelect>
                            </CCol>
                            <CCol md="3">
                                <CButton
                                    color="outline-primary"
                                    onClick={toggleLineChartEstrato}
                                    className={'mb-1'}
                                >Graficar
                                </CButton>
                            </CCol>
                        </CFormGroup>
                        <CCollapse show={collapseLineChartEstrato}>  
                            <CCardBody>
                                <CChartBar
                                    datasets={[
                                    {
                                        label: yearSelectedEstrato+'-1',
                                        backgroundColor: '#f87979',
                                        data: [
                                            inscritosEstratoPrimerSemestre.estrato0,
                                            inscritosEstratoPrimerSemestre.estrato1,
                                            inscritosEstratoPrimerSemestre.estrato2,
                                            inscritosEstratoPrimerSemestre.estrato3,
                                            inscritosEstratoPrimerSemestre.estrato4,
                                            inscritosEstratoPrimerSemestre.estrato5,
                                            inscritosEstratoPrimerSemestre.estrato6,
                                        ]
                                    },
                                    {
                                        label: yearSelectedEstrato+'-2',
                                        backgroundColor: '#0096d2',
                                        data: [
                                            inscritosEstratoSegundoSemestre.estrato0,
                                            inscritosEstratoSegundoSemestre.estrato1,
                                            inscritosEstratoSegundoSemestre.estrato2,
                                            inscritosEstratoSegundoSemestre.estrato3,
                                            inscritosEstratoSegundoSemestre.estrato4,
                                            inscritosEstratoSegundoSemestre.estrato5,
                                            inscritosEstratoSegundoSemestre.estrato6,
                                        ]
                                    },
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
                    </CCardHeader>
                </CCard>
            </CCol>                            
            
        </CRow>
        


       
        </>
    )
}

export default Inscritos