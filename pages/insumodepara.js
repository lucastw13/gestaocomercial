import { useState, React, useEffect } from 'react';
import Menu from './menu.js';
import { Button, Container, Table, FormGroup, Form, Label,Input  } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../dado/generico.js';
import Usuario from "../dado/usuario.js";
import Host from '../dado/host';
import { useRouter } from 'next/router'
function Insumodepara() {
    const [lista, setLista] = useState("");
    const [chave, setChave] = useState("");
    const router = useRouter()

    if ((lista == "") || (lista == undefined)) {
        listar()
    }

    function listar() {
        Dado.listar("insumodepara")
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
        var deletar = confirm("Deseja excluir o insumodepara: " + item.descricao + " ?");
        if (deletar) {
            Dado.deletar(item._id, "insumodepara")
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

    function importar() {
        if (chave == "" || chave == undefined) {
            alert("Preencha todos os Campos obrigatórios!")
        } else {

            router.push(Host.url() + "/insumodeparaimportar/"+chave)

        }
    }
    function mudarChave(event) {
        setChave(event.target.value);
    }
    return (
        <Container>
            <Menu />
            <Form>
                <FormGroup check inline>
                    <Label for="chave">Chave</Label>
                    <Input type="text" id="chave" onChange={mudarChave} />
                </FormGroup>

                <FormGroup check inline>
                    <Button color="danger" onClick={importar}>Importar</Button>
                </FormGroup>
            </Form>
            <Table>
                <thead>
                    <tr>
                        <th>
                            Descrição
                        </th>
                        <th>
                            <a href={Host.url() + "/insumodepara/incluir"}>
                                <img src='/+.png' width="20px" />
                            </a>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {lista && lista.map((item) => (
                        <tr>
                            <td>
                                <a href={Host.url() + "/insumodepara/" + item._id}>
                                    {item.cnpj} - {item.codigo} - {item.insumo}
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
    return <Insumodepara />
}


export default Pagina;