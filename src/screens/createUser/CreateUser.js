import React from 'react';
import './CreateUser.css';
import '../../components/Style.css';
import 'primeicons/primeicons.css';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import SelectDepartament from '../../components/SelectDepartament';

import { showSuccessMessage, showErrorMessage } from '../../components/Toastr';
import UserApiService from '../../services/UserApiService';
class CreateUser extends React.Component {

    state = {
        name: '',
        email: '',
        registration: 0,
        role: '',
        password: '',
        departamentId: 0
    }
    constructor(){
        super();
        this.service = new UserApiService();
    }

    componentWillUnmount() {
        this.clear();
    }

<<<<<<< HEAD
    validate = () => {
        const errors = [];
    
        if(!this.state.name){
            errors.push('Campo Nome é obrigatório!');
        } else if(!this.state.name.match(/^[a-z].{2,50}$/)) {
            errors.push('O Nome deve ter no mínimo 2 e no máximo 50 caracteres!');
        }

        if(!this.state.email){
            errors.push('Campo E-mail é obrigatório!');
        } else if(!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            errors.push('Informe um E-mail válido!');
        }

        if(!this.state.registration){
            errors.push('Campo Matrícula é obrigatório!');
        } else if(!this.state.registration.match(/^(?=.*[0-9])$/)) {
            errors.push('A Matrícula deve conter apenas números!');

        }

        if(!this.state.role){
            errors.push('É obrigatório informar o Papel!');
        }

        if(!this.state.password){
            errors.push('Campo Senha é obrigatório!')
        } else if(!this.state.password.match(/^(?=.*[A-Z])(?=.*[*!#@$%&])(?=.*[0-9])(?=.*[a-z]).{8,30}$/)) {
            errors.push('A Senha deve ter no mínimo 8 e no máximo 30 caracteres.')
            errors.push('A Senha deve ter somente letra, número e caractere especial(*!#@$%&).')
            errors.push('A Senha deve ter no mínimo uma letra maiúscula e uma minúscula.')
            errors.push('A Senha deve ter no mínimo um número.')
            errors.push('A Senha deve ter no mínimo um caractere especial(*!#@$%&).');
        }

        if(!this.state.departamentId){
            errors.push('É obrigatório informar o Departamento!');
        }
        
        return errors;
    };

    create = async () => {

        const errors = this.validate();

        if(errors.length > 0) {
            errors.forEach((message, index) => {
                showErrorMessage(message);
            });
            return false
        }


        await axios.post('http://localhost:8080/api/user',
=======
    create = () => {
        this.service.create(this.state,
>>>>>>> 190c76fbe46632498a9fd371072dbeaf610d9122
        
            {
                name: this.state.name,
                email: this.state.email,
                registration: this.state.registration,
                role: this.state.role,
                password: this.state.password,
                departamentId: this.state.departamentId
            }
        ).then(response => {
            console.log(response);
            showSuccessMessage('Usuário criado com sucesso!');
            this.props.history.push("/login");
        }
        ).catch(error => {
            console.log(error.response);
            showErrorMessage('O usuário não pode ser salvo!');
        }
        );

        console.log('request finished');
    }

    cancel = () => {
        this.props.history.push('/');
    }

    inputSelectDepartament = (e) => {
        this.setState({departamentId: e.target.value}, () => {
            console.log("Id do Departamento Destinatário: ", this.state.departamentId);
        });
    }

    render() {
        return (

            <div className="container">
                <div className='row'>
                    <div className='col-md-12' style={this.styles.colMd12}>
                        <div className="bs-docs-section">
                            <Card title='Cadastro de Usuário'>
                                <div className='row'>
                                    <div className='col-lg-12' >
                                        <div className='bs-component'>
                                            <form>
                                                <fieldset>
                                                    <small id="messageHelp" className="form-text text-muted">
                                                        * Todos os campos são obrigatórios.
                                                    </small>
                                                    <FormGroup label="Nome:" htmlFor="inputUserName">
                                                        <input type="text" className="form-control" id="inputUserName" placeholder="Digite o seu Nome" value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label="E-mail: *" htmlFor="inputEmail">
                                                        <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Digite o seu e-mail acadêmico" value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} />
                                                        <small id="emailHelp" className="form-text text-muted">É obrigatório o uso do e-mail acadêmico.</small>
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label="Matrícula: *" htmlFor="inputRegistration">
                                                        <input type="long" className="form-control" id="inputRegistration" placeholder="Digite o Número da sua Matrícula" value={this.state.registration} onChange={(e) => { this.setState({ registration: e.target.value }) }} />
                                                        <small id="registrationHelp" className="form-text text-muted">Apenas números.</small>
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label="Papel: *" htmlFor="selectRole" className="form-label mt-4">
                                                        <select className="form-select" id="selectRole" value={this.state.role} onChange={(e) => { this.setState({ role: e.target.value }) }}>
                                                            <option>Selecione uma opção</option>
                                                            <option value="STUDENT" >ESTUDANTE</option>
                                                            <option value="TECHNICIAN">TÉCNICO</option>
                                                            <option value="TEACHER">PROFESSOR</option>
                                                            <option value="ADMINISTRATOR">ADMINISTRADOR</option>
                                                        </select>
                                                    </FormGroup>                                                    
                                                    <br />
                                                    <FormGroup label="Senha: *" htmlFor="inputPassword">
                                                        <input type="password" className="form-control" id="inputPassword" placeholder="Digite sua senha" value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                                        <small id="passwordHelp" className="form-text text-muted">A senha deve ter no mínimo 8 e no máximo 30 caracteres.</small>
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label="Departamento: *" htmlFor="inputDepartamentId">
                                                        <br />
                                                        <SelectDepartament onChange={this.inputSelectDepartament}/>
                                                    </FormGroup>
                                                    <br />
                                                    <br />
                                                    <button onClick={this.create} type="button" className="btn btn-success">
                                                        <i className="pi pi-save"></i> Salvar
                                                    </button>
                                                    <button onClick={this.cancel} type="button" className="btn btn-danger btn-cancel">
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

    styles = {
        colMd12: {
            position: 'relative'
        }
    }

}

export default withRouter(CreateUser);