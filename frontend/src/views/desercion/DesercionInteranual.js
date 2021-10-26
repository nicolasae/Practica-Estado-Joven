import React,{ useState } from "react";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
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
      CChartPie,
    } from '@coreui/react-chartjs'

 // hook personalizado
 const useSingleton = (callBack = () => { }) => { const hasBeenCalled = React.useRef(false);     if (hasBeenCalled.current) return;     callBack();     hasBeenCalled.current = true; }

 const DesercionInteranual = () =>{
    // constantes
    const actualYear = new Date().getFullYear()
    const [yearsData,setYearsData] = React.useState([])
    const [nivelData,setNivelData] = React.useState(['Pregrado','Posgrado'])
    const [yearSelected, setYearSelected] = React.useState(new Date().getFullYear());
    const [nivelSelected, setNivelSelected] = React.useState('Pregrado');
    const [collapseGeneral, setCollapseGeneral] = useState(false);
    const [dataDIA, setDataDIA] = useState([])
    const fieldsTablaDIA = ['Periodo','NoMatriculado','PermanecePrograma','CambiodePrograma','Graduado']
    const [pruebaDIA,setPruebaDIA] = React.useState([])
    const [loadingGeneralDIA, setLoadingGeneralDIA] = React.useState(false)

    // Funciones
    const getYears = async() => { 
        for (var i=2010;i<=actualYear; i++){
            yearsData.push(i+'-1')
            yearsData.push(i+'-2')
        }
        setYearsData(yearsData)
    }

    const getDataTablaDIA = async () => {
        var estados = ['No matriculado','Permanece programa','Cambio de programa','Graduado']
        var aux = dataDIA
        var axios = require('axios');
        for (var estado=0;estado<4;estado++){
            for (var i=0;i<yearsData.length-2;i++){
                var config = {
                method: 'get',
                url: 'http://localhost:8000/api/desercionDIA_count?NIVEL='+ nivelSelected+'&COD_PERIODO='+yearsData[i]+'&ESTADO='+estados[estado] ,
                headers: { 
                    'Content-Type': 'application/json'
                },
                };
                const dataquery = await axios(config)    
                .then( response => response.data.data)
                .catch(function (error) {
                    if(error.response.status === 404) {
                        return {CANTIDAD__sum:0}
                    }
                    else {
                        return error.response
                    }
                });
                aux[estados[estado]+ yearsData[i]]= dataquery.CANTIDAD__sum 
            }
            await setDataDIA(aux)
        }
        await setLoadingGeneralDIA(false);
        
    }

    

    React.useEffect(async () => { 
        await getDataTablaDIA()
    },[nivelSelected])

    const handleChangeYear = async (event) => {
        setYearSelected(event.target.value);
      };
    
    const handleChangeNivel = async (event) => {
        setNivelSelected(event.target.value);
        await setLoadingGeneralDIA(true);
    };

    const toggleGeneral = (e)=>{
        setCollapseGeneral(!collapseGeneral);
        e.preventDefault();
    }
    
    // despues de definir las constantes
    useSingleton(async () => {
        await getYears();
        await getDataTablaDIA();

    });

    return(
        <>
        <h1 style={{textAlign: 'center', fontWeight:'bold'}}>Deserción Interanual</h1>  
        <CCard>
            <CCardBody>
                <p className="text-muted">
                Para tener en cuenta:
                </p>
                <p className="muted">
                    <b>Definición: </b>La deserción interanual representa el porcentaje de 
                    estudiantes matriculados en un periodo académico que se ausentan de la 
                    institución durante dos periodos consecutivos.
                </p>
                    El ministerio de Educación Nacional define este porcentaje: 
                    <b> No matriculados / (Matrícula total del semestre)</b> teniendo en cuenta
                    las siguientes consideraciones:
                <p>
                <p></p>
                    <b>Período base (n): </b>Período para el cuál se está calculando la deserción.
                <p></p>
                    <b>Graduado: </b> Estudiante que esta matrículado en el período base <b>(n)</b>
                    que obtiene su título en el mismo período base <b>(n)</b>, o en alguno de los
                    semestres siguientes <b>(n+1</b>o <b>n+2)</b> Nota: Este valor no coincide con el
                    total de graduados en un período, porque se toman 3 períodos de observación
                    <b>(n,n+1</b> y <b>n+2)</b>.
                <p></p>
                    <b>Permanece Programa: </b>Estudiantes que estaba matriculado en <b>n </b> y está 
                    matriculado en el periodo <b>n+1 </b>o <b>n+2</b> sin cambiar de programa académico.
                <p></p>
                    <b>Cambio de  Programa: </b>Estudiantes que estaba matriculado en <b>n </b> y está 
                    matriculado en el periodo <b>n+1 </b>o <b>n+2</b> en otro programa académico
                <p></p>
                    <b>No matriculado: </b>Estudiantes que estaba matriculado en <b>n </b> y no aparece con
                    estado Graduado o Permanece programa o Cambio programa.
                </p>
            </CCardBody>
        </CCard>
        <CCard>
            <CRow row style={{paddingTop:'2%'}}>
                <CCol md="3">
                    <h4 style={{marginLeft: '10px'}}>Seleccione nivel:</h4>
                </CCol>
                <CCol md="2">
                    <CSelect value={nivelSelected} onChange={handleChangeNivel}>
                        {nivelData.map(item => {
                            return (<option key={item} value={item}>{item}</option>);
                        })}
                    </CSelect>
                </CCol>
                {/* <CCol md="2">
                    <h4 style={{marginLeft: '10px'}}>Seleccione el período :</h4>
                </CCol>
                <CCol md="2">
                    <CSelect value={yearSelected} onChange={handleChangeYear}>
                        {yearsData.map(item => {
                            return (<option key={item} value={item}>{item}</option>);
                        })}
                    </CSelect>
                </CCol> */}
                <CCol md="2">
                    <CButton
                        color="outline-primary"
                        onClick={toggleGeneral} 
                        className={'mb-1'}
                    >Aplicar
                    </CButton>
                </CCol>
            </CRow>
            <CCollapse show={collapseGeneral}>
                {loadingGeneralDIA?
                    <div class="spinner-border text-info" role="status">
                        <span class="sr-only">Loading...</span>
                    </div> :
                    <CCardBody>
                        <h3 style={{paddingTop:'2%',textAlign: 'center', fontWeight:'bold'}}>
                            Cantidad de Estudiantes según Estado Interanual por perido de Analisis
                        </h3>
                        <CDataTable
                            items={pruebaDIA}
                            fields={fieldsTablaDIA}
                            itemsPerPage={8}
                            pagination
                            columnFilter
                            align='middle'
                            color='primary'
                            borderColor="dark"
                            bordered={true}
                        >
                            
                        </CDataTable>
                    </CCardBody>
                }
            </CCollapse>
        </CCard>  
        <CCard>

        </CCard>
                
        </> 
    )    
}

export default DesercionInteranual