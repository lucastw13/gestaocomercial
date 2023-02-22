import { useState, React } from 'react';
import Menu from '../menu';
import { Container, Label, Input, Button, Form, FormGroup } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../../dado/generico.js'
import { useRouter } from 'next/router'
import Host from '../../dado/host';
function Insumodepara() {
    const [item, setItem] = useState("");
    const router = useRouter()


    if (((item == "") || (item == undefined)) && ((router.query.codigo != "") && (router.query.codigo != undefined))) {
        if (router.query.codigo == "incluir") {
            setItem({})
        } else {
            Dado.item(router.query.codigo, "insumodepara")
                .then(response => {
                    if (response.data != null) {
                        if (response.data.status == true) {
                            setItem(response.data.item)
                            document.getElementById("cnpjEmpresa").value = response.data.item.empresa.cnpj;
                            document.getElementById("nomeEmpresa").value = response.data.item.empresa.nome;
                            document.getElementById("codigo").value = response.data.item.codigo;
                            document.getElementById("insumo").value = response.data.item.insumo;
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

    function mudarCNPJ(event) {
        var itemTemp = item
        itemTemp.cnpj = event.target.value
        setItem(itemTemp);

    }
    function mudarCodigo(event) {
        var itemTemp = item
        itemTemp.codigo = event.target.value
        setItem(itemTemp);

    }
    function mudarInsumo(event) {
        var itemTemp = item
        itemTemp.insumo = event.target.value
        setItem(itemTemp);
    }


    function salvar() {
        if (possuiErroObrigatorio()) {
            alert("Preencha todos os Campos obrigatórios!")
        } else {
            Dado.salvar(item, "insumodepara").then(response => {
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
    function possuiErroObrigatorio() {
        if (item.cnpj == "" || item.cnpj == undefined) {
            return true;
        }
        if (item.codigo == "" || item.codigo == undefined) {
            return true;
        }
        if (item.insumo == "" || item.insumo == undefined) {
            return true;
        }
        return false;
    }



    return (
        <Container>
            <Menu />
            <Form>
                <FormGroup>
                    <Label for="nomeEmpresa">Empresa</Label>
                    <Input type="text" id="nomeEmpresa"/>
                </FormGroup>
                <FormGroup>
                    <Label for="cnpjEmpresa">CNPJ</Label>
                    <Input type="text" id="cnpjEmpresa"  />
                </FormGroup>
                <FormGroup>
                    <Label for="codigo">Código</Label>
                    <Input type="text" id="codigo" onChange={mudarCodigo} />
                </FormGroup>

                <FormGroup>
                    <Label for="insumo">Insumo</Label>
                    <Input type="text" id="insumo" onChange={mudarInsumo} />
                </FormGroup>

                <FormGroup>
                    <a href={Host.url() + "/insumo/" + item.insumo}>
                        {item.insumo}
                    </a>
                </FormGroup>
                <Button color="danger" onClick={salvar}>Salvar</Button>
            </Form>
        </Container>
    );
}

function Pagina() {

    return <Insumodepara />
}
export default Pagina;