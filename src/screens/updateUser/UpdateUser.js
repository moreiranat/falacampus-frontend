import React from 'react';
import './UpdateUser.css';
import '../../components/Style.css';
import { withRouter } from 'react-router-dom';
//import axios from 'axios';
import UserApiService from '../../services/UserApiService';

import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import SelectDepartament from '../../components/SelectDepartament';

import { showSuccessMessage, showErrorMessage } from '../../components/Toastr';


class UpdateUser extends React.Component {

    state = {
        id: 0,
        name: '',
        email: '',
        registration: 0,
        role: '',
        password: '',
        departament: {
            departamentId: 0,
            name: ''
        }

    }
    constructor() {
        super();
        this.service = new UserApiService();
    }

    componentDidMount() {
        const params = this.props.match.params;
        const id = params.id;
        this.findById(id);
    }

    // componentWillUnmount(){
    //     this.clear();
    // }

    findById = () => {
        this.service.find(this.state.id)
            .then(response => {
                console.log(response);
                const user = response.data;
                const id = user.id;
                const name = user.name;
                const email = user.email;
                const registration = user.registration;
                const role = user.role;
                const password = user.password;
                const departament = user.departament;

                this.setState({ id:id, name:name, email:email, registration:registration, role:role, password:password, departament:departament });

            }

            ).catch(error => {
                console.log(error.response);
                console.log(error.message);
            }
            );
    }

    validate = () => {
        const errors = [];

        if (!this.state.name) {
            errors.push('Campo Nome é obrigatório!');
        } else if(!this.state.name.match(/[A-z ]{2,50}$/)) {
            errors.push('O Nome deve ter no mínimo 2 e no máximo 50 caracteres!');
        }

        if (!this.state.email) {
            errors.push('Campo E-mail é obrigatório!');
        } else if (!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            errors.push('Informe um E-mail válido!');
        }

        if (!this.state.registration) {
            errors.push('Campo Matrícula é obrigatório!');
        }

        if (!this.state.role) {
            errors.push('É obrigatório informar o Papel!');
        }

        if (!this.state.password) {
            errors.push('Campo Senha é obrigatório!')
        } else if(!this.state.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,30}$/)) {
            errors.push('A Senha deve ter no mínimo 8 e no máximo 30 caracteres.')
            errors.push('A Senha deve conter ao menos um número.')
            errors.push('A Senha deve conter ao menos uma letra minúscula.')
            errors.push('A Senha deve conter ao menos uma letra maiúscula.')
            errors.push('A Senha deve conter ao menos um caractere especial.')
        }

        if (!this.state.departamentId) {
            errors.push('É obrigatório informar o Departamento!');
        }

        return errors;
    };

    update = () => {

        const errors = this.validate();

        if (errors.length > 0) {
            errors.forEach((message, index) => {
                showErrorMessage(message);
            });
            return false
        }

        // await axios.put(`http://localhost:8080/api/user/${this.state.id}`,
        this.service.update(this.state.id,
            {
                name: this.state.name,
                email: this.state.email,
                registration: this.state.registration,
                role: this.state.role,
                password: this.state.password,
                departamentId: this.state.departament.id
            }
        ).then(response => {
            console.log(response);
            showSuccessMessage('Usuário atualizado com sucesso!');
            this.props.history.push("/viewUsers");
        }
        ).catch(error => {
            console.log(error.response);
            showErrorMessage('O usuário não pode ser atualizado!');
        }
        );

        console.log('request finished');
    }

    cancel = () => {
        this.service.delete('/');
        //props.history.push('/');
    }

    render() {
        return (

            <div className="container">
                <div className='row'>
                    <div className='col-md-12'>
                        <div className="bs-docs-section">
                            <Card title='Atualização de Usuário'>
                                <div className='row'>
                                    <div className='col-lg-12' >
                                        <div className='bs-component'>
                                            <form>
                                                <fieldset>
                                                    <p>
                                                        <small id="messageHelp" className="form-text text-muted">
                                                            * Todos os campos são obrigatórios.
                                                        </small>
                                                    </p>
                                                    {/* <FormGroup label="Id: *" htmlFor="inputUserId">
                                                        <input type="number" id="inputUserId" disabled={true} className="form-control"
                                                            value={this.state.id} name="id" onChange={(e) => { this.setState({ id: e.target.value }) }} />
                                                    </FormGroup>
                                                    <br /> */}
                                                    <FormGroup label="Nome: *" htmlFor="inputUserName">
                                                        <input type="text" id="inputUserName" className="form-control"
                                                            value={this.state.name} name="name" onChange={(e) => { this.setState({ name: e.target.value }) }} />
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label="E-mail: *" htmlFor="inputEmail">
                                                        <input type="email" id="inputEmail" className="form-control" aria-describedby="emailHelp"
                                                            value={this.state.email} name="email" onChange={(e) => { this.setState({ email: e.target.value }) }} />
                                                        {/* <small id="emailHelp" className="form-text text-muted">É obrigatório o uso do e-mail acadêmico.</small> */}
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label="Matrícula: *" htmlFor="inputRegistration">
                                                        <input type="number" id="inputRegistration" className="form-control"
                                                            value={this.state.registration} name="registration" onChange={(e) => { this.setState({ registration: e.target.value }) }} />
                                                        <small id="registrationHelp" className="form-text text-muted">Apenas números.</small>
                                                    </FormGroup>
                                                    <div className="form-group">
                                                        <label htmlFor="selectRole" className="form-label mt-4">Papel: *</label>
                                                        <select className="form-select" id="selectRole"
                                                            value={this.state.role} name="role" onChange={(e) => { this.setState({ role: e.target.value }) }}>
                                                            <option>Selecione uma opção</option>
                                                            <option value="STUDENT" >ESTUDANTE</option>
                                                            <option value="TECHNICIAN">TÉCNICO</option>
                                                            <option value="TEACHER">PROFESSOR</option>
                                                            <option value="ADMINISTRATOR">ADMINISTRADOR</option>
                                                        </select>
                                                    </div>
                                                    <br />
                                                    <FormGroup label="Senha: *" htmlFor="inputPassword">
                                                        <input type="password" id="inputPassword" className="form-control"
                                                            value={this.state.password} name="password" onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                                        {/* <small id="passwordHelp" className="form-text text-muted">A senha deve ter no mínimo 8 e no máximo 30 caracteres.</small> */}
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label="Departamento: *" htmlFor="inputDepartamentId">
                                                        <br />
                                                        <SelectDepartament onChange={this.inputSelectDepartament} />
                                                    </FormGroup>
                                                    <br />
                                                    <br />
                                                    <button onClick={this.update} type="button" className="btn btn-success">
                                                        <i className="pi pi-save"></i> Atualizar
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
}

export default withRouter(UpdateUser);