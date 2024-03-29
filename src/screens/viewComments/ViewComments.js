import React from 'react';
import './ViewComments.css';
import '../../components/Style.css';
import { withRouter } from 'react-router-dom';
//import CommentsCard from '../../components/CommentsCard';

import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';

import CommentsTable from '../../components/CommentsTable'
import CommentApiService from '../../services/CommentApiService';
import { showSuccessMessage, showErrorMessage } from '../../components/Toastr';
class ViewComments extends React.Component {


    state = {
        title: '',
        id: 0,
        message: '',
        creationDate: Date,
        commentType: '',
        statusComment: '',
        user: {
            authotId: 0,
            name: '',
            email: '',
            registration: 0,
            role: '',
            departamentId: 0
        },
        departament: {
            departamentId: 0,
            name: ''
        },
        answer: {
            answerId: 0,
            message: '',
            commentId: '',
            creationDate: Date,
            authorId: 0
        },
        comments: []
    }
    constructor() {
        super();
        this.service = new CommentApiService();
    }
    componentDidMount() {
        this.findAll();
    }
//   componentWillUnmount() {
//        this.clear();
//      }

    delete = (commentId) => {

        this.service.delete(commentId)
            .then(response => {
                this.find();
                showSuccessMessage('Comentário excluído com sucesso!');
            }
            ).catch(error => {
                console.log(error.response);
                showErrorMessage('Comentário não pode ser excluído!');
            }
            );
    }

    card= (commentId) => {
       
    
    }


    edit = (commentId) => {
        this.props.history.push(`/updateComment/${commentId}`);
        this.service.edit(commentId);
    }

    answer = (commentId) => {
        this.props.history.push(`/createAnswer/${commentId}`);
    }

    createComment = () => {
        this.props.history.push(`/createComment`);
    }

    find = () => {
        this.service.find('')
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

        if (this.state.message !== '') {
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

        //axios.get(`http://localhost:8080/api/comment/${params}`)
        this.service.find(this.state.id)
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

        //axios.get(`http://localhost:8080/api/comment/all`)
        this.service.findAll('/all')
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
                            <Card title='Comentários'>
                                <form>
                                    <fieldset>
                                        {/* <FormGroup label="Id: *" htmlFor="inputId">
                                            <input type="long" className="form-control" id="inputId" placeholder="Digite o Id do Comentário" value={this.state.id} onChange={(e) => { this.setState({ id: e.target.value }) }} />
                                        </FormGroup>
                                        <br /> */}
                                        <FormGroup label="Título:" htmlFor="inputTitle"><br />
                                            <input type="text" className="form-control" id="inputTitle" placeholder="Digite o Título do Comentário" value={this.state.title} onChange={(e) => { this.setState({ title: e.target.value }) }} />
                                            {/* <small id="titleHelp" className="form-text text-muted">O título do comentário deve ter no mínimo 5 e no máximo 50 caracteres.</small> */}
                                        </FormGroup>
                                        <br />
                                        {/* <FormGroup label="Mensagem: *" htmlFor="MessageTextarea" className="form-label mt-4">
                                            <textarea type="text" className="form-control" id="MessageTextarea" rows="3" minLength="10" maxlength="255"
                                                placeholder="Digite a sugestão, crítica ou elogio"
                                                value={this.state.message}
                                                onChange={(e) => { this.setState({ message: e.target.value }) }} />
                                            <small id="messageHelp" className="form-text text-muted">Seja cordial ao escrever sua crítica, sugestão ou elogio.</small>
                                        </FormGroup>
                                        <br /> */}
                                        {/* <FormGroup label="Data de Criação: *" htmlFor="inputCreationDate">
                                            <input type="date" className="form-control" id="inputCreationDate" placeholder="Digite a Data de Criação do Comentário" value={this.state.creationDate} onChange={(e) => { this.setState({ creationDate: e.target.value }) }} />
                                        </FormGroup>
                                        <br /> */}
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
                                        <button onClick={this.find} type="button" id="btn-search" className="btn btn-info">
                                            <i className="pi pi-search"></i> Pesquisar
                                        </button>
                                        {/* <br />
                                        <br />
                                        <button onClick={this.findAll} type="button" className="btn btn-success">
                                            <i className="pi pi-search"></i> Buscar Tudo
                                        </button> */}
                                    </fieldset>
                                </form>
                            </Card>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-12">
                                <button onClick={this.createComment} type="button" className="btn btn-success btn-cadastrar" id="cadastrar_comentario">
                                    <i className="pi pi-plus"></i> Cadastrar Novo Comentário
                                </button>
                            </div>
                        </div>
                        <br />
                        <div className='row'>
                            <div className='col-lg-12' >
                                <div className='bs-component'>
                                    <CommentsTable comments={this.state.comments}
                                        delete={this.delete}
                                        edit={this.edit}
                                        answer={this.answer} 
                                        card= {this.card}/>
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