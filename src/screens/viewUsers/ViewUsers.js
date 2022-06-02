import React from 'react';
import './ViewUsers.css';
import '../../components/Style.css';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';

import UsersTable from '../../components/UsersTable'

class ViewUsers extends React.Component {

    state = {
        name: '',
        id: '',
        email: '',
        registration: '',
        role: '',
        departamentId: '',
        users: []
    }

    componentDidMount() {
        this.findAll();
    }

    // componentWillUnmount() {
    //     this.clear();
    // }

    delete = (userId) => {
        axios.delete(`http://localhost:8080/api/user/${userId}`,
        ).then(response => {
            this.find();
        }
        ).catch(error => {
            console.log(error.response);
        }
        );
    }

    edit = (userId) => {
        this.props.history.push(`/updateUser/${userId}`);
    }

    find = () => {
        var params = '?';

        if (this.state.id !== '') {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}id=${this.state.id}`;
        }

        if (this.state.name !== '') {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}name=${this.state.name}`;
        }

        if (this.state.email !== '') {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}email=${this.state.email}`;
        }

        if (this.state.registration !== '') {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}registration=${this.state.registration}`;
        }

        if (this.state.role !== '') {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}role=${this.state.role}`;
        }

        if (this.state.departamentId !== '') {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}departamentId=${this.state.departamentId}`;
        }

        axios.get(`http://localhost:8080/api/user/${params}`)
            .then(response => {
                const users = response.data;
                this.setState({ users });
                console.log(users);
            }
            ).catch(error => {
                console.log(error.response);
            }
            );
    }

    findAll = () => {

        axios.get(`http://localhost:8080/api/user/all`)
            .then(response => {
                const users = response.data;
                this.setState({ users });
                console.log(users);
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
                    <div className='col-md-12' style={this.styles.colMd12}>
                        <div className="bs-docs-section">
                            <Card title='Consulta de Usuários'>
                                <form>
                                    <fieldset>                                        
                                        <FormGroup label="Id:" htmlFor="inputUserId">
                                            <input type="long" className="form-control" id="inputUserId" placeholder="Digite o Id do Usuário" value={this.state.id} onChange={(e) => { this.setState({ id: e.target.value }) }} />
                                        </FormGroup>
                                        <br />
                                        <FormGroup label="Nome:" htmlFor="inputUserName">
                                            <input type="text" className="form-control" id="inputUserName" placeholder="Digite o Nome do Usuário" value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                                        </FormGroup>
                                        <br />
                                        <FormGroup label="E-mail: *" htmlFor="inputEmail">
                                            <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Digite o E-mail Acadêmico" value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} />
                                            <small id="emailHelp" className="form-text text-muted">É obrigatório o uso do e-mail acadêmico.</small>
                                        </FormGroup>
                                        <br />
                                        <FormGroup label="Matrícula: *" htmlFor="inputRegistration">
                                            <input type="long" className="form-control" id="inputRegistration" placeholder="Digite o Número da Matrícula" value={this.state.registration} onChange={(e) => { this.setState({ registration: e.target.value }) }} />
                                            <small id="registrationHelp" className="form-text text-muted">Apenas números.</small>
                                        </FormGroup>
                                        <br />
                                        <FormGroup label="Papel: *" htmlFor="selectRole" className="form-label mt-4">
                                            <select className="form-select" id="selectRole" value={this.state.role} onChange={(e) => { this.setState({ role: e.target.value }) }}>
                                                <option>Selecione uma opção</option>
                                                <option>STUDENT</option>
                                                <option>TECHNICIAN</option>
                                                <option>TEACHER</option>
                                                <option>ADMINISTRATOR</option>
                                            </select>
                                        </FormGroup>                                        
                                        <br />
                                        <FormGroup label="Id do Departamento: *" htmlFor="inputDepartamentId">
                                            <input type="long" className="form-control" id="inputDepartamentId" placeholder="Digite o Id do Departamento" value={this.state.departamentId} onChange={(e) => { this.setState({ departamentId: e.target.value }) }} />
                                        </FormGroup>
                                        <br />
                                        <button onClick={this.find} type="button" className="btn btn-success">
                                            <i className="pi pi-search"></i> Buscar
                                        </button>
                                        {/* <br />
                                        <br />
                                        <button onClick={this.findAll} type="button" className="btn btn-primary">
                                            <i className="pi pi-search"></i> Buscar Tudo
                                        </button> */}
                                    </fieldset>
                                </form>
                            </Card>
                        </div>
                        <br />
                        <div className='row'>
                            <div className='col-lg-12' >
                                <div className='bs-component'>
                                    <UsersTable users={this.state.users}
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

export default withRouter(ViewUsers);