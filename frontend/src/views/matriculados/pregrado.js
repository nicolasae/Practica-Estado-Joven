import React,{ useState } from "react";
import axios from 'axios';

import {
  CCard,
  CCardBody,
  CCardHeader,
  CLink,
  CCol,
  CRow,
  CTooltip,
  CDataTable,
  CCollapse,
  CCardFooter,
  CButton,
  CFormGroup,
  CLabel,
  CSelect,
} from "@coreui/react";

import {
    CChartBar,
    CChartLine,
    CChartDoughnut,
    CChartRadar,
    CChartPie,
    CChartPolarArea
  } from '@coreui/react-chartjs'

  // hook personalizado
const useSingleton = (callBack = () => { }) => { const hasBeenCalled = React.useRef(false);     if (hasBeenCalled.current) return;     callBack();     hasBeenCalled.current = true; }


const MatriculadosPregrado = () =>{
    // constantes


    // funciones 


    // despues de definir las constantes 
    // useSingleton(async () => {
    //     await getData()
    // });

    return(
        <>
        <h1>Matriculados Pregrado</h1>  
        <CCard>
            <CCardBody>
                <p className="text-muted">
                Para tener en cuenta:
                </p>
                <p className="muted">
                    La matrícula es el acto que formaliza la vinculación del estudiante al servicio educativo, el cual se renueva cada periodo académico.
                </p>                
                <p className="muted">
                    El pregrado hace referencia a los programas académicos subsidiados por la nación y los programas de jornada especial, comprende los subniveles de estudio técnico profesional, tecnólogo y profesional.
                </p>
            </CCardBody>
        </CCard>

        </>
    )
}

export default MatriculadosPregrado
// export default class MatriculadosPregrado extends React.Component {
//     constructor(props){
//         super(props)
//             this.state = {
//                 matriculadoSegunSexo: [],
//                 matriculadoSegunSexoPrograma: [],
//                 matriculadosLineChart:[],
//                 fields : ['Programa','Femenino', 'Masculino', 'Año'],
//                 collapseTable: false,
//                 collapseTablePrograma: false,
//                 collapseLineChartPrograma:false,
//                 fieldsLineChart:[],
//                 dataLineChartMasculino:[],
//                 dataLineChartFemenino:[],
//                 programa:'Ingeniería de Sistemas y Computación',
//                 programaLineChart: 'Ingeniería de Sistemas y Computación',
//             }
//             this.handleChange = this.handleChange.bind(this);
//             this.handleChangeLineChart = this.handleChangeLineChart.bind(this);

//             this.getData()
//     }
    
//     handleChange(event) {
//         this.setState({programa: event.target.value});
//         console.log(this.state.programa)
//     }

//     handleChangeLineChart(event) {
//         this.setState({programaLineChart: event.target.value});
//         // console.log(this.state.programaLineChart)
//     }

//     getData = async () => {
//         var axios = require('axios');
//         var config = {
//         method: 'get',
//         url: 'http://localhost:8000/api/v1/matriculadosegunsexo',
//         headers: { 
//             'Content-Type': 'application/json'
//         },
//         };
//         await axios(config)
//         .then( response => {
//             this.setState({matriculadoSegunSexo:response.data.data})
//         })
//         .catch(function (error) {
//         console.log(error);
//         });
//         // console.log(this.state.matriculadoSegunSexo);
//         // console.log(this.state.matriculadoSegunSexo.data['Programa']);
//     }

//     getDataPrograma = async () =>{
//         var axios = require('axios');
//         var config = {
//         method: 'get',
//         url: 'http://localhost:8000/api/v1/matriculadosegunsexo?Programa='+ this.state.programa,
//         headers: { 
//             'Content-Type': 'application/json'
//         },
//         };
//         await axios(config)
//         .then( response => {
//             this.setState({matriculadoSegunSexoPrograma:response.data.data})
//         })
//         .catch(function (error) {
//         console.log(error);
//         });
//         // console.log(this.state.matriculadoSegunSexoPrograma[0]['Programa'])
//     }
//     getDataLineChart = async () =>{
//         var axios = require('axios');
//         var config = {
//         method: 'get',
//         url: 'http://localhost:8000/api/v1/matriculadosegunsexo?Programa='+ this.state.programaLineChart,
//         headers: { 
//             'Content-Type': 'application/json'
//         },
//         };
//         await axios(config)
//         .then( response => {
//             this.setState({matriculadosLineChart:response.data.data})
//         })
//         .catch(function (error) {
//         console.log(error);
//         });

