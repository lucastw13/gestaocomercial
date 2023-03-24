import { useState, React, useEffect } from 'react';
import Menu from './menu.js';
import { Container, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../dado/generico.js';
import Host from '../dado/host';
import { useRouter } from 'next/router'
import Carregamento from './carregamento';
function Pedido() {
    const [lista, setLista] = useState("");
    const router = useRouter()
    const [carregando, setCarregando] = useState("")
    useEffect(() => {
        listar()
    },[])

    function listar() {
        setCarregando(true)
        Dado.listar("pedido")
            .then(response => {
                setCarregando(false)
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

   
    return (
        <Container>
            <Menu />
            <Table>
                <thead>
                    <tr>
                        <th>
                            Número
                        </th>
                        <th>
                            Cliente
                        </th>
                        <th>
                            Data
                        </th>
                        <th>
                            Hora
                        </th>
                        <th>
                            <a href={Host.url() + "/pedido/incluir"}>
                                <img src='/+.png' width="20px" />
                            </a>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {lista && lista.map((item) => (
                        <tr onClick={() => router.push(Host.url() + "/pedido/" + item._id)}>
                            <td>
                                {item.numero}
                            </td>
                            <td>
                                {item.clienteNome}
                            </td>
                            <td>
                                {item.data}
                            </td>
                            <td>
                                {item.hora}
                            </td>
                          </tr>
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
    return <Pedido />
}


export default Pagina;