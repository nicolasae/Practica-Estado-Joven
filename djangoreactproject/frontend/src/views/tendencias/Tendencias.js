import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react'

// import tendenciaData from '../../../bd/tendencias.json'

// dataController = async () => {  
//   var data = 
// }


const Tendencias = () => {
  return (
    <CRow>
      <CCol xl={6}>
        <CCard>
          <CCardHeader>
            Tendencia poblacional por programa 
          </CCardHeader>
          <CCardBody>
     
         
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Tendencias 
