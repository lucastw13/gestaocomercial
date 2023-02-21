import { useState, React, useEffect } from 'react';
import { Container, Label, Input, Button, Form, FormGroup } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router'
import Host from '../dado/host';
import Usuario from '../dado/usuario'
function Insumo() {

    const router = useRouter()
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");

    useEffect(() => {
        if (Usuario.autenticado()) {
            router.push(Host.url())
        }
    })


    function mudarNome(event) {
        setNome(event.target.value)

    }
    function mudarSenha(event) {
        setSenha(event.target.value)
    }


    function entrar() {
        if (possuiErroObrigatorio()) {
            alert("Preencha todos os Campos obrigatórios!")
        } else {
            Usuario.autenticar(nome, senha).then(response => {
                if (response.data != null) {
                    if (response.data.status == true) {
                        var item = response.data.item
                        Usuario.setUsuario(item._id)
                        Usuario.setEmpresa(item.empresa)
                        Usuario.setNivel(item.nivel)
                        router.push(Host.url())
                    } else {
                        console.log("error: " + response.data.descricao)
                        alert(response.data.descricao)
                    }
                }
            }, (error) => {
                console.log("error: " + error)
                alert(error)
            })

        }
    }
    function possuiErroObrigatorio() {
        if (nome == "" || nome == undefined) {
            return true;
        }
        if (senha == "" || senha == undefined) {
            return true;
        }

        return false;
    }



    return (
        <Container>
            <Form>
                <FormGroup check inline>
                    <Label for="nome">Nome</Label>
                    <Input type="text" id="descricao" onChange={mudarNome} />
                </FormGroup>
                <FormGroup check inline>
                    <Label for="Senha">senha</Label>
                    <Input type="password" id="senha" onChange={mudarSenha} />
                </FormGroup>
                <FormGroup check inline>
                    <Button color="danger" onClick={entrar}>Entrar</Button>
                </FormGroup>
            </Form>
        </Container>
    );
}

function Pagina() {

    return <Insumo />
}
export default Pagina;