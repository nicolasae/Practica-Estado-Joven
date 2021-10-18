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
    const [inscritosEstratoPrimerSemestre, setInscritosEstratoPrimerSemestre] = React.useState({})
    const [inscritosEstratoSegundoSemestre, setInscritosEstratoSegundoSemestre] = React.useState({})
    const [loadingEstrato, setLoadingEstrato] = React.useState(false)
    // Constantes segun colegio 
    const [yearSelectedColegio, setYearSelectedColegio] = React.useState(new Date().getFullYear())
    const [collapseLineChartColegio, setCollapseLineChartColegio] = useState(false)

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
        var estratos = ['None','I','II','III','IV','V','VI']
        var axios = require('axios');
        for (var i = 0;i<7;i++){
            var config = {
                method: 'get',
                url: 'http://localhost:8000/api/tendencia_count?VAR=Inscrito&ESTRATO='+estratos[i]+'&COD_PERIODO='+ yearSelectedEstrato +'-1',
                headers: { 
                    'Content-Type': 'application/json'
                },
            };
            let inscritosquery = await axios(config)    
            .then( response => response.data.data)
            .catch(function (error) {
                if(error.response.status === 404) {
                    
                    return {ESTUDIANTES__sum:0}
                }
                else {
                    return error.response
                }
            });
            let aux = inscritosEstratoPrimerSemestre
            aux['estrato'+i]= inscritosquery.ESTUDIANTES__sum 
            await setInscritosEstratoPrimerSemestre(
                // {...inscritosEstratoPrimerSemestre,['estrato'+i]: inscritosquery.ESTUDIANTES__sum}
                aux
                )
        }

    }

    const getDataInscritosEstratoSegundoSemestre = async() =>{ 
        var estratos = ['None','I','II','III','IV','V','VI']
        var axios = require('axios'); 
        
        for (var i = 0;i<7;i++){
            var config = {
                method: 'get',
                url: 'http://localhost:8000/api/tendencia_count?VAR=Inscrito&ESTRATO='+estratos[i]+'&COD_PERIODO='+ yearSelectedEstrato +'-2',
                headers: { 
                    'Content-Type': 'application/json'
                },
            };
            
            var inscritosquery = await axios(config)    
            .then( response => response.data.data)
            .catch(function (error) {
                if(error.response.status === 404) {
                    return {ESTUDIANTES__sum:0}
                }
                else {
                    return error.response
                }
            });
            let aux = inscritosEstratoSegundoSemestre
            aux['estrato'+i]= inscritosquery.ESTUDIANTES__sum 
            await setInscritosEstratoSegundoSemestre(
                // {...inscritosEstratoSegundoSemestre,['estrato'+i]: inscritosquery.ESTUDIANTES__sum}
                aux
                )
          
        }
        setLoadingEstrato(false)
    }



    React.useEffect(async () => { await getDataInscritosPrimerSemestre()}, [yearSelected])
    React.useEffect(async () => { await getDataInscritosSegundoSemestre()}, [yearSelected])

    React.useEffect(async () => { await getDataInscritosSexoPrimerSemestre()},[yearSelectedSexo])
    React.useEffect(async () => { await getDataInscritosSexoSegundoSemestre()},[yearSelectedSexo])

    React.useEffect(async () => { 
        await getDataInscritosEstratoPrimerSemestre()
        await getDataInscritosEstratoSegundoSemestre()
    },[yearSelectedEstrato])


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
    const toggleLineChartColegio = (e)=>{
        setCollapseLineChartColegio(!collapseLineChartColegio);
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
        await setYearSelectedEstrato(event.target.value);
        await setLoadingEstrato(true);
    }
    const handleChangeYearLineChartColegio = async (event) =>  {
        setYearSelectedColegio(event.target.value);
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
                                }
                            </CCardBody>
                        </CCollapse>
                    </CCardHeader>
                </CCard>
            </CCol>                            
            <CCol xs="12" lg="12">
                <CCard>
                    <h1 style={{textAlign: 'center', fontWeight:'bold'}}>
                        Tendencia según colegio:
                    </h1>
                    <CCardHeader>
                        <CLabel >Año:</CLabel>
                        <CFormGroup row>
                            <CCol md="3">
                                <CSelect value={yearSelectedColegio} onChange={handleChangeYearLineChartColegio}>
                                    {yearsData.map(item => {
                                        return (<option key={item} value={item}>{item}</option>);
                                    })}
                                </CSelect>
                            </CCol>
                            <CCol md="3">
                                <CButton
                                    color="outline-primary"
                                    onClick={toggleLineChartColegio}
                                    className={'mb-1'}
                                >Graficar
                                </CButton>
                            </CCol>
                        </CFormGroup>
                        <CCollapse show={collapseLineChartColegio}>  
                            <CCardBody>
                                <CChartLine
                                    datasets={[
                                    {
                                        label: 'Na',
                                        backgroundColor: 'rgb(228,102,81,0.9)',
                                        data: [30, 39, 10, 50, 30, 70, 35]
                                    },
                                    {
                                        label: 'Oficial',
                                        backgroundColor: 'rgb(0,216,255,0.9)',
                                        data: [39, 80, 40, 35, 40, 20, 45]
                                    },
                                    {
                                        label: 'Privado',
                                        backgroundColor: 'rgb(0,236,225)',
                                        data: [39, 80, 40, 32, 49, 23, 45]
                                    }
                                    ]}
                                    options={{
                                    tooltips: {
                                        enabled: true
                                    }
                                    }}
                                    labels="months"
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