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
  const [collapseSemestre, setCollapseSemestre] = useState(false);
  const [collapseGeneral, setCollapseGeneral] = useState(false);
  //general 
  const [dataYearsGeneral, setDataYearsGeneral] = React.useState({})
  const estadosList = ['Matriculado','Inscrito','Primer curso','Cancelado','Graduado'];
  const [collapseGeneralChart,setCollapseGeneralChart] = useState(false);
  const [loadingYearsGeneral, setLoadingYearsGeneral] = React.useState(true)



  // Funciones
  const getYears = async() => { 
    for (var i=2010;i<=actualYear; i++){
        yearsData.push(i+'-1')
        yearsData.push(i+'-2')
    }
    setYearsData(yearsData)
  }

  const getYearsGeneral = async() => { 
    for (var i=2010;i<=actualYear; i++){
        yearsDataGeneral.push(i)
    }
    setYearsDataGeneral(yearsDataGeneral)
}


  const getDataTotal = async () => {
    var estados = ["Inscrito","Matriculado","Primer curso","Cancelado","Graduado"];
    var variable = ["Inscrito","Matriculado","PrimerCurso","Cancelado","Graduado"];
    var axios = require("axios");
    let aux = dataTotal;
    for (var i = 0; i < 5; i++) {
      var config = {
        method: "get",
        url:"http://localhost:8000/api/tendencia_count?VAR=" + estados[i] +"&COD_PERIODO=" +yearSelected,
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
      aux[variable[i]] = infoquery.ESTUDIANTES__sum;
    }
    await setDataTotal(aux);
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
    setLoadingYearsGeneral(false)
  }

  

  React.useEffect(async () => {
    await getDataTotal();
  });

  const toggleSemestre = (e) => {
    setCollapseSemestre(!collapseSemestre);
    setCollapseGeneral(false)
    e.preventDefault();
  };
  const toggleGeneral = (e) => {
    setCollapseGeneral(!collapseGeneral);
    setCollapseSemestre(false)
    e.preventDefault();
  };
  const toggleGeneralChart = (e) => {
    setCollapseGeneralChart(!collapseGeneralChart);
    
  };

  const handleChangeYear = async (event) => {
    setYearSelected(event.target.value);
  };

  

  // despues de definir las constantes
  useSingleton(async () => {
    await getYears();
    await getYearsGeneral();
    await getDataTotal();
    await getDataYearsGeneral();
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
          </div>
          <div>
              <CCollapse show={collapseSemestre}>
                <CRow>
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
                </CRow>
              <CFormGroup row>
                  <CCol >
                    <CCard className="mt-3">
                      <CCardBody>
                        <h2 style={{textAlign: 'center',fontWeight: "bold"}}>{yearSelected+'-1'}</h2>
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
                            data: [dataTotal.Matriculado,dataTotal.Inscrito,dataTotal.PrimerCurso,dataTotal.Cancelado,dataTotal.Graduado]
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
                        <h2 style={{textAlign: 'center',fontWeight: "bold"}}>{yearSelected+'-2'}</h2>
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
                            data: [dataTotal.Matriculado,dataTotal.Inscrito,dataTotal.PrimerCurso,dataTotal.Cancelado,dataTotal.Graduado]
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
                </CFormGroup>
            </CCollapse>
          </div>
        </div> 
      </CCard>

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


    </>
  );
};

export default Dashboard;
