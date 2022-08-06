import React from 'react';

function NavBarItem({render, ...props}){

    if(render){
        return(
            <li className="nav-item">          
                    <a className="nav-link" onClick={props.onClick} href={props.href}>{props.label}</a>           
            </li>
        )

    } else {
        return false;
    }


}

export default NavBarItem;