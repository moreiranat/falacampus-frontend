import React from 'react';
import './UpdateComment.css';
import '../../components/Style.css';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';

class UpdateComment extends React.Component {

    state = {
        id: '',
        title: '',
        message: '',
        commentType: '',
        user:{
            authorId: 0,
            name: ''
        },
        departament:{
            departamentId: 0,
            name:''
        } 
    }

    componentDidMount() {
        const params = this.props.match.params;
        const id = params.id;
        this.findById(id);
    }

    // componentWillUnmount(){
    //     this.clear();
    // }

    findById = (commentId) => {
        axios.get(`http://localhost:8080/api/comment?id=${commentId}`)
            .then(response => {
                const comment = response.data[0];
                const id = comment.id;
                const title = comment.title;
                const message = comment.message;
                const commentType = comment.commentType;
                const author = comment.author;
                const departament = comment.departament;

                this.setState({ id, title, message, commentType, author, departament });
            }

            ).catch(error => {
                console.log(error.response);
            }
            );
    }

    update = async () => {
        await axios.put(`http://localhost:8080/api/comment/${this.state.id}`,
            {
                title: this.state.title,
                message: this.state.message,
                commentType: this.state.commentType,
                authorId: this.state.author.id,
                departamentId: this.state.departament.id
            }
        ).then(response => {
            console.log(response);
            // this.find();
        }
        ).catch(error => {
            console.log(error.response);
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
                                                            <option value = "CRÍTICA">REVIEW</option>
                                                            <option value = "SUGESTÃO">SUGGESTION</option>
                                                            <option value = "ELOGIO">COMPLIMENT</option>
                                                        </select>
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label="Id do Autor do Comentário: *" htmlFor="inputAuthorId">
                                                        <input type="long" className="form-control" id="inputAuthorId" value={this.state.authorId} name="authorId" onChange={(e) => { this.setState({ authorId: e.target.value }) }} />
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label="Id do Departamento: *" htmlFor="inputDepartamentId">
                                                        <input type="long" className="form-control" id="inputDepartamentId" value={this.state.departamentId} name="departamentId" onChange={(e) => { this.setState({ departamentId: e.target.value }) }} />
                                                    </FormGroup>
                                                    <br />
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