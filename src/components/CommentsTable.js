import React from 'react';
import './Style.css';

export default props => {

    const rows = props.comments.map(comment => {
        return (
            <tr key={comment.id}>
                <td>{comment.id}</td>
                <td>{comment.title}</td>
                <td>{comment.message}</td>
                <td>{comment.creationDate}</td>
                <td>{comment.commentType}</td>
                <td>{comment.statusComment}</td>
                {/* <td>{comment.user.id}</td>
                <td>{comment.departament.id}</td>
                <td>{comment.answer.id}</td> */}
                <td>
                    <button type="button" title="Editar"
                        className="btn btn-warning"
                        onClick={e => props.edit(comment.id)}>
                        <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button" title="Excluir"
                        className="btn btn-danger btn-delete"
                        onClick={e => props.delete(comment.id)}>
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
                    <th scope="col">Título</th>
                    <th scope="col">Mensagem</th>
                    <th scope="col">Data/Hora de Criação</th>
                    <th scope="col">Tipo de Comentário</th>
                    <th scope="col">Status do Comentário</th>
                    {/* <th scope="col">Id do Autor</th>
                    <th scope="col">Id do Departamento</th>
                    <th scope="col">Id da Resposta</th> */}
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}