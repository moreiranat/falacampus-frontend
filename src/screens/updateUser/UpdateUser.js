import React from 'react';
import './UpdateUser.css';
import '../../components/Style.css';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';

class UpdateUser extends React.Component {

    state = {
        id: "",
        name: '',
        email: '',
        registration: 0,
        role: '',
        password: '',
        departamentId: 0
    }

    update = async () => {
        await axios.put(`http://localhost:8080/api/user/${this.state.id}`,
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
                            <Card title='Atualização de Usuário'>
                                <div className='row'>
                                    <div className='col-lg-12' >
                                        <div className='bs-component'>
                                            <form>
                                                <fieldset>
                                                    <FormGroup label='Id: *'>
                                                        <input type="number" className="form-control" id="inputUserId" 
                                                        placeholder="Digite o Id do Usuário" 
                                                        value={this.state.id} onChange={(e) => { this.setState({ id: e.target.value }) }} />
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label='Nome: *'>
                                                        <input type="text" className="form-control" id="inputUserName" placeholder="Digite o seu Nome" value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label='E-mail: *'>
                                                        <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Digite o seu e-mail acadêmico" value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} />
                                                        <small id="emailHelp" className="form-text text-muted">É obrigatório o uso do e-mail acadêmico.</small>
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label='Matrícula: *'>
                                                        <input type="long" className="form-control" id="inputRegistration" placeholder="Digite o Número da sua Matrícula" value={this.state.registration} onChange={(e) => { this.setState({ registration: e.target.value }) }} />
                                                        <small id="registrationHelp" className="form-text text-muted">Apenas números.</small>
                                                    </FormGroup>
                                                    <div className="form-group">
                                                        <label htmlFor="selectRole" className="form-label mt-4">Papel: *</label>
                                                        <select className="form-select" id="selectRole" value={this.state.role} onChange={(e) => { this.setState({ role: e.target.value }) }}>
                                                            <option>Selecione uma opção</option>
                                                            <option>STUDENT</option>
                                                            <option>TECHNICIAN</option>
                                                            <option>TEACHER</option>
                                                            <option>ADMINISTRATOR</option>
                                                        </select>
                                                    </div>
                                                    <br />
                                                    <FormGroup label='Senha: *'>
                                                        <input type="password" className="form-control" id="inputPassword" placeholder="Digite sua senha" value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                                        <small id="passwordHelp" className="form-text text-muted">A senha deve ter no mínimo 8 e no máximo 30 caracteres.</small>
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label='Id do Departamento: *'>
                                                        <input type="long" className="form-control" id="inputDepartamentId" placeholder="Digite o Id do Departamento" value={this.state.departamentId} onChange={(e) => { this.setState({ departamentId: e.target.value }) }} />
                                                    </FormGroup>

                                                    
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