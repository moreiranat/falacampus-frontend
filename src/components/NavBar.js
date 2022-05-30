import React from 'react';
import NavBarItem from './NavBarItem'
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
                        
                        <NavBarItem href="/createDepartament" label="Cadastrar Departamento"/>
                        <NavBarItem href="/viewDepartaments" label="Departamentos"/>
                        <NavBarItem href="/updateDepartament" label="Atualizar Departamento"/>
                        <NavBarItem href="/deleteDepartament" label="Apagar Departamento"/>

                        <NavBarItem href="/createUser" label="Cadastrar Usuário"/>
                        <NavBarItem href="/viewUsers" label="Usuários"/>
                        <NavBarItem href="/updateUser" label="Atualizar Usuário"/>
                        <NavBarItem href="/deleteUser" label="Apagar Usuário"/>

                        {/* <NavBarItem href="/" label="Sair"/> */}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;