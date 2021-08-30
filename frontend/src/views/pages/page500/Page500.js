import React from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CInputGroup,
  CInputGroupAppend,
  CRow
} from '@coreui/react'

const Page500 = () => {
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <span className="clearfix">
              <h1 className="float-left display-3 mr-4">500</h1>
              <h4 className="pt-3">Houston, Tenemos una problema!</h4>
              <p className="text-muted float-left">La página que estas buscando temporalmente no esta disponible.</p>
            </span>
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

export default Page500
