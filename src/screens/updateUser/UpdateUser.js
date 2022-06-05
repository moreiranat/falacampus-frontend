import React from 'react';
import './UpdateUser.css';
import '../../components/Style.css';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';

class UpdateUser extends React.Component {

    state = {
        id: 0,
        name: '',
        email: '',
        registration: 0,
        role: '',
        password: '',
        departament:{
            departamentId: 0,
            name:''
        } 
    }

    componentDidMount() {
        const params = this.props.match.params;
        const id = params.id;
        this.findById(id);
    }

    // componentWillUnmount(){
    //     this.clear();
    // }

    findById = (userId) => {
        axios.get(`http://localhost:8080/api/user/${userId}`)
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

                this.setState({ id, name, email, registration, role, password, departament});
                
            }

            ).catch(error => {
                console.log(error.response);
                console.log(error.message);
            }
            );
    }

    update = async () => {
        await axios.put(`http://localhost:8080/api/user/${this.state.id}`,
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
            // this.find();
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
                                                    <FormGroup label="Id: *" htmlFor="inputUserId">
                                                        <input type="long" id="inputUserId" disabled={true} className="form-control" 
                                                        value={this.state.id} name="id" onChange={(e) => { this.setState({ id: e.target.value })}} />                                                            
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label="Nome: *" htmlFor="inputUserName">
                                                        <input type="text" id="inputUserName" className="form-control" 
                                                        value={this.state.name} name="name" onChange={(e) => { this.setState({ name: e.target.value }) }} />  
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label="E-mail: *" htmlFor="inputEmail">
                                                        <input type="email" id="inputEmail" className="form-control" aria-describedby="emailHelp" 
                                                        value={this.state.email} name="email" onChange={(e) => { this.setState({ email: e.target.value }) }} />
                                                        <small id="emailHelp" className="form-text text-muted">É obrigatório o uso do e-mail acadêmico.</small>
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label="Matrícula: *" htmlFor="inputRegistration">
                                                        <input type="long" id="inputRegistration" className="form-control" 
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
                                                        <small id="passwordHelp" className="form-text text-muted">A senha deve ter no mínimo 8 e no máximo 30 caracteres.</small>
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label="Id do Departamento: *" htmlFor="inputDepartamentId">
                                                        <input type="long" id="inputDepartamentId" className="form-control" 
                                                        value={this.state.departament.id} name="departamentId" onChange={(e) => { this.setState({ 'departament.id': e.target.value }) }} />
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