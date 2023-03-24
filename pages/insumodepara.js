import { useState, React, useEffect } from 'react';
import Menu from './menu.js';
import { Button, Container, Table, FormGroup, Form, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../dado/generico.js';
import Host from '../dado/host';
import UtilDataURIToBlob from '../util/DataURIToBlob';
import { useRouter } from 'next/router'
import axios from 'axios'
import Carregamento from './carregamento';
function Insumodepara() {
    const [lista, setLista] = useState("");
    const [chave, setChave] = useState("");
    const router = useRouter()
    const [carregando, setCarregando] = useState("")

    useEffect(() => {
        listar()
    }, [])

    function listar() {
        setCarregando(true)
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
            .finally(() => {
                setCarregando(false)
            });
    }

    function deletar(item) {
        var deletar = confirm("Deseja excluir o insumodepara: " + item.codigo + "/" + item.insumoDescricao);
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
        var file = document.getElementById("imagem").files[0];
        var reader = new FileReader();

        reader.onloadend = function () {
            const blob = UtilDataURIToBlob.DataURIToBlob(reader.result)
            const formData = new FormData();
            formData.append('file', blob, 'image.jpg')
            axios.post("http://api.qrserver.com/v1/read-qr-code/", formData)
                .then(response => {
                    if (response.data != null) {
                        for (var item of response.data) {
                            for (var itemSymbol of item.symbol) {
                                console.log(itemSymbol)
                                if (itemSymbol.data != null) {
                                    var chave = itemSymbol.data.substring(itemSymbol.data.toUpperCase().indexOf("=") + 1, itemSymbol.data.toUpperCase().indexOf("|"))
                                    if (chave != "") {
                                        router.push(Host.url() + "/insumodeparaimportar/" + chave)
                                    }
                                }
                            }
                        }
                    }
                }, (error) => {
                    console.log("error: " + error)
                })
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {

        }
    }

    return (
        <Container>
            <Menu />
            <Form>
                <FormGroup check inline>
                    <Input type="file" id="imagem" />

                </FormGroup>

                <FormGroup check inline>
                    <Button color="danger" onClick={importar}>Importar</Button>
                </FormGroup>
            </Form>
            <Table>
                <thead>
                    <tr>
                        <th>
                            Fornecedor
                        </th>
                        <th>
                            DE
                        </th>
                        <th>
                            PARA
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {lista && lista.map((item) => (
                        <tr onClick={() => Host.url() + "/insumodepara/" + item._id}>
                            <td>
                                {item.fornecedorNome}
                            </td>
                            <td>
                                {item.codigo}
                            </td>
                            <td>
                                {item.insumoDescricao}
                            </td>
                            <td>
                                <img src='/x.png' width="20px" onClick={() => deletar(item)} />

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
    return <Insumodepara />
}


export default Pagina;