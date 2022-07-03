import React from 'react';
// import './UpdateComment.css';
import '../../components/Style.css';
import { withRouter } from 'react-router-dom';
//import axios from 'axios';

import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import CommentApiService from '../../services/CommentApiService';
class UpdateComment extends React.Component {

    state = {
        id: 0,
        title: '',
        message: '',
        commentType: '',
        user:{
            id: 0
            // name: '',
            // email: '',
            // registration: 0,
            // role: '',
            // departamentId: 0
        },
        departament:{
            departamentId: 0
            // name:''
        } 
    }
    constructor(){
        super();
        this.service = new CommentApiService();
    }

    componentDidMount() {
        const params = this.props.match.params;
        const id = params.id;
        this.findById(id);
    }

    // componentWillUnmount(){
    //     this.clear();
    // }

    findById = () => {
        //axios.get(`http://localhost:8080/api/comment?id=${commentId}`)
        this.service.find(this.state.id)

            .then(response => {
                const comment = response.data[0];
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

    update =  () => {
        //await axios.put(`http://localhost:8080/api/comment/${this.state.id}`,
        this.service.update(this.state,
            {
                title: this.state.title,
                message: this.state.message,
                commentType: this.state.commentType,
                // user: this.state.user.id,
                // departamentId: this.state.departament.id
            }
        ).then(response => {
            console.log(response);
            // this.find();
            alert("O comentário foi atualizado!")
        }
        ).catch(error => {
            console.log(error.response);
            alert("O comentário não pode ser atualizado!")
        }
        );

        console.log('request finished');
    }

    cancel = () => {
        this.props.history.push('/');
    }

    render() {
        return (

            <div className="container">
                <div className='row'>
                    <div className='col-md-12'>
                        <div className="bs-docs-section">
                            <Card title='Atualização de Comentário'>
                                <div className='row'>
                                    <div className='col-lg-12' >
                                        <div className='bs-component'>
                                            <form>
                                                <fieldset>
                                                    <FormGroup label="Id: *" htmlFor="inputId">
                                                        <input type="long" id="inputId" disabled={true} className="form-control"
                                                            value={this.state.id} name="id" onChange={(e) => { this.setState({ id: e.target.value }) }} />
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label="Título: *" htmlFor="inputTitle">
                                                        <input type="text" id="inputTitle" className="form-control"
                                                            value={this.state.title} name="title" onChange={(e) => { this.setState({ title: e.target.value }) }} />
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label="Mensagem: *" htmlFor="inputMessage">
                                                        <input type="text" id="inputMessage" className="form-control"
                                                            value={this.state.message} name="message" onChange={(e) => { this.setState({ message: e.target.value }) }} />
                                                        <small id="messageHelp" className="form-text text-muted">A mensagem do comentário deve ter no mínimo 10 e no máximo 255 caracteres.</small>
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label="Tipo de Comentário: *" htmlFor="selectCommentType" className="form-label mt-4">
                                                        <select className="form-select" id="selectCommentType" value={this.state.commentType} name="commentType" onChange={(e) => { this.setState({ commentType: e.target.value }) }}>
                                                            <option>Selecione uma opção</option>
                                                            <option value = "REVIEW">CRÍTICA</option>
                                                            <option value = "SUGGESTION">SUGESTÃO</option>
                                                            <option value = "COMPLIMENT">ELOGIO</option>
                                                        </select>
                                                    </FormGroup>
                                                    <br />
                                                    {/* <FormGroup label="Id do Autor do Comentário: *" htmlFor="inputAuthorId">
                                                        <input type="long" className="form-control" id="inputAuthorId" value={this.state.user} name="authorId" onChange={(e) => { this.setState({ 'user.id': e.target.value }) }} />
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label="Id do Departamento: *" htmlFor="inputDepartamentId">
                                                        <input type="long" className="form-control" id="inputDepartamentId" value={this.state.departament} name="departamentId" onChange={(e) => { this.setState({ 'departament.id': e.target.value }) }} />
                                                    </FormGroup>
                                                    <br /> */}
                                                    <button onClick={this.update} type="button" className="btn btn-success">
                                                        <i className="pi pi-save"></i> Atualizar
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

export default withRouter(UpdateComment);