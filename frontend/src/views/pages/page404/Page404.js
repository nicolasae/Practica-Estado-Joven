import React from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CInputGroup,
  CInputGroupAppend,
  CRow
} from '@coreui/react'

const Page404 = () => {
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <div className="clearfix">
              <h1 className="float-left display-3 mr-4">404</h1>
              <h4 className="pt-3">Oops! Estas Perdido.</h4>
              <p className="text-muted float-left"> La página que estabas buscando no existe.</p>
            </div>
            <CInputGroup className="input-prepend">
              <CInputGroupAppend>
                <CButton color="info">Volver a pagina de Inicio</CButton>
              </CInputGroupAppend>
            </CInputGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page404
