import React from 'react';
import './Style.css';

export default props => {

    const rows = props.answers.map(answer => {
        return (
            <tr key={answer.id}>
                 <td>{answer.id}</td>
                <td>{answer.message}</td>
                <td>{answer.creationDate}</td>
                <td>{answer.authorId}</td>
                <td>
                    <button type="button" title="Editar"
                        className="btn btn-warning"
                        onClick={e => props.edit(answer.id)}>
                        <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button" title="Excluir"
                        className="btn btn-danger btn-delete"
                        onClick={e => props.delete(answer.id)}>
                        <i className="pi pi-trash"></i>
                    </button>
                </td>
            </tr>
        )
    } )

    return (

        <table className="table table-hover">
            <thead>
                <tr className="table-active">
                    <th scope="col">Id</th>
                    <th scope="col">Mensagem</th>
                    <th scope="col">Id Comentário</th>
                    <th scope="col">Data/Hora De Criação</th>
                    <th scope="col">Id Autor </th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}