//         for (var i=0; i < this.state.matriculadosLineChart.length; i++){
//             this.state.fieldsLineChart.push(this.state.matriculadosLineChart[i]['Año'])
//             this.state.dataLineChartMasculino.push(this.state.matriculadosLineChart[i]['Masculino'])
//             this.state.dataLineChartFemenino.push(this.state.matriculadosLineChart[i]['Femenino'])
//         }       
//     }

//     toggleTablaGeneral = () => {
//         this.setState({collapseTable:!this.state.collapseTable})
//     }    
//     toggleTablaPrograma = () => {
//         this.getDataPrograma()
//         this.setState({collapseTablePrograma:!this.state.collapseTablePrograma})
//     }
//     toggleLineChartPrograma = () => {
//         this.getDataLineChart()
//         this.setState({collapseLineChartPrograma:!this.state.collapseLineChartPrograma})
//         // Reestablece los valores 
//         this.setState({dataLineChartMasculino:[]})
//         this.setState({dataLineChartFemenino:[]})
//     }    

    

//     render() {
//         return (           
//             <div>
//                 <CCard>
//                     <CCardHeader>
//                         Matriculados
//                     </CCardHeader>
//                     <CCardBody>
//                         <p className="text-muted">
//                         Para tener en cuenta:
//                         </p>
//                         <p className="muted">
//                         Tight pants next level keffiyeh
//                         <CTooltip content="Tooltip text">
//                             <CLink> you probably </CLink>
//                         </CTooltip>
//                         haven't heard of them. Photo booth beard raw denim letterpress vegan
//                         messenger bag stumptown. Farm-to-table seitan, mcsweeney's fixie
//                         sustainable quinoa 8-bit american apparel terry richardson vinyl chambray.
//                         Beard stumptown, cardigans banh mi lomo thundercats.
//                         Tofu biodiesel williamsburg marfa, four loko mcsweeney''s cleanse vegan chambray.
//                         A really ironic artisan scenester farm-to-table banksy Austin freegan cred raw 
//                         denim single-origin coffee viral.
//                         </p>
//                     </CCardBody>
//                 </CCard>
//                 <CRow>
//                     <CCol xs="12" lg="12">
//                         <CCard>
//                             <CCardHeader>
//                                 Tabla Matriculados Segun Sexo
//                             </CCardHeader>
//                             <CCollapse show={this.state.collapseTable}>  
//                                 <CCardBody>
//                                     <CDataTable
//                                         items={this.state.matriculadoSegunSexo}
//                                         fields={this.state.fields}
//                                         itemsPerPage={7}
//                                         pagination
//                                         columnFilter
//                                     />
//                                 </CCardBody>
//                             </CCollapse>
//                             <CCardFooter>
//                                 <CButton
//                                 color="primary"
//                                 onClick={this.toggleTablaGeneral}
//                                 className={'mb-1'}
//                                 >Mostrar Tabla</CButton>
//                             </CCardFooter>
//                         </CCard>
//                     </CCol>
//                 </CRow>

