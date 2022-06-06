import React from "react";
import axios from "axios";

const SelectComment = (props) => {

    const [comments, setComments] = React.useState([]);

    function findComments() {
        axios.get( "http://localhost:8080/api/comment/all"
        ).then( Response => {
            const comments = Response.data;
            setComments(comments);
            console.log("comments", comments);
        }).catch(error => {
            console.log(error.Response)
        });
    }

    React.useEffect(() => {
        findComments();
    },[]);

    return (
        <select  id={props.id} onChange={props.onChange}>
            <option className="form-control" value="">Selecione o comentário</option>
            {comments.map( comment => {
                const {id, message} = comment;
                return (<option key={id} className="form-control" value={id}>{message}</option>)
            })}
        </select>
    )
}

export default SelectComment;