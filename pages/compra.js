import { useState, React } from 'react';
import Menu from './menu.js';
import { Container, Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../dado/generico.js';
import Host from '../dado/host';
import UtilDataURIToBlob from '../util/DataURIToBlob';
import axios from 'axios';
import { useRouter } from 'next/router.js';

function Compra() {
    const router = useRouter()
    const [lista, setLista] = useState("");

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


    function importar() {
        var file = document.getElementById("imagem").files[0];
        var reader = new FileReader();

        reader.onloadend = function () {
            const blob = UtilDataURIToBlob.DataURIToBlob(reader.result)
            const formData = new FormData();
            formData.append('file', blob, 'image.jpg')
            axios.post("https://api.qrserver.com/v1/read-qr-code/", formData)
                .then(response => {
                    if (response.data != null) {
                        for (var item of response.data) {
                            for (var itemSymbol of item.symbol) {
                                console.log(itemSymbol)
                                if (itemSymbol.data != null) {
                                    var chave = itemSymbol.data.substring(itemSymbol.data.toUpperCase().indexOf("=") + 1, itemSymbol.data.toUpperCase().indexOf("|"))
                                    if (chave != "") {
                                        router.push(Host.url() + "/compraimportar/" + chave)
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
                            Usuário
                        </th>
                        <th>
                            Data
                        </th>
                        <th>
                            Hora
                        </th>
                        <th>
                            Total
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
                        <tr onClick={() => router.push(Host.url() + "/compra/" + item._id)}>
                            <td>
                                {item.usuarioNome}
                            </td>
                            <td>
                                {item.data}
                            </td>
                            <td>
                                {item.hora}
                            </td>
                            <td>
                                {item.total}
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
