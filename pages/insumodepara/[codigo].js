import { useState, React, useEffect } from 'react';
import Menu from '../menu';
import { Container, Label, Input, Button, Form, FormGroup } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../../dado/generico.js'
import { useRouter } from 'next/router'
import Host from '../../dado/host';
import Carregamento from '../carregamento';
function Insumodepara() {
    const [item, setItem] = useState("");
    const router = useRouter()
    const [carregando, setCarregando] = useState("")

    useEffect(() => {
        if ((router.query.codigo != "") && (router.query.codigo != undefined)) {
            if (router.query.codigo == "incluir") {
                setItem({})
            }
            listar(router.query.codigo)
        }
    }, [router.query.codigo])
    function listar(pCodigo) {
        setCarregando(true)
        Dado.item(pCodigo, "insumodepara")
            .then(response => {
                if (response.data != null) {
                    if (response.data.status == true) {
                        setItem(response.data.item)
                        document.getElementById("cnpjFornecedor").value = response.data.item.fornecedorCnpj;
                        document.getElementById("nomeFornecedor").value = response.data.item.fornecedorNome;
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
            .finally(() => {
                setCarregando(false)
            });

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
                    <Label for="nomeFornecedor">Fornecedor</Label>
                    <Input type="text" id="nomeFornecedor" />
                </FormGroup>
                <FormGroup>
                    <Label for="cnpjFornecedor">CNPJ</Label>
                    <Input type="text" id="cnpjFornecedor" />
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
            {carregando &&
                <Carregamento />
            }
        </Container>
    );
}

function Pagina() {

    return <Insumodepara />
}
export default Pagina;