import { useState, React, useEffect } from 'react';
import Menu from './menu.js';
import { Container, Table, tbody, thead, NavLink, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../dado/ingrediente.js';
import axios from 'axios';
import Host from '../dado/host';
import { useRouter } from 'next/router'
function Ingrediente() {
    const [lista, setLista] = useState("");   
    const router = useRouter()
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

        
    const deletar = (codigo) => {
        Dado.deletar(codigo).then(response => {
            if (response.data != null) {
                router.push(Host.url() + "/ingrediente")
            }
        }, (error) => {
            console.log("error: " + error)
        })

    }
    return (
        <Container>
            <Menu />
            <NavLink href={Host.url() + '/ingrediente/incluir'}>
                Incluir
            </NavLink>
            <Table>
                <thead>
                    <tr>
                        <th>
                      
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
                            <td>
                                <img src='/x.png' width="20px" onClick={() => {deletar(item.codigo) }} />

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </Container >
    );


}


function Pagina() {
    return <Ingrediente />
}


export default Pagina;