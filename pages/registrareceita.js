import { useState, React, useEffect } from 'react';
import Menu from './menu.js';
import { Container, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../dado/generico.js';
import Host from '../dado/host';
import { useRouter } from 'next/router'
function RegistraReceita() {
    const router = useRouter();
    const [lista, setLista] = useState("");

    if ((lista == "") || (lista == undefined)) {
        listar()
    }

    function listar() {
        Dado.listar("receita")
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

    
    function incluir() {
        router.push(Host.url() + "/receita")
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
                    </tr>
                </thead>
                <tbody>
                    {lista && lista.map((item) => (
                        <tr>
                            <td>
                                <a href={Host.url() + "/registrareceita/" + item._id}>
                                    {item.descricao}
                                </a>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </Container >
    );


}


function Pagina() {
    return <RegistraReceita />
}


export default Pagina;