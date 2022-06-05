import React from 'react';
import './ViewComments.css';
import '../../components/Style.css';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';

import CommentsTable from '../../components/CommentsTable'

class ViewComments extends React.Component {

    state = {
        title: '',
        id: 0,
        message: '',
        creationDate: Date,
        commentType: '',
        statusComment: '',
        user:{
            authorId: 0,
            name: ''
        },
        departament:{
            departamentId: 0,
            name: ''
        },
        // answer: {
        //     answerId: 0,
        //     message: ''
        // }, 
        comments: []
    }

    componentDidMount() {
        this.findAll();
    }

    // componentWillUnmount() {
    //     this.clear();
    // }

    delete = (commentId) => {
        axios.delete(`http://localhost:8080/api/comment/${commentId}`,
        ).then(response => {
            this.find();
        }
        ).catch(error => {
            console.log(error.response);
        }
        );
    }

    edit = (commentId) => {
        this.props.history.push(`/updateComment/${commentId}`);
    }

    find = () => {
        var params = '?';

        if (this.state.id !== 0) {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}id=${this.state.id}`;
        }

        if (this.state.title !== '') {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}title=${this.state.title}`;
        }

        if (this.state.message!== '') {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}message=${this.state.message}`;
        }

        if (this.state.creationDate !== Date) {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}creationDate=${this.state.creationDate}`;
        }

        // if (this.state.commentType !== '') {
        //     if (params !== '?') {
        //         params = `${params}&`;
        //     }

        //     params = `${params}commentType=${this.state.commentType}`;
        // }

        // if (this.state.statusComment !== '') {
        //     if (params !== '?') {
        //         params = `${params}&`;
        //     }

        //     params = `${params}statusComment=${this.state.statusComment}`;
        // }

        // if (this.state.authorId !== 0) {
        //     if (params !== '?') {
        //         params = `${params}&`;
        //     }

        //     params = `${params}authorId=${this.state.authorId}`;
        // }

        // if (this.state.departamentId !== 0) {
        //     if (params !== '?') {
        //         params = `${params}&`;
        //     }

        //     params = `${params}departamentId=${this.state.departamentId}`;
        // }

        // if (this.state.answerId !== 0) {
        //     if (params !== '?') {
        //         params = `${params}&`;
        //     }

        //     params = `${params}answerId=${this.state.answerId}`;
        // }

        axios.get(`http://localhost:8080/api/comment/${params}`)
            .then(response => {
                const comments = response.data;
                this.setState({ comments });
                console.log(comments);
            }
            ).catch(error => {
                console.log(error.response);
            }
            );
    }

    findAll = () => {

        axios.get(`http://localhost:8080/api/comment/all`)
            .then(response => {
                const comments = response.data;
                this.setState({ comments });
                console.log(comments);
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
                            <Card title='Consulta de Comentários'>
                                <form>
                                    <fieldset>                                        
                                        <FormGroup label="Id: *" htmlFor="inputId">
                                            <input type="long" className="form-control" id="inputId" placeholder="Digite o Id do Comentário" value={this.state.id} onChange={(e) => { this.setState({ id: e.target.value }) }} />
                                        </FormGroup>
                                        <br />
                                        <FormGroup label="Título: *" htmlFor="inputTitle">
                                            <input type="text" className="form-control" id="inputTitle" placeholder="Digite o Título do Comentário" value={this.state.title} onChange={(e) => { this.setState({ title: e.target.value }) }} />
                                            <small id="titleHelp" className="form-text text-muted">O título do comentário deve ter no mínimo 5 e no máximo 50 caracteres.</small>
                                        </FormGroup>
                                        <br />
                                        <FormGroup label="Mensagem: *" htmlFor="inputMessage">
                                            <input type="text" className="form-control" id="inputMessage" placeholder="Digite a Mensagem do Comentário" value={this.state.message} onChange={(e) => { this.setState({ message: e.target.value }) }} />
                                            <small id="messageHelp" className="form-text text-muted">A mensagem do comentário deve ter no mínimo 10 e no máximo 255 caracteres.</small>
                                        </FormGroup>
                                        <br />
                                        <FormGroup label="Data de Criação: *" htmlFor="inputCreationDate">
                                            <input type="date" className="form-control" id="inputCreationDate" placeholder="Digite a Data de Criação do Comentário" value={this.state.creationDate} onChange={(e) => { this.setState({ creationDate: e.target.value }) }} />
                                        </FormGroup>
                                        <br />
                                        {/* <FormGroup label="Tipo de Comentário: *" htmlFor="selectCommentType" className="form-label mt-4">
                                            <select className="form-select" id="selectCommentType" value={this.state.commentType} onChange={(e) => { this.setState({ commentType: e.target.value }) }}>
                                                <option>Selecione uma opção</option>
                                                <option>REVIEW</option>
                                                <option>SUGGESTION</option>
                                                <option>COMPLIMENT</option>
                                            </select>
                                        </FormGroup>                                        
                                        <br />
                                        <FormGroup label="Status do Comentário: *" htmlFor="selectStatusComment" className="form-label mt-4">
                                            <select className="form-select" id="selectStatusComment" value={this.state.statusComment} onChange={(e) => { this.setState({ statusComment: e.target.value }) }}>
                                                <option>Selecione uma opção</option>
                                                <option>NOT_SOLVED</option>
                                                <option>SOLVED</option>
                                            </select>
                                        </FormGroup>  
                                        <br /> 
                                         <FormGroup label="Id do Autor do Comentário: *" htmlFor="inputAuthorId">
                                            <input type="long" className="form-control" id="inputAuthorId" placeholder="Digite o Id do Autor do Comentário" value={this.state.authorId} onChange={(e) => { this.setState({ authorId: e.target.value }) }} />
                                        </FormGroup>
                                        <br />
                                        <FormGroup label="Id do Departamento: *" htmlFor="inputDepartamentId">
                                            <input type="long" className="form-control" id="inputDepartamentId" placeholder="Digite o Id do Departamento" value={this.state.departamentId} onChange={(e) => { this.setState({ departamentId: e.target.value }) }} />
                                        </FormGroup>
                                        <br />      
                                        <FormGroup label="Id da Resposta do Comentário: *" htmlFor="inputAnswerId">
                                            <input type="long" className="form-control" id="inputDepartamentId" placeholder="Digite o Id da Resposta do Comentário" value={this.state.departamentId} onChange={(e) => { this.setState({ departamentId: e.target.value }) }} />
                                        </FormGroup>
                                        <br />  */}
                                        <button onClick={this.find} type="button" className="btn btn-primary">
                                            <i className="pi pi-search"></i> Filtrar
                                        </button>
                                        <br />
                                        <br />
                                        <button onClick={this.findAll} type="button" className="btn btn-success">
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
                                    <CommentsTable comments={this.state.comments}
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

export default withRouter(ViewComments);