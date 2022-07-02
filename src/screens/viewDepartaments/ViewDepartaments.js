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
    constructor(){
        super();
        this.service=new DepartamentApiService();
    }

    componentDidMount() {
        this.find();
        
    }
//departamentId
    delete = () => {
       
       this.service.delete(this.state.id)
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
    }

    find = () => {
        this.service.find(this.state.id)
        var params = '?';
       
        if ( this.state.id!== '') {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}id=${this.state.id}`;
        }

        if (this.state.id !== '') {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}name=${this.state.name}`;
        }

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

    render() {
        return (

            <div className="container">
                <div className='row'>
                    <div className='col-md-12' style={this.styles.colMd612}>
                        <div className="bs-docs-section">
                            <Card title='Consulta de Departamentos'>
                                <form>
                                    <fieldset>
                                        <FormGroup label='Id:'>
                                            <input type="long" className="form-control" id="inputDepartamentId" placeholder="Digite o Id do Departamento" value={this.state.id} onChange={(e) => { this.setState({ id: e.target.value }) }} />
                                        </FormGroup>
                                        <br />
                                        <FormGroup label='Nome:'>
                                            <input type="text" className="form-control" id="inputDepartamentName" placeholder="Digite o Nome do Departamento" value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                                        </FormGroup>
                                        <br />
                                        <button onClick={this.find} type="button" className="btn btn-success">
                                            <i className="pi pi-search"></i> Buscar
                                        </button>
                                    </fieldset>
                                </form>
                            </Card>
                        </div>
                        <br />
                        <div className='row'>
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
    styles = {
        colMd12: {
            position: 'relative'
        }
    }
}

export default withRouter(ViewDepartaments);