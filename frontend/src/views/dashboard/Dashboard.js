import React, { useState } from "react";
import axios from "axios";

import {
  CWidgetDropdown,
  CRow,
  CCol,
  CCardHeader,
  CInputCheckbox,
  CLabel,
  CCard,
  CCardBody,
  CButton,
  CFormGroup,
  CSelect,
  CCollapse,

} from "@coreui/react";
import { CChartBar, CChartLine, CChartPie } from "@coreui/react-chartjs";
import { MultiSelect } from "react-multi-select-component";

// hook personalizado
const useSingleton = (callBack = () => {}) => {
  const hasBeenCalled = React.useRef(false);
  if (hasBeenCalled.current) return;
  callBack();
  hasBeenCalled.current = true;
};

const Dashboard = () => {
  // Constantes
  const actualYear = new Date().getFullYear();
  const [yearsData, setYearsData] = React.useState([]);
  const [yearsDataGeneral, setYearsDataGeneral] = React.useState([]);
  const [yearSelected, setYearSelected] = React.useState(new Date().getFullYear());
  const [dataTotal, setDataTotal] = React.useState([]);
  //general 
  const [dataYearsGeneral, setDataYearsGeneral] = React.useState({})
  const [dataTotalPrimerSemestre, setDataTotalPrimerSemestre] = React.useState({})
  const [dataTotalSegundoSemestre, setDataTotalSegundoSemestre] = React.useState({})
  const estadosList = ['Matriculado','Inscrito','Primer curso','Cancelado','Graduado'];
  // Deserción
  const [programasList,setProgramasList] = React.useState()
  const [programasDIASelected,setProgramasDIASelected] = useState([])
  const [estadoDIASelected,setEstadoDIASelected] = React.useState('Graduado')
  const [estadosDIA,setEstadosDIA] = React.useState(['Permanece programa','Graduado','Cambio de programa','No matriculado'])
  const [opcionesMultiSelectDIA,setOpcionesMultiSelectDIA] =  React.useState([])
  const [dataSetDIA,setDataSetDIA] = React.useState([])
  const [programasDISSelected,setProgramasDISSelected] = useState([])
  const [estadoDISSelected,setEstadoDISSelected] = React.useState('Graduado')
  const [estadosDIS,setEstadosDIS] = React.useState(['Permanece programa','Graduado','Cambio de programa','No matriculado'])
  const [opcionesMultiSelectDIS,setOpcionesMultiSelectDIS] =  React.useState([])
  const [dataSetDIS,setDataSetDIS] = React.useState([])

  //Loading
  const [loadingSemestre, setLoadingSemestre] = React.useState(true)
  const [loadingYearsGeneral, setLoadingYearsGeneral] = React.useState(true)
  const [loadingDIA, setLoadingDIA] = React.useState(true)
  const [loadingGraficoDIA, setLoadingGraficoDIA] = React.useState(true)
  const [loadingDIS, setLoadingDIS] = React.useState(true)
  const [loadingGraficoDIS, setLoadingGraficoDIS] = React.useState(true)


  // Collapses constantes
  const [collapseSemestre, setCollapseSemestre] = useState(false);
  const [collapseGeneral, setCollapseGeneral] = useState(false);
  const [collapseGeneralDesercion,setCollapseGeneralDesercion] = useState(false);
  const [collapseDIA,setCollapseDIA] = useState(false);
  const [collapseDIS,setCollapseDIS] = useState(false);

  


  // Funciones
  const getYears = async() => { 
    for (var i=2010;i<=actualYear; i++){
        yearsData.push(i+'-1')
        yearsData.push(i+'-2')
        yearsDataGeneral.push(i)
    }
    setYearsData(yearsData)
    setYearsDataGeneral(yearsDataGeneral)
  }

  const getDataTotal = async () => {
    var estados = ["Inscrito","Matriculado","Primer curso","Cancelado","Graduado"];
    var variable = ["Inscrito","Matriculado","PrimerCurso","Cancelado","Graduado"];
    var axios = require("axios");
    let aux = [];
    let auxPrimer = [];
    let auxSegundo = [];
    for (var i = 0; i < estados.length; i++) {
      var config = {
        method: "get",
        url:"http://localhost:8000/api/tendencia_count?VAR=" + estados[i] +"&COD_PERIODO=" +yearSelected,
        headers: {
          "Content-Type": "application/json",
        },
      };
      var configPrimer = {
        method: "get",
        url:"http://localhost:8000/api/tendencia_count?VAR=" + estados[i] +"&COD_PERIODO=" +yearSelected+'-1',
        headers: {
          "Content-Type": "application/json",
        },
      };
      var configSegundo = {
        method: "get",
        url:"http://localhost:8000/api/tendencia_count?VAR=" + estados[i] +"&COD_PERIODO=" +yearSelected+'-2',
        headers: {
          "Content-Type": "application/json",
        },
      };
      const infoquery = await axios(config)
        .then((response) => response.data.data)
        .catch(function (error) {
          console.log(error);
          return error.response;
        });
      const infoqueryPrimer = await axios(configPrimer)
        .then((response) => response.data.data)
        .catch(function (error) {
          console.log(error);
          return error.response;
        });
        const infoquerySegundo = await axios(configSegundo)
        .then((response) => response.data.data)
        .catch(function (error) {
          console.log(error);
          return error.response;
        });  
      aux[variable[i]] = infoquery.ESTUDIANTES__sum;
      auxPrimer[variable[i]] = infoqueryPrimer.ESTUDIANTES__sum;
      auxSegundo[variable[i]] = infoquerySegundo.ESTUDIANTES__sum;
    }
    await setDataTotal(aux);
    await setDataTotalPrimerSemestre(auxPrimer);
    await setDataTotalSegundoSemestre(auxSegundo);
    await setLoadingSemestre(false)

  };

  const getDataYearsGeneral = async () => {
    var axios = require('axios');
    let aux = dataYearsGeneral
    for (var estado = 0;estado<5;estado++){
        var config = {
            method: 'get',
            url: 'http://localhost:8000/api/tendencia_count_year?VAR='+estadosList[estado],
            headers: { 
                'Content-Type': 'application/json'
            },
        };
        var query = await axios(config)    
        .then( response => response.data.data)
        .catch(function (error) {
            if(error.response.status === 404) {
                return {count:0}
            }
            else {
                return error.response
            }
        });
        var aux2 = []
        for (const j in yearsData ){
            for (const k in query){
                if (yearsData[j] === query[k].year){
                    aux2.push(query[k].count)
                }
            }
        }
        aux[estadosList[estado]] = aux2
    }
    await setDataYearsGeneral(aux)
    await setLoadingYearsGeneral(false)
  } 
  
  const getDataProgramasList = async () => {
    var axios = require('axios');
    var config = {
    method: 'get',
    url: 'http://localhost:8000/api/desercionDIA',
    headers: { 
        'Content-Type': 'application/json'
    },
    };
    const programasQuery = await axios(config)    
    .then( response => response.data.data)
    .catch(function (error) {
        console.log(error);
        return error.response
    });
    let aux = []
    for ( const i in programasQuery){
        if((programasQuery[i]['NOMBRE']!== null) ){
            aux.push(programasQuery[i]['NOMBRE'])
        }
    }
    var array = new Set(aux);
    var result = [...array];
    let aux2 = [];
    for (const j in result){ 
        aux2.push(
            {
                label: result[j],
                value: result[j],
            }
        )
    }
    await setProgramasList(aux2);
    await setLoadingDIA(false);
    await setLoadingDIS(false);
}

const getDataProgramasDIA = async () => {
  for (const i in programasDIASelected){
    opcionesMultiSelectDIA.push(programasDIASelected[i].value)
  }
  console.log(opcionesMultiSelectDIA)
  setOpcionesMultiSelectDIA(opcionesMultiSelectDIA)
  setOpcionesMultiSelectDIA([])
  var axios = require('axios');
  var aux = yearsData;
  for (var opcion = 0;opcion< opcionesMultiSelectDIA.length;opcion++){
    var config = {
        method: 'get',
        url: 'http://localhost:8000/api/desercionDIA_count_year?ESTADO='+estadoDIASelected+'&NOMBRE='+ opcionesMultiSelectDIA[opcion],
        headers: { 
            'Content-Type': 'application/json'
        },
    };
      var query = await axios(config)    
      .then( response => response.data.data)
      .catch(function (error) {
          if(error.response.status === 404) {
              return {count:0}
          }
          else {
              return error.response
          }
      });
      let aux2 = []
      for (const j in yearsData ){
          for (const k in query){
              if (yearsData[j] === query[k].year){
                  aux2[j] = query[k].count
              }
          }
      }
      for (const k in yearsData){
          if(!aux2[k]){
              aux2[k] = 0;
          }
      }
      aux[opcionesMultiSelectDIA[opcion]] = aux2
      aux2 = []
  }
  await setLoadingGraficoDIA(false)        
  let dataSet  = []
  console.log(opcionesMultiSelectDIA)
  for (const i in opcionesMultiSelectDIA){
      let color = Math.random()*255
      let color1 = Math.random()*255
      let color2 = Math.random()*255
      dataSet.push({
          label: opcionesMultiSelectDIA[i],
          fill:false,
          borderColor: "rgba("+color+","+color1+","+color2+")",
          backgroundColor: "rgba("+color+","+color1+","+color2+")",
          data: aux[opcionesMultiSelectDIA[i]]
      })
  }
  console.log(dataSet)
  setDataSetDIA(dataSet)
}


const getDataProgramasDIS = async () => {
  for (const i in programasDISSelected){
    opcionesMultiSelectDIS.push(programasDISSelected[i].value)
  }
  console.log(opcionesMultiSelectDIS)
  setOpcionesMultiSelectDIS(opcionesMultiSelectDIS)
  setOpcionesMultiSelectDIS([])
  var axios = require('axios');
  var aux = yearsData;
  for (var opcion = 0;opcion< opcionesMultiSelectDIS.length;opcion++){
    var config = {
        method: 'get',
        url: 'http://localhost:8000/api/desercionDIS_count_year?ESTADO='+estadoDISSelected+'&NOMBRE='+ opcionesMultiSelectDIS[opcion],
        headers: { 
            'Content-Type': 'application/json'
        },
    };
      var query = await axios(config)    
      .then( response => response.data.data)
      .catch(function (error) {
          if(error.response.status === 404) {
              return {count:0}
          }
          else {
              return error.response
          }
      });
      let aux2 = []
      for (const j in yearsData ){
          for (const k in query){
              if (yearsData[j] === query[k].year){
                  aux2[j] = query[k].count
              }
          }
      }
      for (const k in yearsData){
          if(!aux2[k]){
              aux2[k] = 0;
          }
      }
      aux[opcionesMultiSelectDIS[opcion]] = aux2
      aux2 = []
  }
  await setLoadingGraficoDIS(false)        
  let dataSet  = []
  console.log(opcionesMultiSelectDIS)
  for (const i in opcionesMultiSelectDIS){
      let color = Math.random()*255
      let color1 = Math.random()*255
      let color2 = Math.random()*255
      dataSet.push({
          label: opcionesMultiSelectDIS[i],
          fill:false,
          borderColor: "rgba("+color+","+color1+","+color2+")",
          backgroundColor: "rgba("+color+","+color1+","+color2+")",
          data: aux[opcionesMultiSelectDIS[i]]
      })
  }
  console.log(dataSet)
  setDataSetDIS(dataSet)
}

  React.useEffect(async () => {
    await getDataTotal();
  },[yearSelected]);

  React.useEffect(async () => {
    await getDataProgramasDIA();
  },[estadoDIASelected]);

  React.useEffect(async () => {
    await getDataProgramasDIS();
  },[estadoDISSelected]);


  const toggleSemestre = (e) => {
    setCollapseSemestre(!collapseSemestre);
    setCollapseGeneral(false)
    setCollapseGeneralDesercion(false)
    e.preventDefault();
  };
  const toggleGeneral = (e) => {
    setCollapseGeneral(!collapseGeneral);
    setCollapseSemestre(false)
    setCollapseGeneralDesercion(false)
    e.preventDefault();
  };

  const toggleDesercion = (e) => {
    setCollapseGeneralDesercion(!collapseGeneralDesercion);
    setCollapseGeneral(false)
    setCollapseSemestre(false)
    e.preventDefault();
  }
  const toggleDesercionDIA = (e) => {
    setCollapseDIA(!collapseDIA);
    getDataProgramasDIA();
    e.preventDefault();
  }
  const toggleDesercionDIS = (e) => {
    setCollapseDIS(!collapseDIS);
    getDataProgramasDIS();
    e.preventDefault();
  }

  // HandleChange
  const handleChangeYear = async (event) => {
    setYearSelected(event.target.value);
    await setLoadingSemestre(true)
  };

  const handleChangeEstadoDIA = async (event) =>  {
    setEstadoDIASelected(event.target.value);
    setCollapseDIA(false);
  }

  const handleChangeEstadoDIS = async (event) =>  {
    setEstadoDISSelected(event.target.value);
    setCollapseDIS(false);
  }

  

  // despues de definir las constantes
  useSingleton(async () => {
    await getYears();
    await getDataTotal();
    await getDataYearsGeneral();
    await getDataProgramasList();
  });

  return (
    <>
      <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
        Seleccione la información que desee
      </h1>
      <CCard>
        <div className="container ">
          <div className="row row-cols-4"  style={{ margin: "3%"}}>
            <div className="col">
              <CSelect value={yearSelected} onChange={handleChangeYear}>
                {yearsDataGeneral.map((item) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </CSelect>
            </div>
            <div className="col">
              <CButton
              color="outline-success"
              onClick={toggleSemestre}
              className={"mb-1"}
              >
                Mostrar información del año: {yearSelected}
              </CButton>
            </div>
            <div className="col">
              <CButton
                color="outline-info"
                onClick={toggleGeneral}
                className={"mb-1"}
              >
                Mostrar información general
              </CButton>
            </div>
            <div className="col">
              <CButton
                color="outline-warning"
                onClick={toggleDesercion}
                className={"mb-1"}
              >
                Mostrar índices de deserción
              </CButton>
            </div>
          </div>
        </div> 
      </CCard>

      <CCard>
        <CCollapse show={collapseSemestre}>
          <CCard>
              <h2 style={{textAlign: "center",fontWeight: "bold",marginTop:'2%'}}>
                Información General del año {yearSelected}
              </h2>
            <CCardBody>
              {loadingSemestre?
                <div class="spinner-border text-info" role="status">
                  <span class="sr-only">Loading...</span>
                </div>:
                <div>                               
                  <div className="row">
                    <CCol lg="1"></CCol>
                    <CCol sm="3" lg="2" xs="12">
                      <CWidgetDropdown
                        color="gradient-primary"
                        header={dataTotal.Matriculado}
                        text="Matriculados"
                      ></CWidgetDropdown>
                    </CCol>
                    <CCol sm="3" lg="2">
                      <CWidgetDropdown
                        color="gradient-success"
                        header={dataTotal.Inscrito}
                        text="Inscritos"
                      ></CWidgetDropdown>
                    </CCol>
                    <CCol sm="3" lg="2">
                      <CWidgetDropdown
                        color="gradient-warning"
                        header={dataTotal.PrimerCurso}
                        text="Primer Curso"
                      ></CWidgetDropdown>
                    </CCol>
                    <CCol sm="3" lg="2">
                      <CWidgetDropdown
                        color="gradient-danger"
                        header={dataTotal.Cancelado}
                        text="Cancelados"
                      ></CWidgetDropdown>
                    </CCol>
                    <CCol sm="3" lg="2">
                      <CWidgetDropdown
                        color="gradient-dark"
                        header={dataTotal.Graduado}
                        text="Graduados"
                      ></CWidgetDropdown>
                    </CCol>
                  </div>
                  <div className="row">
                    <CCol >
                      <CCard className="mt-3">
                        <CCardBody>
                          <h2 style={{textAlign: 'center',fontWeight: "bold"}}>
                            {yearSelected+'-1'}
                          </h2>
                          <CChartPie
                          datasets={[
                          {
                              backgroundColor: [
                              '#321fdb',
                              '#2eb85c',
                              '#e55353',
                              '#f9b115',
                              '#636f83',
                              ],
                              data: [
                                dataTotalPrimerSemestre.Matriculado,
                                dataTotalPrimerSemestre.Inscrito,
                                dataTotalPrimerSemestre.PrimerCurso,
                                dataTotalPrimerSemestre.Cancelado,
                                dataTotalPrimerSemestre.Graduado
                              ]
                          }
                          ]}
                          labels={['Matriculados', 'Inscritos','Primer Curso','Cancelados','Graduados']}
                          options={{
                          tooltips: {
                              enabled: true
                          }
                          }}
                          />
                        </CCardBody>
                      </CCard>
                    </CCol>
                    <CCol xs={6}>
                      <CCard className="mt-3">
                        <CCardBody>
                          <h2 style={{textAlign: 'center',fontWeight: "bold"}}>
                            {yearSelected+'-2'}
                          </h2>
                          <CChartPie
                          datasets={[
                          {
                              backgroundColor: [
                              '#321fdb',
                              '#2eb85c',
                              '#e55353',
                              '#f9b115',
                              '#636f83',
                              ],
                              data: [
                                dataTotalSegundoSemestre.Matriculado,
                                dataTotalSegundoSemestre.Inscrito,
                                dataTotalSegundoSemestre.PrimerCurso,
                                dataTotalSegundoSemestre.Cancelado,
                                dataTotalSegundoSemestre.Graduado
                              ]
                          }
                          ]}
                          labels={['Matriculados', 'Inscritos','Primer Curso','Cancelados','Graduados']}
                          options={{
                          tooltips: {
                              enabled: true
                          }
                          }}
                          />
                        </CCardBody>
                      </CCard>
                    </CCol>                            
                  </div>
                </div>                   
              }
            </CCardBody>
          </CCard>
        </CCollapse>

        <CCollapse show={collapseGeneral}>
        <CFormGroup row>
          <CCol xs="12" lg="12">
                <CCard>
                  <CCardBody>
                    {loadingYearsGeneral?
                      <div class="spinner-border text-info" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>:               
                      <CChartLine
                        datasets={[
                          {
                            label: "Matriculados",
                            fill: false,
                            borderColor: "#321fdb",
                            backgroundColor: "#321fdb",
                            data: dataYearsGeneral['Matriculado'],
                          },
                          {
                            label: "Inscritos",
                            fill: false,
                            borderColor: "#2eb85c",
                            backgroundColor: "#2eb85c",
                            data: dataYearsGeneral['Inscrito'],
                          },
                          {
                            label: "Cancelados",
                            fill: false,
                            borderColor: "#e55353",
                            backgroundColor: "#e55353",
                            data: dataYearsGeneral['Canceladdo'],
                          },
                          {
                            label: "Primer Curso",
                            fill: false,
                            borderColor: "#f9b115",
                            backgroundColor: "#f9b115",
                            data: dataYearsGeneral['Primer curso'],
                          },
                          {
                            label: "Graduados",
                            fill: false,
                            borderColor: "#636f83",
                            backgroundColor: "#636f83",
                            data: dataYearsGeneral['Graduado'],
                          },
                        ]}
                        options={{
                          tooltips: {
                            enabled: true,
                          },
                        }}
                        labels={yearsData}
                      />
                  }
                </CCardBody>
              </CCard>
            </CCol>
          </CFormGroup>
        </CCollapse>

        <CCollapse show={collapseGeneralDesercion}>          
          <CCard>
            <h3 style={{textAlign: 'center', fontWeight:'bold',color:'#f9b115'}}>
              Deserción InterAnual
            </h3>
            {loadingDIA?
              <div class="spinner-border text-info" role="status" style={{align: 'center'}}>
                  <span class="sr-only">Loading...</span>
              </div> :
              <CFormGroup row>
                  <CCol md="1"></CCol>
                  <CCol md="3">
                    <CSelect value={estadoDIASelected} onChange={handleChangeEstadoDIA}>
                          {estadosDIA.map(item => {
                              return (<option key={item} value={item}>{item}</option>);
                          })}
                    </CSelect>
                  </CCol>
                  <CCol md="4">
                      <MultiSelect
                          options={programasList}
                          value={programasDIASelected}
                          onChange={setProgramasDIASelected}
                      />
                  </CCol>
                  <CCol md="3">
                      <CButton
                          color="outline-warning"
                          onClick={toggleDesercionDIA}
                          className={'mb-1'}
                      >Graficar
                      </CButton>
                  </CCol>                                
              </CFormGroup>
            }
          </CCard>
          <CCollapse show={collapseDIA}>
            {loadingGraficoDIA? 
              <div class="spinner-border text-info" role="status">
                <span class="sr-only">Loading...</span>
              </div> : 
              <CCardBody>
                <CChartLine
                  datasets={dataSetDIA}
                  options={{
                  tooltips: {
                      enabled: true
                  }                                        
                  }}
                  labels= {yearsData} 
                />
              </CCardBody>
            }
          </CCollapse>


            <h3 style={{textAlign: 'center', fontWeight:'bold',color:'red'}}>
              Deserción Intersemestral
            </h3>
            {loadingDIS?
              <div class="spinner-border text-info" role="status" style={{align: 'center'}}>
                  <span class="sr-only">Loading...</span>
              </div> :
              <CFormGroup row>
                  <CCol md="1"></CCol>
                  <CCol md="3">
                    <CSelect value={estadoDISSelected} onChange={handleChangeEstadoDIS}>
                          {estadosDIS.map(item => {
                              return (<option key={item} value={item}>{item}</option>);
                          })}
                    </CSelect>
                  </CCol>
                  <CCol md="4">
                      <MultiSelect
                          options={programasList}
                          value={programasDISSelected}
                          onChange={setProgramasDISSelected}
                      />
                  </CCol>
                  <CCol md="3">
                      <CButton
                          color="outline-danger"
                          onClick={toggleDesercionDIS}
                          className={'mb-1'}
                      >Graficar
                      </CButton>
                  </CCol>                                
              </CFormGroup>
            }
            <CCollapse show={collapseDIS}>
              {loadingGraficoDIS? 
                <div class="spinner-border text-info" role="status">
                  <span class="sr-only">Loading...</span>
                </div> : 
                <CCardBody>
                  <CChartLine
                    datasets={dataSetDIS}
                    options={{
                    tooltips: {
                        enabled: true
                    }                                        
                    }}
                    labels= {yearsData} 
                  />
                </CCardBody>
              }
          </CCollapse>
        </CCollapse>
      </CCard>                
      
    </>
  );
};

export default Dashboard;
