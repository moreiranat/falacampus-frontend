import React from 'react';
import NavBarItem from './NavBarItem';
import './NavBar.css';
import Logo from "./Logo";
import FalaCampus from "../assets/img/Fala_campus-logo.png";

function NavBar(props) {
    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-nav">
            <div className="container-fluid">
                <div className="col-md-3"><a href="/" className="navbar-brand"><Logo imageSrc={FalaCampus} /></a></div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav me-auto">

                        {/* <NavBarItem href="/login" label="Login"/> */}

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Departamento</a>
                            <ul className="dropdown-menu">
                                <li><NavBarItem href="/createDepartament" label="Cadastrar Departamento" /></li>
                                <li><NavBarItem href="/viewDepartaments" label="Listar Departamentos" /></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Usuário</a>
                            <ul className="dropdown-menu">
                                <li><NavBarItem href="/createUser" label="Cadastrar Usuário" /></li>
                                <li><NavBarItem href="/viewUsers" label="Listar Usuários" /></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Comentário</a>
                            <ul className="dropdown-menu">
                                <li><NavBarItem href="/createComment" label="Criar Comentário" /></li>
                                <li><NavBarItem href="/viewComments" label="Listar Comentários" /></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Resposta</a>
                            <ul className="dropdown-menu">
                                <li><NavBarItem href="#" label="Responder Comentário" /></li>
                                <li><NavBarItem href="/ViewAnswer" label="Listar Respostas" /></li>
                            </ul>
                        </li>

                        {/* <NavBarItem href="/" label="Sair"/> */}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;

document.addEventListener("DOMContentLoaded", function () {
    // make it as accordion for smaller screens
    if (window.innerWidth > 992) {

        document.querySelectorAll('.navbar .nav-item').forEach(function (everyitem) {

            everyitem.addEventListener('mouseover', function (e) {

                let el_link = this.querySelector('a[data-bs-toggle]');

                if (el_link != null) {
                    let nextEl = el_link.nextElementSibling;
                    el_link.classList.add('show');
                    nextEl.classList.add('show');
                }

            });
            everyitem.addEventListener('mouseleave', function (e) {
                let el_link = this.querySelector('a[data-bs-toggle]');

                if (el_link != null) {
                    let nextEl = el_link.nextElementSibling;
                    el_link.classList.remove('show');
                    nextEl.classList.remove('show');
                }


            })
        });

    }
    // end if innerWidth
});
    // DOMContentLoaded  end