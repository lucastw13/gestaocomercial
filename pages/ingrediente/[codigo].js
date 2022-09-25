import { useState, React, useEffect } from 'react';
import Menu from '../menu';
import { Container, Table, tbody, thead, NavLink, Label, Input, Button, FormGroup } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../../dado/ingrediente.js'
import { useRouter } from 'next/router'
import Host from '../../dado/host';
function Ingrediente() {
    const [item, setItem] = useState("");
    const router = useRouter()


    if ((router.query.codigo != "") && (router.query.codigo != 'incluir') && (router.query.codigo != undefined) && ((item == "") || (item == undefined))) {
        Dado.item(router.query.codigo)
            .then(response => {
                if (response.data != null) {
                    setItem({ codigo: response.data.ingrediente._id, descricao: response.data.ingrediente.descricao })

                }
            }, (error) => {
            })

    }

    function mudaDescricao(event) {
        var itemTemp = item
        itemTemp.descricao = event.target.value
        setItem(itemTemp);
    }

    function salvar() {
        Dado.salvar(router.query.codigo, descricao).then(response => {
            if (response.data != null) {
                if (response.data.status == true) {
                    router.push(Host.url() + "/ingrediente")
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
            <Menu />

            <Label for="descricao">Descrição</Label>
            <Input type="text" id="descricao" value={item.descricao} onChange={mudaDescricao} />


            <Button color="danger" onClick={salvar}>Salvar</Button>
        </Container>
    );
}

function Pagina() {

    return <Ingrediente />
}
export default Pagina;