import React from 'react';

import '../../components/Style.css';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';

class UpdateAnswer extends React.Component {

    state = {
        id: 0,
        message:'' ,
        commentId: 0,
        creationDate :Date,
        authorId:0
    }

    componentDidMount() {
        const params = this.props.match.params;
        const id = params.id;
        const message =params.message;
        const commentId = params.commentId;
        const  creationDate =params.creationDate;
        const authorId =params.authorId;
        this.findById(id);
    }

    // componentWillUnmount(){
    //     this.clear();
    // }

    findById = (answerId) => {
        axios.get(`http://localhost:8080/api/answer?id=${answerId}`)
            .then(response => {
                const answer = response.data[0];
                const id = answer.id;
                const message = answer.message;
                
                const commentId =answer.commentId;
                const createDate=answer.createDate;
                const authorId = answer.authorId;
                

                this.setState({ id, message, commentId, authorId });
            }

            ).catch(error => {
                console.log(error.response);
            }
            );
    }

    update = async () => {
        await axios.put(`http://localhost:8080/api/answer/${this.state.id}`,
            {
               
                message: this.state.message,
                commentId: this.state.commentId,
                creationDate :this.state.creationDate,
                authorId: this.state.authorId
               
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
                            <Card title='Atualização de Respostas'>
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
                                                   
                                                    <br />
                                                    <FormGroup label="Mensagem: *" htmlFor="inputMessage">
                                                        <input type="text" id="inputMessage" className="form-control"
                                                            value={this.state.message} name="message" onChange={(e) => { this.setState({ message: e.target.value }) }} />
                                                        <small id="messageHelp" className="form-text text-muted">Respostas dos Comentário.</small>
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label="commentIdId: *" htmlFor="inputCommentId">
                                                            <input type="long" id="inputCommentId" disabled={true} className="form-control"
                                                            value={this.state.commentId} name="id" onChange={(e) => { this.setState({ commentId: e.target.value }) }} />
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label="createDate: *" htmlFor="inputCreateDate">
                                                            <input type="date" id="inputCreateDate" disabled={true} className="form-control"
                                                            value={this.state.createDate} name="id" onChange={(e) => { this.setState({ createDate: e.target.value }) }} />
                                                    </FormGroup>
                                                   
                                                  
                                                   
                                                    <br />
                                                    <FormGroup label="Id do Autor do Comentário: *" htmlFor="inputAuthorId">
                                                        <input type="long" className="form-control" id="inputAuthorId" value={this.state.authorId} name="authorId" onChange={(e) => { this.setState({ authorId: e.target.value }) }} />
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

export default withRouter(UpdateAnswer);