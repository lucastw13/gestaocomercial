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
                            setLista([{}])
                            console.log("error: " + JSON.stringify(response.data.descricao))

                        }
                    }
                }, (error) => {
                    console.log("error: " + error)
                })
        }
    }

    function salvar() {
        var item = {
            insumo: []
        }
        for (var itemTemp of lista) {
            item.insumo.push({
                _id: itemTemp.insumo,
                quantidade: itemTemp.quantidade,
                valor: itemTemp.valor
            })
        }
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
                                U. Medida
                            </th>
                            <th>
                                Valor
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {lista && lista.map((item) => (
                            <tr>
                                <td>
                                    <a href={Host.url() + "/insumo/" + item.insumo}>
                                        {item.insumoDescricao}
                                    </a>
                                </td>
                                <td>
                                    {item.quantidade}

                                </td>
                                <td>
                                    {item.insumoUnidadeMedida}

                                </td>
                                <td>
                                    {item.valor}

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

    return <Compraimportar />
}
export default Pagina;