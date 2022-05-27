import React from 'react';
import NavBarItem from './NavBarItem'

function NavBar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a href="/" className="navbar-brand">Fala Campus</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav me-auto">
                        <NavBarItem href="/" label="Home" />
                        <NavBarItem href="/login" label="Login"/>

                        <NavBarItem href="/createDepartament" label="Cadastrar Departamento"/>
                        <NavBarItem href="/viewDepartaments" label="Departamentos"/>

                        <NavBarItem href="/createUser" label="Cadastrar Usuário"/>
                        <NavBarItem href="/viewUsers" label="Usuários"/>

                        <NavBarItem href="/updateUser" label="Update Usuario"/>
                        <NavBarItem href="/deleteUser" label="Delete Usuario"/>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;