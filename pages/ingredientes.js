import Menu from './menu.js';
import { Container, Table, tbody, thead } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../dado/ingrediente.js'
import Router from 'next/router'
import Host from '../dado/host'
import axios from 'axios';
async function Ingredientes() {
    Dado.listar()
        .then(response => {

            if (response.data != null) {
                console.log(response.data.ingrediente)
                var lista = []
                for (var item of response.data.ingrediente) {
                    lista.push({ codigo: item._id, descricao: item.descricao, tipo: item.tipo })
                }
                return (
                    <Container>
                        <Menu />

                        <Table>
                            <thead>
                                <tr>
                                    <th>
                                        Ingrediente
                                    </th>
                                </tr>
                            </thead>
                            <tbody>


                            </tbody>
                        </Table>

                    </Container>
                );

            }
        }, (error) => {
            console.log(error);
        })
}

function Pagina() {
    return <Ingredientes />
}


export default Pagina;