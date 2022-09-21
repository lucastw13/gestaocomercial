import { useState, React } from 'react';
import { Button, Container, Form, Label, Input, FormGroup, Nav, NavItem, NavLink } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Dado from '../dado/menu.js'
import Host from '../dado/host'
function Menu() {
    return (
        <Container>
            <Nav>
                {Dado.listar().map((item) => (
                    <NavItem>
                        <NavLink href={Host.url()+"/"+item.pagina}>
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