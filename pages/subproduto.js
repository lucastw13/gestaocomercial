import { useState, React, useEffect } from 'react';
import Menu from './menu.js';
import { Container, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../dado/generico.js';
import Host from '../dado/host';
import Carregamento from './carregamento';
import { useRouter } from 'next/router'
function Produto() {
    const router = useRouter();
    const [lista, setLista] = useState("");
    const [carregando, setCarregando] = useState("")

    useEffect(() => {
        listar()
    }, [])

    function listar() {
        setCarregando(true)
        Dado.listarProduto(true)
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
        var deletar = confirm("Deseja excluir o produto: " + item.descricao + " ?");
        if (deletar) {
            Dado.deletar(item._id, "produto")
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
            <Menu descricao="Sub Produtos" />
            <Table>
                <thead>
                    <tr>
                        <th>
                            Descrição
                        </th>
                        <th>
                            <a href={Host.url() + "/subproduto/incluir"}>
                                <img src='/+.png' width="20px" />
                            </a>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {lista && lista.map((item) => (
                        <tr onClick={() => router.push(Host.url() + "/subproduto/" + item._id)}>
                            <td>
                                {item.descricao}
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
    return <Produto />
}


export default Pagina;