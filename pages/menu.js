import { React, useEffect,useState } from 'react';
import { Container, Nav, NavItem, NavLink } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Dado from '../dado/menu.js'
import Host from '../dado/host'
import Usuario from '../dado/usuario.js';
import { useRouter } from 'next/router'


function Menu() {
    const router = useRouter();
    const [autenticado, setAutenticado] = useState("");
    useEffect(() => {
        if (autenticado == "" || autenticado == undefined) {
            if (Usuario.autenticado()) {
                setAutenticado(true)

            } else {
                setAutenticado(false)
                router.push(Host.url() + "/login")
            }
        }
    })


    function sair() {
        Usuario.sair()
        router.push(Host.url() + "/login")

    }
    return (
        <Container>
            Autenticado <img src='/sair.png' width="20px" onClick={sair} />
            <Nav>
                {Dado.listar().map((item) => (
                    <NavItem>
                        <NavLink href={Host.url() + "/" + item.pagina}>
                            {item.descricao}
                        </NavLink>
                    </NavItem>
                ))}
            </Nav>
            
        </Container>
    );
}

function Pagina() {
    return <Menu />
}
export default Pagina;