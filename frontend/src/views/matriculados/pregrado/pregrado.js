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

export default class MatriculadosPregrado extends React.Component {
    constructor(props){
        super(props)
            this.state = {
                matriculadoSegunSexo: [],
                matriculadoSegunSexoPrograma: [],
                fields : ['Programa','Femenino', 'Masculino', 'Año'],
                collapseTable: false,
                collapseTablePrograma: false,
                programa:'Ingeniería de Sistemas y Computación',
            }
            this.handleChange = this.handleChange.bind(this);
            this.getData()
    }
    
    handleChange(event) {
        this.setState({programa: event.target.value});
        console.log(this.state.programa)
    }

    getData = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/v1/matriculadosegunsexo',
        headers: { 
            'Content-Type': 'application/json'
        },
        };
        await axios(config)
        .then( response => {
            this.setState({matriculadoSegunSexo:response.data.data})
        })
        .catch(function (error) {
        console.log(error);
        });
        // console.log(this.state.matriculadoSegunSexo);
        // console.log(this.state.matriculadoSegunSexo.data['Programa']);
    }

    getDataPrograma = async () =>{
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/v1/matriculadosegunsexo?Programa='+ this.state.programa,
        headers: { 
            'Content-Type': 'application/json'
        },
        };
        await axios(config)
        .then( response => {
            this.setState({matriculadoSegunSexoPrograma:response.data.data})
        })
        .catch(function (error) {
        console.log(error);
        });
        console.log(this.state.matriculadoSegunSexoPrograma)
    }

    toggleTablaGeneral = () => {
        this.setState({collapseTable:!this.state.collapseTable})
    }    
    toggleTablaPrograma = () => {
        this.getDataPrograma()
        this.setState({collapseTablePrograma:!this.state.collapseTablePrograma})
    }  

    render() {
        return (           
            <div>
                <CCard>
                    <CCardHeader>
                        Matriculados
                    </CCardHeader>
                    <CCardBody>
                        <p className="text-muted">
                        Para tener en cuenta:
                        </p>
                        <p className="muted">
                        Tight pants next level keffiyeh
                        <CTooltip content="Tooltip text">
                            <CLink> you probably </CLink>
                        </CTooltip>
                        haven't heard of them. Photo booth beard raw denim letterpress vegan
                        messenger bag stumptown. Farm-to-table seitan, mcsweeney's fixie
                        sustainable quinoa 8-bit american apparel terry richardson vinyl chambray.
                        Beard stumptown, cardigans banh mi lomo thundercats.
                        Tofu biodiesel williamsburg marfa, four loko mcsweeney''s cleanse vegan chambray.
                        A really ironic artisan scenester farm-to-table banksy Austin freegan cred raw 
                        denim single-origin coffee viral.
                        </p>
                    </CCardBody>
                </CCard>
                <CRow>
                    <CCol xs="12" lg="12">
                        <CCard>
                            <CCardHeader>
                                Tabla Matriculados Segun Sexo
                            </CCardHeader>
                            <CCollapse show={this.state.collapseTable}>  
                                <CCardBody>
                                    <CDataTable
                                        items={this.state.matriculadoSegunSexo}
                                        fields={this.state.fields}
                                        itemsPerPage={7}
                                        pagination
                                        columnFilter
                                    />
                                </CCardBody>
                            </CCollapse>
                            <CCardFooter>
                                <CButton
                                color="primary"
                                onClick={this.toggleTablaGeneral}
                                className={'mb-1'}
                                >Mostrar Tabla</CButton>
                            </CCardFooter>
                        </CCard>
                    </CCol>
                </CRow>

                <CRow>
                    <CCol xs="12" lg="12">
                        <CCard>
                            <CCardHeader>
                                Tabla Matriculados Segun Programa
                            </CCardHeader>
                            <CCollapse show={this.state.collapseTablePrograma}>  
                                <CCardBody>
                                    <CDataTable
                                        items={this.state.matriculadoSegunSexoPrograma}
                                        fields={this.state.fields}
                                        itemsPerPage={5}
                                        pagination
                                    />
                                </CCardBody>
                            </CCollapse>
                            <CCardFooter>
                                <CLabel htmlFor="ccmonth">Programa Académico</CLabel>
                                    <CFormGroup row>    
                                        <CCol md="4">
                                            <CSelect custom name="ccmonth" id="ccmonth" value={this.state.programa} onChange={this.handleChange}>
                                                <option value="Ingeniería Electrónica (Nocturno)" >Ingeniería Electrónica (Nocturno)</option>
                                                <option value="Ingeniería Eléctrica">Ingeniería Eléctrica</option>
                                                <option value="Ingeniería Física">Ingeniería Física</option>
                                                <option value="Ingeniería de Sistemas y Computación">Ingeniería de Sistemas y Computación</option>
                                                <option value="Ingeniería de Sistemas y Computación (Nocturno)">Ingeniería de Sistemas y Computación (Nocturno)</option>
                                            </CSelect>
                                        </CCol>
                                        <CCol md="4">
                                        <CButton
                                        color="primary"
                                        onClick={this.toggleTablaPrograma}
                                        className={'mb-1'}
                                        >Mostrar Tabla</CButton>
                                        </CCol>
                                    </CFormGroup>
                            </CCardFooter>
                        </CCard>
                    </CCol>
                </CRow>

                {/* <CRow>
                    <CCol xs="12" lg="12">
                        <CCard>
                            <CCardHeader>
                                Grafico de barras
                            </CCardHeader>
                            <CCardBody>
                                <CChartBar 
                                    datasets={[
                                        {
                                        label: 'GitHub Commits',
                                        backgroundColor: '#f87979',
                                        data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
                                        }
                                    ]}
                                    labels={this.state.matriculadoSegunSexo.Masculino}
                                    options={{
                                        tooltips: {
                                        enabled: true
                                        }
                                    }}
                                />
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow> */}


            </div>
        );
    }
}

