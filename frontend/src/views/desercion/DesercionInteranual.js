import React,{ useState } from "react";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CDataTable,
    CCollapse,
    CButton,
    CFormGroup,
    CLabel,
    CSelect,
    CWidgetDropdown,
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
    const [yearSelected, setYearSelected] = React.useState((new Date().getFullYear()-1)+'-2');
    const [yearSelectedNext, setYearSelectedNext] = React.useState()
    const [nivelSelected, setNivelSelected] = React.useState('Pregrado');
    const [collapseGeneral, setCollapseGeneral] = useState(false);
    const [dataTablaDIA, setDataTablaDIA] = useState([])
    const fieldsTablaDIA = ['COD_PERIODO','NOMBRE','DURACION_SEMESTRES','ESTADO','CANTIDAD']
    const [collapseProgramas, setCollapseProgramas] = useState(false);
    const [loadingProgramasDIA, setLoadingProgramasDIA] = React.useState(false)
    const [dataYearsGeneral, setDataYearsGeneral] = React.useState({})
    const [loadingYearsGeneral, setLoadingYearsGeneral] = React.useState(true)
    const [loadingGeneralDIA, setLoadingGeneralDIA] = React.useState(false)
    const [dataYearsWidget, setDataYearsWidget] = React.useState([]);


    // Funciones
    const getYears = async() => { 
        for (var i=2010;i<=actualYear-1; i++){
            yearsData.push(i+'-1')
            yearsData.push(i+'-2')
        }
        setYearsData(yearsData)
    }

    const getDataTablaDIA = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/desercionDIA?NIVEL='+ nivelSelected,
        headers: { 
            'Content-Type': 'application/json'
        },
        };
        const dataQuery = await axios(config)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        await setDataTablaDIA(dataQuery)
        await setLoadingGeneralDIA(false);

    }

    const getDataYearsGeneral = async() =>{ 
        var estados= ['Graduado','No matriculado','Cambio de programa','Permanece programa']
        var axios = require('axios');
        let aux = dataYearsGeneral
        for (var estado = 0;estado<estados.length;estado++){
            var config = {
                method: 'get',
                url: 'http://localhost:8000/api/desercionDIA_count_year?ESTADO='+estados[estado],
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
            aux[estados[estado]] = aux2
        }
        await setDataYearsGeneral(aux)
        setLoadingYearsGeneral(false)
    }

    const getDataYearWidget = async () => {
        var axios = require('axios');
        var estados = ['Graduado','Cambio de programa','Permanece programa','No matriculado']
 
        let aux = dataYearsWidget
        for (var estado=0; estado < estados.length; estado++) {
            console.log('entro')
            var config = {
            method: 'get',
            url: 'http://localhost:8000/api/desercionDIA_count?NIVEL='+ nivelSelected+'&COD_PERIODO='+yearSelected+'&ESTADO='+estados[estado],
            headers: { 
                'Content-Type': 'application/json'
            },
            };
            const query = await axios(config)    
            .then( response => response.data.data)
            .catch(function (error) {
                console.log(error);
                return error.response
            });
            console.log(query.CANTIDAD__sum)
            aux[estados[estado]] = query.CANTIDAD__sum;

        }
        console.log(aux)
    }

    const yearNext = async() => {
        var aux = yearSelected.split("-");
        var year 
        var aux2
        if (aux[1]==='1'){
            year = aux[0]+'-2';
        }
        if (aux[1]==='2'){
            aux2 = Number(aux[0])
            year = aux2+'-1';
        }
        // console.log(aux2)
        await setYearSelectedNext(year)
    }

    

    React.useEffect(async () => { 
        await getDataTablaDIA()
    },[nivelSelected])

    React.useEffect(async () => { 
        await getDataYearsGeneral()
        await getDataYearWidget()
    },[yearSelected],[yearSelectedNext])

    const handleChangeYear = async (event) => {
        setYearSelected(event.target.value);
        yearNext();
    };
    
    const handleChangeNivel = async (event) => {
        setNivelSelected(event.target.value);
        await setLoadingGeneralDIA(true);
    };

    const toggleGeneral = (e)=>{
        setCollapseGeneral(!collapseGeneral);
        setCollapseProgramas(false);
        e.preventDefault();
    }
    const toggleProgramas = (e)=>{
        setCollapseProgramas(!collapseProgramas);
        setCollapseGeneral(false);
        e.preventDefault();
    }
    
    // despues de definir las constantes
    useSingleton(async () => {
        await getYears();
        await getDataTablaDIA();
        await getDataYearsGeneral();
        await getDataYearWidget();

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

                <h3 style={{paddingTop:'2%',textAlign: 'left', fontWeight:'bold'}}>
                    Linea de tendencia en el tiempo por cada estado: 
                </h3>
                <CCardBody>
                    <CChartLine
                        datasets={[
                        
                        {   
                            label: 'Graduado',
                            fill:false,
                            borderColor: 'Red',
                            backgroundColor: 'Red',
                            data: dataYearsGeneral['Graduado'],
                        },
                        {
                            label: 'Cambio de programa',
                            backgroundColor: 'Green',
                            fill:false,
                            borderColor: 'Green',
                            data: dataYearsGeneral['Cambio de programa']
                        },
                        {
                            label: 'No matriculado',
                            backgroundColor: 'Blue',
                            borderColor: 'Blue',
                            fill:false,
                            data: dataYearsGeneral['No matriculado']
                        },
                        {
                            label: 'Permanece programa',
                            backgroundColor: 'Yellow',
                            borderColor: 'Yellow',
                            fill:false,
                            data: dataYearsGeneral['Permanece programa']
                        },

                        ]}
                        options={{
                        tooltips: {
                            enabled: true
                        }
                        
                        }}
                        labels= {yearsData}
                        
                    />
                </CCardBody>
            </CCardBody>
        </CCard>
        <CCard> 
        <div className="container ">
            <div className="row row-cols-5"  style={{ margin: "3%"}}>
                <div className="col">
                    <h4 style={{marginLeft: '2%'}}>Seleccione:</h4>
                </div>
                <div className="col">
                    <CSelect value={nivelSelected} onChange={handleChangeNivel}>
                        {nivelData.map(item => {
                            return (<option key={item} value={item}>{item}</option>);
                        })}
                    </CSelect> 
                </div>
                <div className="col">
                    <CButton
                        color="outline-primary"
                        onClick={toggleGeneral} 
                        className={'mb-1'}
                    >Mostrar 
                    </CButton>   
                </div>
                <div className="col">
                    <CSelect value={yearSelected} onChange={handleChangeYear}>
                        {yearsData.map(item => {
                            return (<option key={item} value={item}>{item}</option>);
                        })}
                    </CSelect>    
                </div>
                <div className="col">
                    <CButton
                        color="outline-success"
                        onClick={toggleProgramas} 
                        className={'mb-1'}
                    >Mostrar
                    </CButton>    
                </div>
            </div>
        </div>
            <CCollapse show={collapseGeneral}>
                {loadingGeneralDIA?
                    <div class="spinner-border text-info" role="status">
                        <span class="sr-only">Loading...</span>
                    </div> :
                    <CCardBody>
                        <h3 style={{paddingTop:'2%',textAlign: 'center', fontWeight:'bold'}}>
                            Tabla general de estudiantes por estado(cambio de progama,graduado,permanece programa,no matriculado).
                        </h3>
                        <CDataTable
                            items={dataTablaDIA}
                            fields={fieldsTablaDIA}
                            itemsPerPage={6}
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
            <CCollapse show={collapseProgramas}>
                {/* {loadingGeneralDIA? */}
                    {/* <div class="spinner-border text-info" role="status">
                        <span class="sr-only">Loading...</span>
                    </div> : */}
                    <CCardBody>
                        <h1 style={{marginTop:'3%',textAlign: 'center'}}>
                            Desercion Interanual por Facultad de Ingeniería 
                        </h1>
                        <h2 style={{color: '#2eb85c',textAlign: 'center'}}>{nivelSelected}</h2>
                        <h1 style={{marginTop:'1%',textAlign: 'center'}}>
                            Desercion Período {yearSelected} a {yearSelectedNext}
                        </h1>
                        <CRow>
                            <CCol lg="1"></CCol>
                            <CCol sm="3" lg="2" >
                                <CWidgetDropdown
                                color="gradient-primary"
                                header={14}
                                text="Permanece en programa"
                                ></CWidgetDropdown>
                            </CCol>
                            <CCol sm="3" lg="2">
                                <CWidgetDropdown
                                color="gradient-success"
                                header={30}
                                text="Cambia de programa"
                                ></CWidgetDropdown>
                            </CCol>
                            <CCol sm="3" lg="2" >
                                <CWidgetDropdown
                                color="gradient-warning"
                                header={50}
                                text="Graduado"
                                ></CWidgetDropdown>
                            </CCol>
                            <CCol sm="3" lg="2">
                                <CWidgetDropdown
                                color="gradient-danger"
                                header={60}
                                text="No Matriculado"
                                ></CWidgetDropdown>
                            </CCol>
                            <CCol sm="3" lg="2">
                                <CWidgetDropdown
                                color="gradient-dark"
                                header={60}
                                text="Total"
                                ></CWidgetDropdown>
                            </CCol>
                        </CRow>
                        
                    </CCardBody>
                {/* } */}
            </CCollapse>
        </CCard>  
        <CCard>

        </CCard>
                
        </> 
    )    
}

export default DesercionInteranual