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


const GraduadosPosgrado = () =>{
    // constantes


    // funciones 


    // despues de definir las constantes 
    // useSingleton(async () => {
    //     await getData()
    // });

    return(
        <>
        <h1>Graduados Posgrado</h1>  
        <CCard>
        <CCardBody>
                <p className="text-muted">
                Para tener en cuenta:
                </p>
                <p className="muted">
                    El GRADUADO es cualquier persona natural que, previa culminación del programa académico y cumpliendo de los requisitos de ley y los exigidos por la institución de educación superior, recibe el título académico.
                </p>
                <p className="muted">
                    El posgrado hace referencia al nivel educativo que forma parte del tipo superior o de tercer ciclo; es la última fase de la educación formal, tiene como antecedente obligatorio la licenciatura o pregrado y comprende los subniveles de estudios de especialización, maestría o magíster y doctorado.
                </p>
            </CCardBody>
        </CCard>

        </>
    )
}

export default GraduadosPosgrado