import { useState, React, useEffect } from 'react';
import Menu from '../menu';
import { Container, Label, Input, Button, Form, FormGroup } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../../dado/generico.js'
import { useRouter } from 'next/router'
import Host from '../../dado/host';
import Carregamento from '../carregamento';
function Cliente() {
    const [item, setItem] = useState("");
    const router = useRouter()
    const [carregando, setCarregando] = useState("")

    useEffect(() => {
        if (router.query.codigo == "incluir") {
            setItem({})
        } else {
            if ((router.query.codigo!="")&&(router.query.codigo!=undefined)){
                listar(router.query.codigo)
            }
        }
    }, [router.query.codigo])
    function listar(pCodigo) {
        setCarregando(true)
        Dado.item(pCodigo, "cliente")
            .then(response => {
                if (response.data != null) {
                    if (response.data.status == true) {
                        setItem(response.data.item)
                        document.getElementById("nome").value = response.data.item.nome;
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

    function mudarNome(event) {
        var itemTemp = item
        itemTemp.nome = event.target.value
        setItem(itemTemp);

    }

    function salvar() {
        if (possuiErroObrigatorio()) {
            alert("Preencha todos os Campos obrigatórios!")
        } else {
            Dado.salvar(item, "cliente").then(response => {
                if (response.data != null) {
                    if (response.data.status == true) {
                        router.push(Host.url() + "/cliente")
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
        if (item.nome == "" || item.nome == undefined) {
            return true;
        }

    }



    return (
        <Container>
            <Menu />
            <Form>
                <FormGroup>
                    <Label for="nome">Nome</Label>
                    <Input type="text" id="nome" onChange={mudarNome} />
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

    return <Cliente />
}
export default Pagina;