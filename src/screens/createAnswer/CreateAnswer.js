import React from 'react';
import './CreateAnswer.css';
import '../../components/Style.css';
import 'primeicons/primeicons.css';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';

class CreateAnswer extends React.Component {

    state = {
        message: '',
        commentId: 0,
        authorId: 0,
    }

    // componentWillUnmount() {
    //     this.clear();
    // }

    create = async () => {
        await axios.post('http://localhost:8080/api/answer',
            {
                message: this.state.message,
                commentId: this.state.commentId,
                authorId: this.state.authorId
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
                            <Card title='Responder Comentário'>
                                <div className='row'>
                                    <div className='col-lg-12' >
                                        <div className='bs-component'>
                                            <form>
                                                <fieldset>
                                                    <FormGroup label="Id do Comentário: *" htmlFor="inputCommentId">
                                                        <input type="number" className="form-control" id="inputCommentId" 
                                                        placeholder="Digite o id do comentário" 
                                                        value={this.state.commentId} 
                                                        onChange={(e) => { this.setState({ commentId: e.target.value }) }} />
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label="Messagem: *" htmlFor="inputMessage">
                                                        <input type="textarea" className="form-control" id="inputMessage" 
                                                        placeholder="Incluir resposta" 
                                                        value={this.state.message} 
                                                        onChange={(e) => { this.setState({ message: e.target.value }) }} />
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label="Id do Autor: *" htmlFor="inputAuthorId">
                                                        <input type="number" className="form-control" id="inputAuthorId" 
                                                        placeholder="Digite o id do autor" 
                                                        value={this.state.authorId} 
                                                        onChange={(e) => { this.setState({ authorId: e.target.value }) }} />
                                                    </FormGroup>                                                    
                                                    <br />
                                                    <br />
                                                    <button onClick={this.create} type="button" className="btn btn-success">
                                                        <i className="pi pi-save"></i> Responder
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

export default withRouter(CreateAnswer);

