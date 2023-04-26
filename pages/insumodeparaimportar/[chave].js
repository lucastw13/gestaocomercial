import { useState, React, useEffect } from 'react';
import Menu from '../menu';
import { Container, Label, Input, Button, Form, FormGroup, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../../dado/generico.js'
import { useRouter } from 'next/router'
import Host from '../../dado/host';
import Carregamento from '../carregamento';
function Insumodeparaimportar() {
    const [listaNotaFiscal, setListaNotaFiscal] = useState("");
    const [listaInsumoTodos, setListaInsumoTodos] = useState("");
    const [listaDePara, setListaDePara] = useState("");
    const [listaSalvar, setListaSalvar] = useState("");
    const [cnpjFornecedor, setCnpjFornecedor] = useState("");
    const [nomeFornecedor, setNomeFornecedor] = useState("");
    const router = useRouter()
    const [carregando, setCarregando] = useState("")

    useEffect(() => {
        if ((router.query.chave != "") && (router.query.chave != undefined)) {
            if (router.query.chave == "" || router.query.chave == undefined) {
                router.push(Host.url() + "/insumodepara")
            }
            listar(router.query.chave)
        }
    }, [router.query.chave])
    function listar(pChave) {
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
                }
                if (pChave != "incluir") {
                    listarEdicao(pChave)
                }
            }, (error) => {
                console.log("error: " + error)
            })
            .finally(() => {
                setCarregando(false)
            });

    }
    function listarEdicao(pChave) {
        setCarregando(true)
        Dado.item(pChave, "notafiscal")
            .then(response => {
                if (response.data != null) {
                    if (response.data.status == true) {
                        setListaNotaFiscal(response.data.lista)
                        setCnpjFornecedor(response.data.fornecedorCnpj)
                        setNomeFornecedor(response.data.fornecedorNome)
                        document.getElementById("nomeFornecedor").value = response.data.fornecedorNome
                        document.getElementById("cnpjFornecedor").value = response.data.fornecedorCnpj
                        /* document.getElementById("cnpj").value = response.data.item.cnpj;
                         document.getElementById("codigo").value = response.data.item.codigo;
                         document.getElementById("insumo").value = response.data.item.insumo;*/
                    } else {
                        setListaNotaFiscal([])
                        console.log("error: " + JSON.stringify(response.data.descricao))

                    }
                }

            }, (error) => {
                console.log("error: " + error)
            })
    }


    function salvar() {
        if (listaDePara.length == 0) {
            alert("Informe pelo menos um De/Para")
        } else {
            console.log(listaSalvar)
            Dado.salvarListaSemEmpresa(listaSalvar, "insumodepara").then(response => {
                if (response.data != null) {
                    if (response.data.status == true) {
                        router.push(Host.url() + "/insumodepara")
                    } else {
                        console.log("error: " + response.data.descricao)
                    }
                }
            }, (error) => {
                console.log("error: " + error)
            })
        }
    }

    function adicionarDePara() {

        var de = document.getElementById("de").value
        var para = document.getElementById("para").value

        if (de != "" && de != undefined && para != "" && para != undefined) {
            var possuiDePara = false
            for (var itemDePara of listaDePara) {
                if (itemDePara.codigo == de) {
                    possuiDePara = true
                    break
                }
            }
            if (possuiDePara) {
                alert("De/Para já Incluso!")
            } else {

                var listaTemp = []
                for (itemDePara of listaDePara) {
                    listaTemp.push(itemDePara)
                }

                for (var itemDePara of listaNotaFiscal) {
                    if (itemDePara.codigo == de) {
                        break;
                    }
                }

                for (var itemInsumo of listaInsumoTodos) {
                    if (itemInsumo._id == para) {
                        break;
                    }
                }
                itemDePara.insumo = itemInsumo._id
                itemDePara.insumoDescricao = itemInsumo.descricao

                listaTemp.push(itemDePara)
                setListaDePara(listaTemp)

                var listaSalvarTemp = []
                for (var itemSalvar of listaSalvar) {
                    listaSalvarTemp.push(itemSalvar)
                }
                var item = { fornecedorCnpj: cnpjFornecedor, fornecedorNome: nomeFornecedor, codigo: itemDePara.codigo, insumo: itemDePara.insumo }
                //console.log(item)
                listaSalvarTemp.push(item)
                //console.log(listaSalvarTemp)
                setListaSalvar(listaSalvarTemp)

                document.getElementById("de").value = ""
                document.getElementById("para").value = ""
            }
        } else {
            alert("Preencha todos os Campos obrigatórios!")
        }
    }

    function deletar(itemParametro) {
        var deletar = confirm("Deseja excluir o depara: " + itemParametro.descricao + " / " + itemParametro.insumoDescricao + " ?");
        if (deletar) {
            var listaDeParaTemp = []
            for (var itemDePara of listaDePara) {
                if (itemDePara.codigo != itemParametro.codigo) {
                    listaDeParaTemp.push(itemDePara)
                }
            }
            setListaDePara(listaDeParaTemp)

            var listaSalvarTemp = []
            for (var itemSalvar of listaDePara) {
                if (itemSalvar.codigo != itemParametro.codigo) {
                    listaSalvarTemp.push(itemSalvar)
                }
            }
            setListaSalvar(listaSalvarTemp)
        }
    }
    return (
        <Container>
            <Menu descricao="Insumos"/>
            <Form>
                <FormGroup check >
                    <Label for="nomeFornecedor">Fornecedor</Label>
                    <Input disabled="true" type="text" id="nomeFornecedor" />
                    <Label for="cnpjFornecedor">CNPJ</Label>
                    <Input disabled="true" type="text" id="cnpjFornecedor" />
                </FormGroup>
                <FormGroup check inline>
                    <Label for="de">De</Label>
                    <Input type="select" id="de">
                        <option value="">Selecione</option>
                        {listaNotaFiscal && listaNotaFiscal.map((item) => (
                            <option value={item.codigo}>{item.descricao}</option>
                        ))}
                    </Input>

                </FormGroup>
                <FormGroup check inline>
                    <Label for="para">Para</Label>
                    <Input type="select" id="para">
                        <option value="">Selecione</option>
                        {listaInsumoTodos && listaInsumoTodos.map((item) => (
                            <option value={item._id}>{item.descricao}</option>
                        ))}
                    </Input>
                </FormGroup>



                <FormGroup check inline>
                    <img src='/+.png' width="20px" onClick={adicionarDePara} />
                </FormGroup>

                <Table>
                    <thead>
                        <tr>
                            <th>
                                De
                            </th>
                            <th>
                                Para
                            </th>
                            <th>
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {listaDePara && listaDePara.map((item) => (
                            <tr>
                                <td>
                                    {item.descricao}

                                </td>
                                <td>
                                    <a href={Host.url() + "/insumo/" + item.insumo}>
                                        {item.insumoDescricao}
                                    </a>
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

    return <Insumodeparaimportar />
}
export default Pagina;