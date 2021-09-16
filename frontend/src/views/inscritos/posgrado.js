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


const InscritosPosgrado = () =>{
    // constantes


    // funciones 


    // despues de definir las constantes 
    // useSingleton(async () => {
    //     await getData()
    // });

    return(
        <>
        <h1>Inscritos Posgrado</h1>  
        <CCard>
            <CCardBody>
                <p className="text-muted">
                Para tener en cuenta:
                </p>
                <p className="muted">
                    El INSCRITO es toda persona natural que solicita formalmente el ingreso a un programa académico en calidad de estudiante.
                </p>
                <p className="muted">
                    El posgrado hace referencia al nivel educativo que forma parte del tipo superior o de tercer ciclo; es la última fase de la educación formal, tiene como antecedente obligatorio la licenciatura o pregrado y comprende los subniveles de estudios de especialización, maestría o magíster y doctorado.
                </p>
            </CCardBody>
        </CCard>

        </>
    )
}

export default InscritosPosgrado