import React from 'react';
import './Login.css';
import '../../components/Style.css';

import '../../components/Style.css';
import 'primeicons/primeicons.css';
import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import { showSuccessMessage, showErrorMessage } from '../../components/Toastr';

import { withRouter } from 'react-router-dom';

import { AuthContext } from '../../main/SessionProvider';

class Login extends React.Component {

    state = {
        registration: 0,
        password: ''
    }

    login = () => {
        this.context.login(
            this.state.registration,
            this.state.password
        ).then(user => 
            {
                if (user) {
                    showSuccessMessage(`${user.registration} logado!`);
                    this.props.history.push('/createComment');
        
                } else {
                    showErrorMessage("Dados incorretos! Login inválido");
                }

            }
        ).catch(error => 
            {
                showErrorMessage('Erro processado autenticação:', error);
            }
        );
    }

    // login = () => {
    //         this.context.login(
    //             this.state.registration,
    //             this.state.password
    //         ).then(user => 
    //             {
    //                 if (this.state.registration === 201815020003 && this.state.password === "1234567890") {
    //                     showSuccessMessage(this.state.registration + ", você está logado!");
    //                     this.props.history.push('/');
            
    //                 } else {
    //                     showErrorMessage("Dados incorretos! Login inválido");
    //                 }
    
    //             }
    //         ).catch(error => 
    //             {
    //                 showErrorMessage('Erro processado autenticação:', error);
    //             }
    //         );

    
    // }

    create = () => {
        this.props.history.push('/createUser');
    }

    render() {
        return (

            <div className="container">
                <div className='row'>
                    <div className='col-md-12'>
                        <div className="bs-docs-section">
                            <Card title='Login'>
                                <div className='row'>
                                    <div className='col-lg-12' >
                                        <div className='bs-component'>
                                            <form>
                                                <fieldset>
                                                    <FormGroup label='Matrícula: *'>
                                                        <input type="number" className="form-control" 
                                                        id="inputRegistration" aria-describedby="emailHelp" 
                                                        placeholder="Digite sua matrícula" 
                                                        value={this.state.registration} onChange={(e) => { this.setState({ registration: e.target.value }) }} />
                                                    </FormGroup> 
                                                    <br />   
                                                    <FormGroup label='Senha: *'>
                                                        <input type="password" className="form-control" 
                                                        id="inputPassword" placeholder="Digite sua senha" value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                                    </FormGroup>
                                                    <br />
                                                    <button onClick={this.login} type="button" id="button-login" className="btn btn-success btn-space">
                                                        <i className="pi pi-save"></i> Entrar
                                                    </button>
                                                    <button onClick={this.create} type="button" id="button-create" className="btn btn-danger btn-space">
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

}
Login.contextType = AuthContext;
export default withRouter(Login);