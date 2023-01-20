import { useState, React, useEffect } from 'react';
import Menu from './menu.js';
import { Button, Container, Table, FormGroup, Form, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../dado/generico.js';
import Usuario from "../dado/usuario.js";
import Host from '../dado/host';
import { useRouter } from 'next/router'
import axios from 'axios'
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
        var file = document.getElementById("imagem").files[0];
        var reader = new FileReader();

        reader.onloadend = function () {
            const blob = DataURIToBlob(reader.result)
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
                                    router.push(Host.url() + "/insumodeparaimportar/" + chave)
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

    function DataURIToBlob(dataURI) {
        const splitDataURI = dataURI.split(',')
        const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
        const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

        const ia = new Uint8Array(byteString.length)
        for (let i = 0; i < byteString.length; i++)
            ia[i] = byteString.charCodeAt(i)

        return new Blob([ia], { type: mimeString })
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