import { useState, React, useEffect } from 'react';
import Menu from '../menu';
import { Container, Label, Input, Button, Form, FormGroup, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../../dado/generico.js'
import { useRouter } from 'next/router'
import Host from '../../dado/host';
import Carregamento from '../carregamento';
function Compraimportar() {
    const router = useRouter()
    const [lista, setLista] = useState("");
    const [carregando, setCarregando] = useState("")

    useEffect(() => {
        if (router.query.chave == "" || router.query.chave == undefined) {
            //router.push(Host.url() + "/compra")
        } else {
            listar(router.query.chave)
        }
    }, [router.query.chave])
    function listar(pChave) {
        setCarregando(true)
        Dado.itemNotaFiscal(pChave, "insumo")
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
            .finally(() => {
                setCarregando(false)
            });

    }

    function salvar() {
        var item = {
            insumo: []
        }
        for (var itemTemp of lista) {
            item.insumo.push({
                _id: itemTemp.insumo,
                //quantidade: itemTemp.quantidade,
                quantidade:document.getElementById(itemTemp.codigo).value,
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
            <Menu descricao="Compras"/>
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
                                    <Input type="text" id={item.codigo} />
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
            {carregando &&
                <Carregamento />
            }
        </Container>
    );
}

function Pagina() {

    return <Compraimportar />
}
export default Pagina;