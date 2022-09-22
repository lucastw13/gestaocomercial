import { useState, React, useEffect } from 'react';
import Menu from './menu.js';
import { Container, Table, tbody, thead, NavLink, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../dado/ingrediente.js';
import axios from 'axios';
import Host from '../dado/host';

function Ingredientes() {
    const [lista, setLista] = useState("");   
    useEffect(() => {
        setLista()
        Dado.listar()
            .then(response => {
                if (response.data != null)
                    var listaTemp = []
                for (var item of response.data.ingrediente) {
                    listaTemp.push({ codigo: item._id, descricao: item.descricao })
                }
                setLista(listaTemp)

            }, (error) => {
            })
    }, []);

    return (
        <Container>
            <Menu />

            <Table>
                <thead>
                    <tr>
                        <th>
                            Ingrediente
                        </th>
                    </tr>
                </thead>
                <tbody>
                {lista && lista.map((item) => (
                        <tr>
                            <td>
                                <NavLink href={Host.url() + "/ingrediente/" + item.codigo}>
                                    {item.descricao}
                                </NavLink>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </Container >
    );


}


function Pagina() {
    return <Ingredientes />
}


export default Pagina;