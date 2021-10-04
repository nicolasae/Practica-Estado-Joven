import React from 'react';

// Imports Dashboards 
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

// Tendencia Poblacional
// const Graduados = React.lazy(() => import('./views/graduados/.js'))
const Matriculados = React.lazy(() => import('./views/poblacionestudiantil/Matriculados'))
// const Inscritos = React.lazy(() => import('./views/inscritos/'))
// const PrimerCurso = React.lazy(() => import('./views/primercurso/PrimerCurso.js'))



// Deserción
// const Intersemestral = React.lazy(() => import('./views/historico/intersemestral/Intersemestral.js'));
// const Interanual = React.lazy(() => import('./views/historico/interanual/Interanual.js'))
// const Cohorte = React.lazy(() => import('./views/tablero/cohorte/Cohorte.js'))
// const CohorteCambio = React.lazy(() => import('./views/tablero/cohortecambio/CohorteCambioPrograma.js'))
// const CohorteCompleta = React.lazy(() => import('./views/tablero/cohortecompleta/CohorteCompleta.js'))
// const GraduadosCohorte = React.lazy(() => import('./views/tablero/graduadoscohorte/GraduadosCohorte.js'))






const routes = [
  // Routes for dashboard 
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  
  // TENDENCIA POBLACIONAL 
  { path: '/poblacionestudiantil/matriculados', name: 'Matriculados', component: Matriculados, exact: true },
  // { path: '/tendencia/poblacionestudiantil/inscrito', name: 'Inscritos', component: InscritosPregrado, exact: true },
  // { path: '/tendencia/poblacionestudiantil/graduado', name: 'Graduados', component: GraduadosPregrado, exact: true },
  // { path: '/tendencia/poblacionestudiantil/primercurso', name: 'Primer Curso', component: PrimerCurso, exact: true},
  // { path: '/tendencia/poblacionestudiantil/cancelados', name: 'Cancelados', component: Cancelados, exact: true},


  // DESERCIÓN
  // { path: '/desercion/historico', name: 'Deserción Histórica', component: Intersemestral, exact: true },
  // { path: '/desercion/historico/intersemestral', name: 'Intersemestral', component: Intersemestral },
  // { path: '/desercion/historico/interanual', name: 'Interanual', component: Interanual },
  // { path: '/desercion/tablero', name: 'Tablero de Análisis', component: Intersemestral, exact: true },
  // { path: '/desercion/tablero/cohorte', name: 'Cohortes', component: Cohorte },
  // { path: '/desercion/tablero/cohortecambio', name: 'Cohorte con Cambios', component: CohorteCambio },
  // { path: '/desercion/tablero/cohortecompleta', name: 'Cohortes Completas', component: CohorteCompleta },
  // { path: '/desercion/tablero/graduadoscohorte', name: 'Graduados por Cohorte', component: GraduadosCohorte },
  

];

export default routes;
