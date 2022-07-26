import React from 'react';
import './Home.css';
import Banner from '../../components/Banner';
import img01 from "../../assets/img/img-01.png";
// import icon01 from "../../assets/img/icons8-speech-balloon-96.png";
// import icon02 from "../../assets/img/icons8-megaphone-96.png";
// import icon03 from "../../assets/img/icons8-thumbs-up-96.png";
import { withRouter } from 'react-router-dom';
// import Card from '../../components/Card';

class Home extends React.Component {

    render() {

        return (

            <><div className="home">
                <div className="row">
                    <div className="col-md-9">
                        <p className="post-zero">Este espaço é destinado a toda a comunidade acadêmica, onde todos poderão
                            propor sugestões, realizar críticas e elogios, relacionados ao Instituto
                            Federal da Paraíba, Campus Monteiro - PB.</p>
                        <p className="post">* Faça login no sistema para participar</p>


                    </div>
                    <div className="col-md-3">
                        <Banner imageSrc={img01} />
                    </div>

                </div>

            </div>

            <div className="home">
                <div>

                    {/* <div className="section-one">
                        <div>
                            <div>
                                <div className="section-one-title">
                                    <h4><img src={ icon01 }/>Sugestões</h4>
                                </div>
                            </div>
                            <div>
                                <div className="section-one-title">
                                    <h4><img src={ icon02 }/>Críticas</h4>
                                </div>
                            </div>
                            <div>
                                <div><div className="section-one-title">
                                    <h4><img src={ icon03 }/>Elogios</h4>
                                </div>
                            </div>
                            </div>
                        </div>

                        
                    </div> */}
                    <div className="section-two">
                        <center><p className="post">
                            Projeto desenvolvido por Nataly Lucena,
                            Patrícia dos Santos e Rosenato Barreto para a Disciplina de Desenvolvimento
                            de Aplicações Corporativas com o Professor Elenilson Vieira, no 5° Período
                            do Curso de Análise e Desenvolvimento de Sistemas do IFPB, Campus Monteiro.</p></center>

                    </div>

                </div>

                    



            {/* // <div className="container">
            //     <div className='row'>
            //         <div className='col-md-12' style={this.styles.colMd12}>
            //             <div className="bs-docs-section">

            //                 <div className="card border-success mb-3" style={this.styles.cardBg}>
            //                     <h1 className="card-header text-center">Bem Vindo(a) ao "Fala Campus"</h1>
            //                     <h3 className="card-header text-center">Este espaço é destinado a toda a comunidade acadêmica, onde todos poderão propor sugestões, realizar críticas e elogios, relacionados ao Instituto Federal da Paraíba, Campus Monteiro - PB</h3>
            //                     <h4 className="card-header text-center">Projeto desenvolvido por Nataly Lucena, Patrícia dos Santos e Rosenato Barreto para a Disciplina de Desenvolvimento de Aplicações Corporativas com o Professor Elenilson Vieira, no 5° Período do Curso de Análise e Desenvolvimento de Sistemas do IFPB, Campus Monteiro/PB</h4>
            //                     <h5 className="card-header text-center">Projeto desenvolvido utilizando SpringBoot no Backend e React com Bootswatch no Frontend</h5>
            //                     <div className="card-body"></div>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div> */}
            </div>
            </>
        )
    }
}

export default withRouter(Home);