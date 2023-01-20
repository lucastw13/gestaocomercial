import { useState, React, useEffect } from 'react';
import Menu from './menu.js';
import { Container, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../dado/generico.js';
import Host from '../dado/host';
function Cliente() {
    const [lista, setLista] = useState("");

    if ((lista == "") || (lista == undefined)) {
        listar()
    }

    function listar() {
        Dado.listar("cliente")
            .then(response => {
                if (response.data != null) {
                    if (response.data.status == true) {
                        setLista(response.data.lista)
                    } else {
                        setLista([])
                        console.log("error: " + response.data.descricao)

                    }
                }
            }, (error) => {
                console.log("error: " + error)
            })
    }

    function deletar(item) {
        var deletar = confirm("Deseja excluir o cliente: " + item.nome + " ?");
        if (deletar) {
            Dado.deletar(item._id, "cliente")
                .then(response => {
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

    }
    return (
        <Container>
            <Menu />
            <Table>
                <thead>
                    <tr>
                        <th>
                            Nome
                        </th>
                        <th>
                            <a href={Host.url() + "/cliente/incluir"}>
                                <img src='/+.png' width="20px" />
                            </a>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {lista && lista.map((item) => (
                        <tr>
                            <td>
                                <a href={Host.url() + "/cliente/" + item._id}>
                                    {item.nome}
                                </a>

                            </td>
                            <td>
                                <img src='/x.png' width="20px" onClick={() => deletar(item)} />

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </Container >
    );


}


function Pagina() {
    return <Cliente />
}


export default Pagina;