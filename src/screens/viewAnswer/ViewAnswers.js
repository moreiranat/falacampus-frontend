import React from 'react';

import '../../components/Style.css';
import { withRouter } from 'react-router-dom';
//import axios from 'axios';

import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';

import AnswersTable from '../../components/AnswersTable';
import AnswerApiService from '../../services/AnswerApiService';
import { showSuccessMessage, showErrorMessage } from '../../components/Toastr';
class ViewAnswers extends React.Component {

    state = {
        id: 0,
        message: '',
        comment: {
            commentId: 0
        },
        creationDate: Date,
        user: {
            authorId: 0
        },
        answers: []
    }
    constructor() {
        super();
        this.service = new AnswerApiService();
    }
    componentDidMount() {
        this.findAll();
    }

    // async componentDidMount() {
    //     await this.service.find('comment')
    //     .then(response => {
    //         const answer = response.data;
    //         this.setState({
    //             message: answer.message,
    //             commentId: answer.commentId,
    //             creationDate: answer.creationDate,
    //             authorId: answer.authorId
    //         });
    //     }).catch(error => {
    //         console.log(error);
    //     })
    // }

    // componentWillUnmount() {
    //     this.clear();
    // }

    // delete = (answerId) => {
    //     //axios.delete(`http://localhost:8080/api/answer/${answerId}`,
    //     this.service.delete(answerId)
    //         .then(response => {
    //             this.find();
    //         }
    //         ).catch(error => {
    //             console.log(error.response);
    //         }
    //         );
    // }

    // edit = (answerId) => {
    //     this.props.history.push(`/updateAnswer/${answerId}`);
    // }

    createAnswer = (commentId) => {
        this.props.history.push(`/createAnswer/${commentId}`);
    }

    find = () => {
        this.service.find(this.state.id)
        var params = '?';

        if (this.state.id !== "") {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}id=${this.state.id}`;
        }

        if (this.state.message !== '') {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}name=${this.state.message}`;
        }

        if (this.state.commentId !== 0) {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}commentId=${this.state.commentId}`;
        }
        if (this.state.creationDate !== '') {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}creationDate=${this.state.creationDate}`;
        }

        if (this.state.authorId !== 0) {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}authorId=${this.state.authorId}`;
        }

        this.service.get(this.state.id)
            .then(response => {
                const answers = response.data;
                this.setState({ answers });
                console.log(answers);
            }
            ).catch(error => {
                console.log(error.response);
            }
            );
    }

    findAll = () => {

        this.service.get('/all')
            .then(response => {
                const answers = response.data;
                this.setState({ answers });
                console.log(answers);
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
                    <div className='col-md-12'>
                        <div className="bs-docs-section">
                            <Card title='Respostas'>
                                <form>
                                    <fieldset>
                                        {/* <FormGroup label="Id:" htmlFor="inputUserId">
                                            <input type="long" className="form-control" id="inputUserId" placeholder="Digite o Id do Usuário" value={this.state.id} onChange={(e) => { this.setState({ id: e.target.value }) }} />
                                        </FormGroup>
                                        <br /> */}
                                        <FormGroup label="Mensagem:" htmlFor="MessageTextarea">
                                            <textarea type="text" className="form-control" id="MessageTextarea" rows="3" minLength="10" maxlength="255"
                                                placeholder="Incluir resposta"
                                                value={this.state.message}
                                                onChange={(e) => { this.setState({ message: e.target.value }) }} />
                                        </FormGroup>
                                        <br />
                                        {/* <FormGroup label=" Id do Comentário: *" htmlFor="inputCommentId">
                                            <input type="long" className="form-control" id="inputCommentId" placeholder="Digite o Id do Comentário" value={this.state.commentId} onChange={(e) => { this.setState({ commentId: e.target.value }) }} />
                                        </FormGroup>
                                        <br />
                                        <FormGroup label="  Data De Criação: *" htmlFor="inputDataCriacao">
                                            <input type="date" className="form-control" id="inputDataCriacao" placeholder="Digite a Data de Criação Respostas" value={this.state.creationDate} onChange={(e) => { this.setState({ creationDate: e.target.value }) }} />
                                        </FormGroup>
                                        <br />
                                        <FormGroup label="  Id do Autor : *" htmlFor="inputAuthorId">
                                            <input type="long" className="form-control" id="inputAuthorIdId" placeholder="Digite o Id do Author" value={this.state.authorId} onChange={(e) => { this.setState({ authorId: e.target.value }) }} />
                                        </FormGroup>
                                        <br /> */}
                                        <button onClick={this.find} type="button" id="btn-search" className="btn btn-info">
                                            <i className="pi pi-search"></i> Pesquisar
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
                        <div className="row">
                            <div className="col-md-12">
                                <button onClick={this.createAnswer} type="button" id="new-answer" className="btn btn-success btn-cadastrar">
                                    <i className="pi pi-plus"></i> Cadastrar Nova Resposta
                                </button>
                            </div>
                        </div>
                        <br />
                        <div className='row'>
                            <div className='col-lg-12' >
                                <div className='bs-component'>
                                    <AnswersTable answers={this.state.answers}
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
}

export default withRouter(ViewAnswers);