import { useState, React, useEffect } from 'react';
import { Container, Label, Input, Button, Form, FormGroup } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router'
import Host from '../dado/host';
import Usuario from '../dado/usuario'
import Dado from '../dado/generico.js'
import Carregamento from './carregamento';
function Insumo() {

    const router = useRouter()
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const [empresa, setEmpresa] = useState("");
    const [listaEmpresa, setListaEmpresa] = useState("");
    const [carregando, setCarregando] = useState("")

    useEffect(() => {
        listar()
    }, [])
    function listar() {
        setCarregando(true)
        if (Usuario.autenticado()) {
            router.push(Host.url())
        }

        Dado.listarEmpresa()
            .then(response => {
                if (response.data != null) {
                    if (response.data.status == true) {
                        setListaEmpresa(response.data.lista)
                    } else {
                        setListaEmpresa([])
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
        setNome(event.target.value)

    }
    function mudarSenha(event) {
        setSenha(event.target.value)
    }
    function mudarEmpresa(event) {
        setEmpresa(event.target.value)
    }


    function entrar() {
        if (possuiErroObrigatorio()) {
            alert("Preencha todos os Campos obrigatórios!")
        } else {

            Usuario.autenticar(nome, senha, empresa).then(response => {
                if (response.data != null) {
                    if (response.data.status == true) {
                        var item = response.data.item
                        Usuario.setUsuario(item._id)
                        Usuario.setEmpresa(item.empresa)
                        Usuario.setNivel(item.nivel)
                        router.push(Host.url())
                    } else {
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
        if (empresa == "" || empresa == undefined) {
            return true;
        }

        return false;
    }



    return (
        <Container>
            <Form>

                <FormGroup>
                    <Label for="empresa">Empresa</Label>
                    <Input type="select" id="empresa" onChange={mudarEmpresa}>
                        <option value="">Selecione</option>
                        {listaEmpresa && listaEmpresa.map((item) => (
                            <option value={item._id}>{item.nome}</option>
                        ))}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="nome">Nome</Label>
                    <Input type="text" id="nome" onChange={mudarNome} />
                </FormGroup>
                <FormGroup>
                    <Label for="Senha">Senha</Label>
                    <Input type="password" id="senha" onChange={mudarSenha} />
                </FormGroup>
                <FormGroup>
                    <Button color="danger" onClick={entrar}>Entrar</Button>
                </FormGroup>
            </Form>
            {carregando &&
                <Carregamento />
            }
        </Container>
    );
}

function Pagina() {

    return <Insumo />
}
export default Pagina;