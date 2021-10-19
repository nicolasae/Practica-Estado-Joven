import React from 'react'


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
        // icon:'cil-chart-pie'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Análisis Cohortes',
        to: '/poblacionestudiantil/analisiscohorte',
      },
    ],
  },
 
  // DESERCION
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Deserción']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Deserción',
    route: '/desercion/historico',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Deserción Interanual',
        to: '/desercion/interanual',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Deserción Intersemestral',
        to: '/desercion/intersemestral',
      },
      

    ],
  },
 



]



export default _nav
