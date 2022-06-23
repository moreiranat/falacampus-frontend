import React from 'react';
import 'primeicons/primeicons.css';
import './DeleteUser.css';
import '../../components/Style.css';
import { withRouter } from 'react-router-dom';
//import axios from 'axios';
import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import UserApiService from '../../services/UserApiService';
class DeleteUser extends React.Component {

    state = {
      id: 0
    }
    constructor(){
      super();
      this.service=new UserApiService();
  }

    componentWillUnmount(){
      this.clear();
    }
  
    delete = () => {
      //axios.delete(`http://localhost:8080/api/user/${this.state.id}`,
      this.service.delete(this.id,
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
                <div className='col-md-12'>
                    <div className="bs-docs-section">
                        <Card title='Apagar Usuário'>
                            <div className='row'>
                                <div className='col-lg-12' >
                                    <div className='bs-component'>
                                        <form>
                                            <fieldset>
                                                <FormGroup label='Id do Usuário: *' htmlFor="inputUserId">
                                                    <input type="number" className="form-control" id="inputUserId" placeholder="Digite o Id do Usuário" 
                                                    value={this.state.id} onChange={(e) => { this.setState({ id: e.target.value }) }} />
                                                </FormGroup>
                                                <br />
                                                <button onClick={this.delete} type="button" className="btn btn-success">
                                                    <i className="pi pi-save"></i> Confirmar
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

  export default withRouter(DeleteUser);