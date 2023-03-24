import { useState, React,useEffect } from 'react';
import Menu from '../menu';
import { Container, Label, Input, Button, Form, FormGroup, Table, Modal, ModalHeader, ModalBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../../dado/generico.js'
import { useRouter } from 'next/router'
import Host from '../../dado/host';
import Carregamento from '../carregamento';
function RegistraReceita() {
    const [item, setItem] = useState("");
    const [listaInsumo, setListaInsumo] = useState("");
    const [receitaUsadaRegistro, setReceitaUsadaRegistro] = useState("");
    const router = useRouter()
    const [carregando, setCarregando] = useState("")

    const [modal, setModal] = useState(false);

    const toggleUsadaRegistro = () => setModal(!modal);

    useEffect(() => {
        if (router.query.codigo == "incluir") {
            setItem({ insumo: [] })
            setListaInsumo([])
        } else {
            if ((router.query.codigo!="")&&(router.query.codigo!=undefined)){
                listar(router.query.codigo)
            }
        }
    }, [router.query.codigo])

    function listar(pCodigo) {
        setCarregando(true)
        Dado.item(pCodigo, "receita")
            .then(response => {
                if (response.data != null) {
                    if (response.data.status == true) {
                        setItem(response.data.item)
                        document.getElementById("descricao").value = response.data.item.descricao;

                        Dado.itemLista(response.data.item._id, "receita", "insumo")
                            .then(response => {
                                if (response.data.status == true) {
                                    setListaInsumo(response.data.lista)
                                } else {
                                    setListaInsumo([])
                                }

                            }, (error) => {
                                console.log("error: " + error)
                            })
                            .finally(() => {
                                setCarregando(false)
                            });

                    } else {
                        setItem({})
                        console.log("error: " + response.data.descricao)
                    }


                }
            }, (error) => {
                console.log("error: " + error)
            })
    }

    function mudarDescricao(event) {
        var itemTemp = item
        itemTemp.descricao = event.target.value
        setItem(itemTemp);

    }




    function registrarReceita() {

        var itemRegistro = {
            receita: item._id,
        }

        Dado.salvar(itemRegistro, "registrareceita").then(response => {
            if (response.data != null) {
                if (response.data.status == true) {
                    router.push(Host.url() + "/registrareceita")
                } else {
                    console.log("error: " + response.data.descricao)
                }
            }
        }, (error) => {
            console.log("error: " + error)
        })

    }

    function exibirReceitaUsadaRegistro(itemRegistro) {
        var receitaUsadaRegistroTemp = []
        for (var itemInsumoRegistrado of itemRegistro.insumo) {

            for (var itemInsumoCompleto of listaInsumo) {
                if (itemInsumoCompleto._id == itemInsumoRegistrado._id) {
                    break;
                }
            }
            receitaUsadaRegistroTemp.push(itemInsumoRegistrado.quantidade + itemInsumoCompleto.unidadeMedida + " de " + itemInsumoCompleto.descricao)

        }
        setReceitaUsadaRegistro(receitaUsadaRegistroTemp)


        /*var receitaUsadaRegistroTemp = ""
        for (var itemInsumoRegistrado of itemRegistro.insumo) {
    
            for (var itemInsumoCompleto of listaInsumo) {
                if (itemInsumoCompleto._id == itemInsumoRegistrado._id) {
                    break;
                }
            }
            if (receitaUsadaRegistroTemp != "") {
                receitaUsadaRegistroTemp = receitaUsadaRegistroTemp + ""
    
            }
            receitaUsadaRegistroTemp = receitaUsadaRegistroTemp + itemInsumoRegistrado.quantidade + itemInsumoCompleto.unidadeMedida + " de " + itemInsumoCompleto.descricao
    
        }
        setReceitaUsadaRegistro(receitaUsadaRegistroTemp)
        */

        toggleUsadaRegistro()

    }
    return (
        <Container>
            <Menu />
            <Form inline>
                <FormGroup >
                    <Label for="descricao" >Descrição</Label>
                    <Input type="text" id="descricao" disabled="true" onChange={mudarDescricao} />

                </FormGroup>
                <FormGroup>
                    <Button color="danger" onClick={registrarReceita}>Registrar Receita</Button>
                </FormGroup>

            </Form>
            <h3>Lista de Insumos</h3>
            <Table>
                <thead>
                    <tr>
                        <th>
                            Descrição
                        </th>
                        <th>
                            Quant.
                        </th>
                        <th>
                            Unid. Med.
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {listaInsumo && listaInsumo.map((itemInsumo) => (
                        <tr>
                            <td>
                                <a href={Host.url() + "/insumo/" + itemInsumo._id}>
                                    {itemInsumo.descricao}
                                </a>

                            </td>
                            <td>
                                {itemInsumo.quantidadeReceita}
                            </td>
                            <td>
                                {itemInsumo.unidadeMedida}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>



            <h3>Lista de Registros</h3>
            <Table>
                <thead>
                    <tr>
                        <th>
                            Data
                        </th>
                        <th>
                            Hora
                        </th>
                        <th>
                            Usuário
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {item.registro && item.registro.map((itemRegistro) => (
                        <tr onClick={() => exibirReceitaUsadaRegistro(itemRegistro)}>
                            <td>
                                {itemRegistro.data}

                            </td>
                            <td>
                                {itemRegistro.hora}
                            </td>
                            <td>
                                {itemRegistro.usuarioNome}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal isOpen={modal} toggle={toggleUsadaRegistro}>
                <ModalHeader toggle={toggleUsadaRegistro}>{item.descricao}</ModalHeader>
                <ModalBody>
                    {receitaUsadaRegistro && receitaUsadaRegistro.map((itemReceitaUsadaRegistro) => (
                        <div>
                            {itemReceitaUsadaRegistro}
                            <br />
                        </div>

                    ))}
                </ModalBody>
            </Modal>
            {carregando &&
                <Carregamento />
            }
        </Container>
    );
}

function Pagina() {

    return <RegistraReceita />
}
export default Pagina;