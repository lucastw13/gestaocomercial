import { useState, React, useEffect } from 'react';
import Menu from '../menu';
import { Container, Label, Input, Button, Form, FormGroup, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../../dado/generico.js'
import { useRouter } from 'next/router'
import Host from '../../dado/host';
import Carregamento from '../carregamento';
function Produto() {
    const [item, setItem] = useState("");
    const [listaProduto, setListaProduto] = useState("");
    const [listaProdutoTodos, setListaProdutoTodos] = useState("");
    const [listaInsumo, setListaInsumo] = useState("");
    const [listaInsumoTodos, setListaInsumoTodos] = useState("");
    const [listaReceitaTodos, setListaReceitaTodos] = useState("");
    const router = useRouter()
    const [carregando, setCarregando] = useState("")

    useEffect(() => {
        if ((router.query.codigo != "") && (router.query.codigo != undefined)) {
            if (router.query.codigo == "incluir") {
                setItem({ produto: [], unidadeMedida: "G" })
                setListaProduto([])
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
                        setListaInsumoTodos([])
                        console.log("error: " + response.data.descricao)

                    }
                    Dado.listar("receita")
                        .then(response => {
                            if (response.data != null) {
                                if (response.data.status == true) {
                                    setListaReceitaTodos(response.data.lista)
                                } else {
                                    setListaReceitaTodos([])
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
            }, (error) => {
                console.log("error: " + error)
            })



    }

    function listarEdicao(pCodigo) {
        setCarregando(true)
        Dado.item(pCodigo, "produto")
            .then(response => {
                if (response.data != null) {
                    if (response.data.status == true) {
                        setItem(response.data.item)
                        document.getElementById("descricao").value = response.data.item.descricao;
                        document.getElementById("receita").value = response.data.item.receita;
                        document.getElementById("unidadeMedida").value = response.data.item.unidadeMedida;
                        document.getElementById("valorVenda").value = response.data.item.valorVenda;
                        document.getElementById("valorCalculado").value = response.data.item.valorCalculado;
                        document.getElementById("quantidade").value = response.data.item.quantidade
                        Dado.itemLista(response.data.item._id, "produto", "produto")
                            .then(response => {
                                if (response.data.status == true) {
                                    setListaProduto(response.data.lista)
                                } else {
                                    setListaProduto([])
                                    console.log("error: " + response.data.descricao)
                                }

                            }, (error) => {
                                console.log("error: " + error)
                            })
                        Dado.itemLista(response.data.item._id, "produto", "insumo")
                            .then(response => {
                                if (response.data.status == true) {
                                    setListaInsumo(response.data.lista)
                                } else {
                                    setListaInsumo([])
                                    console.log("error: " + response.data.descricao)
                                }
                                Dado.listarProduto(false)
                                    .then(response => {
                                        if (response.data != null) {
                                            if (response.data.status == true) {
                                                setListaProdutoTodos(response.data.lista)
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
    function mudarReceita(event) {
        var itemTemp = item
        itemTemp.receita = event.target.value
        setItem(itemTemp);
    }

    function mudarQuantidade(event) {
        var itemTemp = item
        itemTemp.quantidade = event.target.value
        setItem(itemTemp);
    }

    function mudarUnidadeMedida(event) {
        var itemTemp = item
        itemTemp.unidadeMedida = event.target.value
        setItem(itemTemp);

    }

    function mudarValorVenda(event) {
        var itemTemp = item
        itemTemp.valorVenda = event.target.value
        setItem(itemTemp);
    }

    function adicionarProduto() {

        var _id = document.getElementById("produto").value
        var quantidade = document.getElementById("produtoQuantidade").value

        if (_id != "" && _id != undefined && quantidade != "" && quantidade != undefined) {
            var possuiProduto = false
            for (var itemProduto of item.produto) {
                if (itemProduto._id == _id) {
                    possuiProduto = true
                    break
                }
            }
            if (possuiProduto) {
                alert("Produto já Incluso!")
            } else {

                for (var itemProdutoTodos of listaProdutoTodos) {
                    if (itemProdutoTodos._id == _id) {
                        break;
                    }
                }

                var listaTemp = []
                for (itemProduto of listaProduto) {
                    listaTemp.push(itemProduto)
                }
                itemProdutoTodos.quantidadeProduto = quantidade
                listaTemp.push(itemProdutoTodos)

                setListaProduto(listaTemp)
                var itemTemp = item
                if (itemTemp.produto == "" || itemTemp.produto == undefined) {
                    itemTemp.produto = []
                }
                itemTemp.produto.push({ _id: _id, quantidade: quantidade })
                setItem(itemTemp)
                document.getElementById("produtoQuantidade").value = ""

            }
        } else {

            alert("Preencha todos os Campos obrigatórios!")
        }
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
                itemInsumoTodos.quantidadeInsumo = quantidade
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
        var itemTemp = item
        itemTemp.eSubProduto = false
        setItem(itemTemp)
        var retorno = possuiErroObrigatorio()
        if (retorno.status) {
            alert(retorno.mensagem)
        } else {
            Dado.salvar(item, "produto").then(response => {
                if (response.data != null) {
                    if (response.data.status == true) {
                        router.push(Host.url() + "/produto")
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
        var retorno = { status: false, mensagem: "" }
        if (item.descricao == "" || item.descricao == undefined) {
            retorno = { status: true, mensagem: "Informe a Descrição" }
        }
        if (item.receita == "" || item.receita == undefined) {
            retorno = { status: true, mensagem: "Informe a receita" }
        }
        return retorno;
    }
    function deletarProduto(itemParametro) {
        var deletar = confirm("Deseja excluir o produto: " + itemParametro.descricao + " ?");
        if (deletar) {
            var listaProdutoTemp = []
            for (var itemProduto of listaProduto) {
                if (itemProduto._id != itemParametro._id) {
                    listaProdutoTemp.push(itemProduto)
                }
            }
            setListaProduto(listaProdutoTemp)

            var itemListaProdutoTemp = []
            for (var itemProduto of item.produto) {
                if (itemProduto._id != itemParametro._id) {
                    itemListaProdutoTemp.push(itemProduto)
                }
            }
            var itemTemp = item
            itemTemp.produto = itemListaProdutoTemp
            setItem(itemTemp)
        }
    }
    function deletarInsumo(itemParametro) {
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

                <FormGroup>
                    <Label for="valorCalculado">Valor Calculado</Label>
                    <Input type="number" id="valorCalculado" disabled="true" />
                </FormGroup>

                <FormGroup>
                    <Label for="valorVenda">Valor Venda</Label>
                    <Input type="number" id="valorVenda" onChange={mudarValorVenda} />
                </FormGroup>

                <FormGroup>
                    <Label for="unidadeMedida">Unidade de Medida</Label>
                    <Input type="select" id="unidadeMedida" onChange={mudarUnidadeMedida}>
                        <option>G</option>
                        <option>UND</option>
                        <option>ML</option>
                    </Input>
                </FormGroup>

                <FormGroup>
                    <Label for="quantidade">Quantidade</Label>
                    <Input type="number" id="quantidade" onChange={mudarQuantidade} />
                </FormGroup>

                <FormGroup>
                    <Label for="receita">Receita</Label>
                    <Input type="select" id="receita" onChange={mudarReceita}>
                        <option value="">Selecione</option>
                        {listaReceitaTodos && listaReceitaTodos.map((item) => (
                            <option value={item._id}>{item.descricao}</option>
                        ))}
                    </Input>
                </FormGroup>

                {false &&
                    <FormGroup check inline>
                        <Label for="produto">Produto</Label>
                        <Input type="select" id="produto">
                            {listaProdutoTodos && listaProdutoTodos.map((item) => (
                                <option value={item._id}>{item.descricao}</option>
                            ))}
                        </Input>
                    </FormGroup>
                }
                {false &&
                    <FormGroup check inline>
                        <Label for="produtoQuantidade">Quantidade</Label>
                        <div width="50%"><Input type="number" id="produtoQuantidade" width="30px" /></div>

                    </FormGroup>
                }
                {false &&
                    <FormGroup check inline>
                        <img src='/+.png' width="20px" onClick={adicionarProduto} />
                    </FormGroup>

                }
                {false &&
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
                            {listaProduto && listaProduto.map((item) => (
                                <tr>
                                    <td>
                                        <a href={Host.url() + "/produto/" + item._id}>
                                            {item.descricao}
                                        </a>

                                    </td>
                                    <td>
                                        {item.quantidadeProduto}
                                    </td>
                                    <td>
                                        {item.unidadeMedida}
                                    </td>
                                    <td>
                                        <img src='/x.png' width="20px" onClick={() => deletarProduto(item)} />

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                }
                {false &&
                    <FormGroup check inline>
                        <Label for="insumo">Insumo</Label>
                        <Input type="select" id="insumo">
                            {listaInsumoTodos && listaInsumoTodos.map((item) => (
                                <option value={item._id}>{item.descricao}</option>
                            ))}
                        </Input>
                    </FormGroup>
                }
                {false &&
                    <FormGroup check inline>
                        <Label for="insumoQuantidade">Quantidade</Label>
                        <div width="50%"><Input type="number" id="insumoQuantidade" width="30px" /></div>

                    </FormGroup>
                }
                {false &&
                    <FormGroup check inline>
                        <img src='/+.png' width="20px" onClick={adicionarInsumo} />
                    </FormGroup>
                }

                {false &&
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
                                        {item.quantidadeInsumo}
                                    </td>
                                    <td>
                                        {item.unidadeMedida}
                                    </td>
                                    <td>
                                        <img src='/x.png' width="20px" onClick={() => deletarInsumo(item)} />

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                }
                <Button color="danger" onClick={salvar}>Salvar</Button>
            </Form>
            {carregando &&
                <Carregamento />
            }
        </Container>
    );
}

function Pagina() {

    return <Produto />
}
export default Pagina;