import { useState, React, useEffect } from 'react';
import Menu from '../menu';
import { Container, Table, tbody, thead, NavLink, Label, Input, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../../dado/ingrediente.js'
import { useRouter } from 'next/router'
import Host from '../../dado/host';
function Ingrediente() {
    const [item, setItem] = useState("");
    const [descricao, setDescricao] = useState("");
    const router = useRouter()


    if ((router.query.codigo != "") && (router.query.codigo != 'incluir') && (router.query.codigo != undefined) && ((item == "") || (item == undefined))) {
        Dado.item(router.query.codigo)
            .then(response => {
                if (response.data != null) {
                    setItem({ codigo: response.data.ingrediente._id, descricao: response.data.ingrediente.descricao })
                    setDescricao(response.data.ingrediente.descricao)
                }
            }, (error) => {
            })

    }

    function mudaDescricao(event) {
        setDescricao(event.target.value);
        console.log("descricao: "+event.target.value)
    }

    function salvar() {
        console.log("router:"+router.query.codigo)
        Dado.salvar(router.query.codigo,descricao).then(response => {
            if (response.data != null) {
                console.log(response.data)
                router.push(Host.url()+"/ingrediente")
            }
        }, (error) => {
            console.log("error: " + error)
        })
    }



    return (
        <Container>
            <Menu />

            {item.codigo=="incluir" && (() => (
                <h1>Incluir</h1>
            ))}

            {item.codigo!="incluir"&&(() => (
                <h1>Editar</h1>
            ))}
            
            <Label>Descrição</Label>
            <Input type="text" value={descricao} onChange={mudaDescricao} />
            <Button color="danger" onClick={salvar}>Salvar</Button>


        </Container>
    );
}

function Pagina() {

    return <Ingrediente />
}
export default Pagina;