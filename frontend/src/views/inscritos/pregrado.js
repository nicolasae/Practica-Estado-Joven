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


const InscritosPregrado = () =>{
    // constantes


    // funciones 


    // despues de definir las constantes 
    // useSingleton(async () => {
    //     await getData()
    // });

    return(
        <>
        <h1>Inscritos Pregrado</h1>  
        <CCard>
          <CCardBody>
              <p className="text-muted">
              Para tener en cuenta:
              </p>
              <p className="muted">
                    El INSCRITO es toda persona natural que solicita formalmente el ingreso a un programa académico en calidad de estudiante.
              </p>
              <p className="muted">
                  El pregrado hace referencia a los programas académicos subsidiados por la nación y los programas de jornada especial, comprende los subniveles de estudio técnico profesional, tecnólogo y profesional.
              </p>
          </CCardBody>
        </CCard>

        </>
    )
}

export default InscritosPregrado