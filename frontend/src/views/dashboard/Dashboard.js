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
  const [yearSelected, setYearSelected] = React.useState(new Date().getFullYear());
  const [dataTotal, setDataTotal] = React.useState([]);
  const [dataSemestre,setDataSemestre] = React.useState([]);
  const [collapseSemestre, setCollapseSemestre] = useState(false);
  const [collapseGeneral, setCollapseGeneral] = useState(false);

  // Funciones
  const getYears = async() => { 
    for (var i=2010;i<=actualYear; i++){
        yearsData.push(i)
    }
    setYearsData(yearsData)
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
    console.log(dataSemestre)
  };


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

  const handleChangeYear = async (event) => {
    setYearSelected(event.target.value);
  };

  // despues de definir las constantes
  useSingleton(async () => {
    await getYears();
    await getDataTotal();
  });

  return (
    <>
      <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
        Seleccione la información que desee
      </h1>
      <CFormGroup row>
        <CCol md="4">
          <CSelect value={yearSelected} onChange={handleChangeYear}>
            {yearsData.map((item) => {
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
      <CCol xs="12" lg="12">
            <CCard>
              <CCardBody>
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox 
                    custom 
                    id="inline-checkbox1" 
                    name="inline-checkbox1" 
                    value="option1" 
                  />
                  <CLabel variant="custom-checkbox" htmlFor="inline-checkbox1">Matriculados</CLabel>
                </CFormGroup>
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox custom id="inline-checkbox2" name="inline-checkbox2" value="option2" />
                  <CLabel variant="custom-checkbox" htmlFor="inline-checkbox2">Inscritos</CLabel>
                </CFormGroup>
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox custom id="inline-checkbox3" name="inline-checkbox3" value="option3" />
                  <CLabel variant="custom-checkbox" htmlFor="inline-checkbox3">Cancelados</CLabel>
                </CFormGroup>
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox custom id="inline-checkbox4" name="inline-checkbox3" value="option3" />
                  <CLabel variant="custom-checkbox" htmlFor="inline-checkbox4">Primer Curso</CLabel>
                </CFormGroup>
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox custom id="inline-checkbox5" name="inline-checkbox5" value="option3" />
                  <CLabel variant="custom-checkbox" htmlFor="inline-checkbox5">Graduados</CLabel>
                </CFormGroup>
                <CChartLine
                  datasets={[
                    {
                      label: "Matriculados",
                      fill: false,
                      borderColor: "#321fdb",
                      backgroundColor: "#321fdb",
                      data: [],
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
              </CCardBody>
            </CCard>
          </CCol>
        </CCollapse>
    </>
  );
};

export default Dashboard;
