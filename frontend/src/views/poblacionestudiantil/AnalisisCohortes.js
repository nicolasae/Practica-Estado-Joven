import React,{ useState } from "react";
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
    CButtonGroup,
    CButtonToolbar,
    CFormGroup,
    CLabel,
    CSelect,
    CWidgetDropdown,

  } from "@coreui/react";
  
  import {
      CChartBar,
      CChartLine,
      CChartPie,
    } from '@coreui/react-chartjs'

 // hook personalizado
 const useSingleton = (callBack = () => { }) => { const hasBeenCalled = React.useRef(false);     if (hasBeenCalled.current) return;     callBack();     hasBeenCalled.current = true; }

 const AnalisisCohorte = () =>{
    // CONSTANTES GENERALES
    const actualYear = new Date().getFullYear()
    const [yearsData,setYearsData] = React.useState([])
    const [yearsDataSemestre,setYearsDataSemestre] = React.useState([])
    const [programasDataPregrado,setProgramasDataPregrado] = React.useState([])
    const [programasDataPosgrado,setProgramasDataPosgrado] = React.useState([])
    const listPregrado = [
        {
            COD_UTP:'28',
            NIVEL:'Pregrado',
            NOMBRE:'Ingeniería de Sistemas y Computación'
        },
        {
            COD_UTP:'FV28',
            NIVEL:'Pregrado',
            NOMBRE:'Ingeniería de Sistemas y Computación (Básicos ingeniería)'
        },
        {
            COD_UTP:'28C',
            NIVEL:'Pregrado',
            NOMBRE:'Ingeniería de Sistemas y Computación (Convenio Cuba)'
        },
        {
            COD_UTP:'37',
            NIVEL:'Pregrado',
            NOMBRE:'Ingeniería de Sistemas y Computación (Nocturno)'
        },
        {
            COD_UTP:'12',
            NIVEL:'Pregrado',
            NOMBRE:'Ingeniería Eléctrica'
        },
        {
            COD_UTP:'FV12',
            NIVEL:'Pregrado',
            NOMBRE:'Ingeniería Eléctrica (Básicos ingeniería))'
        },
        {
            COD_UTP:'FI',
            NIVEL:'Pregrado',
            NOMBRE:'Ingeniería Electrónica (Diurna)'
        },
        {
            COD_UTP:'36',
            NIVEL:'Pregrado',
            NOMBRE:'Ingeniería Electrónica (Nocturno)'
        },
        {
            COD_UTP:'34',
            NIVEL:'Pregrado',
            NOMBRE:'Ingeniería Física'
        },
        {
            COD_UTP:'FV34',
            NIVEL:'Pregrado',
            NOMBRE:'Ingeniería Física (Básicos ingenieria)'
        },
        {
            COD_UTP:'TS',
            NIVEL:'Pregrado',
            NOMBRE:'Tecnología en Desarrollo de Software'
        },
        {
            COD_UTP:'DV',
            NIVEL:'Posgrado',
            NOMBRE:'Doctorado en Ingeniería'
        },
        {
            COD_UTP:'AT',
            NIVEL:'Posgrado',
            NOMBRE:'Especialización en Electrónica Digital'
        },
        {
            COD_UTP:'AZ',
            NIVEL:'Posgrado',
            NOMBRE:'Especialización en Redes de Datos'
        },
        {
            COD_UTP:'AY',
            NIVEL:'Posgrado',
            NOMBRE:'Maestría en Ingeniería de Sistemas y Computación'
        },
        {
            COD_UTP:'47',
            NIVEL:'Posgrado',
            NOMBRE:'Maestría en Ingeniería Eléctrica'
        },
    ]
    const [collapseGeneralPosgrado, setCollapseGeneralPosgrado] = useState(false)
    const [collapseGeneralPregrado, setCollapseGeneralPregrado] = useState(false)

    // PREGRADO
    const fieldsTablePregrado = ["COD_UTP","NOMBRE","COD_PERIODO","ESTADO","CANTIDAD"]
    // VARIABLES INFORMACIÓN GENERAL
    const [yearSelectedPregrado, setYearSelectedPregrado] = React.useState(new Date().getFullYear())
    const [collapseTablePregrado,setCollapseTablePregrado]= useState(false)
    const [collapsePregradoAnual, setCollapsePregradoAnual] = useState(false)
    const [collapsePregradoPrimerSemestre, setCollapsePregradoPrimerSemestre] = useState(false)
    const [collapsePregradoSegundoSemestre, setCollapsePregradoSegundoSemestre] = useState(false)
    const [dataTablePregrado,setDataTablePregrado]= useState([])
    const [dataWidgetPregrado,setDataWidgetPregrado] = React.useState([])
    const [dataWidgetPregradoPrimer,setDataWidgetPregradoPrimer] = React.useState([])
    const [dataWidgetPregradoSegundo,setDataWidgetPregradoSegundo] = React.useState([])
    // VARIABLES INFORMACIÓN POR PROGRAMA ACADÉMICO
    const [programaSelectedPregrado, setProgramaSelectedPregrado] = React.useState('Ingeniería de Sistemas y Computación')
    const [collapseGraficoSemestrePregrado,  setCollapseGraficoSemestrePregrado] = useState(false)
    const [yearSelectedSemestrePregrado, setYearSelectedSemestrePregrado] = React.useState(new Date().getFullYear())
    const [collapseGraficoAnualPregrado,  setCollapseGraficoAnualPregrado] = useState(false)
    const [dataPieChartPregradoGeneral,setDataPieChartPregradoGeneral] = React.useState({})
    const [dataPieChartPregradoPrimer,setDataPieChartPregradoPrimer] = React.useState({})
    const [dataPieChartPregradoSegundo,setDataPieChartPregradoSegundo] = React.useState({})
    const [dataYearsPregrado, setDataYearsPregrado] = React.useState()
    // LOADING
    const [loadingGeneralPregrado, setLoadingGeneralPregrado] = useState(true)
    const [loadingGraficoSemestrePregrado, setLoadingGraficoSemestrePregrado] = useState(true)
    const [loadingGraficoAnualPregrado, setLoadingGraficoAnualPregrado] = useState(true)

    // POSGRADO
    const fieldsTablePosgrado = ["COD_UTP","NOMBRE","COD_PERIODO","ESTADO","CANTIDAD"]
    // VARIABLES INFORMACIÓN GENERAL
    const [yearSelectedPosgrado, setYearSelectedPosgrado] = React.useState(new Date().getFullYear())
    const [collapseTablePosgrado,setCollapseTablePosgrado]= useState(false)
    const [collapsePosgradoAnual, setCollapsePosgradoAnual] = useState(false)
    const [collapsePosgradoPrimerSemestre, setCollapsePosgradoPrimerSemestre] = useState(false)
    const [collapsePosgradoSegundoSemestre, setCollapsePosgradoSegundoSemestre] = useState(false)
    const [dataTablePosgrado,setDataTablePosgrado]= useState([])
    const [dataWidgetPosgrado,setDataWidgetPosgrado] = React.useState([])
    const [dataWidgetPosgradoPrimer,setDataWidgetPosgradoPrimer] = React.useState([])
    const [dataWidgetPosgradoSegundo,setDataWidgetPosgradoSegundo] = React.useState([])
    // VARIABLES INFORMACIÓN POR PROGRAMA ACADÉMICO
    const [programaSelectedPosgrado, setProgramaSelectedPosgrado] = React.useState('Doctorado en Ingenierías')
    const [collapseGraficoSemestrePosgrado,  setCollapseGraficoSemestrePosgrado] = useState(false)
    const [yearSelectedSemestrePosgrado, setYearSelectedSemestrePosgrado] = React.useState(new Date().getFullYear())
    const [collapseGraficoAnualPosgrado,  setCollapseGraficoAnualPosgrado] = useState(false)
    const [dataPieChartPosgradoGeneral,setDataPieChartPosgradoGeneral] = React.useState({})
    const [dataPieChartPosgradoPrimer,setDataPieChartPosgradoPrimer] = React.useState({})
    const [dataPieChartPosgradoSegundo,setDataPieChartPosgradoSegundo] = React.useState({})
    const [dataYearsPosgrado, setDataYearsPosgrado] = React.useState()
    // LOADING
    const [loadingGeneralPosgrado, setLoadingGeneralPosgrado] = useState(true)
    const [loadingGraficoSemestrePosgrado, setLoadingGraficoSemestrePosgrado] = useState(true)
    const [loadingGraficoAnualPosgrado, setLoadingGraficoAnualPosgrado] = useState(true)

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
    const getProgramas = async() => { 
        const arrayPregrado = listPregrado.filter ( element => element.NIVEL === 'Pregrado');
        const arrayPosgrado = listPregrado.filter ( element => element.NIVEL === 'Posgrado');
        for (var i=0;i<arrayPregrado.length;i++){
            programasDataPregrado.push(arrayPregrado[i].NOMBRE)
        }
        for (var j=0;j<arrayPosgrado.length;j++){
            programasDataPosgrado.push(arrayPosgrado[j].NOMBRE)
        }
        await setProgramasDataPregrado(programasDataPregrado)
        await setProgramasDataPosgrado(programasDataPosgrado)
    }

    const getDataTablePregrado = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/analisiscohorte?NIVEL=Pregrado',
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
        await setDataTablePregrado(inscritosquery)
    }

    const getDataTablePosgrado = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/analisiscohorte?NIVEL=Posgrado',
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
        await setDataTablePosgrado(inscritosquery)
    }
    
    const getDataWidgetPregrado = async () => {
        var axios = require('axios');
        var estados = ['MATRICULADO','NO MATRICULADO','GRADUADO'];
        let aux = [];
        let aux2 = [];
        let aux3 = [];
        for (const i in estados){
            var config = {
            method: 'get',
            url: 'http://localhost:8000/api/analisiscohorte_count?COD_PERIODO='+ yearSelectedPregrado + '&NIVEL=Pregrado&ESTADO='+ estados[i] ,
            headers: { 
                'Content-Type': 'application/json'
            },
            };
            const query = await axios(config)    
            .then( response => response.data.data)
            .catch(function (error) {
                if(error.response.status === 404) {
                    return {CANTIDAD__sum:0}
                }
                else {
                    return error.response
                }
            });
            var configPrimer = {
                method: 'get',
                url: 'http://localhost:8000/api/analisiscohorte_count?COD_PERIODO='+ yearSelectedPregrado + '-1&NIVEL=Pregrado&ESTADO='+ estados[i] ,
                headers: { 
                    'Content-Type': 'application/json'
                },
                };
                const queryPrimer = await axios(configPrimer)    
                .then( response => response.data.data)
                .catch(function (error) {
                    if(error.response.status === 404) {
                        return {CANTIDAD__sum:0}
                    }
                    else {
                        return error.response
                    }
            });
            var configSegundo = {
                method: 'get',
                url: 'http://localhost:8000/api/analisiscohorte_count?COD_PERIODO='+ yearSelectedPregrado+'-2&NIVEL=Pregrado&ESTADO='+ estados[i] ,
                headers: { 
                    'Content-Type': 'application/json'
                },
                };
                const querySegundo = await axios(configSegundo)    
                .then( response => response.data.data)
                .catch(function (error) {
                    if(error.response.status === 404) {
                        return {CANTIDAD__sum:0}
                    }
                    else {
                        return error.response
                    }
            });
            aux[estados[i]] = query.CANTIDAD__sum
            aux2[estados[i]] = queryPrimer.CANTIDAD__sum
            aux3[estados[i]] = querySegundo.CANTIDAD__sum

        }
        await setDataWidgetPregrado(aux)
        await setDataWidgetPregradoPrimer(aux2)
        await setDataWidgetPregradoSegundo(aux3)
        await setLoadingGeneralPregrado(false)
    }

    const getDataWidgetPosgrado = async () => {
        var axios = require('axios');
        var estados = ['MATRICULADO','NO MATRICULADO','GRADUADO'];
        let aux = [];
        let aux2 = [];
        let aux3 = [];
        for (const i in estados){
            var config = {
            method: 'get',
            url: 'http://localhost:8000/api/analisiscohorte_count?COD_PERIODO='+ yearSelectedPosgrado + '&NIVEL=Posgrado&ESTADO='+ estados[i] ,
            headers: { 
                'Content-Type': 'application/json'
            },
            };
            const query = await axios(config)    
            .then( response => response.data.data)
            .catch(function (error) {
                if(error.response.status === 404) {
                    return {CANTIDAD__sum:0}
                }
                else {
                    return error.response
                }
            });
            var configPrimer = {
                method: 'get',
                url: 'http://localhost:8000/api/analisiscohorte_count?COD_PERIODO='+ yearSelectedPosgrado + '-1&NIVEL=Posgrado&ESTADO='+ estados[i] ,
                headers: { 
                    'Content-Type': 'application/json'
                },
                };
                const queryPrimer = await axios(configPrimer)    
                .then( response => response.data.data)
                .catch(function (error) {
                    if(error.response.status === 404) {
                        return {CANTIDAD__sum:0}
                    }
                    else {
                        return error.response
                    }
            });
            var configSegundo = {
                method: 'get',
                url: 'http://localhost:8000/api/analisiscohorte_count?COD_PERIODO='+ yearSelectedPosgrado+'-2&NIVEL=Posgrado&ESTADO='+ estados[i] ,
                headers: { 
                    'Content-Type': 'application/json'
                },
                };
                const querySegundo = await axios(configSegundo)    
                .then( response => response.data.data)
                .catch(function (error) {
                    if(error.response.status === 404) {
                        return {CANTIDAD__sum:0}
                    }
                    else {
                        return error.response
                    }
            });
            aux[estados[i]] = query.CANTIDAD__sum
            aux2[estados[i]] = queryPrimer.CANTIDAD__sum
            aux3[estados[i]] = querySegundo.CANTIDAD__sum

        }
        await setDataWidgetPosgrado(aux)
        await setDataWidgetPosgradoPrimer(aux2)
        await setDataWidgetPosgradoSegundo(aux3)
        await setLoadingGeneralPosgrado(false)
    }

    const getDataPieChartPregrado = async() =>{
        var axios = require('axios');
        var estados = ['MATRICULADO','NO MATRICULADO','GRADUADO'];
        let aux = [];
        let aux2 = [];
        let aux3 = [];
        for (const i in estados){
            var config = {
            method: 'get',
            url: 'http://localhost:8000/api/analisiscohorte_count?COD_PERIODO='+ yearSelectedSemestrePregrado + '&NIVEL=Pregrado&ESTADO='+ estados[i]+'&NOMBRE='+ programaSelectedPregrado ,
            headers: { 
                'Content-Type': 'application/json'
            },
            };
            const query = await axios(config)    
            .then( response => response.data.data)
            .catch(function (error) {
                if(error.response.status === 404) {
                    return {CANTIDAD__sum:0}
                }
                else {
                    return error.response
                }
            });
            var configPrimer = {
                method: 'get',
                url: 'http://localhost:8000/api/analisiscohorte_count?COD_PERIODO='+ yearSelectedSemestrePregrado + '-1&NIVEL=Pregrado&ESTADO='+ estados[i] +'&NOMBRE='+ programaSelectedPregrado  ,
                headers: { 
                    'Content-Type': 'application/json'
                },
                };
                const queryPrimer = await axios(configPrimer)    
                .then( response => response.data.data)
                .catch(function (error) {
                    if(error.response.status === 404) {
                        return {CANTIDAD__sum:0}
                    }
                    else {
                        return error.response
                    }
            });
            var configSegundo = {
                method: 'get',
                url: 'http://localhost:8000/api/analisiscohorte_count?COD_PERIODO='+ yearSelectedSemestrePregrado +'-2&NIVEL=Pregrado&ESTADO='+ estados[i] +'&NOMBRE='+ programaSelectedPregrado ,
                headers: { 
                    'Content-Type': 'application/json'
                },
                };
                const querySegundo = await axios(configSegundo)    
                .then( response => response.data.data)
                .catch(function (error) {
                    if(error.response.status === 404) {
                        return {CANTIDAD__sum:0}
                    }
                    else {
                        return error.response
                    }
            });
            aux[estados[i]] = query.CANTIDAD__sum
            aux2[estados[i]] = queryPrimer.CANTIDAD__sum
            aux3[estados[i]] = querySegundo.CANTIDAD__sum

        }
        console.log(aux)
        await setDataPieChartPregradoGeneral(aux)
        await setDataPieChartPregradoPrimer(aux2)
        await setDataPieChartPregradoSegundo(aux3)
        await setLoadingGraficoSemestrePregrado(false)
    }

    const getDataPieChartPosgrado = async() =>{
        var axios = require('axios');
        var estados = ['MATRICULADO','NO MATRICULADO','GRADUADO'];
        let aux = [];
        let aux2 = [];
        let aux3 = [];
        for (const i in estados){
            var config = {
            method: 'get',
            url: 'http://localhost:8000/api/analisiscohorte_count?COD_PERIODO='+ yearSelectedSemestrePosgrado + '&NIVEL=Posgrado&ESTADO='+ estados[i]+'&NOMBRE='+ programaSelectedPosgrado ,
            headers: { 
                'Content-Type': 'application/json'
            },
            };
            const query = await axios(config)    
            .then( response => response.data.data)
            .catch(function (error) {
                if(error.response.status === 404) {
                    return {CANTIDAD__sum:0}
                }
                else {
                    return error.response
                }
            });
            var configPrimer = {
                method: 'get',
                url: 'http://localhost:8000/api/analisiscohorte_count?COD_PERIODO='+ yearSelectedSemestrePosgrado + '-1&NIVEL=Posgrado&ESTADO='+ estados[i] +'&NOMBRE='+ programaSelectedPosgrado  ,
                headers: { 
                    'Content-Type': 'application/json'
                },
                };
                const queryPrimer = await axios(configPrimer)    
                .then( response => response.data.data)
                .catch(function (error) {
                    if(error.response.status === 404) {
                        return {CANTIDAD__sum:0}
                    }
                    else {
                        return error.response
                    }
            });
            var configSegundo = {
                method: 'get',
                url: 'http://localhost:8000/api/analisiscohorte_count?COD_PERIODO='+ yearSelectedSemestrePosgrado +'-2&NIVEL=Posgrado&ESTADO='+ estados[i] +'&NOMBRE='+ programaSelectedPosgrado ,
                headers: { 
                    'Content-Type': 'application/json'
                },
                };
                const querySegundo = await axios(configSegundo)    
                .then( response => response.data.data)
                .catch(function (error) {
                    if(error.response.status === 404) {
                        return {CANTIDAD__sum:0}
                    }
                    else {
                        return error.response
                    }
            });
            aux[estados[i]] = query.CANTIDAD__sum
            aux2[estados[i]] = queryPrimer.CANTIDAD__sum
            aux3[estados[i]] = querySegundo.CANTIDAD__sum

        }
        console.log(aux)
        await setDataPieChartPosgradoGeneral(aux)
        await setDataPieChartPosgradoPrimer(aux2)
        await setDataPieChartPosgradoSegundo(aux3)
        await setLoadingGraficoSemestrePosgrado(false)
    }
    
    const getDataAnualPregrado = async() =>{
        var axios = require('axios');
        let aux =  [];
        var estados = ['MATRICULADO','NO MATRICULADO','GRADUADO'];
        for (var estado in estados){
            var config = {
            method: 'get',
            url: 'http://localhost:8000/api/analisiscohorte_count_year?NIVEL=Posgrado&NOMBRE='+programaSelectedPregrado +'&ESTADO='+estados[estado],
            headers: { 
                'Content-Type': 'application/json'
            },
            };
            const query = await axios(config)    
            .then( response => response.data.data)
            .catch(function (error) {
                if(error.response.status === 404) {
                    return {CANTIDAD_Sum:0}
                }
                else {
                    return error.response
                }
            });
            let aux2 = []
            for (const j in yearsDataSemestre ){
                for (const k in query){
                    if (yearsDataSemestre[j] === query[k].year){
                        aux2.push(query[k].CANTIDAD_Sum)
                    }                                  
                }
                if (aux2.length <= j){
                    aux2.push(0)
                }
            }
            aux[estados[estado]] = aux2
            // console.log(aux2)
            aux2 = []
        }
        // console.log(aux)
        await setDataYearsPregrado(aux)
        await setLoadingGraficoAnualPregrado(false)
    }

    const getDataAnualPosgrado = async() =>{
        var axios = require('axios');
        let aux =  [];
        var estados = ['MATRICULADO','NO MATRICULADO','GRADUADO'];
        for (var estado in estados){
            var config = {
            method: 'get',
            url: 'http://localhost:8000/api/analisiscohorte_count_year?NIVEL=Posgrado&NOMBRE='+programaSelectedPosgrado +'&ESTADO='+estados[estado],
            headers: { 
                'Content-Type': 'application/json'
            },
            };
            const query = await axios(config)    
            .then( response => response.data.data)
            .catch(function (error) {
                if(error.response.status === 404) {
                    return {CANTIDAD_Sum:0}
                }
                else {
                    return error.response
                }
            });
            let aux2 = []
            for (const j in yearsDataSemestre ){
                for (const k in query){
                    if (yearsDataSemestre[j] === query[k].year){
                        aux2.push(query[k].CANTIDAD_Sum)
                    }                                  
                }
                if (aux2.length <= j){
                    aux2.push(0)
                }
            }
            aux[estados[estado]] = aux2
            // console.log(aux2)
            aux2 = []
        }
        // console.log(aux)
        await setDataYearsPosgrado(aux)
        await setLoadingGraficoAnualPosgrado(false)
    }

    React.useEffect(async () => { 
        await getDataTablePregrado()
        await getDataWidgetPregrado()
    }, [yearSelectedPregrado])

    React.useEffect(async () => { 
        await getDataPieChartPregrado()
    }, [programaSelectedPregrado])

    React.useEffect(async () => { 
        await getDataPieChartPregrado()
    },[yearSelectedSemestrePregrado])

    React.useEffect(async () => {
        await getDataAnualPregrado()
    },[programaSelectedPregrado])

    React.useEffect(async () => { 
        await getDataTablePosgrado()
        await getDataWidgetPosgrado()
    }, [yearSelectedPosgrado])

    React.useEffect(async () => { 
        await getDataPieChartPosgrado()
    }, [programaSelectedPosgrado])

    React.useEffect(async () => { 
        await getDataPieChartPosgrado()
    },[yearSelectedSemestrePosgrado])

    React.useEffect(async () => {
        await getDataAnualPosgrado()
    },[programaSelectedPosgrado])
    
    // Toggle General
    const toggleGeneralPosgrado = (e)=>{
        setCollapseGeneralPosgrado(!collapseGeneralPosgrado);
        setCollapseGeneralPregrado(false);
        e.preventDefault();
    }
    const toggleGeneralPregrado = (e)=>{
        setCollapseGeneralPregrado(!collapseGeneralPregrado);
        setCollapseGeneralPosgrado(false);
        e.preventDefault();
    }

    const togglePregradoAnual = (e)=>{
        setCollapsePregradoAnual(!collapsePregradoAnual);
        setCollapsePregradoSegundoSemestre(false);
        setCollapsePregradoPrimerSemestre(false);
        e.preventDefault();
    }
    const togglePregradoPrimerSemestre = (e)=>{
        setCollapsePregradoPrimerSemestre(!collapsePregradoPrimerSemestre);
        setCollapsePregradoAnual(false);
        setCollapsePregradoSegundoSemestre(false);
        e.preventDefault();
    }
    const togglePregradoSegundoSemestre = (e)=>{
        setCollapsePregradoSegundoSemestre(!collapsePregradoSegundoSemestre);
        setCollapsePregradoAnual(false);
        setCollapsePregradoPrimerSemestre(false);
        e.preventDefault();
    }

    const toggleTablePregrado = (e)=>{
        setCollapseTablePregrado(!collapseTablePregrado);
        e.preventDefault();
    }
  
    const toggleGraficoSemestrePregrado = (e)=>{
        setCollapseGraficoSemestrePregrado(!collapseGraficoSemestrePregrado);
        setCollapseGraficoAnualPregrado(false);
        e.preventDefault();
    }

    const toggleGraficoAnualPregrado = (e)=>{
        setCollapseGraficoAnualPregrado(!collapseGraficoAnualPregrado);
        setCollapseGraficoSemestrePregrado(false);
        e.preventDefault();
    }
    
    const togglePosgradoAnual = (e)=>{
        setCollapsePosgradoAnual(!collapsePosgradoAnual);
        setCollapsePosgradoSegundoSemestre(false);
        setCollapsePosgradoPrimerSemestre(false);
        e.preventDefault();
    }
    const togglePosgradoPrimerSemestre = (e)=>{
        setCollapsePosgradoPrimerSemestre(!collapsePosgradoPrimerSemestre);
        setCollapsePosgradoAnual(false);
        setCollapsePosgradoSegundoSemestre(false);
        e.preventDefault();
    }
    const togglePosgradoSegundoSemestre = (e)=>{
        setCollapsePosgradoSegundoSemestre(!collapsePosgradoSegundoSemestre);
        setCollapsePosgradoAnual(false);
        setCollapsePosgradoPrimerSemestre(false);
        e.preventDefault();
    }

    const toggleTablePosgrado = (e)=>{
        setCollapseTablePosgrado(!collapseTablePosgrado);
        e.preventDefault();
    }
  
    const toggleGraficoSemestrePosgrado = (e)=>{
        setCollapseGraficoSemestrePosgrado(!collapseGraficoSemestrePosgrado);
        setCollapseGraficoAnualPosgrado(false);
        e.preventDefault();
    }

    const toggleGraficoAnualPosgrado = (e)=>{
        setCollapseGraficoAnualPosgrado(!collapseGraficoAnualPosgrado);
        setCollapseGraficoSemestrePosgrado(false);
        e.preventDefault();
    }

    // HandleChanges
    // PREGRADO
    const handleChangeYearPregrado = async (event) =>  {
        setYearSelectedPregrado(event.target.value);
        await setLoadingGeneralPregrado(true)
    }

    const handleChangeProgramaPregrado = async (event) =>  {
        setProgramaSelectedPregrado(event.target.value);
        await setLoadingGraficoAnualPregrado(true)
    }

    const handleChangeYearSemestrePregrado = async (event) =>  {
        setYearSelectedSemestrePregrado(event.target.value);
    }

    // POSGRADO
    const handleChangeYearPosgrado = async (event) =>  {
        setYearSelectedPosgrado(event.target.value);
        await setLoadingGeneralPosgrado(true)
    }

    const handleChangeProgramaPosgrado = async (event) =>  {
        setProgramaSelectedPosgrado(event.target.value);
        await setLoadingGraficoAnualPosgrado(true)
    }

    const handleChangeYearSemestrePosgrado = async (event) =>  {
        setYearSelectedSemestrePosgrado(event.target.value);
    }


 // despues de definir las constantes 
    useSingleton(async () => {
        await getYears(); 
        await getProgramas();  
        await getDataTablePregrado();
        await getDataWidgetPregrado();
        await getDataPieChartPregrado();
        await getDataAnualPregrado();
        await getDataTablePosgrado();
        await getDataWidgetPosgrado();
        await getDataPieChartPosgrado();
        await getDataAnualPosgrado();

    });

    return(
        <>
        <h1 className="text-center" style={{fontWeight:'bold'}}>Análisis Cohortes</h1> 
        <CCard>
            <CCardBody>
                <p className="text-muted">
                    Elegir nivel de formación:
                </p>
                <CRow className="align-items-center">
                    <CCol >
                        <CButton block variant="outline" color="primary" onClick={toggleGeneralPregrado}
                            > Pregrado
                        </CButton>
                    </CCol>
                    <CCol >
                        <CButton block variant="outline" color="primary" onClick={toggleGeneralPosgrado }
                            >Posgrado
                        </CButton>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard> 

        <CRow>
            <CCol xs="12" lg="12">
                <CCollapse show={collapseGeneralPregrado}>
                    <CCard>
                        <h1 className="text-center" style={{fontWeight:'bold'}}>
                            Información General Pregrado:
                        </h1>
                        <div className="container mb-3">
                            <div className="row">
                                <div className="col-3"></div>
                                <div className="col-3">
                                    <CSelect style={{marginLeft:'5%'}}value={yearSelectedPregrado} onChange={handleChangeYearPregrado}>
                                        {yearsData.map(item => {
                                            return (<option key={item} value={item}>{item}</option>);
                                        })}
                                    </CSelect>
                                </div>
                                <div className="col-6">
                                    <CButtonGroup className="mr-2 align-items-center">
                                        <CButton
                                            color="outline-info"
                                            onClick={togglePregradoAnual} 
                                            className={'mb-1'}
                                        >{yearSelectedPregrado }
                                        </CButton>
                                        <CButton
                                            color="outline-info"
                                            onClick={togglePregradoPrimerSemestre} 
                                            className={'mb-1'}
                                        >{yearSelectedPregrado + '-1'}
                                        </CButton>
                                        <CButton
                                            color="outline-info"
                                            onClick={togglePregradoSegundoSemestre} 
                                            className={'mb-1'}
                                        >{yearSelectedPregrado + '-2'}
                                        </CButton>
                                        <CButton
                                            color="outline-info"
                                            onClick={toggleTablePregrado} 
                                            className={'mb-1'}
                                        >Tabla
                                        </CButton>
                                    </CButtonGroup>
                                </div>
                            </div>
                        </div> 
                        <div>
                        {loadingGeneralPregrado? 
                            <div class="spinner-border text-info" role="status">
                                <span class="sr-only">Loading...</span>
                            </div> :
                            <div>
                                <div className="container b-1">
                                    <CCollapse show={collapsePregradoAnual}>
                                            <div>
                                                <h2 style={{textAlign: 'center', fontWeight:'bold'}}>
                                                    {yearSelectedPregrado}
                                                </h2>
                                                <div className="row ">
                                                    <div className="col">
                                                        <CWidgetDropdown
                                                            color="gradient-primary"
                                                            header={dataWidgetPregrado['MATRICULADO']}
                                                            text="Matriculados"
                                                        ></CWidgetDropdown>
                                                    </div>
                                                    <div className="col">
                                                            <CWidgetDropdown
                                                            color="gradient-success"
                                                            header={dataWidgetPregrado['NO MATRICULADO']}
                                                            text="No matriculados"
                                                            ></CWidgetDropdown>
                                                    </div>
                                                    <div className="col">
                                                        <CWidgetDropdown
                                                        color="gradient-warning"
                                                        header={dataWidgetPregrado['GRADUADO']}
                                                        text="Graduados"
                                                        ></CWidgetDropdown>
                                                    </div>
                                                </div>
                                            </div>
                                    </CCollapse>
                                </div>
                                <div className="container b-1">
                                    <CCollapse show={collapsePregradoPrimerSemestre}>
                                        <div>
                                            <h2 style={{textAlign: 'center', fontWeight:'bold'}}>
                                                {yearSelectedPregrado}-1
                                            </h2>
                                            <div className="row">
                                                <div className="col">
                                                    <CWidgetDropdown
                                                        color="gradient-primary"
                                                        header={dataWidgetPregradoPrimer['MATRICULADO']}
                                                        text="Matriculados"
                                                    ></CWidgetDropdown>
                                                </div>
                                                <div className="col">
                                                        <CWidgetDropdown
                                                        color="gradient-success"
                                                        header={dataWidgetPregradoPrimer['NO MATRICULADO']}
                                                        text="No matriculados"
                                                        ></CWidgetDropdown>
                                                </div>
                                                <div className="col">
                                                    <CWidgetDropdown
                                                    color="gradient-warning"
                                                    header={dataWidgetPregradoPrimer['GRADUADO']}
                                                    text="Graduados"
                                                    ></CWidgetDropdown>
                                                </div>
                                            </div>
                                        </div>
                                    </CCollapse>
                                </div>
                                <div className="container b-1">
                                    <CCollapse show={collapsePregradoSegundoSemestre}>
                                        <div>
                                            <h2 style={{textAlign: 'center', fontWeight:'bold'}}>
                                                {yearSelectedPregrado}-2
                                            </h2>
                                            <div className="row">
                                                <div className="col">
                                                    <CWidgetDropdown
                                                        color="gradient-primary"
                                                        header={dataWidgetPregradoSegundo['MATRICULADO']}
                                                        text="Matriculados"
                                                    ></CWidgetDropdown>
                                                </div>
                                                <div className="col">
                                                        <CWidgetDropdown
                                                        color="gradient-success"
                                                        header={dataWidgetPregradoSegundo['NO MATRICULADO']}
                                                        text="No matriculados"
                                                        ></CWidgetDropdown>
                                                </div>
                                                <div className="col">
                                                    <CWidgetDropdown
                                                    color="gradient-warning"
                                                    header={dataWidgetPregradoSegundo['GRADUADO']}
                                                    text="Graduados"
                                                    ></CWidgetDropdown>
                                                </div>
                                            </div>
                                        </div>
                                    </CCollapse>
                                </div>
                            </div>
                            }
                        </div>      
                        <div>
                            <CCollapse show={collapseTablePregrado}>
                                <CDataTable
                                    items={dataTablePregrado}
                                    fields={fieldsTablePregrado}
                                    itemsPerPage={5}
                                    pagination
                                    columnFilter
                                    striped 
                                />
                            </CCollapse>
                        </div>
                    </CCard>
                    <CCard>
                        <CCol xs="12" lg="12">
                            <h1 style={{textAlign: 'center', fontWeight:'bold'}}>
                                Información por Programa Académico:
                            </h1>
                            <div className="container mb-3">
                                <div className="row">
                                    <div className="col-1"></div>
                                    <div className="col-3">
                                        <CSelect style={{marginLeft:'5%'}}value={programaSelectedPregrado} onChange={handleChangeProgramaPregrado}>
                                            {programasDataPregrado.map(item => {
                                                return (<option key={item} value={item}>{item}</option>);
                                            })}
                                        </CSelect>
                                    </div>
                                    <div className="col-3">
                                        <CSelect value={yearSelectedSemestrePregrado} onChange={handleChangeYearSemestrePregrado}>
                                        {yearsData.map(item => {
                                            return (<option key={item} value={item}>{item}</option>);
                                        })}
                                        </CSelect>
                                    </div>
                                    <div className="col">
                                        <CButtonGroup className="mr-2 align-items-center">
                                            <CButton
                                                color="outline-success"
                                                onClick={toggleGraficoSemestrePregrado} 
                                                className={'mb-1'}
                                            >Gráfico Semestral
                                            </CButton>
                                            <CButton
                                                color="outline-success"
                                                onClick={toggleGraficoAnualPregrado} 
                                                className={'mb-1'}
                                            >Gráfico Anual
                                            </CButton>
                                        </CButtonGroup>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {loadingGraficoSemestrePregrado?
                                <div class="spinner-border text-info" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div> :
                                <div>
                                    <CCollapse show={collapseGraficoSemestrePregrado}>
                                            <CFormGroup row>
                                                <CCol xs={4}>
                                                    <CCard className="mt-3">
                                                    <CCardBody>
                                                        <h2 style={{textAlign: 'center',fontWeight:'bold'}}>{yearSelectedSemestrePregrado}</h2>
                                                        <CChartPie
                                                        datasets={[
                                                        {
                                                            backgroundColor: [
                                                            '#FFC300',
                                                            '#DB5858',
                                                            '#00ADEE',
                                                            ],
                                                            data: [
                                                                dataPieChartPregradoGeneral['MATRICULADO'],
                                                                dataPieChartPregradoGeneral['NO MATRICULADO'],
                                                                dataPieChartPregradoGeneral['GRADUADO']
                                                            ]
                                                        }
                                                        ]}
                                                        labels={['Matriculado','No Matriculado','Graduado']}
                                                        options={{
                                                        tooltips: {
                                                            enabled: true
                                                        }
                                                        }}
                                                        />

                                                    </CCardBody>
                                                    </CCard>
                                                </CCol>
                                                <CCol xs={4}>
                                                    <CCard className="mt-3">
                                                        <CCardBody>
                                                            <h2 style={{textAlign: 'center',fontWeight:'bold'}}>{yearSelectedSemestrePregrado + '-1'}</h2>
                                                            <CChartPie
                                                            datasets={[
                                                            {
                                                                backgroundColor: [
                                                                '#FFC300',
                                                                '#DB5858',
                                                                '#00ADEE',
                                                                ],
                                                                data: [
                                                                    dataPieChartPregradoPrimer['MATRICULADO'],
                                                                    dataPieChartPregradoPrimer['NO MATRICULADO'],
                                                                    dataPieChartPregradoPrimer['GRADUADO']
                                                                ]
                                                            }
                                                            ]}
                                                            labels={['Matriculado','No Matriculado','Graduado']}
                                                            options={{
                                                            tooltips: {
                                                                enabled: true
                                                            }
                                                            }}
                                                            />

                                                        </CCardBody>
                                                    </CCard>
                                                </CCol>
                                                <CCol xs={4}>
                                                    <CCard className="mt-3">
                                                        <CCardBody>
                                                            <h2 style={{textAlign: 'center',fontWeight:'bold'}}>{yearSelectedSemestrePregrado + '-2'}</h2>
                                                            <CChartPie
                                                            datasets={[
                                                            {
                                                                backgroundColor: [
                                                                '#FFC300',
                                                                '#DB5858',
                                                                '#00ADEE',
                                                                ],
                                                                data: [
                                                                    dataPieChartPregradoSegundo['MATRICULADO'],
                                                                    dataPieChartPregradoSegundo['NO MATRICULADO'],
                                                                    dataPieChartPregradoSegundo['GRADUADO']
                                                                ]
                                                            }
                                                            ]}
                                                            labels={['Matriculado','No Matriculado','Graduado']}
                                                            options={{
                                                            tooltips: {
                                                                enabled: true
                                                            }
                                                            }}
                                                            />

                                                        </CCardBody>
                                                    </CCard>
                                                </CCol>
                                            </CFormGroup>
                                    </CCollapse>
                                </div>
                                }
                            </div>

                            <div>   
                                <CCollapse show={collapseGraficoAnualPregrado}>
                                    <div>
                                    {loadingGraficoAnualPregrado?
                                        <div class="spinner-border text-info" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div> :
                                        <div>
                                            <CChartLine
                                                datasets={[
                                                {
                                                    label: "MATRICULADO",
                                                    fill: false,
                                                    borderColor: "#321fdb",
                                                    backgroundColor: "#321fdb",
                                                    data: dataYearsPregrado['MATRICULADO'],
                                                },
                                                {
                                                    label: "GRADUADO",
                                                    fill: false,
                                                    borderColor: "#2eb85c",
                                                    backgroundColor: "#2eb85c",
                                                    data: dataYearsPregrado['GRADUADO'],
                                                },
                                                {
                                                    label: "NO MATRICULADO",
                                                    fill: false,
                                                    borderColor: "#e55353",
                                                    backgroundColor: "#e55353",
                                                    data: dataYearsPregrado['NO MATRICULADO'],
                                                },
                                                ]}
                                                options={{
                                                tooltips: {
                                                    enabled: true,
                                                },
                                                }}
                                                labels={yearsDataSemestre}
                                            />

                                        </div>
                                    }
                                    </div>
                                </CCollapse>
                            </div>
                        </CCol>
                    </CCard>
                </CCollapse>
            </CCol>
            

            <CCol xs="12" lg="12">
                <CCollapse show={collapseGeneralPosgrado}>
                    <CCard>
                        <h1 className="text-center" style={{fontWeight:'bold'}}>
                            Información General Posgrado:
                        </h1>
                        <div className="container mb-3">
                            <div className="row">
                                <div className="col-3"></div>
                                <div className="col-3">
                                    <CSelect style={{marginLeft:'5%'}}value={yearSelectedPosgrado} onChange={handleChangeYearPosgrado}>
                                        {yearsData.map(item => {
                                            return (<option key={item} value={item}>{item}</option>);
                                        })}
                                    </CSelect>
                                </div>
                                <div className="col-6">
                                    <CButtonGroup className="mr-2 align-items-center">
                                        <CButton
                                            color="outline-info"
                                            onClick={togglePosgradoAnual} 
                                            className={'mb-1'}
                                        >{yearSelectedPosgrado }
                                        </CButton>
                                        <CButton
                                            color="outline-info"
                                            onClick={togglePosgradoPrimerSemestre} 
                                            className={'mb-1'}
                                        >{yearSelectedPosgrado + '-1'}
                                        </CButton>
                                        <CButton
                                            color="outline-info"
                                            onClick={togglePosgradoSegundoSemestre} 
                                            className={'mb-1'}
                                        >{yearSelectedPosgrado + '-2'}
                                        </CButton>
                                        <CButton
                                            color="outline-info"
                                            onClick={toggleTablePosgrado} 
                                            className={'mb-1'}
                                        >Tabla
                                        </CButton>
                                    </CButtonGroup>
                                </div>
                            </div>
                        </div> 
                        <div>
                        {loadingGeneralPosgrado? 
                            <div class="spinner-border text-info" role="status">
                                <span class="sr-only">Loading...</span>
                            </div> :
                            <div>
                                <div className="container b-1">
                                    <CCollapse show={collapsePosgradoAnual}>
                                            <div>
                                                <h2 style={{textAlign: 'center', fontWeight:'bold'}}>
                                                    {yearSelectedPosgrado}
                                                </h2>
                                                <div className="row ">
                                                    <div className="col">
                                                        <CWidgetDropdown
                                                            color="gradient-primary"
                                                            header={dataWidgetPosgrado['MATRICULADO']}
                                                            text="Matriculados"
                                                        ></CWidgetDropdown>
                                                    </div>
                                                    <div className="col">
                                                            <CWidgetDropdown
                                                            color="gradient-success"
                                                            header={dataWidgetPosgrado['NO MATRICULADO']}
                                                            text="No matriculados"
                                                            ></CWidgetDropdown>
                                                    </div>
                                                    <div className="col">
                                                        <CWidgetDropdown
                                                        color="gradient-warning"
                                                        header={dataWidgetPosgrado['GRADUADO']}
                                                        text="Graduados"
                                                        ></CWidgetDropdown>
                                                    </div>
                                                </div>
                                            </div>
                                    </CCollapse>
                                </div>
                                <div className="container b-1">
                                    <CCollapse show={collapsePosgradoPrimerSemestre}>
                                        <div>
                                            <h2 style={{textAlign: 'center', fontWeight:'bold'}}>
                                                {yearSelectedPosgrado}-1
                                            </h2>
                                            <div className="row">
                                                <div className="col">
                                                    <CWidgetDropdown
                                                        color="gradient-primary"
                                                        header={dataWidgetPosgradoPrimer['MATRICULADO']}
                                                        text="Matriculados"
                                                    ></CWidgetDropdown>
                                                </div>
                                                <div className="col">
                                                        <CWidgetDropdown
                                                        color="gradient-success"
                                                        header={dataWidgetPosgradoPrimer['NO MATRICULADO']}
                                                        text="No matriculados"
                                                        ></CWidgetDropdown>
                                                </div>
                                                <div className="col">
                                                    <CWidgetDropdown
                                                    color="gradient-warning"
                                                    header={dataWidgetPosgradoPrimer['GRADUADO']}
                                                    text="Graduados"
                                                    ></CWidgetDropdown>
                                                </div>
                                            </div>
                                        </div>
                                    </CCollapse>
                                </div>
                                <div className="container b-1">
                                    <CCollapse show={collapsePosgradoSegundoSemestre}>
                                        <div>
                                            <h2 style={{textAlign: 'center', fontWeight:'bold'}}>
                                                {yearSelectedPosgrado}-2
                                            </h2>
                                            <div className="row">
                                                <div className="col">
                                                    <CWidgetDropdown
                                                        color="gradient-primary"
                                                        header={dataWidgetPosgradoSegundo['MATRICULADO']}
                                                        text="Matriculados"
                                                    ></CWidgetDropdown>
                                                </div>
                                                <div className="col">
                                                        <CWidgetDropdown
                                                        color="gradient-success"
                                                        header={dataWidgetPosgradoSegundo['NO MATRICULADO']}
                                                        text="No matriculados"
                                                        ></CWidgetDropdown>
                                                </div>
                                                <div className="col">
                                                    <CWidgetDropdown
                                                    color="gradient-warning"
                                                    header={dataWidgetPosgradoSegundo['GRADUADO']}
                                                    text="Graduados"
                                                    ></CWidgetDropdown>
                                                </div>
                                            </div>
                                        </div>
                                    </CCollapse>
                                </div>
                            </div>
                            }
                        </div>      
                        <div>
                            <CCollapse show={collapseTablePosgrado}>
                                <CDataTable
                                    items={dataTablePosgrado}
                                    fields={fieldsTablePosgrado}
                                    itemsPerPage={5}
                                    pagination
                                    columnFilter
                                    striped 
                                />
                            </CCollapse>
                        </div>
                    </CCard>
                    <CCard>
                        <CCol xs="12" lg="12">
                            <h1 style={{textAlign: 'center', fontWeight:'bold'}}>
                                Información por Programa Académico:
                            </h1>
                            <div className="container mb-3">
                                <div className="row">
                                    <div className="col-1"></div>
                                    <div className="col-3">
                                        <CSelect style={{marginLeft:'5%'}}value={programaSelectedPosgrado} onChange={handleChangeProgramaPosgrado}>
                                            {programasDataPosgrado.map(item => {
                                                return (<option key={item} value={item}>{item}</option>);
                                            })}
                                        </CSelect>
                                    </div>
                                    <div className="col-3">
                                        <CSelect value={yearSelectedSemestrePosgrado} onChange={handleChangeYearSemestrePosgrado}>
                                        {yearsData.map(item => {
                                            return (<option key={item} value={item}>{item}</option>);
                                        })}
                                        </CSelect>
                                    </div>
                                    <div className="col">
                                        <CButtonGroup className="mr-2 align-items-center">
                                            <CButton
                                                color="outline-success"
                                                onClick={toggleGraficoSemestrePosgrado} 
                                                className={'mb-1'}
                                            >Gráfico Semestral
                                            </CButton>
                                            <CButton
                                                color="outline-success"
                                                onClick={toggleGraficoAnualPosgrado} 
                                                className={'mb-1'}
                                            >Gráfico Anual
                                            </CButton>
                                        </CButtonGroup>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {loadingGraficoSemestrePosgrado?
                                <div class="spinner-border text-info" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div> :
                                <div>
                                    <CCollapse show={collapseGraficoSemestrePosgrado}>
                                            <CFormGroup row>
                                                <CCol xs={4}>
                                                    <CCard className="mt-3">
                                                    <CCardBody>
                                                        <h2 style={{textAlign: 'center',fontWeight:'bold'}}>{yearSelectedSemestrePosgrado}</h2>
                                                        <CChartPie
                                                        datasets={[
                                                        {
                                                            backgroundColor: [
                                                            '#FFC300',
                                                            '#DB5858',
                                                            '#00ADEE',
                                                            ],
                                                            data: [
                                                                dataPieChartPosgradoGeneral['MATRICULADO'],
                                                                dataPieChartPosgradoGeneral['NO MATRICULADO'],
                                                                dataPieChartPosgradoGeneral['GRADUADO']
                                                            ]
                                                        }
                                                        ]}
                                                        labels={['Matriculado','No Matriculado','Graduado']}
                                                        options={{
                                                        tooltips: {
                                                            enabled: true
                                                        }
                                                        }}
                                                        />

                                                    </CCardBody>
                                                    </CCard>
                                                </CCol>
                                                <CCol xs={4}>
                                                    <CCard className="mt-3">
                                                        <CCardBody>
                                                            <h2 style={{textAlign: 'center',fontWeight:'bold'}}>{yearSelectedSemestrePosgrado + '-1'}</h2>
                                                            <CChartPie
                                                            datasets={[
                                                            {
                                                                backgroundColor: [
                                                                '#FFC300',
                                                                '#DB5858',
                                                                '#00ADEE',
                                                                ],
                                                                data: [
                                                                    dataPieChartPosgradoPrimer['MATRICULADO'],
                                                                    dataPieChartPosgradoPrimer['NO MATRICULADO'],
                                                                    dataPieChartPosgradoPrimer['GRADUADO']
                                                                ]
                                                            }
                                                            ]}
                                                            labels={['Matriculado','No Matriculado','Graduado']}
                                                            options={{
                                                            tooltips: {
                                                                enabled: true
                                                            }
                                                            }}
                                                            />

                                                        </CCardBody>
                                                    </CCard>
                                                </CCol>
                                                <CCol xs={4}>
                                                    <CCard className="mt-3">
                                                        <CCardBody>
                                                            <h2 style={{textAlign: 'center',fontWeight:'bold'}}>{yearSelectedSemestrePosgrado + '-2'}</h2>
                                                            <CChartPie
                                                            datasets={[
                                                            {
                                                                backgroundColor: [
                                                                '#FFC300',
                                                                '#DB5858',
                                                                '#00ADEE',
                                                                ],
                                                                data: [
                                                                    dataPieChartPosgradoSegundo['MATRICULADO'],
                                                                    dataPieChartPosgradoSegundo['NO MATRICULADO'],
                                                                    dataPieChartPosgradoSegundo['GRADUADO']
                                                                ]
                                                            }
                                                            ]}
                                                            labels={['Matriculado','No Matriculado','Graduado']}
                                                            options={{
                                                            tooltips: {
                                                                enabled: true
                                                            }
                                                            }}
                                                            />

                                                        </CCardBody>
                                                    </CCard>
                                                </CCol>
                                            </CFormGroup>
                                    </CCollapse>
                                </div>
                                }
                            </div>

                            <div>   
                                <CCollapse show={collapseGraficoAnualPosgrado}>
                                    <div>
                                    {loadingGraficoAnualPosgrado?
                                        <div class="spinner-border text-info" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div> :
                                        <div>
                                            <CChartLine
                                                datasets={[
                                                {
                                                    label: "MATRICULADO",
                                                    fill: false,
                                                    borderColor: "#321fdb",
                                                    backgroundColor: "#321fdb",
                                                    data: dataYearsPosgrado['MATRICULADO'],
                                                },
                                                {
                                                    label: "GRADUADO",
                                                    fill: false,
                                                    borderColor: "#2eb85c",
                                                    backgroundColor: "#2eb85c",
                                                    data: dataYearsPosgrado['GRADUADO'],
                                                },
                                                {
                                                    label: "NO MATRICULADO",
                                                    fill: false,
                                                    borderColor: "#e55353",
                                                    backgroundColor: "#e55353",
                                                    data: dataYearsPosgrado['NO MATRICULADO'],
                                                },
                                                ]}
                                                options={{
                                                tooltips: {
                                                    enabled: true,
                                                },
                                                }}
                                                labels={yearsDataSemestre}
                                            />

                                        </div>
                                    }
                                    </div>
                                </CCollapse>
                            </div>
                        </CCol>
                    </CCard>
                </CCollapse>
            </CCol>



        
        </CRow>
        </> 
    )    
}

export default AnalisisCohorte