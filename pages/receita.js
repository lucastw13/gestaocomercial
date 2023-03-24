import { useState, React, useEffect } from 'react';
import Menu from './menu.js';
import { Container, Table, Button, Modal, ModalHeader, ModalBody, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../dado/generico.js';
import Host from '../dado/host';
import { useRouter } from 'next/router'
import Carregamento from './carregamento';
function Receita() {
    const router = useRouter();
    const [lista, setLista] = useState("");
    const [listaModal, setListaModal] = useState("");
    const [itemModal, setItemModal] = useState("");

    const [modal, setModal] = useState(false);

    const toggleModal = () => setModal(!modal);
    const [carregando, setCarregando] = useState("")

    function exibirModal(itemRegistro) {
        var listaModalTemp = []
        for (var itemInsumoRegistrado of itemRegistro.insumo) {
            listaModalTemp.push(itemInsumoRegistrado.quantidade + itemInsumoRegistrado.unidadeMedida + " de " + itemInsumoRegistrado.descricao)

        }
        setListaModal(listaModalTemp)
        setItemModal(itemRegistro)
        toggleModal()
    }

    useEffect(() => {
        listar()
    },[])

    function listar() {
        setCarregando(true)
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
            .finally(() => {
                setCarregando(false)
            });
    }

    function deletar(item) {
        var deletar = confirm("Deseja excluir o receita: " + item.descricao + " ?");
        if (deletar) {
            Dado.deletar(item._id, "receita")
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
    function incluir() {
        router.push(Host.url() + "/receita")
    }

    function registrarReceita(item) {
        var registrar = confirm("Deseja Registrar a receita " + item.descricao + " ?");
        if (registrar) {
            var itemRegistro = {
                receita: item._id,
            }

            Dado.salvar(itemRegistro, "registrareceita").then(response => {
                if (response.data != null) {
                    if (response.data.status == true) {
                        router.push(Host.url() + "/receita/"+item._id)
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
                        </th>
                        <th>
                            <a href={Host.url() + "/receita/incluir"}>
                                <img src='/+.png' width="20px" />
                            </a>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {lista && lista.map((item) => (
                        <tr onClick={() => exibirModal(item)}>
                            <td>
                                {item.descricao}
                            </td>
                            <td>
                                <img src='/x.png' width="20px" onClick={() => deletar(item)} />

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>{itemModal.descricao}</ModalHeader>
                <ModalBody>
                    <h6>Modo de Preparo:</h6>
                    <Input disabled="true" type="textarea" value={itemModal.modoPreparo} />

                    <br /> <br />
                    <h6>Ingredientes:</h6>
                    {listaModal && listaModal.map((itemModal) => (
                        <div>
                            {itemModal}
                            <br />
                        </div>


                    ))}
                    <br />


                    <table>
                        <tr>
                            <td><Button color="danger" onClick={() => registrarReceita(itemModal)}>Fazer</Button></td>
                            <td> <Button color="danger" onClick={() => router.push(Host.url() + "/receita/" + itemModal._id)}>Editar</Button></td>

                        </tr>
                    </table>
                </ModalBody>
            </Modal>
            {carregando &&
                <Carregamento/>
            }
        </Container>
    );


}


function Pagina() {
    return <Receita />
}


export default Pagina;