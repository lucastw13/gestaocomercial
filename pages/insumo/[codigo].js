import { useState, React } from 'react';
import Menu from '../menu';
import { Container, Label, Input, Button, Form, FormGroup } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../../dado/generico.js'
import { useRouter } from 'next/router'
import Host from '../../dado/host';
function Insumo() {
    const [item, setItem] = useState("");
    const router = useRouter()


    if (((item == "") || (item == undefined)) && ((router.query.codigo != "") && (router.query.codigo != undefined))) {
        if (router.query.codigo == "incluir") {
            setItem({quantidade:0,valor:0})
        } else {
            Dado.item(router.query.codigo, "insumo")
                .then(response => {
                    if (response.data != null) {
                        if (response.data.status == true) {
                            setItem(response.data.item)
                            document.getElementById("descricao").value = response.data.item.descricao;
                            document.getElementById("unidadeMedida").value = response.data.item.unidadeMedida;
                            document.getElementById("quantidade").value = response.data.item.quantidade;
                            document.getElementById("quantidadeMinima").value = response.data.item.quantidadeMinima;
                            document.getElementById("ultimoValorUnidade").value = response.data.item.valor;
                        } else {
                            setItem({})
                            console.log("error: " + response.data.descricao)

                        }
                    }
                }, (error) => {
                    console.log("error: " + error)
                })
        }
    }

    function mudarDescricao(event) {
        var itemTemp = item
        itemTemp.descricao = event.target.value
        setItem(itemTemp);

    }
    function mudarUnidadeMedida(event) {
        var itemTemp = item
        itemTemp.unidadeMedida = event.target.value
        setItem(itemTemp);

    }
    function mudarQuantidade(event) {
        var itemTemp = item
        itemTemp.quantidade = event.target.value
        setItem(itemTemp);
    }
    function mudarQuantidadeMinima(event) {
        var itemTemp = item
        itemTemp.quantidadeMinima = event.target.value
        setItem(itemTemp);
    }

    function salvar() {
        if (possuiErroObrigatorio()) {
            alert("Preencha todos os Campos obrigatórios!")
        } else {
            Dado.salvar(item, "insumo").then(response => {
                if (response.data != null) {
                    if (response.data.status == true) {
                        router.push(Host.url() + "/insumo")
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
        if (item.unidadeMedida == "") {
            return true;
        }
        if (item.quantidadeMinima == "") {
            return true;
        }
        return false;
    }



    return (
        <Container>
            <Menu />
            <Form>
                <FormGroup>
                    <Label for="descricao">Descrição</Label>
                    <Input type="text" id="descricao" onChange={mudarDescricao} />
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
                    <Input type="number" id="quantidade" disabled="true" onChange={mudarQuantidade} />
                </FormGroup>

                <FormGroup>
                    <Label for="quantidadeMinima">Quantidade Mínima</Label>
                    <Input type="number" id="quantidadeMinima" onChange={mudarQuantidadeMinima} />
                </FormGroup>

                <FormGroup>
                    <Label for="ultimoValorUnidade">Último Valor Por Unidade</Label>
                    <Input type="number" disabled="true" id="ultimoValorUnidade" />
                </FormGroup>


                <Button color="danger" onClick={salvar}>Salvar</Button>
            </Form>
        </Container>
    );
}

function Pagina() {

    return <Insumo />
}
export default Pagina;