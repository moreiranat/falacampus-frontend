import React from "react";
import axios from "axios";

const SelectDepartament = (props) => {

    const [departaments, setDepartaments] = React.useState([]);

    function findDepartaments() {
        axios.get( "http://localhost:8080/api/departament"
        ).then( Response => {
            const departaments = Response.data;
            setDepartaments(departaments);
            console.log("departaments", departaments);
        }).catch(error => {
            console.log(error.Response)
        });
    }

    React.useEffect(() => {
        findDepartaments();
    },[]);

    return (
        <select  id={props.id} onChange={props.onChange}>
            <option className="form-control" value="">Selecione o departamento</option>
            {departaments.map( departament => {
                const {id, name} = departament;
                return (<option key={id} className="form-control" value={id}>{name}</option>)
            })}
        </select>
    )
}

export default SelectDepartament;