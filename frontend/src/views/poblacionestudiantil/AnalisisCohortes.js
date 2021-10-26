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
    // Pregrado
    const [collapseGeneralPregrado, setCollapseGeneralPregrado] = useState(false)
    const [yearSelected, setYearSelected] = React.useState(new Date().getFullYear())
    const [collapsePregradoAnual, setCollapsePregradoAnual] = useState(false)
    const [collapsePregradoPrimerSemestre, setCollapsePregradoPrimerSemestre] = useState(false)
    const [collapsePregradoSegundoSemestre, setCollapsePregradoSegundoSemestre] = useState(false)



    // Posgrado
    const [collapseGeneralPosgrado, setCollapseGeneralPosgrado] = useState(false)

    // Funciones 
    const getYears = async() => { 
        for (var i=2010;i<=actualYear; i++){
            yearsData.push(i)
        }
        setYearsData(yearsData)
    }

    // const getDataPregrado = async () => {
    //     var codigos= ['28','FV28','28C','37','12','FV12','FI','36','34','FV34','TS'];
    //     var axios = require('axios');
    //     var config = {
    //     method: 'get',
    //     url: 'http://localhost:8000/api/tendencia?VAR=Inscrito&COD_PERIODO='+ yearSelected +'-1',
    //     headers: { 
    //         'Content-Type': 'application/json'
    //     },
    //     };
    //     const inscritosquery = await axios(config)    
    //     .then( response => response.data.data)
    //     .catch(function (error) {
    //         console.log(error);
    //         return error.response
    //     });
    //     await setInscritosPrimer(inscritosquery)
    //     console.log(inscritosPrimer)
    // }


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


    const handleChangeYearPregrado = async (event) =>  {
        setYearSelected(event.target.value);
    }

 // despues de definir las constantes 
    useSingleton(async () => {
        await getYears();    

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
                            >Pregrado
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
                            Pregrado:
                        </h1>
                        <div className="container">
                            <div className="row">
                                <div className="col-3"></div>
                                <div className="col-3">
                                    <CSelect style={{marginLeft:'5%'}}value={yearSelected} onChange={handleChangeYearPregrado}>
                                        {yearsData.map(item => {
                                            return (<option key={item} value={item}>{item}</option>);
                                        })}
                                    </CSelect>
                                </div>
                                <div className="col">
                                    <CButtonGroup className="mr-2 align-items-center">
                                        <CButton
                                            color="outline-primary"
                                            onClick={togglePregradoAnual} 
                                            className={'mb-1'}
                                        >{yearSelected }
                                        </CButton>
                                        <CButton
                                            color="outline-primary"
                                            onClick={togglePregradoPrimerSemestre} 
                                            className={'mb-1'}
                                        >{yearSelected + '-1'}
                                        </CButton>
                                        <CButton
                                            color="outline-primary"
                                            onClick={togglePregradoSegundoSemestre} 
                                            className={'mb-1'}
                                        >{yearSelected + '-2'}
                                        </CButton>
                                    </CButtonGroup>
                                </div>
                            </div>
                        </div>             
                        <div className="container">
                            <CCollapse show={collapsePregradoAnual}>
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
                                            text="Inscritos"
                                            ></CWidgetDropdown>
                                    </div>
                                    <div className="col">
                                            <CWidgetDropdown
                                            color="gradient-warning"
                                            header={20}
                                            text="Primer Curso"
                                            ></CWidgetDropdown>
                                    </div>
                                </div>
                            </CCollapse>
                        </div>
                        
                        <CCollapse show={collapsePregradoPrimerSemestre}>
                                <h1>hola</h1>
                        </CCollapse>
                        <CCollapse show={collapsePregradoSegundoSemestre}>
                                <h1>hola</h1>
                        </CCollapse>
                    </CCard>
                </CCollapse>
            </CCol>
            <CCol xs="12" lg="12">
                <CCollapse show={collapseGeneralPosgrado}>
                    <CCard>
                        <h1 style={{textAlign: 'center', fontWeight:'bold'}}>
                            Posgrado:
                        </h1>
                    </CCard>
                </CCollapse>
            </CCol>
        </CRow>
        </> 
    )    
}

export default AnalisisCohorte