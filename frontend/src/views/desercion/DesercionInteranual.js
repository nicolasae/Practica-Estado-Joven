import React,{ useState } from "react";
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
    CDataTable,
    CCollapse,
    CButton,
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

 const DesercionInteranual = () =>{
    // constantes
    const actualYear = new Date().getFullYear()
    const [yearsDataSemestre,setYearsDataSemestre] = React.useState([])
    const [yearsData,setYearsData] = React.useState([])
    const [yearSelected, setYearSelected] = React.useState(2019);
    const [collapseGeneral, setCollapseGeneral] = useState(false);
    const [dataTablaDIA, setDataTablaDIA] = useState([])
    const fieldsTablaDIA = ['COD_PERIODO','NOMBRE','DURACION_SEMESTRES','ESTADO','CANTIDAD']
    const [collapseProgramas, setCollapseProgramas] = useState(false);
    const [dataYearsGeneral, setDataYearsGeneral] = React.useState({})
    
    const [dataYearsWidgetPregrado, setDataYearsWidgetPregrado] = React.useState([])
    const [dataPorcentajeYearsWidgetPregrado, setDataPorcentajeYearsWidgetPregrado] = React.useState([]);
    const [dataYearsWidgetPosgrado, setDataYearsWidgetPosgrado] = React.useState([])
    const [dataPorcentajeYearsWidgetPosgrado, setDataPorcentajeYearsWidgetPosgrado] = React.useState([]);
    const [loadingPorcentajePregrado, setLoadingPorcentajePregrado] = useState(true)
    const [loadingPorcentajePosgrado, setLoadingPorcentajePosgrado] = useState(true)
    const [collapseDIAAnual,setCollapseDIAAnual] = useState(false);
    const [collapseGrafAnualPregrado,setCollapseGrafAnualPregrado] = useState(false);
    const [collapseGrafAnualPosgrado,setCollapseGrafAnualPosgrado] = useState(false);
    const [collapseProgramasPregrado,setCollapseProgramasPregrado] = useState(false);
    const [collapseProgramasPosgrado,setCollapseProgramasPosgrado] = useState(false);
    const fieldsTablaProgramas = [
        'COD_PERIODO',
        'NOMBRE',
        'NO_MATRICULADO',
        'PERMANECE_PROGRAMA',
        'CAMBIO_DE_PROGRAMA',
        'GRADUADO',
        'PORCENTAJE_NO_MATRICULADO',
        'PORCENTAJE_PERMANECE_PROGRAMA',
        'PORCENTAJE_CAMBIO_DE_PROGRAMA',
        'PORCENTAJE_GRADUADO',
        'TOTAL'
    ]
    const [tablaProgramasPregrado,setTablaProgramasPregrado] = React.useState([]);
    const [tablaProgramasPosgrado,setTablaProgramasPosgrado] = React.useState([]);
    const [listProgramasPregrado,setListProgramasPregrado] = React.useState([]);
    const [listProgramasPosgrado,setListProgramasPosgrado] = React.useState([]);
    const [programaSelectedPregrado, setProgramaSelectedPregrado] = React.useState('Ingeniería de Sistemas y Computación');
    const [programaSelectedPosgrado, setProgramaSelectedPosgrado] = React.useState('Doctorado en Ingeniería');
    const [collapsePregradoGrafico,setCollapsePregradoGrafico] = useState(false);
    const [collapsePosgradoGrafico,setCollapsePosgradoGrafico] = useState(false);
    const [dataYearsPregrado, setDataYearsPregrado] = React.useState()
    const [loadingYearsPregrado, setLoadingYearsPregrado] = React.useState(true)
    const [dataYearsPosgrado, setDataYearsPosgrado] = React.useState()
    const [loadingYearsPosgrado, setLoadingYearsPosgrado] = React.useState(true)



    // Funciones
    const getYears = async() => { 
        for (var i=2010;i<=actualYear-1; i++){
            yearsDataSemestre.push(i+'-1')
            yearsDataSemestre.push(i+'-2')
            yearsData.push(i)
        }
        setYearsData(yearsData)
        setYearsDataSemestre(yearsDataSemestre)
    }

    const getDataTablaDIA = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/desercionDIA',
        headers: { 
            'Content-Type': 'application/json'
        },
        };
        const dataQuery = await axios(config)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        await setDataTablaDIA(dataQuery)
    }

    const getDataYearsGeneral = async() =>{ 
        var estados= ['Graduado','No matriculado','Cambio de programa','Permanece programa']
        var axios = require('axios');
        var aux = {}
        var aux2 = []        
        for (var estado = 0;estado<estados.length;estado++){
            for (var year = 2010;year <= actualYear-1;year++){
                var config = {
                method: 'get',
                url: 'http://localhost:8000/api/desercionDIA_count?&COD_PERIODO='+year+'&ESTADO='+estados[estado],
                headers: { 
                    'Content-Type': 'application/json'
                },
                };
                const dataQuery = await axios(config)    
                .then( response => response.data.data)
                .catch(function (error) {
                    if(error.response.status === 404) {
                        return {CANTIDAD__sum:0}
                    }
                    else {
                        return error.response
                    }
                });
                aux2.push(dataQuery.CANTIDAD__sum)
            }
            aux[estados[estado]] = aux2
            aux2 = []
        }
        await setDataYearsGeneral(aux)
    }

    const getDataYearWidgetPregrado = async () => {
        var axios = require('axios');
        var estados = ['Graduado','Cambio de programa','Permanece programa','No matriculado']
        var aux = []
        var suma = 0
        for (var estado=0; estado < estados.length; estado++) {
            var config = {
            method: 'get',
            url: 'http://localhost:8000/api/desercionDIA_count?NIVEL=Pregrado&COD_PERIODO='+yearSelected+'&ESTADO='+estados[estado],
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
            aux[estados[estado]] = Number(query.CANTIDAD__sum);
            suma += query.CANTIDAD__sum
        }
        aux['suma']= suma   
        await setDataYearsWidgetPregrado(aux)
        await widgetPregrado();
    }

    const getDataYearWidgetPosgrado = async () => {
        var axios = require('axios');
        var estados = ['Graduado','Cambio de programa','Permanece programa','No matriculado']
        var aux = []
        var suma = 0
        for (var estado=0; estado < estados.length; estado++) {
            var config = {
            method: 'get',
            url: 'http://localhost:8000/api/desercionDIA_count?NIVEL=Posgrado&COD_PERIODO='+yearSelected+'&ESTADO='+estados[estado],
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
            aux[estados[estado]] = Number(query.CANTIDAD__sum);
            suma += query.CANTIDAD__sum
        }
        aux['suma']= suma   
        await setDataYearsWidgetPosgrado(aux)
        await widgetPosgrado();
    }

    const widgetPregrado= async () => {
        let total = Number(dataYearsWidgetPregrado['suma'])
        let permanece = ((dataYearsWidgetPregrado['Permanece programa'])/total).toFixed(3);
        let cambio = ((dataYearsWidgetPregrado['Cambio de programa'])/total).toFixed(3);
        let graduado = ((dataYearsWidgetPregrado['Graduado'])/total).toFixed(3);
        let no_matriculado = ((dataYearsWidgetPregrado['No matriculado'])/total).toFixed(3);
        let porcentajes_list = {}
        porcentajes_list = {
            permanece_porcentaje:(permanece*100).toFixed(1),
            cambio_porcentaje:(cambio*100).toFixed(1),
            graduado_porcentaje:(graduado*100).toFixed(1),
            no_matriculado_porcentaje:(no_matriculado*100).toFixed(1),
        }
        await setDataPorcentajeYearsWidgetPregrado(porcentajes_list)
        await setLoadingPorcentajePregrado(false)      
    }

    const widgetPosgrado= async () => {
        let total = Number(dataYearsWidgetPosgrado['suma'])
        let permanece = ((dataYearsWidgetPosgrado['Permanece programa'])/total).toFixed(3);
        let cambio = ((dataYearsWidgetPosgrado['Cambio de programa'])/total).toFixed(3);
        let graduado = ((dataYearsWidgetPosgrado['Graduado'])/total).toFixed(3);
        let no_matriculado = ((dataYearsWidgetPosgrado['No matriculado'])/total).toFixed(3);
        let porcentajes_list = {}
        porcentajes_list = {
            permanece_porcentaje:(permanece*100).toFixed(1),
            cambio_porcentaje:(cambio*100).toFixed(1),
            graduado_porcentaje:(graduado*100).toFixed(1),
            no_matriculado_porcentaje:(no_matriculado*100).toFixed(1),
        }
        await setDataPorcentajeYearsWidgetPosgrado(porcentajes_list)
        await setLoadingPorcentajePosgrado(false)      
    }

    const getDataTablaProgramasPregrado = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/desercionDIA_estados?NIVEL=Pregrado',
        headers: { 
            'Content-Type': 'application/json'
        },
        };
        const dataQuery = await axios(config)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        await setTablaProgramasPregrado(dataQuery)

    }
    const getDataTablaProgramasPosgrado = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/desercionDIA_estados?NIVEL=Posgrado',
        headers: { 
            'Content-Type': 'application/json'
        },
        };
        const dataQuery = await axios(config)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        await setTablaProgramasPosgrado(dataQuery)        
    }

    const getListProgramas = async () => {
        var axios = require('axios');
        var config = {
            method: 'get',
            url: 'http://localhost:8000/api/desercionDIA_estados?NIVEL=Pregrado',
            headers: { 
                'Content-Type': 'application/json'
            },
        };
        var config1 = {
            method: 'get',
            url: 'http://localhost:8000/api/desercionDIA_estados?NIVEL=Posgrado',
            headers: { 
                'Content-Type': 'application/json'
            },
        };
        const dataQueryPregrado = await axios(config)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        const dataQueryPosgrado = await axios(config1)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        var aux = []
        var aux2 = []
        for (var pos in dataQueryPregrado) {
            aux.push(dataQueryPregrado[pos].NOMBRE)
        }
        for (var pos2 in dataQueryPosgrado) {
            aux2.push(dataQueryPosgrado[pos2].NOMBRE)
        }
        var listPregrado = ([...new Set(aux)])
        var listPosgrado = ([...new Set(aux2)])
        setListProgramasPregrado(listPregrado)
        setListProgramasPosgrado(listPosgrado)
    }
    
    const getDataPorProgramaPregrado = async() =>{
        var axios = require('axios');
        let aux =  yearsData
        var estados= ['Graduado','No matriculado','Cambio de programa','Permanece programa']
        for (var estado in estados){
            var config = {
            method: 'get',
            url: 'http://localhost:8000/api/desercionDIA_count_year?NIVEL=Pregrado&NOMBRE='+programaSelectedPregrado+'&ESTADO='+estados[estado],
            headers: { 
                'Content-Type': 'application/json'
            },
            };
            const query = await axios(config)    
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
                        aux2.push(query[k].count)
                    }                                  
                }
                if (aux2.length <= j){
                    aux2.push(0)
                }
            }
            aux[estados[estado]] = aux2
            aux2 = []
        }
        // console.log(aux)
        await setDataYearsPregrado(aux)
        await setLoadingYearsPregrado(false)
    }
    const getDataPorProgramaPosgrado = async() =>{
        var axios = require('axios');
        let aux =  yearsData
        var estados= ['Graduado','No matriculado','Cambio de programa','Permanece programa']
        for (var estado = 0;estado<estados.length;estado++){
            var config = {
            method: 'get',
            url: 'http://localhost:8000/api/desercionDIA_count_year?NIVEL=Posgrado&NOMBRE='+programaSelectedPosgrado+'&ESTADO='+estados[estado],
            headers: { 
                'Content-Type': 'application/json'
            },
            };
            const query = await axios(config)    
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
                        aux2.push(query[k].count)
                    }                                  
                }
                if (aux2.length <= j){
                    aux2.push(0)
                }
            }
            aux[estados[estado]] = aux2
            aux2 = []
        }
        console.log(aux)
        await setDataYearsPosgrado(aux)
        await setLoadingYearsPosgrado(false)
    }
  
    React.useEffect(async () => { 
        await getDataYearWidgetPregrado()
        await getDataYearWidgetPosgrado()
    },[yearSelected])

    React.useEffect(async () => {
        await getDataPorProgramaPregrado()
    },[programaSelectedPregrado])

    React.useEffect(async () => {
        await getDataPorProgramaPosgrado()
    },[programaSelectedPosgrado])

    const handleChangeYear = async (event) => {
        setYearSelected(event.target.value);
        await setLoadingPorcentajePregrado(true)
        await setLoadingPorcentajePosgrado(true)
    };
    const handleChangeProgramaPregrado = async (event) => {
        setProgramaSelectedPregrado(event.target.value);
        await setLoadingYearsPregrado(true);

    };   
    const handleChangeProgramaPosgrado = async (event) => {
        setProgramaSelectedPosgrado(event.target.value);
        await setLoadingYearsPosgrado(true)
    };    

    const toggleGeneral = (e)=>{
        setCollapseGeneral(!collapseGeneral);
        setCollapseProgramas(false);
        setCollapseDIAAnual(false);
        e.preventDefault();
    }
    const toggleProgramas = (e)=>{
        setCollapseProgramas(!collapseProgramas);
        setCollapseGeneral(false);
        setCollapseDIAAnual(false);
        e.preventDefault();
    }
    
    const toggleAnual = (e)=>{
        setCollapseDIAAnual(!collapseDIAAnual);
        setCollapseGeneral(false);
        setCollapseProgramas(false);
        e.preventDefault();
    }

    const toggleGraficoAnualPregrado= (e)=>{
        setCollapseGrafAnualPregrado(!collapseGrafAnualPregrado);
        setCollapseGrafAnualPosgrado(false);
        e.preventDefault();
    }
    const toggleGraficoAnualPosgrado= (e)=>{
        setCollapseGrafAnualPosgrado(!collapseGrafAnualPosgrado);
        setCollapseGrafAnualPregrado(false);
        e.preventDefault();
    }

    const toggleProgramasPregrado= (e)=>{
        setCollapseProgramasPregrado(!collapseProgramasPregrado);
        setCollapseProgramasPosgrado(false);
        e.preventDefault();
    }
    const toggleProgramasPosgrado= (e)=>{
        setCollapseProgramasPosgrado(!collapseProgramasPosgrado);
        setCollapseProgramasPregrado(false);
        e.preventDefault();
    }

    const togglePregradoGrafico = (e)=>{
        setCollapsePregradoGrafico(!collapsePregradoGrafico);
        setCollapsePosgradoGrafico(false);
        e.preventDefault();
    }
    const togglePosgradoGrafico = (e)=>{
        setCollapsePosgradoGrafico(!collapsePosgradoGrafico);
        setCollapsePregradoGrafico(false)
        e.preventDefault();
    }

    // despues de definir las constantes
    useSingleton(async () => {
        await getYears();
        await getDataTablaDIA();
        await getDataYearsGeneral();
        await getDataYearWidgetPregrado(); 
        await setYearSelected(2020)   
        await getDataTablaProgramasPregrado();      
        await getDataTablaProgramasPosgrado(); 
        await getListProgramas();
        await getDataPorProgramaPosgrado();  

    });

    return(
        <>
        <h1 style={{textAlign: 'center', fontWeight:'bold'}}>Deserción Interanual</h1>  
        <CCard>
            <CCardBody>
                <p className="text-muted">
                Para tener en cuenta:
                </p>
                <p className="muted">
                    <b>Definición: </b>La deserción interanual representa el porcentaje de 
                    estudiantes matriculados en un periodo académico que se ausentan de la 
                    institución durante dos periodos consecutivos.
                </p>
                    El ministerio de Educación Nacional define este porcentaje: 
                    <b> No matriculados / (Matrícula total del semestre)</b> teniendo en cuenta
                    las siguientes consideraciones:
                <p>
                <p></p>
                    <b>Período base (n): </b>Período para el cuál se está calculando la deserción.
                <p></p>
                    <b>Graduado: </b> Estudiante que esta matrículado en el período base <b>(n)</b>
                    que obtiene su título en el mismo período base <b>(n)</b>, o en alguno de los
                    semestres siguientes <b>(n+1</b>o <b>n+2)</b> Nota: Este valor no coincide con el
                    total de graduados en un período, porque se toman 3 períodos de observación
                    <b>(n,n+1</b> y <b>n+2)</b>.
                <p></p>
                    <b>Permanece Programa: </b>Estudiantes que estaba matriculado en <b>n </b> y está 
                    matriculado en el periodo <b>n+1 </b>o <b>n+2</b> sin cambiar de programa académico.
                <p></p>
                    <b>Cambio de  Programa: </b>Estudiantes que estaba matriculado en <b>n </b> y está 
                    matriculado en el periodo <b>n+1 </b>o <b>n+2</b> en otro programa académico
                <p></p>
                    <b>No matriculado: </b>Estudiantes que estaba matriculado en <b>n </b> y no aparece con
                    estado Graduado o Permanece programa o Cambio programa.
                </p>
            </CCardBody>
        </CCard>

        <CCard> 
            <div className="container">
                <h3 style={{textAlign: 'center', fontWeight:'bold'}}> Seleccione una de las siguientes opciones:</h3>           
                <div className="row " style={{marginTop:'2%',marginBottom:'2%'}} >                                                          
                    <div className="col justify-content-center" >
                        <CButton
                            color="outline-primary"
                            onClick={toggleGeneral} 
                            style={{marginLeft:'5%',marginRight:'3%'}}
                        >Mostrar Información Histórica
                        </CButton>  
                        <CButton
                            color="outline-success"
                            onClick={toggleAnual} 
                            style={{marginLeft:'5%',marginRight:'3%'}}
                        >Mostrar Información Anual
                        </CButton>  
                        <CButton
                            color="outline-info"
                            onClick={toggleProgramas} 
                            style={{marginLeft:'5%',marginRight:'3%'}}
                        >Mostrar Información por Programa
                        </CButton>
                    </div>                                          
                </div>
            </div>
        </CCard>
        <CCard>
            <CCollapse show={collapseGeneral}>
                
                    <CCardBody>
                        <h3 style={{textAlign: 'center', fontWeight:'bold'}}>
                            Tabla histórica de estudiantes por estado:
                        </h3>
                        <CDataTable
                            items={dataTablaDIA}
                            fields={fieldsTablaDIA}
                            itemsPerPage={6}
                            pagination
                            columnFilter
                            align='middle'
                            color='primary'
                            borderColor="dark"
                            bordered={true}
                        >  
                        </CDataTable>
                        <h3 style={{textAlign: 'center', fontWeight:'bold'}}>
                            Histórico deserción interanual : 
                        </h3>
                    <CCardBody>
                        <CChartLine
                        datasets={[
                        
                        {   
                            label: 'Graduado',
                            fill:false,
                            borderColor: 'Red',
                            backgroundColor: 'Red',
                            data: dataYearsGeneral['Graduado'],
                        },
                        {
                            label: 'Cambio de programa',
                            backgroundColor: 'Green',
                            fill:false,
                            borderColor: 'Green',
                            data: dataYearsGeneral['Cambio de programa']
                        },
                        {
                            label: 'No matriculado',
                            backgroundColor: 'Blue',
                            borderColor: 'Blue',
                            fill:false,
                            data: dataYearsGeneral['No matriculado']
                        },
                        {
                            label: 'Permanece programa',
                            backgroundColor: 'Yellow',
                            borderColor: 'Yellow',
                            fill:false,
                            data: dataYearsGeneral['Permanece programa']
                        },
                        ]}
                        options={{
                        tooltips: {
                            enabled: true
                        }                        
                        }}
                        labels= {yearsData}                        
                    />
                    </CCardBody>                    
                </CCardBody>
            </CCollapse>
            <CCollapse show={collapseDIAAnual}>               
                    <CCardBody>                       
                        <div className="container">
                        <h1 style={{marginTop:'3%',textAlign: 'center',color: '#2eb85c'}}>
                            Desercion Interanual Facultad de Ingenierías
                        </h1> 
                            <div className="row">
                                <div className="col-3"></div>
                                <div className="col-2">
                                    <CSelect value={yearSelected} onChange={handleChangeYear}>
                                        {yearsData.map(item => {
                                            return (<option key={item} value={item}>{item}</option>);
                                        })}
                                    </CSelect>    
                                </div>
                                <div className="col">
                                    <CButton
                                        color="outline-success"
                                        onClick={toggleGraficoAnualPregrado}                                         
                                        >Graficar Pregrado
                                    </CButton>
                                    <CButton
                                        color="outline-success"
                                        onClick={toggleGraficoAnualPosgrado} 
                                        style={{marginLeft:'2%'}}
                                        >Graficar Posgrado
                                    </CButton>
                                </div>
                                   
                            </div>
                        </div>
                        </CCardBody>
                        <CCollapse show={collapseGrafAnualPregrado}>
                            <CCardBody>
                                {loadingPorcentajePregrado? 
                                    <div class="spinner-border text-info" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div> :
                                    <div>
                                        <h2 style={{marginTop:'1%',textAlign: 'center'}}>
                                            Nivel elegido: 
                                        </h2>                           
                                        <h2 style={{color: '#2eb85c',textAlign: 'center'}}>
                                            Pregrado
                                        </h2>
                                        <h2 style={{marginTop:'1%',textAlign: 'center'}}>
                                            Desercion Período {yearSelected} 
                                        </h2>
                                        <CRow>
                                            <CCol lg="1"></CCol>
                                            <CCol sm="3" lg="2" >
                                                <CWidgetDropdown
                                                    color="gradient-primary"
                                                    header={dataPorcentajeYearsWidgetPregrado['permanece_porcentaje']+'%'}
                                                    text="Permanece en programa"
                                                ></CWidgetDropdown>
                                            </CCol>
                                            <CCol sm="3" lg="2">
                                                <CWidgetDropdown
                                                color="gradient-success"
                                                header={dataPorcentajeYearsWidgetPregrado['cambio_porcentaje']+'%'}
                                                text="Cambia de programa"
                                                ></CWidgetDropdown>
                                            </CCol>
                                            <CCol sm="3" lg="2" >
                                                <CWidgetDropdown
                                                color="gradient-warning"
                                                header={dataPorcentajeYearsWidgetPregrado['graduado_porcentaje']+'%'}
                                                text="Graduado"
                                                ></CWidgetDropdown>
                                            </CCol>
                                            <CCol sm="3" lg="2">
                                                <CWidgetDropdown
                                                color="gradient-danger"
                                                header={dataPorcentajeYearsWidgetPregrado['no_matriculado_porcentaje']+'%'}
                                                text="No Matriculado"
                                                ></CWidgetDropdown>
                                            </CCol>
                                            <CCol sm="3" lg="2">
                                                <CWidgetDropdown
                                                color="gradient-dark"
                                                header={dataYearsWidgetPregrado['suma']}
                                                text="Total Estudiantes"
                                                ></CWidgetDropdown>
                                            </CCol>
                                        </CRow>
                                        <CChartPie
                                            datasets={[
                                            {
                                                backgroundColor: [
                                                '#321fbd',
                                                '#39f',
                                                '#f9b115',
                                                '#e55353',
                                                ],
                                                data: [
                                                    dataYearsWidgetPregrado['Permanece programa'],
                                                    dataYearsWidgetPregrado['Cambio de programa'],
                                                    dataYearsWidgetPregrado['Graduado'],
                                                    dataYearsWidgetPregrado['No matriculado'],
                                                ]
                                            }
                                            ]}
                                            labels={['Permanece programa','Cambio de programa','Graduado','No matriculado']}
                                            options={{
                                            tooltips: {
                                                enabled: true
                                            }
                                            }}
                                        />                         
                                    </div>
                                    
                                }        
                            </CCardBody>
                        </CCollapse>
                        <CCollapse show={collapseGrafAnualPosgrado}>
                            <CCardBody>
                                {loadingPorcentajePosgrado? 
                                    <div class="spinner-border text-info" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div> :
                                    <div>
                                        <h2 style={{marginTop:'1%',textAlign: 'center'}}>
                                            Nivel elegido: 
                                        </h2>                           
                                        <h2 style={{color: '#2eb85c',textAlign: 'center'}}>
                                            Posgrado
                                        </h2>
                                        <h2 style={{marginTop:'1%',textAlign: 'center'}}>
                                            Desercion Período {yearSelected} 
                                        </h2>
                                        <CRow>
                                            <CCol lg="1"></CCol>
                                            <CCol sm="3" lg="2" >
                                                <CWidgetDropdown
                                                color="gradient-primary"
                                                header={dataPorcentajeYearsWidgetPosgrado['permanece_porcentaje']+'%'}
                                                text="Permanece en programa"
                                                ></CWidgetDropdown>
                                            </CCol>
                                            <CCol sm="3" lg="2">
                                                <CWidgetDropdown
                                                color="gradient-success"
                                                header={dataPorcentajeYearsWidgetPosgrado['cambio_porcentaje']+'%'}
                                                text="Cambia de programa"
                                                ></CWidgetDropdown>
                                            </CCol>
                                            <CCol sm="3" lg="2" >
                                                <CWidgetDropdown
                                                color="gradient-warning"
                                                header={dataPorcentajeYearsWidgetPosgrado['graduado_porcentaje']+'%'}
                                                text="Graduado"
                                                ></CWidgetDropdown>
                                            </CCol>
                                            <CCol sm="3" lg="2">
                                                <CWidgetDropdown
                                                color="gradient-danger"
                                                header={dataPorcentajeYearsWidgetPosgrado['no_matriculado_porcentaje']+'%'}
                                                text="No Matriculado"
                                                ></CWidgetDropdown>
                                            </CCol>
                                            <CCol sm="3" lg="2">
                                                <CWidgetDropdown
                                                color="gradient-dark"
                                                header={dataYearsWidgetPosgrado['suma']}
                                                text="Total Estudiantes"
                                                ></CWidgetDropdown>
                                            </CCol>
                                        </CRow>
                                        <CChartPie
                                            datasets={[
                                            {
                                                backgroundColor: [
                                                '#321fbd',
                                                '#39f',
                                                '#f9b115',
                                                '#e55353',
                                                ],
                                                data: [
                                                    dataYearsWidgetPosgrado['Permanece programa'],
                                                    dataYearsWidgetPosgrado['Cambio de programa'],
                                                    dataYearsWidgetPosgrado['Graduado'],
                                                    dataYearsWidgetPosgrado['No matriculado'],
                                                ]
                                            }
                                            ]}
                                            labels={['Permanece programa','Cambio de programa','Graduado','No matriculado']}
                                            options={{
                                            tooltips: {
                                                enabled: true
                                            }
                                            }}
                                        />                         
                                    </div>
                                    
                                }        
                            </CCardBody>
                        </CCollapse>                
            </CCollapse>
            <CCollapse show={collapseProgramas}>
                    <CCardBody>
                        <h1 style={{marginTop:'1%',textAlign: 'center'}}>
                            Desercion Interanual por Programa Académico
                        </h1> 
                        <CCardBody>
                            <p className="text-muted" style={{textAlign: 'center',fontWeight:'bold'}}>
                                Elegir nivel de formación:
                            </p>
                            <CRow className="align-items-center">
                                <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                                    <CButton block variant="outline" color="info" 
                                        onClick={toggleProgramasPregrado}
                                        > Pregrado
                                    </CButton>
                                </CCol>
                                <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                                    <CButton block variant="outline" color="info" 
                                        onClick={toggleProgramasPosgrado}
                                        >Posgrado
                                    </CButton>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCardBody>
                <CCollapse show={collapseProgramasPregrado}>
                    <CDataTable
                        items={tablaProgramasPregrado}
                        fields={fieldsTablaProgramas}
                        itemsPerPage={5}
                        pagination
                        columnFilter
                        align='middle'
                        color='primary'
                        borderColor="dark"
                        bordered={true}
                    />
                    <CCardBody style={{marginTop:'2%'}}>
                        <CRow  >
                            <CCol col="6" sm="4" md="2" className="mb-3 mb">
                                <CSelect 
                                    value={programaSelectedPregrado} 
                                    onChange={handleChangeProgramaPregrado}>
                                    {listProgramasPregrado.map(item => {
                                        return (<option key={item} value={item}>{item}</option>);
                                    })}
                                </CSelect>
                            </CCol>
                            <CCol col="6" sm="4" md="2"  className="mb-2 mb">
                                <CButton block variant="outline" color="info" 
                                    onClick={togglePregradoGrafico}
                                    >Graficar
                                </CButton> 
                            </CCol>
                        </CRow>  
                        <CCollapse show={collapsePregradoGrafico}>
                            <CCardBody>
                                <h3 style={{textAlign: 'center', fontWeight:'bold',marginTop:'3%'}}>
                                    {programaSelectedPregrado}
                                </h3>
                                {loadingYearsPregrado?
                                <div class="spinner-border text-info" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>:               
                                <CChartLine
                                    datasets={[
                                    {
                                        label: "Cambio de programa",
                                        fill: false,
                                        borderColor: "#321fdb",
                                        backgroundColor: "#321fdb",
                                        data: dataYearsPregrado['Cambio de programa'],
                                    },
                                    {
                                        label: "Graduado",
                                        fill: false,
                                        borderColor: "#2eb85c",
                                        backgroundColor: "#2eb85c",
                                        data: dataYearsPregrado['Graduado'],
                                    },
                                    {
                                        label: "No matriculado",
                                        fill: false,
                                        borderColor: "#e55353",
                                        backgroundColor: "#e55353",
                                        data: dataYearsPregrado['No matriculado'],
                                    },
                                    {
                                        label: "Permanece programa",
                                        fill: false,
                                        borderColor: "#f9b115",
                                        backgroundColor: "#f9b115",
                                        data: dataYearsPregrado['Permanece programa'],
                                    },
                                    ]}
                                    options={{
                                    tooltips: {
                                        enabled: true,
                                    },
                                    }}
                                    labels={yearsDataSemestre}
                                />
                            }
                            </CCardBody>
                        </CCollapse> 
                    </CCardBody> 
                </CCollapse>


                <CCollapse show={collapseProgramasPosgrado}>
                    <CDataTable
                        items={tablaProgramasPosgrado}
                        fields={fieldsTablaProgramas}
                        itemsPerPage={5}
                        pagination
                        columnFilter
                        align='middle'
                        color='primary'
                        borderColor="dark"
                        bordered={true}
                    />
                    <CCardBody style={{marginTop:'2%'}}>
                        <CRow>
                            <CCol col="6" sm="4" md="2" className="mb-2 mb">
                                <CSelect 
                                    value={programaSelectedPosgrado} 
                                    onChange={handleChangeProgramaPosgrado}>
                                    {listProgramasPosgrado.map(item => {
                                        return (<option key={item} value={item}>{item}</option>);
                                    })}
                                    
                                </CSelect>
                            </CCol>
                            <CCol col="6" sm="4" md="2"  className="mb-2 mb">
                                <CButton block variant="outline" color="info" 
                                    onClick={togglePosgradoGrafico }
                                    >Graficar
                                </CButton> 
                            </CCol>
                        </CRow>  
                        <CCollapse show={collapsePosgradoGrafico}>
                            <h3 style={{textAlign: 'center', fontWeight:'bold',marginTop:'3%'}}>
                                {programaSelectedPosgrado} 
                            </h3>
                            <CCardBody>
                                {loadingYearsPosgrado?
                                <div class="spinner-border text-info" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>:               
                                <CChartLine
                                    datasets={[
                                    {
                                        label: "Cambio de programa",
                                        fill: false,
                                        borderColor: "#321fdb",
                                        backgroundColor: "#321fdb",
                                        data: dataYearsPosgrado['Cambio de programa'],
                                    },
                                    {
                                        label: "Graduado",
                                        fill: false,
                                        borderColor: "#2eb85c",
                                        backgroundColor: "#2eb85c",
                                        data: dataYearsPosgrado['Graduado'],
                                    },
                                    {
                                        label: "No matriculado",
                                        fill: false,
                                        borderColor: "#e55353",
                                        backgroundColor: "#e55353",
                                        data: dataYearsPosgrado['No matriculado'],
                                    },
                                    {
                                        label: "Permanece programa",
                                        fill: false,
                                        borderColor: "#f9b115",
                                        backgroundColor: "#f9b115",
                                        data: dataYearsPosgrado['Permanece programa'],
                                    },
                                    ]}
                                    options={{
                                    tooltips: {
                                        enabled: true,
                                    },
                                    }}
                                    labels={yearsDataSemestre}
                                />
                            }
                            </CCardBody>
                        </CCollapse>
                    </CCardBody>
                    
                </CCollapse>

            </CCollapse>
        </CCard>
        
            
                
        </> 
    )    
}

export default DesercionInteranual