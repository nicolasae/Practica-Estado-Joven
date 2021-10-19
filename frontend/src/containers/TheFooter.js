import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://www.utp.edu.co/" target="_blank" rel="noopener noreferrer">UTP</a>
        <span className="ml-1">&copy; 2021.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Desarrollado por</span>
        <a href="https://github.com/nicolasae" target="_blank" rel="noopener noreferrer">Nicolás Aguirre Espinosa</a>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Dirigido por:</span>
        <a href="#" target="_blank" rel="noopener noreferrer">Alexander Molina Cabrera</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
