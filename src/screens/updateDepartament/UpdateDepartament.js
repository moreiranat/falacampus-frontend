import React from 'react';
import './UpdateDepartament.css';

import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';

class UpdateDepartament extends React.Component {

    state = {
        id: 0,
        name: '',
    }

    update = async () => {
        await axios.put(`http://localhost:8080/api/departament/${this.state.id}`,
            {
                name: this.state.name,
            }
        ).then(response => {
            console.log(response);
            
        }
        ).catch(error => {
            console.log(error.response);
        }
        );

        console.log('request finished');
    }

    cancel = () => {
        this.props.history.push('/');
    }

    render() {
        return (

            <div className="container">
                <div className='row'>
                    <div className='col-md-12'>
                        <div className="bs-docs-section">
                            <Card title='Atualização de Departamento'>
                                <div className='row'>
                                    <div className='col-lg-12' >
                                        <div className='bs-component'>
                                            <form>
                                                <fieldset>
                                                    <FormGroup label='Id: *'>
                                                        <input type="number" className="form-control" id="inputDepartamentId" 
                                                        placeholder="Digite o Id do Departamento" 
                                                        value={this.state.id} onChange={(e) => { this.setState({ id: e.target.value }) }} />
                                                    </FormGroup>
                                                    <FormGroup label='Nome: *'>
                                                        <input type="text" className="form-control" id="inputDepartamentName" 
                                                        placeholder="Digite o Nome do Departamento" 
                                                        value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                                                        <div className="valid-feedback">Departamento atualizado!</div>
                                                    </FormGroup>
                                                    <br />
                                                    <button onClick={this.update} type="button" className="btn btn-success">
                                                        <i className="pi pi-save"></i> Atualizar
                                                    </button>
                                                    <button onClick={this.cancel} type="button" className="btn btn-danger">
                                                        <i className="pi pi-times"></i> Cancelar
                                                    </button>
                                                                                                       
                                                </fieldset>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(UpdateDepartament);