import React from 'react';
import './CreateUser.css';
import '../../components/Style.css';
import 'primeicons/primeicons.css';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import SelectDepartament from '../../components/SelectDepartament';

class CreateUser extends React.Component {

    state = {
        name: '',
        email: '',
        registration: 0,
        role: '',
        password: '',
        departamentId: 0
    }

    componentWillUnmount() {
        this.clear();
    }

    create = async () => {
        await axios.post('http://localhost:8080/api/user',
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
        }
        ).catch(error => {
            console.log(error.response);
            alert("O usuário não pode ser salvo!")
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