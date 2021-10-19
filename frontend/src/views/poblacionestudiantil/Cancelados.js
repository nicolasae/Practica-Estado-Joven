import React,{ useState } from "react";
import axios from 'axios';

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
  CCollapse,
  CCardFooter,
  CButton,
  CFormGroup,
  CLabel,
  CSelect,
} from "@coreui/react";

import {
    CChartBar,
    CChartLine,
    CChartPie,
  } from '@coreui/react-chartjs'
import '../../scss/_custom.scss'

  // hook personalizado
const useSingleton = (callBack = () => { }) => { const hasBeenCalled = React.useRef(false);     if (hasBeenCalled.current) return;     callBack();     hasBeenCalled.current = true; }

const Cancelados = () =>{
    // constantes
    const actualYear = new Date().getFullYear()
    const [yearsData,setYearsData] = React.useState([])
    const [collapseGeneral, setCollapseGeneral] = useState(false)
    const [collapseSexo, setCollapseSexo] = useState(false)
    const [collapseEstrato, setCollapseEstrato] = useState(false)
    const [collapseColegio, setCollapseColegio] = useState(false)

    // Constantes general
    const [yearSelected, setYearSelected] = React.useState(new Date().getFullYear())
    const [canceladosPrimer, setCanceladosPrimer] = React.useState([])
    const [collapseTablaCanceladosPrimer, setCollapseTablaCanceladosPrimer] = useState(false)
    const fieldsCancelados = ['COD_PERIODO','ESTUDIANTES','ESTRATO','SEXO','TIPO_INSCRIPCION','TIPO_COLEGIO']
    const [canceladosSegundo, setCanceladosSegundo] = React.useState([])
    const [collapseTablaCanceladosSegundo, setCollapseTablaCanceladosSegundo] = useState(false)
    // Constantes sexo
    const [yearSelectedSexo, setYearSelectedSexo] = React.useState(new Date().getFullYear())
    const [canceladosSexoPrimerSemestre, setCanceladosSexoPrimerSemestre] = React.useState({masculino:0,femenino:0})
    const [canceladosSexoSegundoSemestre, setCanceladosSexoSegundoSemestre] = React.useState({masculino:0,femenino:0})
    const [collapsePieChartCanceladosSexoPrimer, setCollapsePieChartCanceladosSexoPrimer] = useState(false)
    const [collapsePieChartCanceladosSexoSegundo, setCollapsePieChartCanceladosSexoSegundo] = useState(false)
    // Constantes segun estrato
    const [yearSelectedEstrato, setYearSelectedEstrato] = React.useState(new Date().getFullYear())
    const [collapseLineChartEstrato, setCollapseLineChartEstrato] = useState(false)
    const fieldsEstrato = ['Estrato 0','Estrato I','Estrato II','Estrato III','Estrato IV','Estrato V','Estrato VI']
    const [canceladosEstratoPrimerSemestre, setCanceladosEstratoPrimerSemestre] = React.useState({})
    const [canceladosEstratoSegundoSemestre, setCanceladosEstratoSegundoSemestre] = React.useState({})
    const [loadingEstrato, setLoadingEstrato] = React.useState(false)
    // Constantes segun colegio 
    const [collapseLineChartColegio, setCollapseLineChartColegio] = useState(false)
    const [canceladosColegio, setCanceladosColegio] = React.useState({})
    const [loadingColegio, setLoadingColegio] = React.useState(true)



    // Funciones 
    const getYears = async() => { 
        for (var i=2010;i<=actualYear; i++){
            yearsData.push(i)
        }
        setYearsData(yearsData)
    }

    const getDataCanceladosPrimerSemestre = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/tendencia?VAR=Cancelado&COD_PERIODO='+ yearSelected +'-1',
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
    }

    const getDataCanceladosSegundoSemestre = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/tendencia?VAR=Cancelado&COD_PERIODO='+ yearSelected +'-2',
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
    const getDataCanceladosSexoPrimerSemestre = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/tendencia_count?VAR=Cancelado&SEXO=Masculino&COD_PERIODO='+ yearSelectedSexo +'-1',
        headers: { 
            'Content-Type': 'application/json'
        },
        };
        var config1 = {
            method:'get',
            url:'http://localhost:8000/api/tendencia_count?VAR=Cancelado&SEXO=Femenino&COD_PERIODO='+ yearSelectedSexo +'-1',
            headers: { 
                'Content-Type': 'application/json'
            },
        }
        var canceladosquery = await axios(config)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        var canceladosquery1 = await axios(config1)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        await setCanceladosSexoPrimerSemestre({masculino:canceladosquery.ESTUDIANTES__sum,femenino:canceladosquery1.ESTUDIANTES__sum})
        
    }
    const getDataCanceladosSexoSegundoSemestre = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/tendencia_count?VAR=Cancelado&SEXO=Masculino&COD_PERIODO='+ yearSelectedSexo +'-2',
        headers: { 
            'Content-Type': 'application/json'
        },
        };
        var config1 = {
            method:'get',
            url:'http://localhost:8000/api/tendencia_count?VAR=Cancelado&SEXO=Femenino&COD_PERIODO='+ yearSelectedSexo +'-2',
            headers: { 
                'Content-Type': 'application/json'
            },
        }
        var canceladosquery = await axios(config)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        var canceladosquery1 = await axios(config1)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        await setCanceladosSexoSegundoSemestre({masculino:canceladosquery.ESTUDIANTES__sum,femenino:canceladosquery1.ESTUDIANTES__sum})
    }
    const getDataCanceladosEstratoPrimerSemestre = async() =>{ 
        var estratos = ['None','I','II','III','IV','V','VI']
        var axios = require('axios');
        for (var i = 0;i<7;i++){
            var config = {
                method: 'get',
                url: 'http://localhost:8000/api/tendencia_count?VAR=Cancelado&ESTRATO='+estratos[i]+'&COD_PERIODO='+ yearSelectedEstrato +'-1',
                headers: { 
                    'Content-Type': 'application/json'
                },
            };
            let canceladosquery = await axios(config)    
            .then( response => response.data.data)
            .catch(function (error) {
                if(error.response.status === 404) {
                    
                    return {ESTUDIANTES__sum:0}
                }
                else {
                    return error.response
                }
            });
            let aux = canceladosEstratoPrimerSemestre
            aux['estrato'+i]= canceladosquery.ESTUDIANTES__sum
            await setCanceladosEstratoPrimerSemestre(
                // {...canceladosEstratoPrimerSemestre,['estrato'+i]: canceladosquery.ESTUDIANTES__sum}
                aux
                )
        }
    }

    const getDataCanceladosEstratoSegundoSemestre = async() =>{ 
        var estratos = ['None','I','II','III','IV','V','VI']
        var axios = require('axios');         
        for (var i = 0;i<7;i++){
            var config = {
                method: 'get',
                url: 'http://localhost:8000/api/tendencia_count?VAR=Cancelado&ESTRATO='+estratos[i]+'&COD_PERIODO='+ yearSelectedEstrato +'-2',
                headers: { 
                    'Content-Type': 'application/json'
                },
            };
            
            var canceladosquery = await axios(config)    
            .then( response => response.data.data)
            .catch(function (error) {
                if(error.response.status === 404) {
                    return {ESTUDIANTES__sum:0}
                }
                else {
                    return error.response
                }
            });
            let aux = canceladosEstratoSegundoSemestre
            aux['estrato'+i]= canceladosquery.ESTUDIANTES__sum 
            await setCanceladosEstratoSegundoSemestre(
                aux
                )
            
        }
        setLoadingEstrato(false)
    }

    const getDataCanceladosColegio = async() =>{ 
        var tiposColegio= ['None','Oficial','Privado']
        var axios = require('axios');
        let aux = canceladosColegio
        for (var tipo = 0;tipo<3;tipo++){
            for (var year = 2010;year <= actualYear;year++){
                var config = {
                    method: 'get',
                    url: 'http://localhost:8000/api/tendencia_count?VAR=Cancelado&TIPO_COLEGIO='+tiposColegio[tipo]+'&COD_PERIODO='+ year,
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                };
                var canceladosquery = await axios(config)    
                .then( response => response.data.data)
                .catch(function (error) {
                    if(error.response.status === 404) {
                        return {ESTUDIANTES__sum:0}
                    }
                    else {
                        return error.response
                    }
                });
               aux[tiposColegio[tipo]+ year]= canceladosquery.ESTUDIANTES__sum 
            }
            await setCanceladosColegio(
                aux
                )
        }
        setLoadingColegio(false)
    }


    React.useEffect(async () => { 
        await getDataCanceladosPrimerSemestre()
        await getDataCanceladosSegundoSemestre()
    }, [yearSelected])


    React.useEffect(async () => { 
        await getDataCanceladosSexoPrimerSemestre()
        await getDataCanceladosSexoSegundoSemestre()
    },[yearSelectedSexo])

    React.useEffect(async () => { 
        await getDataCanceladosEstratoPrimerSemestre()
        await getDataCanceladosEstratoSegundoSemestre()
    },[yearSelectedEstrato])

    React.useEffect(async () => { await getDataCanceladosColegio()})



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
    const togglePieChartCanceladosSexoPrimer = (e)=>{
        setCollapsePieChartCanceladosSexoPrimer(!collapsePieChartCanceladosSexoPrimer);
        e.preventDefault();
    }
    const togglePieChartCanceladosSexoSegundo = (e)=>{
        setCollapsePieChartCanceladosSexoSegundo(!collapsePieChartCanceladosSexoSegundo);
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
        setCanceladosSexoPrimerSemestre([])
        setCanceladosSexoSegundoSemestre([])
    }
    const handleChangeYearLineChartEstrato = async (event) =>  {
        await setYearSelectedEstrato(event.target.value);
        await setLoadingEstrato(true);
    }
    

    // despues de definir las constantes 
    useSingleton(async () => {
        await getYears();    
        await getDataCanceladosPrimerSemestre()
        await getDataCanceladosSegundoSemestre()
        await getDataCanceladosSexoPrimerSemestre()
        await getDataCanceladosSexoSegundoSemestre()
        await getDataCanceladosEstratoPrimerSemestre()
        await getDataCanceladosEstratoSegundoSemestre()
        await getDataCanceladosColegio()
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
                <p>
                En la siguientes tablas y gráficos se muestran la información de Cancelados de forma histórica agrupado por periodo académico, sexo biológico,colegio de procedencia y tipo de estrato socioeconómico.
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
                                <CCol md="3">
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
                                        onClick={togglePieChartCanceladosSexoPrimer}
                                        className={'mb-1'}
                                    >{yearSelectedSexo + '-1'}
                                    </CButton>
                                    <CButton
                                        color="outline-primary"
                                        onClick={togglePieChartCanceladosSexoSegundo} 
                                        className={'mb-1'}
                                    >{yearSelectedSexo + '-2'}
                                    </CButton>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol xs={6}>
                                <CCollapse show={collapsePieChartCanceladosSexoPrimer}>  
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
                                            data: [canceladosSexoPrimerSemestre.masculino,canceladosSexoPrimerSemestre.femenino]
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
                                <CCollapse show={collapsePieChartCanceladosSexoSegundo}>  
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
                                                data: [canceladosSexoSegundoSemestre.masculino,canceladosSexoSegundoSemestre.femenino]
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
                                                canceladosEstratoPrimerSemestre.estrato0,
                                                canceladosEstratoPrimerSemestre.estrato1,
                                                canceladosEstratoPrimerSemestre.estrato2,
                                                canceladosEstratoPrimerSemestre.estrato3,
                                                canceladosEstratoPrimerSemestre.estrato4,
                                                canceladosEstratoPrimerSemestre.estrato5,
                                                canceladosEstratoPrimerSemestre.estrato6,
                                            ]
                                        },
                                        {
                                            label: yearSelectedEstrato+'-2',
                                            backgroundColor: '#0096d2',
                                            data: [
                                                canceladosEstratoSegundoSemestre.estrato0,
                                                canceladosEstratoSegundoSemestre.estrato1,
                                                canceladosEstratoSegundoSemestre.estrato2,
                                                canceladosEstratoSegundoSemestre.estrato3,
                                                canceladosEstratoSegundoSemestre.estrato4,
                                                canceladosEstratoSegundoSemestre.estrato5,
                                                canceladosEstratoSegundoSemestre.estrato6,
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
                                    {loadingColegio? <div class="spinner-border text-info" role="status">
                                        <span class="sr-only">Loading...</span>
                                        </div> :
                                    <CChartLine
                                        datasets={[
                                        {   
                                            label: 'Na',
                                            fill:false,
                                            borderColor: 'Red',
                                            backgroundColor: 'Red',
                                            data: [
                                                canceladosColegio.None2010,
                                                canceladosColegio.None2011,
                                                canceladosColegio.None2012,
                                                canceladosColegio.None2013,
                                                canceladosColegio.None2014,
                                                canceladosColegio.None2015,
                                                canceladosColegio.None2016,
                                                canceladosColegio.None2017,
                                                canceladosColegio.None2018,
                                                canceladosColegio.None2019,
                                                canceladosColegio.None2020,
                                                canceladosColegio.None2021,
                                            ]
                                        },
                                        {
                                            label: 'Oficial',
                                            backgroundColor: 'Green',
                                            fill:false,
                                            borderColor: 'Green',
                                            data: [
                                                canceladosColegio.Oficial2010,
                                                canceladosColegio.Oficial2011,
                                                canceladosColegio.Oficial2012,
                                                canceladosColegio.Oficial2013,
                                                canceladosColegio.Oficial2014,
                                                canceladosColegio.Oficial2015,
                                                canceladosColegio.Oficial2016,
                                                canceladosColegio.Oficial2017,
                                                canceladosColegio.Oficial2018,
                                                canceladosColegio.Oficial2019,
                                                canceladosColegio.Oficial2020,
                                                canceladosColegio.Oficial2021,
                                            ]
                                        },
                                        {
                                            label: 'Privado',
                                            backgroundColor: 'Blue',
                                            borderColor: 'Blue',
                                            fill:false,
                                            data: [
                                                canceladosColegio.Privado2010,
                                                canceladosColegio.Privado2011,
                                                canceladosColegio.Privado2012,
                                                canceladosColegio.Privado2013,
                                                canceladosColegio.Privado2014,
                                                canceladosColegio.Privado2015,
                                                canceladosColegio.Privado2016,
                                                canceladosColegio.Privado2017,
                                                canceladosColegio.Privado2018,
                                                canceladosColegio.Privado2019,
                                                canceladosColegio.Privado2020,
                                                canceladosColegio.Privado2021,
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
                                    }
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

export default Cancelados