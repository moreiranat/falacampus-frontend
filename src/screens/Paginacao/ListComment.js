import './ListComment.css';
import React, { useEffect, useState } from 'react';
import Card from '../../components/Card';

function ListComment() {

    const [itens, setItens] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`https://jsonplaceholder.typicode.com/todos`)
                .then(response => response.json())
                .then(data => data)

                setItens(result)
                console.log(result);
        }
        fetchData()
    }, []);

    
    return (


        <div className="container">
            <div className='row'>
                <div className='col-md-12' style={this.styles.colMd12}>
                    <div className="bs-docs-section">
                        <Card title='Comentários'>
                            <div className="ListComment">
                                {itens.map(item => {
                                    return <div className="item">
                                        <span>{item.id}</span>
                                        {/* <span>{item.title}</span>
                                        <span>{item.completed}</span> */}
                                    </div>

                                })}
                            </div>
                        </Card>
                    </div>

                </div >
            </div >
        </div >


    )

}

export default ListComment;