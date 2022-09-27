import { useState, React } from 'react';
import Menu from '../menu';
import { Container, Label, Input, Button, Form, FormGroup, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../../dado/generico.js'
import { useRouter } from 'next/router'
import Host from '../../dado/host';
function Receita() {
    const [item, setItem] = useState("");
    const [listaInsumo, setListaInsumo] = useState("");
    const [listaInsumoTodos, setListaInsumoTodos] = useState("");
    const router = useRouter()


    if (((item == "") || (item == undefined)) && ((router.query.codigo != "") && (router.query.codigo != undefined))) {
        if (router.query.codigo == "incluir") {
            setItem({ insumo: [] })
            setListaInsumo([])
        } else {
            Dado.item(router.query.codigo, "receita")
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
                                        console.log("error: " + response.data.descricao)
                                    }

                                }, (error) => {
                                    console.log("error: " + error)
                                })

                            /*
                            var listaTemp = []
                            var listaInsumoTemp = response.data.item.insumo
                            for (var insumo of listaInsumoTemp) {
                                Dado.item(insumo._id, "insumo")
                                    .then(response => {
                                        if (response.data.status == true) {
                                            var insumoTemp = response.data.item
                                            for (var insumoAtualizarQuantidade of listaInsumoTemp) {
                                                if (insumoAtualizarQuantidade._id == insumoTemp._id) {
                                                    insumoTemp.quantidadeReceita = insumoAtualizarQuantidade.quantidade
                                                }
                                            }

                                            listaTemp.push(insumoTemp)
                                            console.log(insumoTemp)
                                            setListaInsumo(listaTemp)
                                        } else {
                                            console.log("error: " + response.data.descricao)

                                        }
                                    }, (error) => {
                                        console.log("error: " + error)
                                    })

                            }*/
                        } else {
                            setItem({})
                            console.log("error: " + response.data.descricao)
                        }


                    }
                }, (error) => {
                    console.log("error: " + error)
                })
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
    }

    function mudarDescricao(event) {
        var itemTemp = item
        itemTemp.descricao = event.target.value
        setItem(itemTemp);

    }

    function adicionarInsumo() {
        setListaInsumo([])
        var _id = document.getElementById("insumo").value
        var quantidade = document.getElementById("insumoQuantidade").value

        if (_id != "" && _id != undefined && quantidade != "" && quantidade != undefined) {
            var possuiInsumo = false
            for (var insumo of item.insumo) {
                if (insumo._id == _id) {
                    possuiInsumo = true
                    break
                }
            }
            if (possuiInsumo) {
                alert("Insumo já Incluso!")
            } else {
                for (var insumoSelecionado of listaInsumoTodos) {
                    if (insumoSelecionado._id == _id) {
                        break;
                    }
                }
                console.log(insumoSelecionado)

                var listaTemp = listaInsumo
                insumoSelecionado.quantidadeReceita = quantidade
                listaTemp.push(insumoSelecionado)
                setListaInsumo(listaTemp)
                var itemTemp = item
                if (itemTemp.insumo == "" || itemTemp.insumo == undefined) {
                    itemTemp.insumo = []
                }
                itemTemp.insumo.push({ _id: _id, quantidade: quantidade })
                setItem(itemTemp)
                console.log(listaInsumo)

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


    return (
        <Container>
            <Menu />
            <Form >
                <FormGroup>
                    <Label for="descricao">Descrição</Label>
                    <Input type="text" id="descricao" onChange={mudarDescricao} />
                </FormGroup>

                <Form inline>
                    <FormGroup>
                        <Label for="insumo">Insumo</Label>
                        <Input type="select" id="insumo">
                            {listaInsumoTodos && listaInsumoTodos.map((item) => (
                                <option value={item._id}>{item.descricao}</option>
                            ))}
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="insumoQuantidade">Quantidade</Label>
                        <div width="50%"><Input type="number" id="insumoQuantidade" width="30px" /></div>

                    </FormGroup>

                    <FormGroup>
                        <img src='/+.png' width="20px" onClick={adicionarInsumo} />
                    </FormGroup>

                </Form>


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
        </Container>
    );
}

function Pagina() {

    return <Receita />
}
export default Pagina;