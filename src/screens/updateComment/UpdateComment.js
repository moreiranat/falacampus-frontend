import React from 'react';
import './UpdateComment.css';
import '../../components/Style.css';
import { withRouter } from 'react-router-dom';
//import axios from 'axios';
import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import { showSuccessMessage, showErrorMessage } from '../../components/Toastr';

import CommentApiService from '../../services/CommentApiService';

class UpdateComment extends React.Component {

    state = {
         id: 0,
         title: '',
         message: '',
         commentType: '',
         user: {
             id: 0,
             name: '',
             email: '',
             registration: 0,
             role: '',
             departamentId: 0
         },
         departament: {
             departamentId: 0,
             name:''
         }
     }
    
    componentDidMount() {
        const params = this.props.match.params;
        const id = params.id;
        this.findById(id);

         //this.service.findById(this.props.match.params.id)

    }
    constructor() {
        super();
        this.service = new CommentApiService();
       
    }

    // componentWillUnmount(){
    //     this.clear();
    // }

    findById = (commentId) => {
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

                this.setState({ id:id, title:title, message:message, commentType:commentType, user:user, departament:departament});
                console.log(this.state.id,this.state.departament);
            }

            ).catch(error => {
                console.log(error.response);
            }
            );
    }

    validate = () => {
        const errors = [];

        if (!this.state.title) {
            errors.push('Campo Título é obrigatório!');
        } else if(!this.state.title.match(/[A-z 0-9]{5,50}$/)) {
            errors.push('O Título do Comentário deve ter no mínimo 5 e no máximo 50 caracteres!');
        }

        if (!this.state.message) {
            errors.push('Campo Mensagem é obrigatório!');
        } else if(!this.state.message.match(/[A-z 0-9]{10,255}$/)) {
            errors.push('A mensagem do Comentário deve ter no mínimo 10 e no máximo 255 caracteres!');
        }

        if (!this.state.commentType) {
            errors.push('É obrigatório informar o Tipo de Comentário!');
        }

        return errors;
    };

    update = () => {

        const errors = this.validate();

        if (errors.length > 0) {
            errors.forEach((message, index) => {
                showErrorMessage(message);
            });
            return false
        }

        //await axios.put(`http://localhost:8080/api/comment/${this.state.id}`,
        this.service.update(this.state.id,
            {
                title: this.state.title,
                message: this.state.message,
                commentType: this.state.commentType,
                 user: this.state.user.id,
                 departamentId: this.state.departament.id
            }
        ).then(response => {
            console.log(response);
            showSuccessMessage('Comentário atualizado com sucesso!');
            this.props.history.push('/viewComments');
        }
        ).catch(error => {
            console.log(error.response);
            showErrorMessage('O comentário não pode ser atualizado!');
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
                                                    {/* <FormGroup label="Id: *" htmlFor="inputId">
                                                        <input type="long" id="inputId" disabled={true} className="form-control"
                                                            value={this.state.id} name="id" onChange={(e) => { this.setState({ id: e.target.value }) }} />
                                                    </FormGroup>
                                                    <br /> */}
                                                    <p>
                                                        <small id="messageHelp" className="form-text text-muted">
                                                            * Todos os campos são obrigatórios.
                                                        </small>
                                                    </p>
                                                    <FormGroup label="Título: *" htmlFor="inputTitle">
                                                        <input type="text" id="inputTitle" className="form-control"  placeholder="Digite o título do comentário" 
                                                            value={this.state.title} name="title" onChange={(e) => { this.setState({ title: e.target.value }) }} />
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
                                                    <FormGroup label="Tipo de Comentário: *" htmlFor="selectCommentType" className="form-label mt-4">
                                                        <select className="form-select" id="selectCommentType" value={this.state.commentType} name="commentType" onChange={(e) => { this.setState({ commentType: e.target.value }) }}>
                                                            <option>Selecione uma opção</option>
                                                            <option value="REVIEW">CRÍTICA</option>
                                                            <option value="SUGGESTION">SUGESTÃO</option>
                                                            <option value="COMPLIMENT">ELOGIO</option>
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
                                                    <button onClick={this.update} type="button" id="button-update" className="btn btn-success">
                                                        <i className="pi pi-save"></i> Atualizar
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

export default withRouter(UpdateComment);