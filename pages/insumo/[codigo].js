import { useState, React, useEffect } from 'react';
import Menu from '../menu';
import { Container, Table, tbody, thead, NavLink, Label, Input, Button, FormGroup } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../../dado/insumo.js'
import { useRouter } from 'next/router'
import Host from '../../dado/host';
function Insumo() {
    const [item, setItem] = useState("");
    const router = useRouter()

    if (((item == "") || (item == undefined))&&((router.query.codigo != "") && (router.query.codigo != undefined))){
        if (router.query.codigo == "incluir") {
            setItem({codigo:router.query.codigo})
        }else{
            Dado.item(router.query.codigo)
                .then(response => {
                    if (response.data != null) {
                        setItem({ codigo: response.data.insumo._id, descricao: response.data.insumo.descricao })

                    }
                }, (error) => {
                })

        }
    }

    function mudaDescricao(event) {
        var itemTemp = item
        console.log(item)
        itemTemp.descricao = event.target.value
        setItem(itemTemp);

    }

    function salvar() {
        Dado.salvar(item).then(response => {
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

    return <Insumo />
}
export default Pagina;