import { useState, React } from 'react';
import Menu from '../menu';
import { Container, Label, Input, Button, Form, FormGroup, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../../dado/generico.js'
import { useRouter } from 'next/router'
import Host from '../../dado/host';
function Compraimportar() {
    const router = useRouter()
    const [lista, setLista] = useState("");


    if (((lista == "") || (lista == undefined)) && ((router.query.chave != "") && (router.query.chave != undefined))) {
        if (router.query.chave == "" || router.query.chave == undefined) {
            router.push(Host.url() + "/insumodepara")
        } else {
            Dado.itemNotaFiscal(router.query.chave, "insumo")
                .then(response => {
                    if (response.data != null) {
                        if (response.data.status == true) {
                            setLista(response.data.lista)

                        } else {
                            setLista([])
                            console.log("error: " + JSON.stringify(response.data.descricao))

                        }
                    }
                }, (error) => {
                    console.log("error: " + error)
                })
        }
    }


    /*function salvar() {
        if (listaDePara.length == 0) {
            alert("Informe pelo menos um De/Para")
        } else {
            Dado.salvarLista(listaSalvar, "insumodepara").then(response => {
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
                listaSalvarTemp.push({ cnpj: cnpj, codigo: itemDePara.codigo, insumo: itemDePara.insumo })
                console.log(listaSalvarTemp)
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
    }*/
    return (
        <Container>
            <Menu />
            <Form>

                <Table>
                    <thead>
                        <tr>
                            <th>
                                Insumo
                            </th>
                            <th>
                                Quantidade
                            </th>
                            <th>
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {lista && lista.map((item) => (
                            <tr>
                                <td>
                                    {item.insumo}

                                </td>
                                <td>
                                    {item.quantidade}

                                </td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Form>
        </Container>
    );
}

function Pagina() {

    return <Compraimportar />
}
export default Pagina;