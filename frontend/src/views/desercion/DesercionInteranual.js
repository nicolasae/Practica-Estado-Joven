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

 const DesercionInteranual = () =>{
    return(
        <>
        <h1 style={{textAlign: 'center', fontWeight:'bold'}}>Deserción Interanual</h1>  
        <CCard>
            <CCardBody>
                <p className="text-muted">
                Para tener en cuenta:
                </p>
                <p className="muted">
                    Para el cálculo del indicador se toma como base la matrícula del 
                    "periodo base", se debe revisar cuales de estos estudiantes no se 
                    matricularon en el periodo base + 1 o base +2 y que no se hayan graduado.
                    <b> Desertor:</b>
                    Estudiante matriculado en el periodo n que no se matricula en el periodo
                    n+1 o n+2 y no se graduó en el periodo base, base + 1 o base + 2. 
                    Si el estudiante cambia de programa académico entre el periodo base, 
                    base + 1 o base + 2 no se considera desertor de la institución. 
                    La información se presenta agrupada por programa académico y estado de permanencia.
                </p>
                
            </CCardBody>
        </CCard>
        </> 
    )    
}

export default DesercionInteranual