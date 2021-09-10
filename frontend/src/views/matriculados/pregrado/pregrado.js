import React from "react";
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
} from "@coreui/react";
import usersData from '../../users/UsersData'

export default class MatriculadosPregrado extends React.Component {
    constructor(props){
        super(props)
            this.state = {
                matriculadoSegunSexo: [],
                fields : ['Programa','Femenino', 'Masculino', 'Año'],
            }       
        this.getData()
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
    }

    loopPrueba = () =>{
        console.log(this.state.matriculadoSegunSexo)
        return(
            <>
            
            </>
        )
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
                            
                        <CCardBody>
                                {this.loopPrueba()}
                                <CDataTable
                                        items={this.state.matriculadoSegunSexo}
                                        fields={this.state.fields}
                                        itemsPerPage={7}
                                        pagination
                                        columnFilter

                                />

                        </CCardBody>
                    </CCard>
                    </CCol>
                </CRow>
            </div>
        );
    }
}
