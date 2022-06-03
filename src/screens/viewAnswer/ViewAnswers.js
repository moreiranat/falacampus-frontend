import React from 'react';

import '../../components/Style.css';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';

import AnswerTable from '../../components/AnswerTable'

class ViewAnswers extends React.Component {

    state = {
        id: 0,
        message:'' ,
        commentId: 0,
        authorId:0
    }

    componentDidMount() {
        this.findAll();
    }

    // componentWillUnmount() {
    //     this.clear();
    // }

    delete = (answerId) => {
        axios.delete(`http://localhost:8080/api/answer/${answerId}`,
        ).then(response => {
            this.find();
        }
        ).catch(error => {
            console.log(error.response);
        }
        );
    }

    edit = (answerId) => {
        this.props.history.push(`/updateAnswer/${answerId}`);
    }

    find = () => {
        var params = '?';

        if (this.state.id !== '') {
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

        if (this.state.commentId !== '') {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}commentId=${this.state.commentId}`;
        }

        if (this.state. authorId!== '') {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}authorId=${this.state.authorId}`;
        }

    

        axios.get(`http://localhost:8080/api/answer/${params}`)
            .then(response => {
                const answer= response.data;
                this.setState({ answer });
                console.log(answer);
            }
            ).catch(error => {
                console.log(error.response);
            }
            );
    }

    findAll = () => {

        axios.get(`http://localhost:8080/api/answer/all`)
            .then(response => {
                const answer = response.data;
                this.setState({ answer});
                console.log(answer);
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
                            <Card title='Consulta de Respostas'>
                                <form>
                                    <fieldset>                                        
                                        <FormGroup label="Id:" htmlFor="inputUserId">
                                            <input type="long" className="form-control" id="inputUserId" placeholder="Digite o Id do Usuário" value={this.state.id} onChange={(e) => { this.setState({ id: e.target.value }) }} />
                                        </FormGroup>
                                        <br />
                                        <FormGroup label=" Message:" htmlFor="inputAnswerMessage">
                                            <input type="text" className="form-control" id="inputAnswerMessage" placeholder="Resposta" value={this.state.message} onChange={(e) => { this.setState({ message: e.target.value }) }} />
                                        </FormGroup>
                                        <br />
                                        <FormGroup label=" CommentId: *" htmlFor="inputCommentId">
                                        <input type="long" className="form-control" id="inputCommentId" placeholder="Digite o Id do Comontário" value={this.state.commentId} onChange={(e) => { this.setState({ commentId: e.target.value }) }} />  
                                        </FormGroup>
                                        <br />
                                        <FormGroup label="  AuthorId: *" htmlFor="inputAuthorId">
                                        <input type="long" className="form-control" id="inputAuthorIdId" placeholder="Digite o Id do Author" value={this.state.authorId} onChange={(e) => { this.setState({ authorId: e.target.value }) }} />  
                                        </FormGroup>
                                      
                                        <button onClick={this.find} type="button" className="btn btn-success">
                                            <i className="pi pi-search"></i> Filtrar
                                        </button>
                                         <br />
                                        <br />
                                        <button onClick={this.findAll} type="button" className="btn btn-primary">
                                            <i className="pi pi-search"></i> Buscar Tudo
                                        </button>
                                    </fieldset>
                                </form>
                            </Card>
                        </div>
                        <br />
                        <div className='row'>
                            <div className='col-lg-12' >
                                <div className='bs-component'>
                                    <AnswerTable answer={this.state.answer}
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

export default withRouter(ViewAnswers);