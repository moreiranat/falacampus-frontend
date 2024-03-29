import React from 'react';
import './ViewDepartaments.css';
import '../../components/Style.css';
import { withRouter } from 'react-router-dom';
//import axios from 'axios';

import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';

import DepartamentsTable from '../../components/DepartamentsTable'
import DepartamentApiService from '../../services/DepartamentApiService';
class ViewDepartaments extends React.Component {

    state = {
        name: '',
        id: '',
        departaments: []
    }
    constructor() {
        super();
        this.service = new DepartamentApiService();
    }

    componentDidMount() {
        this.find();
        this.mostrarBotaoDeListar();

    }

    mostrarBotaoDeListar = () =>{
        var value =  localStorage.getItem("usuario");
        var user = JSON.parse(value)
        var role = user['roles']['0']['name']
        console.log("AA", role)

        if(role === 'ADMIN'){
            let a = document.getElementById("idListar")
            a.classList.add('mostrar')
            console.log(a)
        }
       
    }

    delete = (departamentId) => {

        this.service.delete(departamentId)
            .then(response => {
                this.find();
            }
            ).catch(error => {
                console.log(error.response);
            }
            );
    }

    edit = (departamentId) => {
        this.props.history.push(`/updateDepartament/${departamentId}`);
        this.service.edit(departamentId)
    }

    createDepartament = () => {
        this.props.history.push(`/createDepartament`);
    }

    find = () => {        
        var params = '?';

        if (this.state.id !== 0) {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}id=${this.state.id}`;
        }

        // if (this.state.id !== '') {
        //     if (params !== '?') {
        //         params = `${params}&`;
        //     }

        //     params = `${params}name=${this.state.name}`;
        // }

        //axios.get(`http://localhost:8080/api/departament/${params}`)
        this.service.get(this.state.id)
            .then(response => {
                const departaments = response.data;
                this.setState({ departaments });
                console.log(departaments);
            }
            ).catch(error => {
                console.log(error.response);
            }
            );
    }

    findAll = () => {

        this.service.get('/all')
            .then(response => {
                const departaments = response.data;
                this.setState({ departaments });
                console.log(departaments);
            }
            ).catch(error => {
                console.log(error.response);
            }
            );
    }
    findApi = () => {
        this.service.get('/getDepartmentsApi')
        .then(response => {
            const departaments = response.data;
            this.setState({ departaments });
            console.log(departaments);
        }
        ).catch(error => {
            console.log(error.response);
        }
        );
        this.props.history.push("/viewDepartaments");

    }

    render() {
        return (

            <div className="container">
                <div className='row'>
                    <div className='col-md-12'>
                        <div className="bs-docs-section">
                            <Card title='Departamentos'>
                                <form>
                                    <fieldset>
                                        {/* <FormGroup label='Id:'>
                                            <input type="long" className="form-control" id="inputDepartamentId" placeholder="Digite o Id do Departamento" value={this.state.id} onChange={(e) => { this.setState({ id: e.target.value }) }} />
                                        </FormGroup>
                                        <br /> */}
                                        <FormGroup label='Nome:'>
                                            <input type="text" className="form-control" id="inputDepartamentName" placeholder="Digite o Nome do Departamento" value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                                        </FormGroup>
                                        <br />
                                        <button onClick={this.find} type="button" id="btn-search" className="btn btn-info">
                                            <i className="pi pi-search"></i> Pesquisar
                                        </button>
                                    </fieldset>
                                </form>
                            </Card>
                        </div>
                        <br />
                        <div className="row">
                            
                            <div className="col-md-12">
                                <button onClick={this.createDepartament} type="button" id="btn-cadastrar" className="btn btn-success btn-cadastrar">
                                    <i className="pi pi-plus"></i> Cadastrar Novo Departamento
                                </button>
                            </div>
                        </div>
                        <br />
                        <div className='row'>
                            <div className="col-md-12">
                                <button onClick={this.findApi} type="button" id="idListar" className="btn btn-success btn-listar">
                                    <i className="pi pi-plus"></i> Listar
                                </button>
                            </div>
                            <div className='col-lg-12' >
                                <div className='bs-component'>
                                    <DepartamentsTable departaments={this.state.departaments}
                                        delete={this.delete}
                                        edit={this.edit} />
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </div >
        )
    }
}

export default withRouter(ViewDepartaments);