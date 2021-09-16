import React from 'react';

// Imports Dashboards 
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
// Dashboard por Facultad 
const PoblacionEstudiantil = React.lazy(() => import('./views/poblacionestudiantil/PoblacionEstudiantil.js'));
const Bienestar = React.lazy(() => import('./views/bienestar/Bienestar.js'));
const Investigacion = React.lazy(() => import('./views/investigacion/Investigacion.js'));
const PersonalDocente = React.lazy(() => import('./views/personaldocente/PersonalDocente.js'));

// Tendencia Poblacional
const GraduadosPregrado = React.lazy(() => import('./views/graduados/pregrado.js'))
const GraduadosPosgrado = React.lazy(() => import('./views/graduados/posgrado.js'))
const InscritosPregrado = React.lazy(() => import('./views/inscritos/pregrado'))
const InscritosPosgrado = React.lazy(() => import('./views/inscritos/posgrado.js'))
const MatriculadosPregrado = React.lazy(() => import('./views/matriculados/pregrado.js'))
const MatriculadosPosgrado = React.lazy(() => import('./views/matriculados/posgrado.js'))
const PrimerCurso = React.lazy(() => import('./views/primercurso/PrimerCurso.js'))
// Deserción
const Intersemestral = React.lazy(() => import('./views/historico/intersemestral/Intersemestral.js'));
const Interanual = React.lazy(() => import('./views/historico/interanual/Interanual.js'))
const Cohorte = React.lazy(() => import('./views/tablero/cohorte/Cohorte.js'))
const CohorteCambio = React.lazy(() => import('./views/tablero/cohortecambio/CohorteCambioPrograma.js'))
const CohorteCompleta = React.lazy(() => import('./views/tablero/cohortecompleta/CohorteCompleta.js'))
const GraduadosCohorte = React.lazy(() => import('./views/tablero/graduadoscohorte/GraduadosCohorte.js'))






const routes = [
  // Routes for dashboard 
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  // DASHBOARD POR FACULTAD 
  { path: '/dashboardporfacultad', name: 'Dashboard por Facultad', component:PoblacionEstudiantil , exact: true },
  { path: '/dashboardporfacultad/poblacionestudiantil', name: 'Población Estudiantil', component: PoblacionEstudiantil,exact: true},
  { path: '/dashboardporfacultad/bienestar', name: 'Bienestar', component: Bienestar,exact: true},
  { path: '/dashboardporfacultad/investigacion', name: 'Investigación', component: Investigacion,exact: true},
  { path: '/dashboardporfacultad/personaldocente', name: 'Personal Docente', component: PersonalDocente,exact: true},

  // TENDENCIA POBLACIONAL 
  { path: '/tendencia/inscrito', name: 'Inscritos', component: InscritosPregrado, exact: true },
  { path: '/tendencia/inscrito/pregrado', name: 'Pregrado', component: InscritosPregrado },
  { path: '/tendencia/inscrito/posgrado', name: 'Posgrado', component: InscritosPosgrado },
  { path: '/tendencia/matriculado', name: 'Matriculado', component: MatriculadosPregrado, exact: true },
  { path: '/tendencia/matriculado/pregrado', name: 'Pregrado', component: MatriculadosPregrado },
  { path: '/tendencia/matriculado/posgrado', name: 'Posgrado', component: MatriculadosPosgrado },
  { path: '/tendencia/graduado', name: 'Graduados', component: GraduadosPregrado, exact: true },
  { path: '/tendencia/graduado/pregrado', name: 'Pregrado', component: GraduadosPregrado },
  { path: '/tendencia/graduado/posgrado', name: 'Posgrado', component: GraduadosPosgrado },
  { path: '/tendencia/primercurso', name: 'Primer Curso', component: PrimerCurso, exact: true},
  // DESERCIÓN
  { path: '/desercion/historico', name: 'Deserción Histórica', component: Intersemestral, exact: true },
  { path: '/desercion/historico/intersemestral', name: 'Intersemestral', component: Intersemestral },
  { path: '/desercion/historico/interanual', name: 'Interanual', component: Interanual },
  { path: '/desercion/tablero', name: 'Tablero de Análisis', component: Intersemestral, exact: true },
  { path: '/desercion/tablero/cohorte', name: 'Cohortes', component: Cohorte },
  { path: '/desercion/tablero/cohortecambio', name: 'Cohorte con Cambios', component: CohorteCambio },
  { path: '/desercion/tablero/cohortecompleta', name: 'Cohortes Completas', component: CohorteCompleta },
  { path: '/desercion/tablero/graduadoscohorte', name: 'Graduados por Cohorte', component: GraduadosCohorte },
  

];

export default routes;
