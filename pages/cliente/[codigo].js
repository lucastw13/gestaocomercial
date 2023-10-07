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
        if ((router.query.codigo != "") && (router.query.codigo != undefined)) {
            if (router.query.codigo == "incluir") {
                setItem({})
            }
            listar(router.query.codigo)
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
    function mudarCep(event) {
        var cep = event.target.value.replace(/[^0-9]/g,'');
        if (cep.length == 8) {
            var itemTemp = item
            itemTemp.cep = cep
            setCarregando(true)
            Dado.consultaCep(itemTemp.cep)
            .then(response => {
                if (response.data != null) {
                    itemTemp.logradouro                         = response.data.logradouro
                    itemTemp.bairro                             = response.data.bairro
                    itemTemp.cidade                             = response.data.localidade
                    document.getElementById("logradouro").value = response.data.logradouro
                    document.getElementById("bairro").value     = response.data.bairro
                    document.getElementById("cidade").value     = response.data.localidade
                    setItem(itemTemp);
                }
            }, (error) => {
                console.log("error: " + error)
            })
            .finally(() => {
                setCarregando(false)
            });
            
        }

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
            <Menu descricao="Clientes" />
            <Form>
                <FormGroup>
                    <Label for="nome">Nome</Label>
                    <Input type="text" id="nome" onChange={mudarNome} />

                    <Label for="cep">CEP</Label>
                    <Input type="number" id="cep" onChange={mudarCep} maxlength={8}/>

                    <Label for="logradouro">Logradouro</Label>
                    <Input type="text" disabled id="logradouro" />

                    <Label for="bairro">Bairro</Label>
                    <Input type="text" disabled id="bairro" />

                    <Label for="cidade">Cidade</Label>
                    <Input type="text" disabled id="cidade" />
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