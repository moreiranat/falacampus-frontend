import React from 'react';
import './Login.css';
import '../../components/Style.css';
import 'primeicons/primeicons.css';
import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';

import { withRouter } from 'react-router-dom';

class Login extends React.Component {

    state = {
        email: '',
        password: ''
    }
    login = () => {
        if (this.state.email === "monteiro@ifpb.edu.br" && this.state.password === "12345678") {
            console.log(this.state.email + ", você está logado!")
            this.props.history.push('/');

        } else {
            alert("Os dados estão incorretos. Por favor, digite-os novamente!")
        }
    }

    create = () => {
        this.props.history.push('/createUser');
    }

    render() {
        return (

            <div className="container">
                <div className='row'>
                    <div className='col-md-12' style={this.styles.colMd12}>
                        <div className="bs-docs-section">
                            <Card title='Login'>
                                <div className='row'>
                                    <div className='col-lg-12' >
                                        <div className='bs-component'>
                                            <form>
                                                <fieldset>
                                                    <FormGroup label='E-mail: *'>
                                                        <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Digite o seu e-mail acadêmico" value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} />
                                                    </FormGroup> 
                                                    <br />   
                                                    <FormGroup label='Senha: *'>
                                                        <input type="password" className="form-control" id="inputPassword" placeholder="Digite sua senha" value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                                    </FormGroup>
                                                    <br />
                                                    <button onClick={this.login} type="button" className="btn btn-success">
                                                        <i className="pi pi-save"></i> Entrar
                                                    </button>
                                                    <button onClick={this.create} type="button" className="btn btn-danger">
                                                        <i className="pi pi-times"></i> Cadastrar
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

export default withRouter(Login);