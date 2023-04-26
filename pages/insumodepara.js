import { useState, React, useEffect } from 'react';
import Menu from './menu.js';
import { Button, Container, Table, Form, Modal, ModalHeader, ModalBody  } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../dado/generico.js';
import Host from '../dado/host';
import { useRouter } from 'next/router'
import { QrReader } from 'react-qr-reader';
import Carregamento from './carregamento';
function Insumodepara() {
    const [lista, setLista] = useState("");
    const [chave, setChave] = useState("");
    const router = useRouter()
    const [carregando, setCarregando] = useState("")
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

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

   

    return (
        <Container>
            <Menu descricao="Insumos De/Para"/>
            <Form>
                <Button color="danger" onClick={toggleModal}>Importar</Button>
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
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Leitor QR</ModalHeader>
                <ModalBody>
                    <QrReader
                        constraints={{
                            facingMode: 'environment'
                        }}
                        onResult={(result, error) => {
                            if (!!result) {
                                var chave = result?.text
                                chave = chave.substring(chave.toUpperCase().indexOf("=") + 1, chave.toUpperCase().indexOf("|"))
                                if (chave != "") {
                                    router.push(Host.url() + "/insumodeparaimportar/" + chave)
                                }
                            }

                            if (!!error) {
                                console.info(error);
                            }
                        }}
                        style={{ width: '100%' }}
                    />
                </ModalBody>
            </Modal>
        </Container>
    );


}


function Pagina() {
    return <Insumodepara />
}


export default Pagina;