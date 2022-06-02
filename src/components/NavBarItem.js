import React from 'react';

function NavBarItem(props){
    return(
        <li className="nav-item dropdown">          
                <a className="dropdown-item" href={props.href}>{props.label}</a>           
        </li>
    )
}

export default NavBarItem;