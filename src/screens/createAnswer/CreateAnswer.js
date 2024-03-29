import React from 'react';
import './CreateAnswer.css';
import '../../components/Style.css';
import 'primeicons/primeicons.css';
import { withRouter } from 'react-router-dom';
//import axios from 'axios';

import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import SelectComment from '../../components/SelectComment';
import SelectUser from '../../components/SelectUser';

import { showSuccessMessage, showErrorMessage } from '../../components/Toastr';
import AnswerApiService from '../../services/AnswerApiService';
class CreateAnswer extends React.Component {

    state = {
        message: '',
        commentId: 0,
        authorId: 0,
    }

    componentDidMount() {
        const params = this.props.match.params;
        const id = params.id;
        this.findCommentById(id);
    }

    // componentWillUnmount() {
    //     this.clear();
    // }
    constructor() {
        super();
        this.service = new AnswerApiService();
    }

    findCommentById = (commentId) => {
        //axios.get(`http://localhost:8080/api/comment?id=${commentId}`)
        this.service.find(commentId)

            .then(response => {
                const comment = response.data;
                const id = comment.id;
                const title = comment.title;
                const message = comment.message;
                const commentType = comment.commentType;
                const user = comment.user;
                const departament = comment.departament;

                this.setState({ id, title, message, commentType, user, departament });
            }

            ).catch(error => {
                console.log(error.response);
            }
            );
    }

    validate = () => {
        const errors = [];

        if (!this.state.message) {
            errors.push('Campo Mensagem é obrigatório!');
        } else if(!this.state.message.match(/[A-z 0-9]{10,255}$/)) {
            errors.push('A Mensagem da Resposta deve ter no mínimo 10 e no máximo 255 caracteres!');
        }

        if (!this.state.commentId) {
            errors.push('É obrigatório informar o Comentário que será respondido!');
        }

        if (!this.state.authorId) {
            errors.push('É obrigatório informar o Autor da Resposta!');
        }

        return errors;
    };


    create = async () => {

        const errors = this.validate();

        if (errors.length > 0) {
            errors.forEach((message, index) => {
                showErrorMessage(message);
            });
            return false
        }

        this.service.create(
            {
                message: this.state.message,
                commentId: this.state.commentId,
                authorId: this.state.authorId
            }
        ).then(response => {
            console.log(response);
            showSuccessMessage('Comentário respondido!');
        }
        ).catch(error => {
            console.log(error.response);
            // showErrorMessage("O comentário não pode ser respondido!")
        }
        );

        console.log('request finished');
    }

    cancel = () => {
        this.props.history.push('/');
    }

    handleInputSelectComment = (e) => {
        this.setState({ commentId: e.target.value }, () => {
            console.log("Id do Comentário: ", this.state.commentId);
        });
    }

    handleInputSelectUser = (e) => {
        this.setState({ authorId: e.target.value }, () => {
            console.log("Id do Autor(Usuário): ", this.state.authorId);
        });
    }

    render() {
        return (

            <div className="container">
                <div className='row'>
                    <div className='col-md-12'>
                        <div className="bs-docs-section">
                            <Card title='Cadastrar Resposta'>
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
                                                    <FormGroup label="Selecione o Comentário para o envio da resposta: *" htmlFor="inputDepartamentDestination">
                                                        <br />
                                                        <SelectComment id="select-comment" onChange={this.handleInputSelectComment} />
                                                    </FormGroup>
                                                    <br />
                                                    {/* <FormGroup label="Id do Comentário: *" htmlFor="inputCommentId">
                                                        <input type="number" className="form-control" id="inputCommentId" 
                                                        placeholder="Digite o id do comentário" 
                                                        value={this.state.commentId} 
                                                        onChange={(e) => { this.setState({ commentId: e.target.value }) }} />
                                                    </FormGroup>
                                                    <br /> */}
                                                    <FormGroup label="Mensagem: *" htmlFor="MessageTextarea">
                                                        <textarea type="text" className="form-control" id="MessageTextarea" rows="3" minLength="10" maxlength="255"
                                                            placeholder="Incluir resposta"
                                                            value={this.state.message}
                                                            onChange={(e) => { this.setState({ message: e.target.value }) }} />
                                                    </FormGroup>
                                                    <br />
                                                    {/* <FormGroup label="Id do Autor da Mensagem: *" htmlFor="inputAuthorId">
                                                        <input type="number" className="form-control" id="inputAuthorId" 
                                                        placeholder="Digite o id do autor" 
                                                        value={this.state.authorId} 
                                                        onChange={(e) => { this.setState({ authorId: e.target.value }) }} />
                                                    </FormGroup>   */}
                                                    <FormGroup label="Autor do Comentário: *" htmlFor="inputUserAuthor">
                                                        <br />
                                                        <SelectUser id="select-author" onChange={this.handleInputSelectUser} />
                                                    </FormGroup>
                                                    <br />
                                                    <br />
                                                    <button onClick={this.create} type="button" id="button-answer" className="btn btn-success">
                                                        <i className="pi pi-save"></i> Responder
                                                    </button>
                                                    <button onClick={this.cancel} type="button" id="button-cancel" className="btn btn-danger btn-cancel">
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

export default withRouter(CreateAnswer);

