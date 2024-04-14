import { useState, React, useEffect } from 'react';
import Menu from '../menu';
import { Container, Label, Input, Button, Form, FormGroup, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../../dado/generico.js'
import { useRouter } from 'next/router'
import Host from '../../dado/host';
import Carregamento from '../carregamento';
function Compra() {
    const [item, setItem] = useState("");
    const [listaInsumo, setListaInsumo] = useState("");
    const [listaInsumoTodos, setListaInsumoTodos] = useState("");
    const [total, setTotal] = useState(0);
    const router = useRouter()
    const [carregando, setCarregando] = useState("")

    useEffect(() => {
        if ((router.query.codigo != "") && (router.query.codigo != undefined)) {
            if (router.query.codigo == "incluir") {
                setItem({ insumo: [] })
                setListaInsumo([])
            }
            listar(router.query.codigo)
        }
    }, [router.query.codigo])
    function listar(pCodigo) {
        setCarregando(true)
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
            if (pCodigo != "incluir") {
                listarEdicao(pCodigo)
            }
        }, (error) => {
            console.log("error: " + error)
        })
        .finally(() => {
            setCarregando(false)
        });
    }
    function listarEdicao(pCodigo){
        setCarregando(true)
        Dado.item(pCodigo, "compra")
            .then(response => {
                if (response.data != null) {
                    if (response.data.status == true) {
                        setItem(response.data.item)
                        Dado.itemLista(response.data.item._id, "compra", "insumo")
                            .then(response => {
                                
                                if (response.data.status == true) {
                                    setListaInsumo(response.data.lista)
                                    var totalTemp = 0
                                    for (var itemInsumo of response.data.lista) {
                                        totalTemp = totalTemp + itemInsumo.valorCompra
                                    }
                                    setTotal(totalTemp)
                                } else {
                                    setListaInsumo([])
                                    console.log("error: " + response.data.descricao)
                                }
                               
                            }, (error) => {
                                console.log("error: " + error)
                            })
                            .finally(() => {
                                setCarregando(false)
                            });

                    } else {
                        setItem({})
                        console.log("123: " + response.data.descricao)
                        console.log("error: " + response.data.descricao)
                    }


                }
            }, (error) => {
                console.log("error: " + error)
            })
    }

    function adicionarInsumo() {
        if (item._id != "" && item._id != undefined) {
            alert("Compra não pode ser editada")
        } else {
            var _id = document.getElementById("insumo").value
            var quantidade = document.getElementById("insumoQuantidade").value
            var valor = document.getElementById("insumoValor").value
            if (_id != "" && _id != undefined && quantidade != "" && quantidade != undefined && valor != "" && valor != undefined) {
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
                    itemInsumoTodos.quantidadeCompra = quantidade
                    itemInsumoTodos.valorCompra = valor
                    listaTemp.push(itemInsumoTodos)

                    setListaInsumo(listaTemp)
                    var itemTemp = item
                    if (itemTemp.insumo == "" || itemTemp.insumo == undefined) {
                        itemTemp.insumo = []
                    }
                    itemTemp.insumo.push({ _id: _id, quantidade: quantidade, valor: valor })
                    setItem(itemTemp)
                    setTotal(Number(total) + Number(valor))
                    document.getElementById("insumoQuantidade").value = ""
                    document.getElementById("insumoValor").value = ""

                }
            } else {

                alert("Preencha todos os Campos obrigatórios!")
            }
        }
    }


    function salvar() {
        if (item._id != "" && item._id != undefined) {
            alert("Compra não pode ser editada")
        } else {
            if (possuiErroObrigatorio()) {
                alert("Preencha todos os Campos obrigatórios!")
            } else {
                Dado.salvar(item, "compra").then(response => {
                    if (response.data != null) {
                        if (response.data.status == true) {
                            router.push(Host.url() + "/compra")
                        } else {
                            console.log("error: " + response.data.descricao)
                        }
                    }
                }, (error) => {
                    console.log("error: " + error)
                })
            }
        }
    }
    function possuiErroObrigatorio() {
        if (item.insumo.length == 0) {
            return true
        }
        return false;
    }
    function deletar(itemParametro) {
        if (item._id != "" && item._id != undefined) {
            alert("Compra não pode ser editada")
        } else {
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
                setTotal(total - itemParametro.valorCompra)
                console.log(total - itemParametro.valorCompra)
            }
        }

    }

    return (
        <Container>
            <Menu descricao="Compras"/>
            <Form>

                <h4>{item.data}-{item.hora}</h4>


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
                    <Input type="number" id="insumoQuantidade" width="30px" />

                </FormGroup>

                <FormGroup check inline>
                    <Label for="insumoValor">Valor</Label>
                    <Input type="number" id="insumoValor" width="30px" />

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
                            <th>
                                Valor {total}
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
                                    {item.quantidadeCompra}
                                </td>
                                <td>
                                    {item.unidadeMedida}
                                </td>
                                <td>
                                    {item.valorCompra}
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
            {carregando &&
                <Carregamento />
            }
        </Container>
    );
}

function Pagina() {

    return <Compra />
}
export default Pagina;