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
    const [collapseGeneral, setCollapseGeneral] = useState(false)
    const [collapseSexo, setCollapseSexo] = useState(false)
    const [collapseEstrato, setCollapseEstrato] = useState(false)
    const [collapseColegio, setCollapseColegio] = useState(false)

    // Constantes general
    const [yearSelected, setYearSelected] = React.useState(new Date().getFullYear())
    const [graduadosPrimer, setGraduadosPrimer] = React.useState([])
    const [collapseTablaGraduadosPrimer, setCollapseTablaGraduadosPrimer] = useState(false)
    const fieldsGraduados = ['COD_PERIODO','ESTUDIANTES','ESTRATO','SEXO','TIPO_INSCRIPCION','TIPO_COLEGIO']
    const [graduadosSegundo, setGraduadosSegundo] = React.useState([])
    const [collapseTablaGraduadosSegundo, setCollapseTablaGraduadosSegundo] = useState(false)
    // Constantes sexo
    const [yearSelectedSexo, setYearSelectedSexo] = React.useState(new Date().getFullYear())
    const [graduadosSexoPrimerSemestre, setGraduadosSexoPrimerSemestre] = React.useState({masculino:0,femenino:0})
    const [graduadosSexoSegundoSemestre, setGraduadosSexoSegundoSemestre] = React.useState({masculino:0,femenino:0})
    const [collapsePieChartGraduadosSexoPrimer, setCollapsePieChartGraduadosSexoPrimer] = useState(false)
    const [collapsePieChartGraduadosSexoSegundo, setCollapsePieChartGraduadosSexoSegundo] = useState(false)
    // Constantes segun estrato
    const [yearSelectedEstrato, setYearSelectedEstrato] = React.useState(new Date().getFullYear())
    const [collapseLineChartEstrato, setCollapseLineChartEstrato] = useState(false)
    const fieldsEstrato = ['Estrato 0','Estrato I','Estrato II','Estrato III','Estrato IV','Estrato V','Estrato VI']
    const [graduadosEstratoPrimerSemestre, setGraduadosEstratoPrimerSemestre] = React.useState({})
    const [graduadosEstratoSegundoSemestre, setGraduadosEstratoSegundoSemestre] = React.useState({})
    const [loadingEstrato, setLoadingEstrato] = React.useState(false)
    // Constantes segun colegio 
    const [collapseLineChartColegio, setCollapseLineChartColegio] = useState(false)
    const [graduadosColegio, setGraduadosColegio] = React.useState({})



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
        url: 'http://localhost:8000/api/tendencia?VAR=Graduado&COD_PERIODO='+ yearSelected +'-1',
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
    const getDataGraduadosEstratoPrimerSemestre = async() =>{ 
        var estratos = ['None','I','II','III','IV','V','VI']
        var axios = require('axios');
        for (var i = 0;i<7;i++){
            var config = {
                method: 'get',
                url: 'http://localhost:8000/api/tendencia_count?VAR=Graduado&ESTRATO='+estratos[i]+'&COD_PERIODO='+ yearSelectedEstrato +'-1',
                headers: { 
                    'Content-Type': 'application/json'
                },
            };
            let graduadosquery = await axios(config)    
            .then( response => response.data.data)
            .catch(function (error) {
                if(error.response.status === 404) {
                    
                    return {ESTUDIANTES__sum:0}
                }
                else {
                    return error.response
                }
            });
            let aux = graduadosEstratoPrimerSemestre
            aux['estrato'+i]= graduadosquery.ESTUDIANTES__sum
            await setGraduadosEstratoPrimerSemestre(
                // {...graduadosEstratoPrimerSemestre,['estrato'+i]: graduadosquery.ESTUDIANTES__sum}
                aux
                )
        }
    }

    const getDataGraduadosEstratoSegundoSemestre = async() =>{ 
        var estratos = ['None','I','II','III','IV','V','VI']
        var axios = require('axios');         
        for (var i = 0;i<7;i++){
            var config = {
                method: 'get',
                url: 'http://localhost:8000/api/tendencia_count?VAR=Graduado&ESTRATO='+estratos[i]+'&COD_PERIODO='+ yearSelectedEstrato +'-2',
                headers: { 
                    'Content-Type': 'application/json'
                },
            };
            
            var graduadosquery = await axios(config)    
            .then( response => response.data.data)
            .catch(function (error) {
                if(error.response.status === 404) {
                    return {ESTUDIANTES__sum:0}
                }
                else {
                    return error.response
                }
            });
            let aux = graduadosEstratoSegundoSemestre
            aux['estrato'+i]= graduadosquery.ESTUDIANTES__sum 
            await setGraduadosEstratoSegundoSemestre(
                aux
                )
            
        }
        setLoadingEstrato(false)
    }

    const getDataGraduadosColegio = async() =>{ 
        var tiposColegio= ['Na','Oficial','Privado']
        var axios = require('axios');
        let aux = graduadosColegio
        for (var tipo = 0;tipo<3;tipo++){
            for (var year = actualYear;year >= 2010;year--){
                var config = {
                    method: 'get',
                    url: 'http://localhost:8000/api/tendencia_count?VAR=Graduado&TIPO_COLEGIO='+tiposColegio[tipo]+'&COD_PERIODO='+ year,
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                };
                var graduadosquery = await axios(config)    
                .then( response => response.data.data)
                .catch(function (error) {
                    if(error.response.status === 404) {
                        return {ESTUDIANTES__sum:0}
                    }
                    else {
                        return error.response
                    }
                });
               aux[tiposColegio[tipo]+ year]= graduadosquery.ESTUDIANTES__sum 
            }
            await setGraduadosColegio(
                aux
                )
        }
        setLoadingEstrato(false)
    }


    React.useEffect(async () => { 
        await getDataGraduadosPrimerSemestre()
        await getDataGraduadosSegundoSemestre()
    }, [yearSelected])


    React.useEffect(async () => { 
        await getDataGraduadosSexoPrimerSemestre()
        await getDataGraduadosSexoSegundoSemestre()
    },[yearSelectedSexo])

    React.useEffect(async () => { 
        await getDataGraduadosEstratoPrimerSemestre()
        await getDataGraduadosEstratoSegundoSemestre()
    },[yearSelectedEstrato])

    React.useEffect(async () => { await getDataGraduadosColegio()})



    const toggleGeneral = (e)=>{
        setCollapseGeneral(!collapseGeneral);
        setCollapseSexo(false);
        setCollapseEstrato(false);
        setCollapseColegio(false);
        e.preventDefault();
    }
    const toggleSexo = (e)=>{
        setCollapseSexo(!collapseSexo);
        setCollapseGeneral(false);
        setCollapseEstrato(false);
        setCollapseColegio(false);
        e.preventDefault();
    }
    const toggleEstrato = (e)=>{
        setCollapseEstrato(!collapseEstrato);
        setCollapseGeneral(false);
        setCollapseSexo(false);
        setCollapseColegio(false);
        e.preventDefault();
    }
    const toggleColegio = (e)=>{
        setCollapseColegio(!collapseColegio);
        setCollapseGeneral(false);
        setCollapseSexo(false);
        setCollapseEstrato(false);
        e.preventDefault();
    }

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
    const toggleLineChartEstrato = (e)=>{
        setCollapseLineChartEstrato(!collapseLineChartEstrato);
        e.preventDefault();
    }
    const toggleLineChartColegio = (e)=>{
        setCollapseLineChartColegio(!collapseLineChartColegio);
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
    const handleChangeYearLineChartEstrato = async (event) =>  {
        await setYearSelectedEstrato(event.target.value);
        await setLoadingEstrato(true);
    }
    

    // despues de definir las constantes 
    useSingleton(async () => {
        await getYears();    
        await getDataGraduadosPrimerSemestre()
        await getDataGraduadosSegundoSemestre()
        await getDataGraduadosSexoPrimerSemestre()
        await getDataGraduadosSexoSegundoSemestre()
        await getDataGraduadosEstratoPrimerSemestre()
        await getDataGraduadosEstratoSegundoSemestre()
        await getDataGraduadosColegio()
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
                    Un <b>graduado</b> es cualquier persona natural que, previa culminación del programa académico y cumpliendo los requisitos de ley y los
                    exigidos por la institución de educación superior, recibe el título académico.
                    En los siguientes gráficos se muestra la información de los graduados agrupados por periodo académico, por nivel (Pregrado y Posgrado),
                    subnivel de formación, por facultad, programa académico, área de conocimiento, sexo biológico. El reporte es interactivo seleccionado una
                    facultad las gráficas cambian en función a la facultad seleccionada. .
                </p>
                <p>
                En la siguientes tablas y gráficos se muestran la información de Graduados de forma histórica agrupado por periodo académico, sexo biológico,colegio de procedencia y tipo de estrato socioeconómico.
                </p>              
                <CRow className="align-items-center">
                    <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                        <CButton block variant="outline" color="primary" onClick={toggleGeneral}
                            >Tabla General
                        </CButton>
                    </CCol>
                    <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                        <CButton block variant="outline" color="success" onClick={toggleSexo}
                            >Según Sexo
                        </CButton>
                    </CCol>
                    <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                        <CButton block variant="outline" color="warning"onClick={toggleEstrato}
                            >Según Estrato
                        </CButton>
                    </CCol>
                    <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                        <CButton block variant="outline" color="danger" onClick={toggleColegio}
                            >Según Colegio
                        </CButton>
                    </CCol>
                    {/* <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                    <CButton block variant="outline" color="info">Info</CButton>
                    </CCol> */}
                </CRow>
            </CCardBody>
        </CCard>
        <CRow>
            <CCol xs="12" lg="12">
                <CCollapse show={collapseGeneral}>
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
                                <CCol md="3">
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
                </CCollapse>
            </CCol>

            <CCol xs="12" lg="12">
                <CCollapse show={collapseSexo}>
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
                </CCollapse>
            </CCol>

            <CCol xs="12" lg="12">
                <CCollapse show={collapseEstrato}>
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
                                    >Mostrar Gráfico
                                    </CButton>
                                </CCol>
                            </CFormGroup>
                            <CCollapse show={collapseLineChartEstrato}>  
                                <CCardBody>
                                    {loadingEstrato? <div class="spinner-border text-info" role="status">
                                        <span class="sr-only">Loading...</span>
                                        </div> :
                                    <CChartBar
                                        datasets={[
                                        {
                                            label: yearSelectedEstrato+'-1',
                                            backgroundColor: '#f87979',
                                            data: [
                                                graduadosEstratoPrimerSemestre.estrato0,
                                                graduadosEstratoPrimerSemestre.estrato1,
                                                graduadosEstratoPrimerSemestre.estrato2,
                                                graduadosEstratoPrimerSemestre.estrato3,
                                                graduadosEstratoPrimerSemestre.estrato4,
                                                graduadosEstratoPrimerSemestre.estrato5,
                                                graduadosEstratoPrimerSemestre.estrato6,
                                            ]
                                        },
                                        {
                                            label: yearSelectedEstrato+'-2',
                                            backgroundColor: '#0096d2',
                                            data: [
                                                graduadosEstratoSegundoSemestre.estrato0,
                                                graduadosEstratoSegundoSemestre.estrato1,
                                                graduadosEstratoSegundoSemestre.estrato2,
                                                graduadosEstratoSegundoSemestre.estrato3,
                                                graduadosEstratoSegundoSemestre.estrato4,
                                                graduadosEstratoSegundoSemestre.estrato5,
                                                graduadosEstratoSegundoSemestre.estrato6,
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
                                    }
                                </CCardBody>
                            </CCollapse>
                        </CCardHeader>
                    </CCard>
                </CCollapse>
            </CCol> 

            <CCol xs="12" lg="12">
                <CCollapse show={collapseColegio}>
                    <CCard>
                        <h1 style={{textAlign: 'center', fontWeight:'bold'}}>
                            Tendencia según colegio:
                        </h1>
                        <CCardHeader>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CButton
                                        color="outline-primary"
                                        onClick={toggleLineChartColegio}
                                        className={'mb-1'}
                                    >Mostrar Gráfico
                                    </CButton>
                                </CCol>
                            </CFormGroup>
                            <CCollapse show={collapseLineChartColegio}>  
                                <CCardBody>
                                    <CChartLine
                                        datasets={[
                                        
                                        {   
                                            label: 'Na',
                                            fill:false,
                                            borderColor: 'Red',
                                            backgroundColor: 'Red',
                                            data: [
                                                graduadosColegio.Na2021,
                                                graduadosColegio.Na2020,
                                                graduadosColegio.Na2019,
                                                graduadosColegio.Na2018,
                                                graduadosColegio.Na2017,
                                                graduadosColegio.Na2016,
                                                graduadosColegio.Na2015,
                                                graduadosColegio.Na2014,
                                                graduadosColegio.Na2013,
                                                graduadosColegio.Na2012,
                                                graduadosColegio.Na2011,
                                                graduadosColegio.Na2010,
                                            ]
                                        },
                                        {
                                            label: 'Oficial',
                                            backgroundColor: 'Green',
                                            fill:false,
                                            borderColor: 'Green',
                                            data: [
                                                graduadosColegio.Oficial2021,
                                                graduadosColegio.Oficial2020,
                                                graduadosColegio.Oficial2019,
                                                graduadosColegio.Oficial2018,
                                                graduadosColegio.Oficial2017,
                                                graduadosColegio.Oficial2016,
                                                graduadosColegio.Oficial2015,
                                                graduadosColegio.Oficial2014,
                                                graduadosColegio.Oficial2013,
                                                graduadosColegio.Oficial2012,
                                                graduadosColegio.Oficial2011,
                                                graduadosColegio.Oficial2010,
                                            ]
                                        },
                                        {
                                            label: 'Privado',
                                            backgroundColor: 'Blue',
                                            borderColor: 'Blue',
                                            fill:false,
                                            data: [
                                                graduadosColegio.Privado2021,
                                                graduadosColegio.Privado2020,
                                                graduadosColegio.Privado2019,
                                                graduadosColegio.Privado2018,
                                                graduadosColegio.Privado2017,
                                                graduadosColegio.Privado2016,
                                                graduadosColegio.Privado2015,
                                                graduadosColegio.Privado2014,
                                                graduadosColegio.Privado2013,
                                                graduadosColegio.Privado2012,
                                                graduadosColegio.Privado2011,
                                                graduadosColegio.Privado2010,
                                            ]
                                        }
                                        ]}
                                        options={{
                                        tooltips: {
                                            enabled: true
                                        }
                                        
                                        }}
                                        labels= {yearsData}
                                        
                                    />
                                </CCardBody>
                            </CCollapse>
                        </CCardHeader>
                    </CCard>
                </CCollapse>
            </CCol> 


        </CRow>
        


       
        </>
    )
}

export default Graduados