import React from 'react';
import './CreateDepartament.css';
import '../../components/Style.css';
import 'primeicons/primeicons.css';
import { withRouter } from 'react-router-dom';
//import axios from 'axios';

import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';

import { showSuccessMessage, showErrorMessage } from '../../components/Toastr';

import DepartamentApiService from '../../services/DepartamentApiService';
class CreateDepartament extends React.Component {

    state = {
        name: ''
    }
    constructor() {
        super();
        this.service = new DepartamentApiService();
    }

    validate = () => {
        const errors = [];

        if (!this.state.name) {
            errors.push('Campo Nome é obrigatório!');
        } else if(!this.state.name.match(/[A-z ]{2,100}$/)) {
            errors.push('O Nome do Departamento deve ter no mínimo 2 e no máximo 100 caracteres!');
        }

        return errors;
    };

    create = async () => {

        const errors = this.validate();

        if (errors.length > 0) {
            errors.forEach((message, index) => {
                showErrorMessage(message);
            });
            return false
        }

        this.service.create(this.state,
            {
                name: this.state.name
            }
        ).then(response => {
            console.log(response);
            showSuccessMessage('Departamento criado com sucesso!');
        }
        ).catch(error => {
            console.log(error.response);
            // showErrorMessage('O Departamento não pode ser criado!');
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
                                                    <p>
                                                        <small id="messageHelp" className="form-text text-muted">
                                                            * O campo é obrigatório.
                                                        </small>
                                                    </p>
                                                    <FormGroup label='Nome: *'>
                                                        <input type="text" className="form-control" id="inputDepartamentName" minLength="2" maxlength="255"
                                                            placeholder="Digite o Nome do Departamento"
                                                            value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                                                    </FormGroup>
                                                    <br />
                                                    <br />
                                                    <button onClick={this.create} type="button" id="button-save" className="btn btn-success">
                                                        <i className="pi pi-save"></i> Salvar
                                                    </button>
                                                    <button onClick={this.cancel} type="button" id="buttonCancel" className="btn btn-danger btn-cancel">
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