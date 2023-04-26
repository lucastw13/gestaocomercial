import { useState, React, useEffect } from 'react';
import Menu from '../menu';
import { Container, Label, Input, Button, Form, FormGroup, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../../dado/generico.js'
import { useRouter } from 'next/router'
import Host from '../../dado/host';
import Carregamento from '../carregamento';
function Pedido() {
    const [item, setItem] = useState("");
    const [listaProduto, setListaProduto] = useState("");
    const [listaProdutoTodos, setListaProdutoTodos] = useState("");
    const [listaClienteTodos, setListaClienteTodos] = useState("");
    const router = useRouter()
    const [carregando, setCarregando] = useState("")


    useEffect(() => {
        if ((router.query.codigo != "") && (router.query.codigo != undefined)) {
            if (router.query.codigo == "incluir") {
                setItem({ produto: [], unidadeMedida: "G" })
                setListaProduto([])
            }
            listar(router.query.codigo)

        }
    }, [router.query.codigo])

    function listar(pCodigo) {
        setCarregando(true)
        Dado.listar("produto", false)
            .then(response => {
                if (response.data != null) {
                    if (response.data.status == true) {
                        setListaProdutoTodos(response.data.lista)
                    } else {
                        setListaProdutoTodos([])
                        console.log("error: " + response.data.descricao)

                    }
                }
                Dado.listar("cliente")
                    .then(response => {
                        if (response.data != null) {
                            if (response.data.status == true) {
                                setListaClienteTodos(response.data.lista)
                            } else {
                                setListaClienteTodos([])
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
            }, (error) => {
                console.log("error: " + error)
            })
    }
    function listarEdicao(pCodigo) {
        setCarregando(true)
        Dado.item(pCodigo, "pedido")
            .then(response => {
                if (response.data != null) {
                    if (response.data.status == true) {
                        setItem(response.data.item)
                        console.log(response.data.item.cliente)
                        document.getElementById("cliente").value = response.data.item.nomeCliente;
                        Dado.itemLista(response.data.item._id, "pedido", "produto")
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


    function mudarCliente(event) {
        var itemTemp = item
        itemTemp.cliente = event.target.value
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
                itemProdutoTodos.quantidadePedido = quantidade
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

    function salvar() {
        var retorno = possuiErroObrigatorio()
        if (retorno.status) {
            alert(retorno.mensagem)
        } else {
            Dado.salvar(item, "pedido").then(response => {
                if (response.data != null) {
                    if (response.data.status == true) {
                        router.push(Host.url() + "/pedido")
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
        if (item.cliente == "" || item.cliente == undefined) {
            retorno = { status: true, mensagem: "Informe o cliente" }
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
    return (
        <Container>
            <Menu descricao="Pedidos"/>
            <Form >
                <FormGroup>
                    <Label for="cliente">Cliente</Label>
                    {router.query.codigo == "incluir" &&
                        < Input type="select" onChange={mudarCliente}>
                            <option value="">Selecione</option>
                            {listaClienteTodos && listaClienteTodos.map((item) => (
                                <option value={item._id}>{item.nome}</option>
                            ))}
                        </Input>

                    }
                    {router.query.codigo != "incluir" &&
                        < Input type="text" id="cliente" disabled="true" />

                    }

                </FormGroup>


                <FormGroup check inline>
                    <Label for="produto">Produto</Label>
                    <Input type="select" id="produto">
                        {listaProdutoTodos && listaProdutoTodos.map((item) => (
                            <option value={item._id}>{item.descricao}</option>
                        ))}
                    </Input>
                </FormGroup>


                <FormGroup check inline>
                    <Label for="produtoQuantidade">Quantidade</Label>
                    <div width="50%"><Input type="number" id="produtoQuantidade" width="30px" /></div>

                </FormGroup>

                <FormGroup check inline>
                    <img src='/+.png' width="20px" onClick={adicionarProduto} />
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
                        {listaProduto && listaProduto.map((item) => (
                            <tr>
                                <td>
                                    <a href={Host.url() + "/produto/" + item._id}>
                                        {item.descricao}
                                    </a>

                                </td>
                                <td>
                                    {item.quantidadePedido}
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

                <Button color="danger" onClick={salvar}>Salvar</Button>
            </Form>
            {
                carregando &&
                <Carregamento />
            }
        </Container >
    );
}

function Pagina() {

    return <Pedido />
}
export default Pagina;