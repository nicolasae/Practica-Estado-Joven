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
import { MultiSelect } from "react-multi-select-component";

  // hook personalizado
const useSingleton = (callBack = () => { }) => { const hasBeenCalled = React.useRef(false);     if (hasBeenCalled.current) return;     callBack();     hasBeenCalled.current = true; }

const Matriculados = () =>{
    // constantes
    const actualYear = new Date().getFullYear()
    const [yearsData,setYearsData] = React.useState([])
    const [yearsDataSemestre,setYearsDataSemestre] = React.useState([])
    const [collapseGeneral, setCollapseGeneral] = useState(false)
    const [collapseSexo, setCollapseSexo] = useState(false)
    const [collapseEstrato, setCollapseEstrato] = useState(false)
    const [collapseColegio, setCollapseColegio] = useState(false)

    // Constantes general
    const [yearSelected, setYearSelected] = React.useState(new Date().getFullYear())
    const [matriculadosPrimer, setMatriculadosPrimer] = React.useState([])
    const [collapseTablaMatriculadosPrimer, setCollapseTablaMatriculadosPrimer] = useState(false)
    const fieldsMatriculados = ['COD_PERIODO','ESTUDIANTES','ESTRATO','SEXO','TIPO_INSCRIPCION','TIPO_COLEGIO']
    const [matriculadosSegundo, setMatriculadosSegundo] = React.useState([])
    const [collapseTablaMatriculadosSegundo, setCollapseTablaMatriculadosSegundo] = useState(false)
    // Constantes sexo
    const [yearSelectedSexo, setYearSelectedSexo] = React.useState(new Date().getFullYear())
    const [matriculadosSexoPrimerSemestre, setMatriculadosSexoPrimerSemestre] = React.useState({masculino:0,femenino:0})
    const [matriculadosSexoSegundoSemestre, setMatriculadosSexoSegundoSemestre] = React.useState({masculino:0,femenino:0})
    const [collapsePieChartMatriculadosSexoPrimer, setCollapsePieChartMatriculadosSexoPrimer] = useState(false)
    const [collapsePieChartMatriculadosSexoSegundo, setCollapsePieChartMatriculadosSexoSegundo] = useState(false)
    // Constantes segun estrato
    const [yearSelectedEstrato, setYearSelectedEstrato] = React.useState(new Date().getFullYear())
    const [collapseLineChartEstrato, setCollapseLineChartEstrato] = useState(false)
    const fieldsEstrato = ['Estrato 0','Estrato I','Estrato II','Estrato III','Estrato IV','Estrato V','Estrato VI']
    const [matriculadosEstratoPrimerSemestre, setMatriculadosEstratoPrimerSemestre] = React.useState()
    const [matriculadosEstratoSegundoSemestre, setMatriculadosEstratoSegundoSemestre] = React.useState()
    const [loadingEstrato, setLoadingEstrato] = React.useState(false)
    // Constantes segun colegio 
    const [collapseLineChartColegio, setCollapseLineChartColegio] = useState(false)
    const [matriculadosColegio, setMatriculadosColegio] = React.useState({})
    const [loadingColegio, setLoadingColegio] = React.useState(true)
     // Constantes segun tipo de inscripcion
     const [collapseInscripcion, setCollapseInscripcion] = useState(false)
     const[inscripcionFields,setInscripcionFields] = React.useState()
     const [inscripcionList,setInscripcionList] = React.useState()
     const [inscripcionSelected,setInscripcionSelected] = useState([])
     const [loadingInscripcion, setLoadingInscripcion] = React.useState(true)
     const [dataTipoInscripcion,setDataTipoInscripcion] = React.useState()
     const [loadingTipoInscripcion, setLoadingTipoInscripcion] = React.useState(true)
     const [collapseTipoInscripcion, setCollapseTipoInscripcion] = useState(false)
     const [opcionesMultiSelect,setOpcionesMultiSelect] =  React.useState([])
     const [dataSetTipoInscripcion,setDataSetTipoInscripcion] = React.useState([])


    // Funciones 
    const getYears = async() => { 
        for (var i=2010;i<=actualYear; i++){
            yearsData.push(i)
            yearsDataSemestre.push(i+'-1')
            yearsDataSemestre.push(i+'-2')
        }
        setYearsData(yearsData)
        setYearsDataSemestre(yearsDataSemestre)
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
        var estratos = ['None','I','II','III','IV','V','VI']
        var axios = require('axios');
        var aux = []
        for (var i = 0;i<7;i++){
            var config = {
                method: 'get',
                url: 'http://localhost:8000/api/tendencia_count?VAR=Matriculado&ESTRATO='+estratos[i]+'&COD_PERIODO='+ yearSelectedEstrato +'-1',
                headers: { 
                    'Content-Type': 'application/json'
                },
            };
            let matriculadosQuery = await axios(config)    
            .then( response => response.data.data)
            .catch(function (error) {
                if(error.response.status === 404) {
                    
                    return {ESTUDIANTES__sum:0}
                }
                else {
                    return error.response
                }
            });
            aux.push(matriculadosQuery.ESTUDIANTES__sum)
        }
        await setMatriculadosEstratoPrimerSemestre(aux)
    }

    const getDataMatriculadosEstratoSegundoSemestre = async() =>{ 
        var estratos = ['None','I','II','III','IV','V','VI']
        var axios = require('axios');   
        var aux = []      
        for (var i = 0;i<7;i++){
            var config = {
                method: 'get',
                url: 'http://localhost:8000/api/tendencia_count?VAR=Matriculado&ESTRATO='+estratos[i]+'&COD_PERIODO='+ yearSelectedEstrato +'-2',
                headers: { 
                    'Content-Type': 'application/json'
                },
            };
            
            var matriculadosQuery = await axios(config)    
            .then( response => response.data.data)
            .catch(function (error) {
                if(error.response.status === 404) {
                    return {ESTUDIANTES__sum:0}
                }
                else {
                    return error.response
                }
            });
            aux.push(matriculadosQuery.ESTUDIANTES__sum)
        }
        await setMatriculadosEstratoSegundoSemestre(aux)
        setLoadingEstrato(false)
    }

    const getDataMatriculadosColegio = async() =>{ 
        var tiposColegio= ['None','Oficial','Privado']
        var axios = require('axios');
        var aux = {}
        var aux2 = []
        for (var tipo = 0;tipo<3;tipo++){
            for (var year = 2010;year <= actualYear;year++){
                var config = {
                    method: 'get',
                    url: 'http://localhost:8000/api/tendencia_count?VAR=Matriculado&TIPO_COLEGIO='+tiposColegio[tipo]+'&COD_PERIODO='+ year,
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                };
                var matriculadosQuery = await axios(config)    
                .then( response => response.data.data)
                .catch(function (error) {
                    if(error.response.status === 404) {
                        return {ESTUDIANTES__sum:0}
                    }
                    else {
                        return error.response
                    }
                });
                aux2.push(matriculadosQuery.ESTUDIANTES__sum)
            }
            aux[tiposColegio[tipo]] = aux2
            aux2 = []
        }
        await setMatriculadosColegio(aux)
        setLoadingColegio(false)
    }

    const getDataMatriculadosList = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/tendencia?VAR=Matriculado',
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
        var aux = []
        for ( const i in matriculadosquery){
            if((matriculadosquery[i]['TIPO_INSCRIPCION']!== null) ){
                aux.push(matriculadosquery[i]['TIPO_INSCRIPCION'])
            }
        }
        var array = new Set(aux);
        var result = [...array];
        await setInscripcionFields(result);
        let aux2 = [];
        for (const j in result){ 
            aux2.push(
                {
                    label: result[j],
                    value: result[j],
                }
            )
        }
        await setInscripcionList(aux2);
        await setLoadingInscripcion(false)
    }
    const getDataTipoInscripcion= async () => {
       
        for (const i in inscripcionSelected){
            opcionesMultiSelect.push(inscripcionSelected[i].value)
        }
        setOpcionesMultiSelect(opcionesMultiSelect)
        console.log(opcionesMultiSelect)
        setOpcionesMultiSelect([])
        var axios = require('axios');
        var aux = yearsDataSemestre;
        for (var opcion = 0;opcion< opcionesMultiSelect.length;opcion++){
            var config = {
                method: 'get',
                url: 'http://localhost:8000/api/tendencia_count_year?VAR=Matriculado&TIPO_INSCRIPCION='+ opcionesMultiSelect[opcion],
                headers: { 
                    'Content-Type': 'application/json'
                },
            };
            var query = await axios(config)    
            .then( response => response.data.data)
            .catch(function (error) {
                if(error.response.status === 404) {
                    return {count:0}
                }
                else {
                    return error.response
                }
            });
            let aux2 = []
            for (const j in yearsDataSemestre ){
                for (const k in query){
                    if (yearsDataSemestre[j] === query[k].year){
                        aux2[j] = query[k].count
                    }
                }
            }
            for (const k in yearsDataSemestre){
                if(!aux2[k]){
                    aux2[k] = 0;
                }
            }
            aux[opcionesMultiSelect[opcion]] = aux2
            aux2 = []
        }
        console.log(aux)
        await setDataTipoInscripcion(aux)
        await setLoadingTipoInscripcion(false)        
        let dataSet  = []
        for (const i in opcionesMultiSelect){
            let color = Math.random()*255
            let color1 = Math.random()*255
            let color2 = Math.random()*255
            dataSet.push({
                label: opcionesMultiSelect[i],
                fill:false,
                borderColor: "rgba("+color+","+color1+","+color2+")",
                backgroundColor: "rgba("+color+","+color1+","+color2+")",
                data: aux[opcionesMultiSelect[i]]
            })
        }
        setDataSetTipoInscripcion(dataSet)
    }

    React.useEffect(async () => { 
        await getDataMatriculadosPrimerSemestre()
        await getDataMatriculadosSegundoSemestre()
    }, [yearSelected])


    React.useEffect(async () => { 
        await getDataMatriculadosSexoPrimerSemestre()
        await getDataMatriculadosSexoSegundoSemestre()
    },[yearSelectedSexo])

    React.useEffect(async () => { 
        await getDataMatriculadosEstratoPrimerSemestre()
        await getDataMatriculadosEstratoSegundoSemestre()
    },[yearSelectedEstrato])

    // React.useEffect(async () => { await getDataMatriculadosColegio()})



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
    const toggleInscripcion = (e)=>{
        setCollapseInscripcion(!collapseInscripcion);
        setCollapseGeneral(false);
        setCollapseSexo(false);
        setCollapseEstrato(false);
        setCollapseColegio(false);
        e.preventDefault();
    }

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
    const togglePieChartMatriculadosSexoPrimer = (e)=>{
        setCollapsePieChartMatriculadosSexoPrimer(!collapsePieChartMatriculadosSexoPrimer);
        e.preventDefault();
    }
    const togglePieChartMatriculadosSexoSegundo = (e)=>{
        setCollapsePieChartMatriculadosSexoSegundo(!collapsePieChartMatriculadosSexoSegundo);
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

    const toggleTipoInscripcion = (e)=>{
        setCollapseTipoInscripcion(!collapseTipoInscripcion);
        getDataTipoInscripcion();
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
    const handleChangeYearLineChartEstrato = async (event) =>  {
        await setYearSelectedEstrato(event.target.value);
        await setLoadingEstrato(true);
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
        await getDataMatriculadosColegio()
        await getDataMatriculadosList();

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
                <p>
                En la siguientes tablas y gráficos se muestran la información de Matriculados de forma histórica agrupado por periodo académico, sexo biológico,colegio de procedencia y tipo de estrato socioeconómico.
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
                    <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                        <CButton block variant="outline" color="info" onClick={toggleInscripcion}
                            >Según Inscripción
                        </CButton>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
        <CRow>
            <CCol xs="12" lg="12">
                <CCollapse show={collapseGeneral}>
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
                            <CFormGroup row>
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
                                            data: matriculadosEstratoPrimerSemestre
                                        },
                                        {
                                            label: yearSelectedEstrato+'-2',
                                            backgroundColor: '#0096d2',
                                            data: matriculadosEstratoSegundoSemestre                                           
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
                                                data: matriculadosColegio['None']
                                            },
                                            {
                                                label: 'Oficial',
                                                backgroundColor: 'Green',
                                                fill:false,
                                                borderColor: 'Green',
                                                data: matriculadosColegio['Oficial']                                               
                                            },
                                            {
                                                label: 'Privado',
                                                backgroundColor: 'Blue',
                                                borderColor: 'Blue',
                                                fill:false,
                                                data: matriculadosColegio['Privado']
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
            <CCol xs="12" lg="12">
                <CCollapse show={collapseInscripcion}>
                    <CCard>
                        <h1 style={{textAlign: 'center', fontWeight:'bold'}}>
                            Tendencia según tipo de inscripción:
                        </h1>
                        {loadingInscripcion?
                            <div class="spinner-border text-info" role="status" style={{align: 'center'}}>
                                <span class="sr-only">Loading...</span>
                            </div> :
                            <CFormGroup row>
                                <CCol md="3"></CCol>
                                <CCol md="4">
                                    <MultiSelect
                                        options={inscripcionList}
                                        value={inscripcionSelected}
                                        onChange={setInscripcionSelected}
                                    />
                                </CCol>
                                <CCol md="3">
                                    <CButton
                                        color="outline-info"
                                        onClick={toggleTipoInscripcion}
                                        className={'mb-1'}
                                    >Graficar
                                    </CButton>
                                </CCol>                                
                            </CFormGroup>
                        }
                        <CCollapse show={collapseTipoInscripcion}>  
                            <CCardBody>
                                {loadingTipoInscripcion? <div class="spinner-border text-info" role="status">
                                    <span class="sr-only">Loading...</span>
                                    </div> :
                                    
                                    <CChartLine
                                        datasets={dataSetTipoInscripcion}
                                        options={{
                                        tooltips: {
                                            enabled: true
                                        }
                                        
                                        }}
                                        labels= {yearsDataSemestre} 
                                    />
                                }
                            </CCardBody>
                        </CCollapse>
                    </CCard>
                </CCollapse>
            </CCol>                       
        </CRow>
        </>
    )
}

export default Matriculados