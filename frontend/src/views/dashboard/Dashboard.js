import React, { lazy } from 'react'
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CCardHeader,
  CCard,
  CCardBody,
  CButton,
  CButtonGroup,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple'

// hook personalizado
const useSingleton = (callBack = () => { }) => {     const hasBeenCalled = React.useRef(false);     if (hasBeenCalled.current) return;     callBack();     hasBeenCalled.current = true; }


const Dashboard = () => {
  // Constantes
  const actualYear = new Date().getFullYear()

  // Funciones
  
  


  // despues de definir las constantes 
  useSingleton(async () => {

  });
  return (
    <>
      <h1 style={{textAlign: 'center',fontWeight: 'bold'}}>Información del Año: {actualYear}</h1>
      <CRow>
        
        <CCol lg="1"></CCol>
        <CCol sm="3" lg="2" xs="12">
          <CWidgetDropdown
            color="gradient-primary"
            header="9.823"
            text="Matriculados"
          >
          </CWidgetDropdown>
        </CCol>
        <CCol sm="3" lg="2">
          <CWidgetDropdown
            color="gradient-info"
            header="9.823"
            text="Inscritos"
          >
          </CWidgetDropdown>
        </CCol>
        <CCol sm="3"lg="2">
          <CWidgetDropdown
            color="gradient-warning"
            header="9.823"
            text="Primer Curso"
          >
          </CWidgetDropdown>
        </CCol>
        <CCol sm="3"lg="2">
          <CWidgetDropdown
            color="gradient-danger"
            header="9.823"
            text="Cancelado"
          >
          </CWidgetDropdown>
        </CCol>
        <CCol sm="3"lg="2">
          <CWidgetDropdown
            color="gradient-dark"
            header="9.823"
            text="Graduado"
          >
          </CWidgetDropdown>
        </CCol>
      </CRow>  
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">Tabla Tendencia Poblacional</h4>
              <div className="small text-muted">Año: {actualYear}</div>
            </CCol>
            <CCol sm="5">
              <CDropdown className=" float-right mr-2  ">
                <CDropdownToggle split color="secondary" size="lg">
                  Inscrito
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem >Inscrito</CDropdownItem>
                  <CDropdownItem >Matriculado</CDropdownItem>
                  <CDropdownItem>Primer Curso</CDropdownItem>
                  <CDropdownItem>Graduado</CDropdownItem>
                  <CDropdownItem>Cancelado</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CCol>
          </CRow>
        </CCardBody>
        </CCard>
         
    </>
  )
}

export default Dashboard
