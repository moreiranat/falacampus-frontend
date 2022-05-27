import React from 'react';


import { withRouter } from 'react-router-dom';
import axios from 'axios';

class DeleteUser extends React.Component {

    state = {
      id: 0
    }
  
    delete = () => {
      axios.delete(`http://localhost:8080/api/user/${this.state.id}`,
      ).then(response => 
        {
          console.log(response);
        }
      ).catch(error => 
        {
          console.log(error.response);
        }
      );
    }

    cancel = () => {
      this.props.history.push('/');
    }
  
    render() {
      return (
        
        <div className="container">
          <div className='row'>
            <div className='col-md-12' style={this.styles.colMd12}>
              <div className="bs-docs-section">

                <div className="card bg-light mb-3" style={this.styles.cardText}>
                  <h3 className="card-header text-center">Deletar Usuarios </h3>
                  <div className="card-body">
  
                    <div className='row'>
                      <div className='col-lg-12' >
                        <div className='bs-component'>
  
                          <div className="form-group">
                            <label className="col-form-label mt-4" htmlFor="inputId">Id:</label>
                            <input type="text" className="form-control" placeholder="Digite o Id da Tarefa" id="inputId" value={this.state.id} onChange={(e) => { this.setState({ id: e.target.value }) }} />
                          </div>

                          <br />

                          <button onClick={this.delete} type="button" className="btn btn-danger">
                            <i className="pi pi-save"></i> Deletar
                          </button>
                          <button onClick={this.cancel} type="button" className="btn btn-outline-dark">
                            <i className="pi pi-times"></i> Cancelar
                          </button>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  
    styles = {
      colMd12: {
        position: 'relative'
      },
      cardText: {
        outerWidth: '20rem',
        margin: '50px 0 0 0'
      }
    }
  } 

  export default withRouter(DeleteUser);