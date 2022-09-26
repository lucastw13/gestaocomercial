import { useState, React } from 'react';
import Menu from '../menu';
import { Container, Label, Input, Button, Form, FormGroup, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../../dado/generico.js'
import { useRouter } from 'next/router'
import Host from '../../dado/host';
function Receita() {
    const [item, setItem] = useState("");
    const [listaInsumo, setListaInsumo] = useState("");
    const router = useRouter()


    if (((item == "") || (item == undefined)) && ((router.query.codigo != "") && (router.query.codigo != undefined))) {
        if (router.query.codigo == "incluir") {
            setItem({ codigo: router.query.codigo })
        } else {
            Dado.item(router.query.codigo, "receita")
                .then(response => {
                    if (response.data != null) {
                        setItem(response.data.item)
                        document.getElementById("descricao").value = response.data.item.descricao;
                        var listaTemp = []
                        for (var item of response.data.item.insumo) {
                            Dado.item(item._id, "insumo")
                                .then(response => {
                                    console.log(response.data.item)
                                    listaTemp.push(response.data.item)
                                    setListaInsumo(listaTemp)
                                }, (error) => {
                                    console.log("error: " + error)
                                })

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
        console.log(JSON.stringify(item))

    }

    function mudarInsumo(event) {
        /*var itemTemp = item
        itemTemp.descricao = event.target.value
        setItem(itemTemp);*/
        console.log(JSON.stringify(event.target.value))

    }


    function salvar() {
        var erroObrigatorio = testarObrigatoriedade()
        if (erroObrigatorio) {
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
    function testarObrigatoriedade() {
        if (item.descricao == "") {
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
                    <Label for="insumo">Unidade de Medida</Label>
                    <Input type="select" id="insumo" onChange={mudarInsumo}>
                        <option></option>
                        {listaInsumo && listaInsumo.map((itemInsumo) => (
                            <option value={itemInsumo._id}>{itemInsumo.descricao}</option>


                        ))}
                    </Input>
                </FormGroup>
                <Button color="danger" onClick={salvar}>Salvar</Button>
            </Form>
        </Container>
    );
}

function Pagina() {

    return <Receita />
}
export default Pagina;