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
    CFormGroup,
    CLabel,
    CSelect,
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
    // Posgrado
    const [collapseGeneralPosgrado, setCollapseGeneralPosgrado] = useState(false)

    // Funciones 
    const getYears = async() => { 
        for (var i=2010;i<=actualYear; i++){
            yearsData.push(i)
        }
        setYearsData(yearsData)
    }


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

 // despues de definir las constantes 
    useSingleton(async () => {
        await getYears();    

    });

    return(
        <>
        <h1 style={{textAlign: 'center', fontWeight:'bold'}}>Análisis Cohortes</h1> 
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
                        <h1 style={{textAlign: 'center', fontWeight:'bold'}}>
                            Pregrado:
                        </h1>
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