import React from 'react';
import './CreateComment.css';
import '../../components/Style.css';
import 'primeicons/primeicons.css';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';

class CreateComment extends React.Component {

    state = {
        title: '',
        message: '',
        commentType: '',
        authorId: 0,
        departamentId: 0
    }

    // componentWillUnmount() {
    //     this.clear();
    // }

    create = async () => {
        await axios.post('http://localhost:8080/api/comment',
            {
                title: this.state.title,
                message: this.state.message,
                commentType: this.state.commentType,
                authorId: this.state.authorId,
                departamentId: this.state.departamentId
            }
        ).then(response => {
            console.log(response);
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
                            <Card title='Cadastro de Comentário'>
                                <div className='row'>
                                    <div className='col-lg-12' >
                                        <div className='bs-component'>
                                            <form>
                                                <fieldset>
                                                    <FormGroup label="Título:" htmlFor="inputCommentTitle">
                                                        <input type="text" className="form-control" id="inputCommentTitle" 
                                                        placeholder="Digite o título da mensagem" 
                                                        value={this.state.title} 
                                                        onChange={(e) => { this.setState({ title: e.target.value }) }} />
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label="Messagem: *" htmlFor="inputMessage">
                                                        <input type="text" className="form-control" id="inputMessage" 
                                                        placeholder="Digite a sugestão, crítica ou elogio" 
                                                        value={this.state.message} 
                                                        onChange={(e) => { this.setState({ message: e.target.value }) }} />
                                                        <small id="messageHelp" className="form-text text-muted">Seja cordial ao escrever sua crítica, sugestão ou elogio.</small>
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label="Tipo de Comentário: *" htmlFor="selectCommentType">
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
                                                    <FormGroup label="Id do Autor: *" htmlFor="inputAuthorId">
                                                        <input type="number" className="form-control" id="inputAuthorId" 
                                                        placeholder="Digite o id do autor" 
                                                        value={this.state.authorId} 
                                                        onChange={(e) => { this.setState({ authorId: e.target.value }) }} />
                                                    </FormGroup>                                                    
                                                    <br />
                                                    <FormGroup label="Id do Departamento: *" htmlFor="inputDepartamentId">
                                                        <input type="number" className="form-control" id="inputDepartamentId" 
                                                        placeholder="Digite o id do departamento" 
                                                        value={this.state.departamentId} 
                                                        onChange={(e) => { this.setState({ departamentId: e.target.value }) }} />
                                                    </FormGroup>
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

