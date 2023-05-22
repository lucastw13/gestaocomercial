import { useState, React, useEffect } from 'react';
import Menu from './menu.js';
import { Container, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../dado/generico.js';
import Host from '../dado/host';
import Carregamento from './carregamento';
import { useRouter } from 'next/router'
function Cliente() {
    const router = useRouter();
    const [lista, setLista] = useState("");
    const [carregando, setCarregando] = useState("")

    useEffect(() => {
        listar()
    }, [])

    function listar() {
        setCarregando(true)
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
            .finally(() => {
                setCarregando(false)
            });
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
            <Menu descricao="Clientes" />
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
                        <tr onClick={() => router.push(Host.url() + "/cliente/" + item._id)}>
                            <td>
                                {item.nome}
                            </td>
                            <td>
                                <img src='/x.png' width="20px" onClick={() => deletar(item)} />

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {carregando &&
                <Carregamento />
            }
        </Container>
    );


}


function Pagina() {
    return <Cliente />
}


export default Pagina;
