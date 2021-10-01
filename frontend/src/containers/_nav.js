import React from 'react'

const _nav =  [
  // MENU DE NAVEGACIÓN DASHBOARD
  
  // DASHBOARD POR FACULTAD 
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Dashboard por Facultadd']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Poblacion Estudiantil',
    to: '/dashboardporfacultad/poblacionestudiantil',
    icon: 'cil-drop',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Personal Docentes',
    to: '/dashboardporfacultad/personaldocente',
    icon: 'cil-drop',
  },

  //TENDENCIA POBLACIONAL
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Tendencia Poblacional']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Inscritos',
    route: '/tendencia/inscrito',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Inscritos Pregrado',
        to: '/tendencia/inscrito/pregrado',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Inscritos Posgrado',
        to: '/tendencia/inscrito/posgrado',
      },
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Primer Curso',
    to: '/tendencia/primercurso',
    icon: 'cil-drop',
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Matriculados',
    route: '/tendencia/matriculado',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Matriculados Pregrado',
        to: '/tendencia/matriculado/pregrado',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Matriculados Posgrado',
        to: '/tendencia/matriculado/posgrado',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Graduados',
    route: '/tendencia/graduado',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Graduados Pregrado',
        to: '/tendencia/graduado/pregrado',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Graduados Posgrado',
        to: '/tendencia/graduado/posgrado',
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
    name: 'Deserción Histórica',
    route: '/desercion/historico',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Deserción Interanual',
        to: '/desercion/historico/interanual',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Deserción Intersemestral',
        to: '/desercion/historico/intersemestral',
      },

    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Tableros de Análisis',
    route: '/desercion/tablero',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Cohortes',
        to: '/desercion/tablero/cohorte',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Cohortes con cambios',
        to: '/desercion/tablero/cohortecambio',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Cohortes completas',
        to: '/desercion/tablero/cohortecompleta',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Graduados por cohorte',
        to: '/desercion/tablero/graduadoscohorte',
      },

    ],
  },

  

]



export default _nav
