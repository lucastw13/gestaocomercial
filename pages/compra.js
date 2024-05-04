import { useState, React, useEffect } from 'react';
import Menu from './menu.js';
import { Container, Table, Form, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../dado/generico.js';
import Host from '../dado/host';
import Carregamento from './carregamento';
import { useRouter } from 'next/router.js';
import { QrReader } from 'react-qr-reader';

function Compra() {
    const router = useRouter()
    const [lista, setLista] = useState("");
    const [carregando, setCarregando] = useState("")
    const [modal, setModal] = useState(false);
    const [informacao, setInformacao] = useState(false);
    const toggleModal = () => setModal(!modal);
    useEffect(() => {
        setInformacao("teste")
        listar()
    }, [])

    function listar() {
        setCarregando(true)
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
            .finally(() => {
                setCarregando(false)
            });
    }

    return (
        <Container>
            <Menu descricao="Compras" />
            <Form>
                <Button color="danger" onClick={toggleModal}>Importar</Button>
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

            {carregando &&
                <Carregamento />
            }

            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Leitor QR</ModalHeader>
                <ModalBody>
                    <QrReader
                        constraints={{
                            facingMode: 'environment'
                        }}
                        onResult={(result, error) => {
                            if (!!result) {
                                var httpRequest = new XMLHttpRequest();

                                httpRequest.open("GET", result?.text, true);
                                httpRequest.onreadystatechange = function () {
                                    if (httpRequest.readyState == 4) {
                                        if (httpRequest.status == 200) {
                                            var xml = httpRequest.responseXML;
                                            //console.log(getElementById("tabResult").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].getElementsByTagName("span")[1].innerHTML.replace("\n","").replace("\t",""));
                                            var inf = getElementById("tabResult").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].getElementsByTagName("span")[1].innerHTML.replace("\n","").replace("\t","")
                                            setInformacao(inf)   
                                            toggleModal 
                                        }
                                    }
                                }
                                /*var chave = result?.text
                                chave = chave.substring(chave.toUpperCase().indexOf("=") + 1, chave.toUpperCase().indexOf("|"))
                                if (chave != "") {
                                    router.push(Host.url() + "/compraimportar/" + chave)
                                }*/
                            }

                            if (!!error) {
                                console.info(error);
                            }
                        }}
                        style={{ width: '100%' }}
                    />
                </ModalBody>
            </Modal>
            {informacao}
        </Container>
    );


}


function Pagina() {
    return <Compra />
}


export default Pagina;
