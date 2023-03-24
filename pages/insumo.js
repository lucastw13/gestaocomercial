import { useState, React, useEffect } from 'react';
import Menu from './menu.js';
import { Container, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../dado/generico.js';
import Usuario from "../dado/usuario.js";
import Host from '../dado/host';
import { useRouter } from 'next/router'
import Carregamento from './carregamento';
function Insumo() {
    const [lista, setLista] = useState("");
    const router = useRouter();
    const [carregando, setCarregando] = useState("")
    useEffect(() => {
        listar()
    },[])

    function listar() {
        setCarregando(true)
        Dado.listar("insumo")
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
                            Quantidade
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
                        <>
                            {item.quantidade < item.quantidadeMinima &&
                                <tr onClick={() => router.push(Host.url() + "/insumo/" + item._id)} bgcolor="#FFFF00">
                                    <td>
                                        {item.descricao}
                                    </td>
                                    <td>
                                        {item.quantidade}
                                    </td>
                                    <td>
                                        <img src='/x.png' width="20px" onClick={() => deletar(item)} />

                                    </td>

                                </tr>
                            }
                            {item.quantidade >= item.quantidadeMinima &&
                                <tr onClick={() => router.push(Host.url() + "/insumo/" + item._id)}>
                                    <td>
                                        {item.descricao}
                                    </td>
                                    <td>
                                        {item.quantidade}
                                    </td>
                                    <td>
                                        <img src='/x.png' width="20px" onClick={() => deletar(item)} />

                                    </td>

                                </tr>
                            }
                        </>

                    ))}
                </tbody>
            </Table>

            {carregando &&
                <Carregamento/>
            }
        </Container>
    );


}


function Pagina() {
    return <Insumo />
}


export default Pagina;