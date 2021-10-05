import React from 'react';

// Imports Dashboards 
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

// Tendencia Poblacional
const Graduados = React.lazy(() => import('./views/poblacionestudiantil/Graduados.js'))
const Matriculados = React.lazy(() => import('./views/poblacionestudiantil/Matriculados'))
const Inscritos = React.lazy(() => import('./views/poblacionestudiantil/Inscritos.js'))
const PrimerCurso = React.lazy(() => import('./views/poblacionestudiantil/PrimerCurso.js'))
const Cancelados = React.lazy(() => import('./views/poblacionestudiantil/Cancelados.js'))



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
  { path: '/poblacionestudiantil/inscrito', name: 'Inscritos', component: Inscritos, exact: true },
  { path: '/poblacionestudiantil/graduados', name: 'Graduados', component: Graduados, exact: true },
  { path: '/poblacionestudiantil/primercurso', name: 'Primer Curso', component: PrimerCurso, exact: true},
  { path: '/poblacionestudiantil/cancelados', name: 'Cancelados', component: Cancelados, exact: true},


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
