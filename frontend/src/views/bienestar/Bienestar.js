import React,{useState} from 'react'
import {
  CBreadcrumb,
  CBreadcrumbItem,
  CBreadcrumbRouter,
  CCard,
  CCardBody,
  CCardHeader,
  CLink,
  CCol,
  CRow,
  CTooltip,
  CCollapse,
  CDataTable,
  CCardFooter,
  CButton,
  CLabel,
  CFormGroup,
  CSelect,
} from '@coreui/react'
import routes from '../../routes'

// hook personalizado
const useSingleton = (callBack = () => { }) => { const hasBeenCalled = React.useRef(false);     if (hasBeenCalled.current) return;     callBack();     hasBeenCalled.current = true; }


const Bienestar = () =>{
    // constantes


    // funciones 


    // despues de definir las constantes 
    // useSingleton(async () => {
    //     await getData()
    // });

    return(
        <>
        <h1>Bienestar</h1>  
        <CCard>
            <CCardHeader>
                Apoyos socioeconómicos entregados a la facultad 
            </CCardHeader>
        </CCard>

        </>
    )
}

export default Bienestar