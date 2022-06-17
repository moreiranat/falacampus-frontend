import React from 'react';
import './CreateDepartament.css';
import '../../components/Style.css';
import 'primeicons/primeicons.css';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';

import { showSuccessMessage, showErrorMessage } from '../../components/Toastr';
import UserApiService from '../../services/UserApiService';
class CreateDepartament extends React.Component {

    state = {
        name: ''
    }
  

    create = async () => {
        await axios.post('http://localhost:8080/api/departament',
            {
                name: this.state.name
            }
        ).then(response => {
            console.log(response);
            showSuccessMessage('Departamento criado com sucesso!');
        }
        ).catch(error => {
            console.log(error.response);
            showErrorMessage('O Departamento não pode ser criado!');
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
                    <div className='col-md-12' style={this.styles.colMd12}>
                        <div className="bs-docs-section">
                            <Card title='Cadastro de Departamento'>
                                <div className='row'>
                                    <div className='col-lg-12' >
                                        <div className='bs-component'>
                                            <form>
                                                <fieldset>
                                                   
                                                    <FormGroup label='Nome: *'>
                                                        <input type="text" className="form-control" id="inputDepartamentName" minLength="2" maxlength="255"
                                                        placeholder="Digite o Nome do Departamento" 
                                                        value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                                                    </FormGroup>
                                                    <br />
                                                    <button onClick={this.create} type="button" className="btn btn-success">
                                                        <i className="pi pi-save"></i> Salvar
                                                    </button>
                                                    <button onClick={this.cancel} type="button" className="btn btn-danger btn-cancel">
                                                        <i className="pi pi-times"></i> Cancelar
                                                    </button>
                                                    <br />
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

    styles = {
        colMd12: {
            position: 'relative'
        }
    }

}

export default withRouter(CreateDepartament);