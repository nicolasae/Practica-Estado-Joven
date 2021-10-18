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
    return(
        <>
        <h1 style={{textAlign: 'center', fontWeight:'bold'}}>Análisis Cohortes</h1>  
        </> 
    )    
}

export default AnalisisCohorte