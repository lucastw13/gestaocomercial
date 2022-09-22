import { useState, React, useEffect } from 'react';
import Menu from '../menu';
import { Container, Table, tbody, thead, NavLink } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../../dado/ingrediente.js'
import { useRouter } from 'next/router'
import Host from '../../dado/host';
function Ingrediente() {
    const [item, setItem] = useState("");
    const router = useRouter()
    
    if ((router.query.codigo != "") && (router.query.codigo != undefined) &&((item == "")|| (item == undefined))) {
        Dado.item(router.query.codigo)
            .then(response => {
                if (response.data != null) {
                    setItem({ codigo: response.data.ingrediente._id, descricao: response.data.ingrediente.descricao })
                    
                }
            }, (error) => {
            })

    }


    return (
        <Container>
            <Menu />
            <h1>{item.descricao}</h1>

          
                <img src='/x.png' width="20px" onClick={() => { Dado.deletar(item.codigo) }} />
        
        </Container>
    );
}

function Pagina() {

    return <Ingrediente />
}
export default Pagina;