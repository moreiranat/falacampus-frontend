import React, { useState, useMemo } from 'react';
//import Pagination from './Pagination';
import './Style.css';

let PageSize = 10;
//let data = 30;

export default props => {

    const [currentPage, setCurrentPage] = useState(1);
    //let rows;
    
    const rows = props.comments.map(comment => {
        
        // const currentTableData = useMemo(() => {
        // const firstPageIndex = (currentPage - 1) * PageSize;
        // const lastPageIndex = firstPageIndex + PageSize;
        // return adta.slice(firstPageIndex, lastPageIndex);
        // }, [currentPage]);
            
        return (
            
            <tr key={comment.id}>
                {/* <td>{comment.id}</td> */}
                <td>{comment.title}</td>
                <td>{comment.message}</td>
                <td>{comment.creationDate}</td>
                <td className="col-md-2">{comment.commentType}</td>
                <td className="col-md-2">{comment.statusComment}</td>
                {/* <td>{comment.authorId.id}</td>
                <td>{comment.departamentId.id}</td> */}
                {/* <td>{comment.answerId.id}</td> */}
                <td className="col-md-2">
                    <button type="button" title="Responder"
                        className="btn btn-danger btn-space"
                        onClick={e => props.answer(comment.id)}>
                        <i className="pi pi-comment"></i>
                    </button>
                    <button type="button" title="Editar"
                        className="btn btn-warning btn-space"
                        onClick={e => props.edit(comment.id)}>
                        <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button" title="Excluir"
                        className="btn btn-primary btn-space"
                        onClick={e => props.delete(comment.id)}>
                        <i className="pi pi-trash"></i>
                    </button>

                </td>
            </tr>
        )
    } )

    return (
    <>

        <table className="table table-hover">
            <thead>
                <tr className="table-active">
                    {/* <th scope="col">Id</th> */}
                    <th scope="col">Título</th>
                    <th scope="col">Mensagem</th>
                    <th scope="col">Data/Hora de Criação</th>
                    <th scope="col">Tipo de Comentário</th>
                    <th scope="col">Status do Comentário</th>
                    {/* <th scope="col">Id do Autor</th>
                    <th scope="col">Id do Departamento</th> */}
                    {/* <th scope="col">Id da Resposta</th> */}
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>

        {/* <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={data.length}
            pageSize={PageSize}
            onPageChange={page => setCurrentPage(page)}
        /> */}

    </>
    )

    
}