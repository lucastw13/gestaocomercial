import { useState, React, useEffect } from 'react';
import Menu from './menu.js';
import { Container, Table,Form,FormGroup,Label,Input,Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../dado/generico.js';
import Host from '../dado/host';
import { useRouter } from 'next/router'
function Compra() {
    const router = useRouter();
    const [lista, setLista] = useState("");
    const [chave, setChave] = useState("");

    if ((lista == "") || (lista == undefined)) {
        listar()
    }

    function listar() {
        Dado.listar("compra")
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

    /*function deletar(item) {
        var deletar = confirm("Deseja excluir o compra: " + item.descricao + " ?");
        if (deletar) {
            Dado.deletar(item._id, "compra")
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

    }*/


    function mudarChave(event) {
        setChave(event.target.value);
    }

    function importar() {
        if (chave == "" || chave == undefined) {
            alert("Preencha todos os Campos obrigatórios!")
        } else {

            router.push(Host.url() + "/compraimportar/"+chave)

        }
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
                            <a href={Host.url() + "/compra/incluir"}>
                                <img src='/+.png' width="20px" />
                            </a>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {lista && lista.map((item) => (
                        <tr>
                            <td>
                                <a href={Host.url() + "/compra/" + item._id}>
                                    {item.usuarioNome}-{item.data}-{item.hora}
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
    return <Compra />
}


export default Pagina;