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
  const [dataSemestre,setDataSemestre] = React.useState([]);
  const [collapseSemestre, setCollapseSemestre] = useState(false);
  const [collapseGeneral, setCollapseGeneral] = useState(false);
  //general 
  const [estadosGeneral,setEstadosGeneral] = useState([]);
  const estadosGeneralCheckBox = ['Matriculado','Inscrito','Primer curso','Cancelado','Graduado'];
  const [checkedMatriculados, setCheckedMatriculados] = React.useState(false);
  const [checkedInscritos, setCheckedInscritos] = React.useState(false);
  const [checkedPrimerCurso, setCheckedPrimerCurso] = React.useState(false);
  const [checkedCancelados, setCheckedCancelados] = React.useState(false);
  const [checkedGraduados, setCheckedGraduados] = React.useState(false);
  const [collapseGeneralChart,setCollapseGeneralChart] = useState(false);
  const [dataGeneral, setDataGeneral] = React.useState([]);


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

  const getDataSemestre = async () => {
    var estados = ["Inscrito","Matriculado","Primer curso","Cancelado","Graduado"];
    var variable = ["Inscrito","Matriculado","PrimerCurso","Cancelado","Graduado"];
    var axios = require("axios");
    let aux = dataTotal;
    for (var j=1;j<3;j++){
      for (var i = 0; i < 5; i++) {
      var config = {
        method: "get",
        url:"http://localhost:8000/api/tendencia_count?VAR=" + estados[i] +"&COD_PERIODO=" +yearSelected+'-'+j,
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
      aux[variable[i]+j] = infoquery.ESTUDIANTES__sum;
      }
    }
    await setDataSemestre(aux);
  };


  const getDataYearsGeneral = async () => {
    var axios = require("axios");
    let aux = dataTotal;
    for (var j=0;j<5;j++){
      var config = {
        method: "get",
        url:"http://localhost:8000/api/tendencia_count_year?VAR=" + estadosGeneralCheckBox[j],
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
      aux[j] = infoquery;
      }
    console.log(aux);
    await setDataGeneral(aux);
    // console.log(dataGeneral.Matriculado);
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

  const handleChangeCheckboxMatriculados = () => {
    setCheckedMatriculados(!checkedMatriculados);
    console.log(checkedMatriculados)
    };
  const handleChangeCheckboxInscritos = () => {
    setCheckedInscritos(!checkedInscritos);
  };
  const handleChangeCheckboxGraduados = () => {
    setCheckedGraduados(!checkedGraduados);
  };
  const handleChangeCheckboxPrimerCurso = () => {
    setCheckedPrimerCurso(!checkedPrimerCurso);
  };
  const handleChangeCheckboxCancelados = () => {
    setCheckedCancelados(!checkedCancelados);
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
      <CFormGroup row>
        <CCol md="4">
          <CSelect value={yearSelected} onChange={handleChangeYear}>
            {yearsDataGeneral.map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </CSelect>
        </CCol>
        <CCol md="3">
          <CButton
            color="outline-primary"
            onClick={toggleSemestre}
            className={"mb-1"}
          >
            Mostrar información del año: {yearSelected}
          </CButton>
        </CCol>
        <CCol md="3">
          <CButton
            color="outline-primary"
            onClick={toggleGeneral}
            className={"mb-1"}
          >
            Mostrar información general
          </CButton>
        </CCol>
      </CFormGroup>

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
            <CCol xs={6}>
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

      <CCollapse show={collapseGeneral}>
      <CFormGroup row>
        <CCol xs="12" lg="12">
              <CCard>
                <CCardBody>
                  <CFormGroup variant="custom-checkbox" inline>
                    <CInputCheckbox custom id="inline-checkbox1"value="Matriculados"checked={checkedMatriculados} onChange={handleChangeCheckboxMatriculados}/>
                    <CLabel variant="custom-checkbox" htmlFor="inline-checkbox1">Matriculados</CLabel>
                  </CFormGroup>
                  <CFormGroup variant="custom-checkbox" inline>
                    <CInputCheckbox custom id="inline-checkbox2" value="Inscritos" checked={checkedInscritos} onChange={handleChangeCheckboxInscritos}/>
                    <CLabel variant="custom-checkbox" htmlFor="inline-checkbox2">Inscritos</CLabel>
                  </CFormGroup>
                  <CFormGroup variant="custom-checkbox" inline>
                    <CInputCheckbox custom id="inline-checkbox3"  value="Cancelados" checked={checkedCancelados} onChange={handleChangeCheckboxCancelados}/>
                    <CLabel variant="custom-checkbox" htmlFor="inline-checkbox3">Cancelados</CLabel>
                  </CFormGroup>
                  <CFormGroup variant="custom-checkbox" inline>
                    <CInputCheckbox custom id="inline-checkbox4"  value="PrimerCurso" checked={checkedPrimerCurso} onChange={handleChangeCheckboxPrimerCurso} />
                    <CLabel variant="custom-checkbox" htmlFor="inline-checkbox4">Primer Curso</CLabel>
                  </CFormGroup>
                  <CFormGroup variant="custom-checkbox" inline>
                    <CInputCheckbox custom id="inline-checkbox5" value="Graduados" checked={checkedGraduados} onChange={handleChangeCheckboxGraduados} />
                    <CLabel variant="custom-checkbox" htmlFor="inline-checkbox5">Graduados</CLabel>
                  </CFormGroup>
                  <CFormGroup variant="custom-checkbox" inline>
                  <CButton
                      color="outline-primary"
                      onClick={toggleGeneralChart}
                      className={"mb-4"}
                    >
                      Mostrar Gráfico
                    </CButton>
                  </CFormGroup>
                  <CRow xs={3}></CRow>
                  <CCollapse show={collapseGeneralChart}>
                    <CChartLine
                      datasets={[
                        {
                          label: "Matriculados",
                          fill: false,
                          borderColor: "#321fdb",
                          backgroundColor: "#321fdb",
                          data: [dataGeneral.Matriculado],
                        },
                        {
                          label: "Inscritos",
                          fill: false,
                          borderColor: "#2eb85c",
                          backgroundColor: "#2eb85c",
                          data: [],
                        },
                        {
                          label: "Cancelados",
                          fill: false,
                          borderColor: "#e55353",
                          backgroundColor: "#e55353",
                          data: [],
                        },
                        {
                          label: "Primer Curso",
                          fill: false,
                          borderColor: "#f9b115",
                          backgroundColor: "#f9b115",
                          data: [],
                        },
                        {
                          label: "Graduados",
                          fill: false,
                          borderColor: "#636f83",
                          backgroundColor: "#636f83",
                          data: [],
                        },
                      ]}
                      options={{
                        tooltips: {
                          enabled: true,
                        },
                      }}
                      labels={yearsData}
                    />
                  </CCollapse>
                </CCardBody>
              </CCard>
            </CCol>
          </CFormGroup>
        </CCollapse>
    </>
  );
};

export default Dashboard;
