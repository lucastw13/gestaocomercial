import { useState, React, useEffect } from 'react';
import Menu from './menu.js';
import { Container, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../dado/generico.js';
import Host from '../dado/host';
import { useRouter } from 'next/router'
function Insumo() {
    const router = useRouter();
    const [lista, setLista] = useState("");
    const [console, setConsole] = useState("");

    if ((lista == "") || (lista == undefined)) {
        if (console=="" || console==undefined) {
            setConsole("listar")

        }
        listar()
    }

    function listar() {
        if (console=="" || console==undefined){
            setConsole("entrouListar: "+Host.urlApi())

        }
        Dado.listar("insumo")
            .then(response => {
                setConsole("entrou response")
                if (response.data != null) {
                    setConsole("response.data != null")
                    if (response.data.status == true) {
                        setConsole("true")
                        setConsole(JSON.stringify(response.data.lista))
                        setLista(response.data.lista)
                    } else {
                        setConsole("false")
                        setConsole("error: " + response.data.descricao)
                        setLista([])
                        console.log("error: " + response.data.descricao)

                    }
                }
            }, (error) => {
                setConsole("error: " + error)
                console.log("error: " + error)
            })
    }

    function deletar(item) {
        var deletar = confirm("Deseja excluir o insumo: " + item.descricao + " ?");
        if (deletar) {
            Dado.deletar(item._id, "insumo")
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
                            Descrição
                        </th>
                        <th>
                            <a href={Host.url() + "/insumo/incluir"}>
                                <img src='/+.png' width="20px" />
                            </a>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {lista && lista.map((item) => (
                        <tr>
                            <td>
                                <a href={Host.url() + "/insumo/" + item._id}>
                                    {item.descricao}
                                </a>

                            </td>
                            <td>
                                <img src='/x.png' width="20px" onClick={() => deletar(item)} />

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <br /><br /> <h1>{console}</h1>

        </Container >
    );


}


function Pagina() {
    return <Insumo />
}


export default Pagina;