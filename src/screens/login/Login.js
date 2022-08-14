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

    // state = {
    //     username: '',
    //     password: ''
    // }

    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    login = () => {
        this.context.login(
            this.state.username,
            this.state.password
        ).then(user => 
            {
                if (user) {
                    console.log("If");
                    showSuccessMessage(`${user.username}, você está logado!`);
                    this.props.history.push('/createComment');
        
                } else {
                    console.log(user.username);
                    console.log("Else");
                    showErrorMessage("Dados incorretos! Login inválido");
                }

            }
        ).catch(error => 
            {
                console.log("Catch");
                showErrorMessage('Erro! processando autenticação:', error);
            }
        );
    }

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
                                                        id="inputusername" aria-describedby="emailHelp" 
                                                        placeholder="Digite sua matrícula de aluno ou servidor" 
                                                        value={this.state.username} onChange={(e) => { this.setState({ username: e.target.value }) }} />
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