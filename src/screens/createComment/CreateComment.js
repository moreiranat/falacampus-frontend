import React from 'react';
import './CreateComment.css';
import '../../components/Style.css';
import 'primeicons/primeicons.css';
import { withRouter } from 'react-router-dom';


import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import SelectDepartament from '../../components/SelectDepartament';
import SelectUser from '../../components/SelectUser';
import CommentApiService from '../../services/CommentApiService';
import { showSuccessMessage, showErrorMessage } from '../../components/Toastr';

class CreateComment extends React.Component {

    state = {
        title: '',
        message: '',
        commentType: '',
        creationDate: Date,
        authorId: 0,
        departamentId: 0
    }
     constructor(){
        super();
        this.service = new CommentApiService();
    }

    componentWillUnmount() {
        this.clear();
    }

    validate = () => {
        const errors = [];
    
        if(!this.state.title){
            errors.push('Campo Título é obrigatório!');
        } else if(!this.state.title.match(/[A-z 0-9]{5,50}$/)) {
            errors.push('O Título do Comentário deve ter no mínimo 5 e no máximo 50 caracteres!');
        }

        if(!this.state.message){
            errors.push('Campo Mensagem é obrigatório!');
        } else if(!this.state.message.match(/[A-z 0-9]{10,255}$/)) {
            errors.push('A mensagem do Comentário deve ter no mínimo 10 e no máximo 255 caracteres!');
        }

        if(!this.state.commentType){
            errors.push('É obrigatório informar o Tipo de Comentário!');
        }

        if(!this.state.authorId){
            errors.push('É obrigatório informar o Autor do Comentário!');
        }

        if(!this.state.departamentId){
            errors.push('É obrigatório informar o Departamento para o qual será direcionada a crítica, sugestão ou elogio!');
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
        
        this.service.create(
            {
                title: this.state.title,
                message: this.state.message,
                commentType: this.state.commentType,
                authorId: this.state.authorId,
                departamentId: this.state.departamentId,
                creationDate: this.state.creationDate
            }
        ).then(response => {
            console.log(response);
            showSuccessMessage('Comentário criado com sucesso!');
        }
        ).catch(error => {
            console.log(error.response);
            // showErrorMessage("O comentário não pode ser criado!")
        }
        );

        console.log('request finished');
    }

    cancel = () => {
        this.props.history.push('/');
    }

    handleInputSelectDepartament = (e) => {
        this.setState({departamentId: e.target.value}, () => {
            console.log("Id do Departamento Destinatário: ", this.state.departamentId);
        });
    }

    handleInputSelectUser = (e) => {
        this.setState({authorId: e.target.value}, () => {
            console.log("Id do Autor(Usuário): ", this.state.authorId);
        });
    }

    render() {
        return (

            <div className="container">
                <div className='row'>
                    <div className='col-md-12'>
                        <div className="bs-docs-section">
                            <Card title='Cadastro de Comentário'>
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
                                                    <FormGroup label="Título: *" htmlFor="inputCommentTitle">
                                                        <input type="text" className="form-control" id="inputCommentTitle"  minLength="5" maxlength="50"
                                                        placeholder="Digite o título do comentário" 
                                                        value={this.state.title} 
                                                        onChange={(e) => { this.setState({ title: e.target.value }) }} />
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label="Mensagem: *" htmlFor="MessageTextarea" className="form-label mt-4">
                                                        <textarea type="text" className="form-control" id="MessageTextarea" rows="3" minLength="10" maxlength="255" 
                                                        placeholder="Digite a sugestão, crítica ou elogio" 
                                                        value={this.state.message} 
                                                        onChange={(e) => { this.setState({ message: e.target.value }) }} />
                                                        <small id="messageHelp" className="form-text text-muted">Seja cordial ao escrever sua crítica, sugestão ou elogio.</small>
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label="Tipo de Comentário: *" htmlFor="selectCommentType" input>
                                                    <select className="form-select" id="selectCommentType" 
                                                    value={this.state.commentType} 
                                                    onChange={(e) => { this.setState({ commentType: e.target.value }) }}>
                                                            <option>Selecione uma opção</option>
                                                            <option value = "REVIEW">CRÍTICA</option>
                                                            <option value = "SUGGESTION">SUGESTÃO</option>
                                                            <option value = "COMPLIMENT">ELOGIO</option>
                                                        </select>
                                                    </FormGroup>
                                                    <br />
                                                    {/* <FormGroup label="Id do Autor: *" htmlFor="inputAuthorId">
                                                        <input type="number" className="form-control" id="inputAuthorId" 
                                                        placeholder="Digite o id do autor" 
                                                        value={this.state.authorId} 
                                                        onChange={(e) => { this.setState({ authorId: e.target.value }) }} />
                                                    </FormGroup>                                                     */}
                                                    <FormGroup label="Autor do Comentário: *" htmlFor="inputUserAuthor">
                                                        <br />
                                                        <SelectUser onChange={this.handleInputSelectUser}/>
                                                    </FormGroup>
                                                    <br />
                                                    {/* <FormGroup label="Id do Departamento: *" htmlFor="inputDepartamentId">
                                                        <input type="number" className="form-control" id="inputDepartamentId" 
                                                        placeholder="Digite o id do departamento" 
                                                        value={this.state.departamentId} 
                                                        onChange={(e) => { this.setState({ departamentId: e.target.value }) }} />
                                                    </FormGroup> */}
                                                    
                                                    <FormGroup label="Selecione o Departamento para o envio da crítica, sugestão ou elogio: *" htmlFor="inputDepartamentDestination">
                                                        <br />
                                                        <SelectDepartament onChange={this.handleInputSelectDepartament}/>
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

}

export default withRouter(CreateComment);

