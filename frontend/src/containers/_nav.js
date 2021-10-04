import React from 'react'
import { CIcon } from '@coreui/icons-react';
import { cifAU } from '@coreui/icons';

const _nav =  [
  // MENU DE NAVEGACIÓN DASHBOARD

  //TENDENCIA POBLACIONAL
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Tendencia Poblacional']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Poblacion Estudiantil',
    route: '/poblacionestudiantil',
    icon: 'cil-people',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Inscritos ',
        to: '/poblacionestudiantil/inscrito',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Matriculados',
        to: '/poblacionestudiantil/matriculados',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Primer Curso',
        to: '/poblacionestudiantil/primercurso',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Cancelados',
        to: '/poblacionestudiantil/cancelados',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Graduados',
        to: '/poblacionestudiantil/graduados',
        icon:'cil-chart-pie'
      },
    ],
  },
 
  // // DESERCION
  // {
  //   _tag: 'CSidebarNavTitle',
  //   _children: ['Deserción']
  // },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Deserción Histórica',
  //   route: '/desercion/historico',
  //   icon: 'cil-puzzle',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Deserción Interanual',
  //       to: '/desercion/historico/interanual',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Deserción Intersemestral',
  //       to: '/desercion/historico/intersemestral',
  //     },

  //   ],
  // },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Tableros de Análisis',
  //   route: '/desercion/tablero',
  //   icon: 'cil-star',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Cohortes',
  //       to: '/desercion/tablero/cohorte',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Cohortes con cambios',
  //       to: '/desercion/tablero/cohortecambio',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Cohortes completas',
  //       to: '/desercion/tablero/cohortecompleta',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Graduados por cohorte',
  //       to: '/desercion/tablero/graduadoscohorte',
  //     },

  //   ],
  // },

  

]



export default _nav
