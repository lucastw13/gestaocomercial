import { useState, React, useEffect } from 'react';
import Menu from './menu.js';
import { Container, Table, tbody, thead, NavLink, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../dado/insumo.js';
import axios from 'axios';
import Host from '../dado/host';
function Insumo() {
    const [lista, setLista] = useState("");

    if ((lista == "") || (lista == undefined)) {
        listar() 
    }

    function listar(){
        Dado.listar()
        .then(response => {
            if (response.data != null) {
                if (response.data.status == true) {
                    var listaTemp = []
                    for (var item of response.data.insumo) {
                        listaTemp.push({ codigo: item._id, descricao: item.descricao })
                    }
                    setLista(listaTemp)
                } else {
                    console.log("error: " + response.data.descricao)

                }
            }
        }, (error) => {
        })
    }

    const deletar = (codigo) => {
        Dado.deletar(codigo).then(response => {
            if (response.data != null) {
                if (response.data.status == true) {
                    listar()
                } else {
                    console.log("error: " + response.data.descricao)
                }
            }
        }, (error) => {
            console.log("error: " + error)
        })

    }
    return (
        <Container>
            <Menu />
            <NavLink href={Host.url() + '/insumo/incluir'}>
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
                                <NavLink href={Host.url() + "/insumo/" + item.codigo}>
                                    {item.descricao}
                                </NavLink>

                            </td>
                            <td>
                                <img src='/x.png' width="20px" onClick={() => { deletar(item.codigo) }} />

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </Container >
    );


}


function Pagina() {
    return <Insumo />
}


export default Pagina;