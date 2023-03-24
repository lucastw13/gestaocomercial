import { useState, React,useEffect } from 'react';
import Menu from '../menu';
import { Container, Label, Input, Button, Form, FormGroup, Table, Modal, ModalHeader, ModalBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../../dado/generico.js'
import { useRouter } from 'next/router'
import Host from '../../dado/host';
import Carregamento from '../carregamento';
function Receita() {
    const [item, setItem] = useState("");
    const [listaInsumo, setListaInsumo] = useState("");
    const [listaInsumoTodos, setListaInsumoTodos] = useState("");
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
                        document.getElementById("modoPreparo").value = response.data.item.modoPreparo;
                        Dado.itemLista(response.data.item._id, "receita", "insumo")
                            .then(response => {
                                if (response.data.status == true) {
                                    setListaInsumo(response.data.lista)
                                } else {
                                    setListaInsumo([])
                                }

                                Dado.listar("insumo")
                                .then(response => {
                                    if (response.data != null) {
                                        if (response.data.status == true) {
                                            setListaInsumoTodos(response.data.lista)
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

                            }, (error) => {
                                console.log("error: " + error)
                            })

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
    function mudarModoPreparo(event) {
        var itemTemp = item
        itemTemp.modoPreparo = event.target.value
        setItem(itemTemp);

    }

    function adicionarInsumo() {

        var _id = document.getElementById("insumo").value
        var quantidade = document.getElementById("insumoQuantidade").value

        if (_id != "" && _id != undefined && quantidade != "" && quantidade != undefined) {
            var possuiInsumo = false
            for (var itemInsumo of item.insumo) {
                if (itemInsumo._id == _id) {
                    possuiInsumo = true
                    break
                }
            }
            if (possuiInsumo) {
                alert("Insumo já Incluso!")
            } else {

                for (var itemInsumoTodos of listaInsumoTodos) {
                    if (itemInsumoTodos._id == _id) {
                        break;
                    }
                }

                var listaTemp = []
                for (itemInsumo of listaInsumo) {
                    listaTemp.push(itemInsumo)
                }
                itemInsumoTodos.quantidadeReceita = quantidade
                listaTemp.push(itemInsumoTodos)

                setListaInsumo(listaTemp)
                var itemTemp = item
                if (itemTemp.insumo == "" || itemTemp.insumo == undefined) {
                    itemTemp.insumo = []
                }
                itemTemp.insumo.push({ _id: _id, quantidade: quantidade })
                setItem(itemTemp)
                document.getElementById("insumoQuantidade").value = ""

            }
        } else {

            alert("Preencha todos os Campos obrigatórios!")
        }
    }


    function salvar() {
        if (possuiErroObrigatorio()) {
            alert("Preencha todos os Campos obrigatórios!")
        } else {
            Dado.salvar(item, "receita").then(response => {
                if (response.data != null) {
                    if (response.data.status == true) {
                        router.push(Host.url() + "/receita")
                    } else {
                        console.log("error: " + response.data.descricao)
                    }
                }
            }, (error) => {
                console.log("error: " + error)
            })
        }
    }
    function possuiErroObrigatorio() {
        if (item.descricao == "" || item.descricao == undefined) {

            return true;
        }
        if (item.insumo.length == 0) {
            return true
        }
        return false;
    }
    function deletar(itemParametro) {
        var deletar = confirm("Deseja excluir o insumo: " + itemParametro.descricao + " ?");
        if (deletar) {
            var listaInsumoTemp = []
            for (var itemInsumo of listaInsumo) {
                if (itemInsumo._id != itemParametro._id) {
                    listaInsumoTemp.push(itemInsumo)
                }
            }
            setListaInsumo(listaInsumoTemp)

            var itemListaInsumoTemp = []
            for (var itemInsumo of item.insumo) {
                if (itemInsumo._id != itemParametro._id) {
                    itemListaInsumoTemp.push(itemInsumo)
                }
            }
            var itemTemp = item
            itemTemp.insumo = itemListaInsumoTemp
            setItem(itemTemp)
        }
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
        toggleUsadaRegistro()

    }

    return (
        <Container>
            <Menu />
            <Form >
                <FormGroup>
                    <Label for="descricao">Descrição</Label>
                    <Input type="text" id="descricao" onChange={mudarDescricao} />
                </FormGroup>

                <FormGroup>
                    <Label for="modoPreparo">Modo de Preparo</Label>
                    <Input type="textarea" id="modoPreparo" onChange={mudarModoPreparo} />
                </FormGroup>

                <FormGroup check inline>
                    <Label for="insumo">Insumo</Label>
                    <Input type="select" id="insumo">
                        {listaInsumoTodos && listaInsumoTodos.map((item) => (
                            <option value={item._id}>{item.descricao}</option>
                        ))}
                    </Input>
                </FormGroup>

                <FormGroup check inline>
                    <Label for="insumoQuantidade">Quantidade</Label>
                    <div width="50%"><Input type="number" id="insumoQuantidade" width="30px" /></div>

                </FormGroup>

                <FormGroup check inline>
                    <img src='/+.png' width="20px" onClick={adicionarInsumo} />
                </FormGroup>


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
                        {listaInsumo && listaInsumo.map((item) => (
                            <tr>
                                <td>
                                    <a href={Host.url() + "/insumo/" + item._id}>
                                        {item.descricao}
                                    </a>

                                </td>
                                <td>
                                    {item.quantidadeReceita}
                                </td>
                                <td>
                                    {item.unidadeMedida}
                                </td>
                                <td>
                                    <img src='/x.png' width="20px" onClick={() => deletar(item)} />

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Button color="danger" onClick={salvar}>Salvar</Button>
            </Form>

            <br /><br />
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

    return <Receita />
}
export default Pagina;