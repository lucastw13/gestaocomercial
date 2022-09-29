import { useState, React, useEffect } from 'react';
import Menu from './menu.js';
import { Container, Table,Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../dado/generico.js';
import Host from '../dado/host';
import { useRouter } from 'next/router'
function Insumo() {
    const router = useRouter();
    const [lista, setLista] = useState("");
    const [consoleTeste, setConsoleTeste] = useState("");

    if ((lista == "") || (lista == undefined)) {
        listar()
    }

    function listar() {
        try {
            console.log("entrouListar")
            Dado.listar("insumo")
                .then(response => {
                    setConsoleTeste("entrou response")
                    if (response.data != null) {
                        setConsoleTeste("response.data != null")
                        if (response.data.status == true) {
                            setConsoleTeste("true")
                            setConsoleTeste(JSON.stringify(response.data.lista))
                            setLista(response.data.lista)
                        } else {
                            setConsoleTeste("false")
                            setConsoleTeste("error: " + response.data.descricao)
                            setLista([])
                            console.log("error: " + response.data.descricao)

                        }
                    }
                }, (error) => {
                    setConsoleTeste("error: " + error)
                    console.log("error: " + error)
                })
        } catch (error) {
            if (consoleTeste == "" || consoleTeste == undefined) {
                setConsoleTeste("error: " + error)


            }


        }
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

            <br /><br /> <h1>{consoleTeste}</h1>
            <Button color="danger" onClick={()=>listar()}>Buscar</Button>
        </Container >
    );


}


function Pagina() {
    return <Insumo />
}


export default Pagina;