//                 <CRow>
//                     <CCol xs="12" lg="12">
//                         <CCard>
//                             <CCardHeader>
//                                 Tabla Matriculados Segun Programa
//                             </CCardHeader>
//                             <CCollapse show={this.state.collapseTablePrograma}>  
//                                 <CCardBody>
//                                     <CDataTable
//                                         items={this.state.matriculadoSegunSexoPrograma}
//                                         fields={this.state.fields}
//                                         itemsPerPage={5}
//                                         pagination
//                                     />
//                                 </CCardBody>
//                             </CCollapse>
//                             <CCardFooter>
//                                 <CLabel htmlFor="ccmonth">Programa Académico</CLabel>
//                                     <CFormGroup row>    
//                                         <CCol md="4">
//                                             <CSelect custom name="ccmonth" id="ccmonth" value={this.state.programa} onChange={this.handleChange}>
//                                                 <option value="Ingeniería Electrónica (Nocturno)" >Ingeniería Electrónica (Nocturno)</option>
//                                                 <option value="Ingeniería Eléctrica">Ingeniería Eléctrica</option>
//                                                 <option value="Ingeniería Física">Ingeniería Física</option>
//                                                 <option value="Ingeniería de Sistemas y Computación">Ingeniería de Sistemas y Computación</option>
//                                                 <option value="Ingeniería de Sistemas y Computación (Nocturno)">Ingeniería de Sistemas y Computación (Nocturno)</option>
//                                             </CSelect>
//                                         </CCol>
//                                         <CCol md="4">
//                                         <CButton
//                                         color="primary"
//                                         onClick={this.toggleTablaPrograma}
//                                         className={'mb-1'}
//                                         >Mostrar Tabla</CButton>
//                                         </CCol>
//                                     </CFormGroup>
//                             </CCardFooter>
//                         </CCard>
//                     </CCol>
//                 </CRow>

//                 <CRow>
//                     <CCol xs="12" lg="12">
//                         <CCard>
//                             <CCardHeader>
//                                 Line Chart
//                             </CCardHeader>
//                             <CCollapse show={this.state.collapseLineChartPrograma}>  
//                                 <CCardBody>    
//                                 <CChartLine
//                                     datasets={[
//                                     {
//                                         label: 'Masculino',
//                                         backgroundColor: 'rgb(228,102,81,0.9)',
//                                         data: [30, 39, 10, 50, 30, 70, 35]
//                                     },
//                                     {
//                                         label: 'Femenino',
//                                         backgroundColor: 'rgb(0,216,255,0.9)',
//                                         data: [39, 80, 40, 35, 40, 20, 45]
//                                     }
//                                     ]}
//                                     options={{
//                                     tooltips: {
//                                         enabled: true
//                                     }
//                                     }}
//                                     labels={this.state.fieldsLineChart}
//                                 />
//                                 </CCardBody>
//                             </CCollapse>
//                             <CCardFooter>
//                                 <CLabel htmlFor="ccmonth">Programa Académico</CLabel>
//                                     <CFormGroup row>    
//                                         <CCol md="3">
//                                             <CSelect custom name="ccmonth" id="ccmonth" value={this.state.programaLineChart} onChange={this.handleChangeLineChart}>
//                                                 <option value="Ingeniería Electrónica (Nocturno)" >Ingeniería Electrónica (Nocturno)</option>
//                                                 <option value="Ingeniería Eléctrica">Ingeniería Eléctrica</option>
//                                                 <option value="Ingeniería Física">Ingeniería Física</option>
//                                                 <option value="Ingeniería de Sistemas y Computación">Ingeniería de Sistemas y Computación</option>
//                                                 <option value="Ingeniería de Sistemas y Computación (Nocturno)">Ingeniería de Sistemas y Computación (Nocturno)</option>
//                                             </CSelect>
//                                         </CCol>
//                                         {/* <CCol md="3">
//                                             <CSelect custom name="ccmonth" id="ccmonth" value={this.state.programa} onChange={this.handleChange}>
//                                                 <option value="Ingeniería Electrónica (Nocturno)" >Ingeniería Electrónica (Nocturno)</option>
//                                                 <option value="Ingeniería Eléctrica">Ingeniería Eléctrica</option>
//                                                 <option value="Ingeniería Física">Ingeniería Física</option>
//                                                 <option value="Ingeniería de Sistemas y Computación">Ingeniería de Sistemas y Computación</option>
//                                                 <option value="Ingeniería de Sistemas y Computación (Nocturno)">Ingeniería de Sistemas y Computación (Nocturno)</option>
//                                             </CSelect>
//                                         </CCol> */}
//                                         <CCol md="4">
//                                         <CButton
//                                         color="primary"
//                                         onClick={this.toggleLineChartPrograma}
//                                         className={'mb-1'}
//                                         >Mostrar Gráfico</CButton>
//                                         </CCol>
//                                     </CFormGroup>
//                             </CCardFooter>
//                         </CCard>
//                     </CCol>
//                 </CRow>


//             </div>
//         );
//     }
// }

