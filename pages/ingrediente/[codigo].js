import { useState, React, useEffect } from 'react';
import Menu from '../menu';
import { Container, Table, tbody, thead, NavLink,Label,Input,Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../../dado/ingrediente.js'
import { useRouter } from 'next/router'
import Host from '../../dado/host';
function Ingrediente() {
    const [item, setItem] = useState("");
    const [descricao, setDescricao] = useState("");
    const router = useRouter()
    
    if ((router.query.codigo != "") &&(router.query.codigo != '""') &&  (router.query.codigo != undefined) &&((item == "")|| (item == undefined))) {
        Dado.item(router.query.codigo)
            .then(response => {
                if (response.data != null) {
                    setItem({ codigo: response.data.ingrediente._id, descricao: response.data.ingrediente.descricao })
                    
                }
            }, (error) => {
            })

    }

    const deletar = (codigo)=>{
        Dado.deletar(codigo).then(response => {
            if (response.data != null) {
                router.push(Host.url()+"/ingrediente")
            }
        }, (error) => {
            console.log("error: "+error)
        })
        
    }
    function mudaDescricao(event) {
        setDescricao(event.target.value);
    }

    function salvar() {
        Dado.salvar(descricao).then(response => {
            if (response.data != null) {
                console.log(response.data)
                //router.push(Host.url()+"/ingrediente")
            }
        }, (error) => {
            console.log("error: "+error)
        })
    }

    return (
        <Container>
            <Menu />
            <h1>{item.descricao}</h1>

          
                <img src='/x.png' width="20px" onClick={() => { deletar(item.codigo) }} />

            <text/>
            <Label>Descrição</Label>
            <Input type="text" onChange={mudaDescricao}/>
            <Button color="danger" onClick={salvar}>Buscar Endereço</Button>
        </Container>
    );
}

function Pagina() {

    return <Ingrediente />
}
export default Pagina;