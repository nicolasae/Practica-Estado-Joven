import React from 'react';

const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));
const Tables = React.lazy(() => import('./views/base/tables/Tables'));

const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/base/cards/Cards'));
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'));
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'));
const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));

const Jumbotrons = React.lazy(() => import('./views/base/jumbotrons/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'));
const Navbars = React.lazy(() => import('./views/base/navbars/Navbars'));
const Navs = React.lazy(() => import('./views/base/navs/Navs'));
const Paginations = React.lazy(() => import('./views/base/paginations/Pagnations'));
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'));
const ProgressBar = React.lazy(() => import('./views/base/progress-bar/ProgressBar'));
const Switches = React.lazy(() => import('./views/base/switches/Switches'));
const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'));
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'));

const BrandButtons = React.lazy(() => import('./views/buttons/brand-buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/buttons/button-dropdowns/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
const Charts = React.lazy(() => import('./views/charts/Charts'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
const Brands = React.lazy(() => import('./views/icons/brands/Brands'));
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
const Typography = React.lazy(() => import('./views/theme/typography/Typography'));
const Widgets = React.lazy(() => import('./views/widgets/Widgets'));
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));

// Imports Dashboards 
// Deserción
const Intersemestral = React.lazy(() => import('./views/historico/intersemestral/Intersemestral.js'));
const Interanual = React.lazy(() => import('./views/historico/interanual/Interanual.js'))
const Cohorte = React.lazy(() => import('./views/tablero/cohorte/Cohorte.js'))
const CohorteCambio = React.lazy(() => import('./views/tablero/cohortecambio/CohorteCambioPrograma.js'))
const CohorteCompleta = React.lazy(() => import('./views/tablero/cohortecompleta/CohorteCompleta.js'))
const GraduadosCohorte = React.lazy(() => import('./views/tablero/graduadoscohorte/GraduadosCohorte.js'))
// Tendencia Poblacional
const GraduadosPregrado = React.lazy(() => import('./views/graduados/pregrado/pregrado.js'))
const GraduadosPosgrado = React.lazy(() => import('./views/graduados/posgrado/posgrado.js'))
const InscritosPregrado = React.lazy(() => import('./views/inscritos/pregrado/pregrado.js'))
const InscritosPosgrado = React.lazy(() => import('./views/inscritos/posgrado/posgrado.js'))
const MatriculadosPregrado = React.lazy(() => import('./views/matriculados/pregrado/pregrado.js'))
const MatriculadosPosgrado = React.lazy(() => import('./views/matriculados/posgrado/posgrado.js'))






const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },

  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/forms', name: 'Forms', component: BasicForms },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },

  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },

  { path: '/charts', name: 'Charts', component: Charts },

  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },

  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toaster', name: 'Toaster', component: Toaster },

  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },

  // Routes for dashboard 

  // DESERCIÓN
  { path: '/desercion/historico', name: 'Deserción Histórica', component: Intersemestral, exact: true },
  { path: '/desercion/historico/intersemestral', name: 'Intersemestral', component: Intersemestral },
  { path: '/desercion/historico/interanual', name: 'Interanual', component: Interanual },
  { path: '/desercion/tablero', name: 'Tablero de Análisis', component: Intersemestral, exact: true },
  { path: '/desercion/tablero/cohorte', name: 'Cohortes', component: Cohorte },
  { path: '/desercion/tablero/cohortecambio', name: 'Cohorte con Cambios', component: CohorteCambio },
  { path: '/desercion/tablero/cohortecompleta', name: 'Cohortes Completas', component: CohorteCompleta },
  { path: '/desercion/tablero/graduadoscohorte', name: 'Graduados por Cohorte', component: GraduadosCohorte },
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

];

export default routes;
