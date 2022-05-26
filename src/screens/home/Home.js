import React from 'react';
import './Home.css';

import { withRouter } from 'react-router-dom';

class Home extends React.Component {

    render() {
        return (

            <div className="container">
                <div className='row'>
                    <div className='col-md-12' style={this.styles.colMd12}>
                        <div className="bs-docs-section">

                            <div className="card bg-light mb-3" style={this.styles.cardBg}>
                                <h1 className="card-header text-center">Bem Vindo(a) ao "Fala Campus"</h1>
                                <h3 className="card-header text-center">Este espaço é destinado a toda a comunidade acadêmica, onde todos poderão propor sugestões, realizar críticas e elogios, relacionados ao Instituto Federal da Paraíba, Campus Monteiro - PB.</h3>
                                <h4 className="card-header text-center">Projeto desenvolvido por Nataly Lucena, Patrícia dos Santos e Rosenato Barreto para a Disciplina de Desenvolvimento de Aplicações Corporativas com o Professor Elenilson Vieira, no 5° Período do Curso de Análise e Desenvolvimento de Sistemas do IFPB, Campus Monteiro/PB</h4>
                                <h5 className="card-header text-center">Projeto desenvolvido utilizando SpringBoot no Backend e React com Bootswatch no Frontend</h5>
                                <div className="card-body"></div>
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
        cardBg: {
            outerWidth: '20rem',
            margin: '50px 0 0 0'
        }
    }
}

export default withRouter(Home);