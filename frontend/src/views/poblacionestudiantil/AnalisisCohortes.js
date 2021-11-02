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
    // Constantes generales
    const actualYear = new Date().getFullYear()
    const [yearsData,setYearsData] = React.useState([])
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
    // Pregrado
    const [collapseGeneralPregrado, setCollapseGeneralPregrado] = useState(false)
    const [yearSelectedPregrado, setYearSelectedPregrado] = React.useState(new Date().getFullYear())
    const [collapsePregradoAnual, setCollapsePregradoAnual] = useState(false)
    const [collapsePregradoPrimerSemestre, setCollapsePregradoPrimerSemestre] = useState(false)
    const [collapsePregradoSegundoSemestre, setCollapsePregradoSegundoSemestre] = useState(false)
    const fieldsTablePregrado = ["COD_UTP","NOMBRE","COD_PERIODO","ESTADO","CANTIDAD"]
    const [dataTablePregrado,setDataTablePregrado]= useState([])
    const [collapseTablePregrado,setCollapseTablePregrado]= useState(false)
    const [programaSelectedPregrado, setProgramaSelectedPregrado] = React.useState()
    const [collapsePregradoGraficoSemestral, setCollapsePregradoGraficoSemestral] = useState(false)
    const [yearSelectedSemestrePregrado, setYearSelectedSemestrePregrado] = React.useState(new Date().getFullYear())


    // const pruebaItems = [{id: 0, name: 'John Doe', registered: '2018/01/01', role: 'Guest', status: 'Pending'},
    // {id: 1, name: 'Samppa Nori', registered: '2018/01/01', role: 'Member', status: 'Active'},
    // {id: 2, name: 'Estavan Lykos', registered: '2018/02/01', role: 'Staff', status: 'Banned'},
    // {id: 3, name: 'Chetan Mohamed', registered: '2018/02/01', role: 'Admin', status: 'Inactive'},
    // {id: 4, name: 'Derick Maximinus', registered: '2018/03/01', role: 'Member', status: 'Pending'},]
    // const pruebaFields = ['id','name','registered','role']
    
    
    // Posgrado
    const [collapseGeneralPosgrado, setCollapseGeneralPosgrado] = useState(false)
    const [yearSelectedPosgrado, setYearSelectedPosgrado] = React.useState(new Date().getFullYear())
    const [collapsePosgradoAnual, setCollapsePosgradoAnual] = useState(false)
    const [collapsePosgradoPrimerSemestre, setCollapsePosgradoPrimerSemestre] = useState(false)
    const [collapsePosgradoSegundoSemestre, setCollapsePosgradoSegundoSemestre] = useState(false)
    const fieldsTablePosgrado = ["COD_UTP","NOMBRE","COD_PERIODO","ESTADO","CANTIDAD"]
    const [dataTablePosgrado,setDataTablePosgrado]= useState([])
    const [collapseTablePosgrado,setCollapseTablePosgrado]= useState(false)
    const [programaSelectedPosgrado, setProgramaSelectedPosgrado] = React.useState()

    // Funciones 
    const getYears = async() => { 
        for (var i=2010;i<=actualYear; i++){
            yearsData.push(i)
        }
        setYearsData(yearsData)
    }
    const getProgramas = async() => { 
        const arrayPregrado = listPregrado.filter ( element => element.NIVEL === 'Pregrado');
        const arrayPosgrado = listPregrado.filter ( element => element.NIVEL === 'Posgrado');

        for (var i=0;i<arrayPregrado.length;i++){
            programasDataPregrado.push(arrayPregrado[i].NOMBRE)
        }
        for (var i=0;i<arrayPosgrado.length;i++){
            programasDataPosgrado.push(arrayPosgrado[i].NOMBRE)
        }
        await setProgramasDataPregrado(programasDataPregrado)
        await setProgramasDataPosgrado(programasDataPosgrado)
    }

    const getDataTablePregrado = async () => {
    //    ARREGLAR QUE SEA SOLO PARA PREGRADO
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/analisiscohorte?COD_PERIODO='+ yearSelectedPregrado,
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
        //    ARREGLAR QUE SEA SOLO PARA PREGRADO
            var axios = require('axios');
            var config = {
            method: 'get',
            url: 'http://localhost:8000/api/analisiscohorte?COD_PERIODO='+ yearSelectedPosgrado,
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

    React.useEffect(async () => { 
        await getDataTablePregrado()
    }, [yearSelectedPregrado])
    React.useEffect(async () => { 
        await getDataTablePosgrado()
    }, [yearSelectedPosgrado])


    const toggleGeneralPregrado = (e)=>{
        setCollapseGeneralPregrado(!collapseGeneralPregrado);
        setCollapseGeneralPosgrado(false);
        e.preventDefault();
    }
    
    const toggleGeneralPosgrado = (e)=>{
        setCollapseGeneralPosgrado(!collapseGeneralPosgrado);
        setCollapseGeneralPregrado(false);
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
    const toggleTablePosgrado = (e)=>{
        setCollapseTablePosgrado(!collapseTablePosgrado);
        e.preventDefault();
    }

    const toggleGraficoSemestralPregrado = (e)=>{
        setCollapsePregradoGraficoSemestral(!collapsePregradoGraficoSemestral);
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

    const handleChangeYearPregrado = async (event) =>  {
        setYearSelectedPregrado(event.target.value);
    }
    const handleChangeYearPosgrado = async (event) =>  {
        setYearSelectedPosgrado(event.target.value);
    }
    const handleChangeProgramaPregrado = async (event) =>  {
        setProgramaSelectedPregrado(event.target.value);
    }
    const handleChangeProgramaPosgrado = async (event) =>  {
        setProgramaSelectedPosgrado(event.target.value);
    }
    const handleChangeYearSemestrePregrado = async (event) =>  {
        setYearSelectedSemestrePregrado(event.target.value);
    }

 // despues de definir las constantes 
    useSingleton(async () => {
        await getYears(); 
        await getProgramas();  
        await getDataTablePregrado();
        await getDataTablePosgrado(); 

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
                    <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                        <CButton block variant="outline" color="primary" onClick={toggleGeneralPregrado}
                            > Pregrado
                        </CButton>
                    </CCol>
                    <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
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
                        <div className="container b-1">
                            <CCollapse show={collapsePregradoAnual}>
                                <div className="row ">
                                    <div className="col">
                                        <CWidgetDropdown
                                            color="gradient-primary"
                                            header={99}
                                            text="Matriculados"
                                        ></CWidgetDropdown>
                                    </div>
                                    <div className="col">
                                            <CWidgetDropdown
                                            color="gradient-success"
                                            header={110}
                                            text="No matriculados"
                                            ></CWidgetDropdown>
                                    </div>
                                    <div className="col">
                                        <CWidgetDropdown
                                        color="gradient-warning"
                                        header={20}
                                        text="Graduados"
                                        ></CWidgetDropdown>
                                    </div>
                                </div>
                                
                            </CCollapse>
                        </div>
                        <div className="container b-1">
                            <CCollapse show={collapsePregradoPrimerSemestre}>
                                <div className="row">
                                    <div className="col">
                                        <CWidgetDropdown
                                            color="gradient-primary"
                                            header={99}
                                            text="Matriculados"
                                        ></CWidgetDropdown>
                                    </div>
                                    <div className="col">
                                            <CWidgetDropdown
                                            color="gradient-success"
                                            header={110}
                                            text="No matriculados"
                                            ></CWidgetDropdown>
                                    </div>
                                    <div className="col">
                                        <CWidgetDropdown
                                        color="gradient-warning"
                                        header={20}
                                        text="Graduados"
                                        ></CWidgetDropdown>
                                    </div>
                                </div>
                            </CCollapse>
                        </div>
                        <div className="container b-1">
                            <CCollapse show={collapsePregradoSegundoSemestre}>
                                <div className="row">
                                    <div className="col">
                                        <CWidgetDropdown
                                            color="gradient-primary"
                                            header={99}
                                            text="Matriculados"
                                        ></CWidgetDropdown>
                                    </div>
                                    <div className="col">
                                            <CWidgetDropdown
                                            color="gradient-success"
                                            header={110}
                                            text="No matriculados"
                                            ></CWidgetDropdown>
                                    </div>
                                    <div className="col">
                                        <CWidgetDropdown
                                        color="gradient-warning"
                                        header={20}
                                        text="Graduados"
                                        ></CWidgetDropdown>
                                    </div>
                                </div>
                            </CCollapse>
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
                                    <div className="col-3"></div>
                                    <div className="col-3">
                                        <CSelect style={{marginLeft:'5%'}}value={programaSelectedPregrado} onChange={handleChangeProgramaPregrado}>
                                            {programasDataPregrado.map(item => {
                                                return (<option key={item} value={item}>{item}</option>);
                                            })}
                                        </CSelect>
                                    </div>
                                    <div className="col">
                                        <CButtonGroup className="mr-2 align-items-center">
                                            <CButton
                                                color="outline-success"
                                                onClick={toggleGraficoSemestralPregrado} 
                                                className={'mb-1'}
                                            >Gráfico Semestral
                                            </CButton>
                                            <CButton
                                                color="outline-success"
                                                // onClick={togglePregradoAnual} 
                                                className={'mb-1'}
                                            >Gráfico Anual
                                            </CButton>
                                        </CButtonGroup>
                                    </div>
                                </div>
                            </div>
                            <div>   
                                <CCollapse show={collapsePregradoGraficoSemestral}>
                                    <div className="container mb-3">
                                        <div className="row">
                                            <div className="col-2">
                                            <CSelect value={yearSelectedSemestrePregrado} onChange={handleChangeYearSemestrePregrado}>
                                            {yearsData.map(item => {
                                                return (<option key={item} value={item}>{item}</option>);
                                            })}
                                            </CSelect>
                                            </div>
                                                <div className="col">
                                                    <CButtonGroup className="mr-2 align-items-center">
                                                        <CButton
                                                            color="success"
                                                            // onClick={togglePieChartInscritosSexoPrimer}
                                                            className={'mb-1'}
                                                        >Graficar
                                                        </CButton>
                                                    </CButtonGroup>
                                                </div>
                                            </div>
                                        </div>
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
                                                        data: [100,230,32]
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
                                                            data: [100,230,32]
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
                                                            data: [100,230,32]
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
                        </CCol>
                    </CCard>
                </CCollapse>
            </CCol>
            <CCol xs="12" lg="12">
                <CCollapse show={collapseGeneralPosgrado}>
                    <CCard>
                        <h1 style={{textAlign: 'center', fontWeight:'bold'}}>
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
                                <div className="col">
                                    <CButtonGroup className="mr-2 align-items-center">
                                        <CButton
                                            color="outline-primary"
                                            onClick={togglePosgradoAnual} 
                                            className={'mb-1'}
                                        >{yearSelectedPosgrado }
                                        </CButton>
                                        <CButton
                                            color="outline-primary"
                                            onClick={togglePosgradoPrimerSemestre} 
                                            className={'mb-1'}
                                        >{yearSelectedPosgrado + '-1'}
                                        </CButton>
                                        <CButton
                                            color="outline-primary"
                                            onClick={togglePosgradoSegundoSemestre} 
                                            className={'mb-1'}
                                        >{yearSelectedPosgrado + '-2'}
                                        </CButton>
                                        <CButton
                                            color="outline-primary"
                                            onClick={toggleTablePosgrado} 
                                            className={'mb-1'}
                                        >Tabla
                                        </CButton>
                                    </CButtonGroup>
                                </div>
                            </div>
                        </div>       
                        <div className="container b-1">
                            <CCollapse show={collapsePosgradoAnual}>
                                <div className="row ">
                                    <div className="col">
                                        <CWidgetDropdown
                                            color="gradient-primary"
                                            header={99}
                                            text="Matriculados"
                                        ></CWidgetDropdown>
                                    </div>
                                    <div className="col">
                                            <CWidgetDropdown
                                            color="gradient-success"
                                            header={110}
                                            text="No matriculados"
                                            ></CWidgetDropdown>
                                    </div>
                                    <div className="col">
                                        <CWidgetDropdown
                                        color="gradient-warning"
                                        header={20}
                                        text="Graduados"
                                        ></CWidgetDropdown>
                                    </div>
                                </div>
                            </CCollapse>
                        </div>
                        <div className="container b-1">
                            <CCollapse show={collapsePosgradoPrimerSemestre}>
                                <div className="row ">
                                    <div className="col">
                                        <CWidgetDropdown
                                            color="gradient-primary"
                                            header={99}
                                            text="Matriculados"
                                        ></CWidgetDropdown>
                                    </div>
                                    <div className="col">
                                            <CWidgetDropdown
                                            color="gradient-success"
                                            header={110}
                                            text="No matriculados"
                                            ></CWidgetDropdown>
                                    </div>
                                    <div className="col">
                                        <CWidgetDropdown
                                        color="gradient-warning"
                                        header={20}
                                        text="Graduados"
                                        ></CWidgetDropdown>
                                    </div>
                                </div>
                            </CCollapse>
                        </div>
                        <div className="container b-1">
                            <CCollapse show={collapsePosgradoSegundoSemestre}>
                                <div className="row ">
                                    <div className="col">
                                        <CWidgetDropdown
                                            color="gradient-primary"
                                            header={99}
                                            text="Matriculados"
                                        ></CWidgetDropdown>
                                    </div>
                                    <div className="col">
                                            <CWidgetDropdown
                                            color="gradient-success"
                                            header={110}
                                            text="No matriculados"
                                            ></CWidgetDropdown>
                                    </div>
                                    <div className="col">
                                        <CWidgetDropdown
                                        color="gradient-warning"
                                        header={20}
                                        text="Graduados"
                                        ></CWidgetDropdown>
                                    </div>
                                </div>
                            </CCollapse>
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
                                    <div className="col-3"></div>
                                    <div className="col-3">
                                        <CSelect style={{marginLeft:'5%'}}value={programaSelectedPosgrado} onChange={handleChangeProgramaPosgrado}>
                                            {programasDataPosgrado.map(item => {
                                                return (<option key={item} value={item}>{item}</option>);
                                            })}
                                        </CSelect>
                                    </div>
                                    <div className="col">
                                        <CButtonGroup className="mr-3 align-items-center">
                                            <CButton
                                                color="outline-primary"
                                                // onClick={togglePosgradoAnual} 
                                                className={'mb-1'}
                                            >Gráfico Semestral
                                            </CButton>
                                            <CButton
                                                color="outline-primary"
                                                // onClick={togglePosgradoAnual} 
                                                className={'mb-1'}
                                            >Gráfico Anual
                                            </CButton>
                                        </CButtonGroup>
                                    </div>
                                </div>
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