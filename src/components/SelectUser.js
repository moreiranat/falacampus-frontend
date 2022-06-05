import React from "react";
import axios from "axios";

const SelectUser = (props) => {

    const [users, setUsers] = React.useState([]);

    function findUsers() {
        axios.get( "http://localhost:8080/api/user"
        ).then( Response => {
            const users = Response.data;
            setUsers(users);
            console.log("users", users);
        }).catch(error => {
            console.log(error.Response)
        });
    }

    React.useEffect(() => {
        findUsers();
    },[]);

    return (
        <select  id={props.id} onChange={props.onChange}>
            <option className="form-control" value="">Selecione o usuário</option>
            {users.map( user => {
                const {id, name} = user;
                return (<option key={id} className="form-control" value={id}>{name}</option>)
            })}
        </select>
    )
}

export default SelectUser;