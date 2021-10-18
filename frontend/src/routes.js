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
const Intersemestral = React.lazy(() => import('./views/desercion/DesercionIntersemestral'));
const Interanual = React.lazy(() => import('./views/desercion/DesercionInteranual.js'))
const AnalisisCohorte = React.lazy(() => import('./views/desercion/AnalisisCohortes.js'))






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
  { path: '/desercion/intersemestral', name: 'Intersemestral', component: Intersemestral },
  { path: '/desercion/interanual', name: 'Interanual', component: Interanual },
  { path: '/desercion/analisiscohorte', name: 'Análisis Cohorte', component: AnalisisCohorte },

 

];

export default routes;
